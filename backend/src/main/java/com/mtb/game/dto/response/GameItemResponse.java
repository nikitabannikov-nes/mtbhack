package com.mtb.game.dto.response;

import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.BonusUnit;
import com.mtb.game.domain.enums.ItemStatus;
import com.mtb.game.domain.enums.Rarity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record GameItemResponse(
        Long id,
        String categorySlug,
        Rarity rarity,
        String name,
        String iconPath,
        int boardPosition,
        ItemStatus status,
        BonusType bonusType,
        String description,
        BigDecimal bonusValue,
        BonusUnit bonusUnit,
        String partnerName,
        Integer timerDays,
        LocalDateTime expiresAt,
        LocalDateTime createdAt
) {}
