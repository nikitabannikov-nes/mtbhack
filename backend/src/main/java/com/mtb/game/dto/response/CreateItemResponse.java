package com.mtb.game.dto.response;

import java.math.BigDecimal;

public record CreateItemResponse(
        GameItemResponse item,
        BigDecimal energyAfter
) {}
