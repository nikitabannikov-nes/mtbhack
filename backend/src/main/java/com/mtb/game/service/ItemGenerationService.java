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

import java.util.ArrayList;
import java.util.Collections;
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

        BonusTemplate template = pickTemplate(user, category.getId(), rarity);

        return GameItem.builder()
                .user(user)
                .category(category)
                .rarity(rarity)
                .name(template.getItemName())
                .iconPath(template.getIconPath())
                .boardPosition(boardPosition)
                .status(ItemStatus.ACTIVE)
                .bonusType(template.getBonusType())
                .description(template.getDescription())
                .bonusValue(template.getValue())
                .bonusUnit(template.getUnit())
                .partnerName(template.getPartnerName())
                .timerDays(template.getTimerDays())
                .build();
    }

    private BonusTemplate pickTemplate(User user, Long categoryId, Rarity rarity) {
        List<BonusType> activeBonusTypes = gameItemRepository.findActiveBonusTypes(user.getId());

        List<BonusTemplate> candidates = activeBonusTypes.isEmpty()
                ? new ArrayList<>(bonusTemplateRepository.findByCategoryIdAndRarity(categoryId, rarity))
                : new ArrayList<>(bonusTemplateRepository.findAvailable(categoryId, rarity, activeBonusTypes));

        if (candidates.isEmpty()) {
            candidates = new ArrayList<>(bonusTemplateRepository.findByCategoryIdAndRarity(categoryId, rarity));
        }
        if (candidates.isEmpty()) {
            throw ApiException.unprocessable("NO_TEMPLATE", "No bonus template found");
        }

        Collections.shuffle(candidates, random);
        return candidates.get(0);
    }
}
