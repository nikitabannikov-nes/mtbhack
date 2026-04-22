package com.mtb.game.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "mock_event_log",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "event_type", "event_date"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MockEventLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String eventType;
    private LocalDate eventDate;

    @Builder.Default
    private Integer count = 0;
}
