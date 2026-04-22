package com.mtb.game.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_task_progress",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "task_id", "period_key"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserTaskProgress {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @Builder.Default
    private Integer currentCount = 0;

    @Builder.Default
    private Boolean completed = false;

    @Builder.Default
    private Boolean claimed = false;

    private String periodKey;
}
