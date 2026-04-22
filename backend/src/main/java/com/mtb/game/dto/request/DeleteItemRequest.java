package com.mtb.game.dto.request;

import jakarta.validation.constraints.NotNull;

public record DeleteItemRequest(
        @NotNull Long itemId
) {}
