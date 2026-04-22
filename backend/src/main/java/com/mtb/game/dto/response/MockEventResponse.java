package com.mtb.game.dto.response;

public record MockEventResponse(
        String eventType,
        int eventsToday,
        int dailyCap
) {}
