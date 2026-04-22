package com.mtb.game.dto.response;

import com.mtb.game.domain.enums.TaskType;

import java.math.BigDecimal;

public record TaskProgressResponse(
        Long progressId,
        Long taskId,
        TaskType type,
        String title,
        String icon,
        BigDecimal energyReward,
        int targetCount,
        int currentCount,
        boolean completed,
        boolean claimed
) {}
