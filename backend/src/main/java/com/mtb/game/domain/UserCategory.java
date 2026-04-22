package com.mtb.game.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_categories",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "category_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserCategory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private LocalDateTime selectedAt;

    @PrePersist
    void prePersist() { selectedAt = LocalDateTime.now(); }
}
