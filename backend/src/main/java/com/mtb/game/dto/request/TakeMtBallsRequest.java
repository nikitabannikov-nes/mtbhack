package com.mtb.game.dto.request;

import jakarta.validation.constraints.NotNull;

public record TakeMtBallsRequest(
        @NotNull Long itemId
) {}
