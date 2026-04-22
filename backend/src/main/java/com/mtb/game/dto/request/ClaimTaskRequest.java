package com.mtb.game.dto.request;

import jakarta.validation.constraints.NotNull;

public record ClaimTaskRequest(
        @NotNull Long taskProgressId
) {}
