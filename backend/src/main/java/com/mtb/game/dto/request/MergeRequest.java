package com.mtb.game.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record MergeRequest(
        @NotNull Long sourceItemId,
        @NotNull Long targetItemId,
        @NotNull @Min(0) @Max(24) Integer targetPosition
) {}
