package com.mtb.game.dto.response;

import java.math.BigDecimal;

public record ClaimTaskResponse(
        BigDecimal energyGained,
        BigDecimal energyAfter
) {}
