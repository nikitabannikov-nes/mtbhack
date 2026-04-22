package com.mtb.game.dto.response;

public record AuthResponse(
        String token,
        ProfileResponse profile
) {}
