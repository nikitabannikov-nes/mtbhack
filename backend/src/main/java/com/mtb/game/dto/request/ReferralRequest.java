package com.mtb.game.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ReferralRequest(
        @NotBlank String referralCode
) {}
