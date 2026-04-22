package com.mtb.game.util;

import com.mtb.game.domain.enums.TaskType;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

@Component
public class PeriodKeyGenerator {

    public String generate(TaskType type) {
        LocalDate today = LocalDate.now();
        return switch (type) {
            case DAILY -> today.toString();
            case WEEKLY -> today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).toString();
            case REFERRAL -> "all-time";
        };
    }
}
