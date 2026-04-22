package com.mtb.game.service;

import com.mtb.game.config.GameProperties;
import com.mtb.game.domain.GameItem;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.enums.EnergyReason;
import com.mtb.game.domain.enums.ItemStatus;
import com.mtb.game.domain.enums.Rarity;
import com.mtb.game.dto.response.BoardResponse;
import com.mtb.game.dto.response.CreateItemResponse;
import com.mtb.game.dto.response.GameItemResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.GameItemRepository;
import com.mtb.game.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameItemRepository gameItemRepository;
    private final UserProfileRepository profileRepository;
    private final ItemGenerationService itemGenerationService;
    private final EnergyService energyService;
    private final TaskService taskService;
    private final GameProperties gameProperties;

    private final Random random = new Random();

    @Transactional
    public BoardResponse getBoard(User user) {
        cleanExpiredItems(user);
        List<GameItem> items = gameItemRepository.findByUserId(user.getId());
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));
        return new BoardResponse(
                items.stream().map(this::toResponse).toList(),
                profile.getEnergy(),
                profile.getMaxEnergy()
        );
    }

    @Transactional
    public CreateItemResponse createItem(User user, int boardPosition) {
        if (gameItemRepository.findByUserIdAndBoardPosition(user.getId(), boardPosition).isPresent()) {
            throw ApiException.conflict("Cell is already occupied");
        }

        BigDecimal energyAfter = energyService.spendEnergy(user, BigDecimal.ONE);

        GameItem item = itemGenerationService.generateItem(user, boardPosition);
        item = gameItemRepository.save(item);

        taskService.trackEvent(user, com.mtb.game.domain.enums.TaskEventType.CREATE_ITEM);

        return new CreateItemResponse(toResponse(item), energyAfter);
    }

    @Transactional
    public GameItemResponse activateItem(User user, Long itemId) {
        GameItem item = getOwnedItem(user, itemId);

        if (item.getStatus() == ItemStatus.FROZEN) {
            throw ApiException.conflict("Item is already activated");
        }
        if (item.getRarity() == Rarity.DEFAULT) {
            throw ApiException.badRequest("DEFAULT items cannot be activated");
        }

        int minDays = item.getTimerMinDays() != null ? item.getTimerMinDays() : 1;
        int maxDays = item.getTimerMaxDays() != null ? item.getTimerMaxDays() : 3;
        int days = minDays + (maxDays > minDays ? random.nextInt(maxDays - minDays + 1) : 0);

        item.setStatus(ItemStatus.FROZEN);
        item.setExpiresAt(Instant.now().plus(days, ChronoUnit.DAYS));
        gameItemRepository.save(item);

        return toResponse(item);
    }

    @Transactional
    public BigDecimal deleteItem(User user, Long itemId) {
        GameItem item = getOwnedItem(user, itemId);

        if (item.getStatus() == ItemStatus.FROZEN) {
            throw ApiException.badRequest("Cannot delete a frozen (activated) item");
        }

        gameItemRepository.delete(item);
        BigDecimal refund = BigDecimal.valueOf(
                gameProperties.getGame().getItemDeleteEnergyRefund());
        return energyService.addEnergy(user, refund, EnergyReason.DELETE_ITEM);
    }

    private void cleanExpiredItems(User user) {
        List<GameItem> expired = gameItemRepository.findExpiredFrozen(user.getId(), Instant.now());
        expired.forEach(item -> {
            item.setStatus(ItemStatus.ACTIVE);
            item.setExpiresAt(null);
        });
        gameItemRepository.saveAll(expired);
    }

    private GameItem getOwnedItem(User user, Long itemId) {
        GameItem item = gameItemRepository.findById(itemId)
                .orElseThrow(() -> ApiException.notFound("Item not found"));
        if (!item.getUser().getId().equals(user.getId())) {
            throw ApiException.unauthorized("Not your item");
        }
        return item;
    }

    public GameItemResponse toResponse(GameItem item) {
        return new GameItemResponse(
                item.getId(),
                item.getCategory().getSlug(),
                item.getRarity(),
                item.getName(),
                item.getIcon(),
                item.getBoardPosition(),
                item.getStatus(),
                item.getBonusType(),
                item.getBonusDescription(),
                item.getBonusValue(),
                item.getBonusUnit(),
                item.getPartnerName(),
                item.getExpiresAt(),
                item.getCreatedAt()
        );
    }
}
