package com.mtb.game.domain;

import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.domain.enums.TaskType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tasks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Task {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskEventType eventType;

    @Column(nullable = false)
    private String title;

    private String icon;

    @Column(precision = 5, scale = 1, nullable = false)
    private BigDecimal energyReward;

    @Builder.Default
    private Integer targetCount = 1;

    @Builder.Default
    private Boolean isActive = true;
}
