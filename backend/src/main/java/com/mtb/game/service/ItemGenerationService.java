package com.mtb.game.service;

import com.mtb.game.config.GameProperties;
import com.mtb.game.domain.BonusTemplate;
import com.mtb.game.domain.Category;
import com.mtb.game.domain.GameItem;
import com.mtb.game.domain.User;
import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.ItemStatus;
import com.mtb.game.domain.enums.Rarity;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.BonusTemplateRepository;
import com.mtb.game.repository.CategoryRepository;
import com.mtb.game.repository.GameItemRepository;
import com.mtb.game.repository.UserCategoryRepository;
import com.mtb.game.util.ProbabilityNormalizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.NavigableMap;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ItemGenerationService {

    private final GameProperties gameProperties;
    private final ProbabilityNormalizer probabilityNormalizer;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final BonusTemplateRepository bonusTemplateRepository;
    private final GameItemRepository gameItemRepository;

    private final Random random = new Random();

    public GameItem generateItem(User user, int boardPosition) {
        List<String> categorySlugs = userCategoryRepository.findSlugsByUserId(user.getId());
        if (categorySlugs.isEmpty()) {
            throw ApiException.unprocessable("NO_CATEGORIES", "User has no categories unlocked");
        }

        List<Category> categories = categoryRepository.findBySlugIn(categorySlugs);
        Category category = categories.get(random.nextInt(categories.size()));

        NavigableMap<Double, Rarity> cumulativeMap = probabilityNormalizer
                .buildCumulativeMap(gameProperties.getRarityProbabilities());
        Rarity rarity = probabilityNormalizer.pick(cumulativeMap, random.nextDouble());

        List<BonusType> activeBonusTypes = gameItemRepository.findActiveBonusTypes(user.getId());
        List<BonusTemplate> candidates = activeBonusTypes.isEmpty()
                ? bonusTemplateRepository.findByCategoryIdAndRarity(category.getId(), rarity)
                : bonusTemplateRepository.findAvailable(category.getId(), rarity, activeBonusTypes);
        BonusTemplate template = candidates.stream()
                .findFirst()
                .orElseGet(() -> bonusTemplateRepository
                        .findByCategoryIdAndRarity(category.getId(), rarity)
                        .stream().findFirst()
                        .orElseThrow(() -> ApiException.unprocessable("NO_TEMPLATE", "No bonus template found")));

        BigDecimal bonusValue = template.getValueMin().add(
                BigDecimal.valueOf(random.nextDouble())
                        .multiply(template.getValueMax().subtract(template.getValueMin()))
        ).setScale(2, RoundingMode.HALF_UP);

        String description = template.getDescriptionTemplate()
                .replace("{value}", bonusValue.toPlainString())
                .replace("{unit}", template.getUnit().name())
                .replace("{partner}", template.getPartnerName() != null ? template.getPartnerName() : "");

        return GameItem.builder()
                .user(user)
                .category(category)
                .rarity(rarity)
                .name(template.getItemName())
                .icon(template.getIcon())
                .boardPosition(boardPosition)
                .status(ItemStatus.ACTIVE)
                .bonusType(template.getBonusType())
                .bonusDescription(description)
                .bonusValue(bonusValue)
                .bonusUnit(template.getUnit())
                .partnerName(template.getPartnerName())
                .timerMinDays(template.getTimerMinDays())
                .timerMaxDays(template.getTimerMaxDays())
                .build();
    }
}
