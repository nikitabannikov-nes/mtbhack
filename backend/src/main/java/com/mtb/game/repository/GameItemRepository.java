package com.mtb.game.repository;

import com.mtb.game.domain.GameItem;
import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface GameItemRepository extends JpaRepository<GameItem, Long> {

    List<GameItem> findByUserId(Long userId);

    Optional<GameItem> findByUserIdAndBoardPosition(Long userId, int boardPosition);

    @Query("SELECT gi.bonusType FROM GameItem gi WHERE gi.user.id = :userId AND gi.status = 'FROZEN' AND (gi.expiresAt IS NULL OR gi.expiresAt > :now)")
    List<BonusType> findActiveBonusTypes(Long userId, LocalDateTime now);

    @Query("SELECT gi FROM GameItem gi WHERE gi.status = 'FROZEN' AND gi.expiresAt IS NOT NULL AND gi.expiresAt <= :now")
    List<GameItem> findExpiredFrozen(LocalDateTime now);

    int countByUserId(Long userId);
}
