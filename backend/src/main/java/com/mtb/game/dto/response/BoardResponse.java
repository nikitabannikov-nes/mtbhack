package com.mtb.game.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record BoardResponse(
        List<GameItemResponse> items,
        BigDecimal energy,
        int maxEnergy
) {}
