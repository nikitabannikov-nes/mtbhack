package com.mtb.game.service;

import com.mtb.game.domain.BonusTemplate;
import com.mtb.game.domain.GameItem;
import com.mtb.game.domain.User;
import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.ItemStatus;
import com.mtb.game.domain.enums.Rarity;
import com.mtb.game.dto.response.GameItemResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.BonusTemplateRepository;
import com.mtb.game.repository.GameItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MergeService {

    private final GameItemRepository gameItemRepository;
    private final BonusTemplateRepository bonusTemplateRepository;
    private final GameService gameService;
    private final TaskService taskService;

    private final Random random = new Random();

    @Transactional
    public GameItemResponse merge(User user, Long sourceId, Long targetId, int targetPosition) {
        GameItem source = getOwnedActive(user, sourceId);
        GameItem target = getOwnedActive(user, targetId);

        if (!source.getCategory().getId().equals(target.getCategory().getId())) {
            throw ApiException.unprocessable("MERGE_CATEGORY_MISMATCH", "Items must be the same category");
        }
        if (source.getRarity() != target.getRarity()) {
            throw ApiException.unprocessable("MERGE_RARITY_MISMATCH", "Items must be the same rarity");
        }

        Rarity nextRarity = source.getRarity().next();
        if (nextRarity == null) {
            throw ApiException.unprocessable("MERGE_MAX_RARITY", "Cannot merge LEGENDARY items");
        }

        List<BonusType> activeBonusTypes = gameItemRepository.findActiveBonusTypes(user.getId());
        BonusTemplate template = bonusTemplateRepository
                .findAvailable(target.getCategory().getId(), nextRarity, activeBonusTypes)
                .stream().findFirst()
                .orElseGet(() -> bonusTemplateRepository
                        .findByCategoryIdAndRarity(target.getCategory().getId(), nextRarity)
                        .stream().findFirst()
                        .orElseThrow(() -> ApiException.unprocessable("NO_TEMPLATE", "No template for merged item")));

        BigDecimal bonusValue = template.getValueMin().add(
                BigDecimal.valueOf(random.nextDouble())
                        .multiply(template.getValueMax().subtract(template.getValueMin()))
        ).setScale(2, RoundingMode.HALF_UP);

        String description = template.getDescriptionTemplate()
                .replace("{value}", bonusValue.toPlainString())
                .replace("{unit}", template.getUnit().name())
                .replace("{partner}", template.getPartnerName() != null ? template.getPartnerName() : "");

        gameItemRepository.delete(source);

        target.setRarity(nextRarity);
        target.setName(template.getItemName());
        target.setIcon(template.getIcon());
        target.setBoardPosition(targetPosition);
        target.setStatus(ItemStatus.ACTIVE);
        target.setBonusType(template.getBonusType());
        target.setBonusDescription(description);
        target.setBonusValue(bonusValue);
        target.setBonusUnit(template.getUnit());
        target.setPartnerName(template.getPartnerName());
        target.setTimerMinDays(template.getTimerMinDays());
        target.setTimerMaxDays(template.getTimerMaxDays());
        target.setExpiresAt(null);
        gameItemRepository.save(target);

        taskService.trackEvent(user, com.mtb.game.domain.enums.TaskEventType.MERGE);

        return gameService.toResponse(target);
    }

    private GameItem getOwnedActive(User user, Long itemId) {
        GameItem item = gameItemRepository.findById(itemId)
                .orElseThrow(() -> ApiException.notFound("Item not found: " + itemId));
        if (!item.getUser().getId().equals(user.getId())) {
            throw ApiException.unauthorized("Not your item");
        }
        if (item.getStatus() == ItemStatus.FROZEN) {
            throw ApiException.badRequest("Cannot merge frozen items");
        }
        return item;
    }
}
