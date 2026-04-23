package com.mtb.game.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record ProfileResponse(
        Long userId,
        String email,
        String username,
        BigDecimal energy,
        int maxEnergy,
        BigDecimal mtBalls,
        int playerLevel,
        BigDecimal monthlySpend,
        String referralCode,
        List<String> categories,
        List<String> availableCategories,
        String categoriesLockedUntil
) {}
