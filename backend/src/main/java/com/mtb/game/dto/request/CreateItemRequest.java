package com.mtb.game.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateItemRequest(
        @NotNull @Min(0) @Max(24) Integer boardPosition
) {}
