package com.mtb.game.dto.response;

import java.math.BigDecimal;

public record MtBallsResponse(
        BigDecimal gained,
        BigDecimal totalMtBalls
) {}
