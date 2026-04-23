package com.mtb.game.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UpdateCategoriesRequest(
        @NotNull List<String> categoryIds
) {}
