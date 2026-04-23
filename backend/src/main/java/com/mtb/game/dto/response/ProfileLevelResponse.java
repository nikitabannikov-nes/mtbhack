package com.mtb.game.dto.response;

import java.math.BigDecimal;

public record ProfileLevelResponse(
        int level,
        BigDecimal spendRequired,
        BigDecimal spendCurrent,
        int categorySlots,
        int maxEnergy
) {}
