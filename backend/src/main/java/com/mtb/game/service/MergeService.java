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

import java.util.ArrayList;
import java.util.Collections;
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

        BonusTemplate template = pickTemplate(user, target.getCategory().getId(), nextRarity);

        gameItemRepository.delete(source);

        target.setRarity(nextRarity);
        target.setName(template.getItemName());
        target.setIconPath(template.getIconPath());
        target.setBoardPosition(targetPosition);
        target.setStatus(ItemStatus.ACTIVE);
        target.setBonusType(template.getBonusType());
        target.setDescription(template.getDescription());
        target.setBonusValue(template.getValue());
        target.setBonusUnit(template.getUnit());
        target.setPartnerName(template.getPartnerName());
        target.setTimerDays(template.getTimerDays());
        target.setExpiresAt(null);
        gameItemRepository.save(target);

        taskService.trackEvent(user, com.mtb.game.domain.enums.TaskEventType.MERGE);

        return gameService.toResponse(target);
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
            throw ApiException.unprocessable("NO_TEMPLATE", "No template for merged item");
        }

        Collections.shuffle(candidates, random);
        return candidates.get(0);
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
