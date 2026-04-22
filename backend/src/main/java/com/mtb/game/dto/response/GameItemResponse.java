package com.mtb.game.dto.response;

import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.BonusUnit;
import com.mtb.game.domain.enums.ItemStatus;
import com.mtb.game.domain.enums.Rarity;

import java.math.BigDecimal;
import java.time.Instant;

public record GameItemResponse(
        Long id,
        String categorySlug,
        Rarity rarity,
        String name,
        String icon,
        int boardPosition,
        ItemStatus status,
        BonusType bonusType,
        String bonusDescription,
        BigDecimal bonusValue,
        BonusUnit bonusUnit,
        String partnerName,
        Instant expiresAt,
        Instant createdAt
) {}
