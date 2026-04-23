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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.IntStream;

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
        deleteExpiredItems(user);
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

    @Transactional(readOnly = true)
    public Optional<Integer> findRandomEmptyPosition(User user) {
        var occupied = gameItemRepository.findByUserId(user.getId()).stream()
                .map(GameItem::getBoardPosition)
                .collect(java.util.stream.Collectors.toSet());
        List<Integer> available = IntStream.range(0, gameProperties.getGame().getBoardSize())
                .filter(pos -> !occupied.contains(pos))
                .boxed()
                .toList();
        if (available.isEmpty()) return Optional.empty();
        return Optional.of(available.get(random.nextInt(available.size())));
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getEnergy(User user) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));
        return Map.of("energy", profile.getEnergy(), "maxEnergy", profile.getMaxEnergy());
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

        int days = item.getTimerDays() != null ? item.getTimerDays() : 7;
        item.setStatus(ItemStatus.FROZEN);
        item.setExpiresAt(LocalDateTime.now().plusDays(days));
        gameItemRepository.save(item);

        return toResponse(item);
    }

    @Transactional
    public BoardResponse moveItem(User user, Long sourceItemId, int targetPosition) {
        GameItem source = getOwnedItem(user, sourceItemId);
        if (source.getStatus() == ItemStatus.FROZEN) {
            throw ApiException.badRequest("Cannot move a frozen item");
        }

        var occupantOpt = gameItemRepository.findByUserIdAndBoardPosition(user.getId(), targetPosition);
        if (occupantOpt.isPresent()) {
            GameItem occupant = occupantOpt.get();
            if (occupant.getId().equals(source.getId())) return getBoard(user);
            if (occupant.getStatus() == ItemStatus.FROZEN) {
                throw ApiException.badRequest("Cannot swap with a frozen item");
            }
            int originalPosition = source.getBoardPosition();
            source.setBoardPosition(targetPosition);
            occupant.setBoardPosition(originalPosition);
            gameItemRepository.save(source);
            gameItemRepository.save(occupant);
        } else {
            source.setBoardPosition(targetPosition);
            gameItemRepository.save(source);
        }

        return getBoard(user);
    }

    @Transactional
    public BigDecimal deleteItem(User user, Long itemId) {
        GameItem item = getOwnedItem(user, itemId);

        if (item.getStatus() == ItemStatus.FROZEN) {
            throw ApiException.badRequest("Cannot delete a frozen (activated) item");
        }

        gameItemRepository.delete(item);
        BigDecimal refund = BigDecimal.valueOf(gameProperties.getGame().getItemDeleteEnergyRefund());
        return energyService.addEnergy(user, refund, EnergyReason.DELETE_ITEM);
    }

    private void deleteExpiredItems(User user) {
        List<GameItem> expired = gameItemRepository.findExpiredFrozen(user.getId(), LocalDateTime.now());
        if (!expired.isEmpty()) {
            gameItemRepository.deleteAll(expired);
        }
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
                item.getIconPath(),
                item.getBoardPosition(),
                item.getStatus(),
                item.getBonusType(),
                item.getDescription(),
                item.getBonusValue(),
                item.getBonusUnit(),
                item.getPartnerName(),
                item.getTimerDays(),
                item.getExpiresAt(),
                item.getCreatedAt()
        );
    }
}
