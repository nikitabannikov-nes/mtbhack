package com.mtb.game.repository;

import com.mtb.game.domain.MockEventLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface MockEventLogRepository extends JpaRepository<MockEventLog, Long> {
    Optional<MockEventLog> findByUserIdAndEventTypeAndEventDate(Long userId, String eventType, LocalDate date);
}
