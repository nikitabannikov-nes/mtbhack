package com.mtb.game.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "user_daily_tasks",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "task_id", "date"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDailyTask {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @Column(nullable = false)
    private LocalDate date;
}
