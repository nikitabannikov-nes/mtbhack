package com.mtb.game.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserProfile {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String username;

    @Column(precision = 5, scale = 1)
    @Builder.Default
    private BigDecimal energy = BigDecimal.ZERO;

    @Builder.Default
    private Integer maxEnergy = 7;

    @Column(precision = 10, scale = 1)
    @Builder.Default
    private BigDecimal mtBalls = BigDecimal.ZERO;

    @Builder.Default
    private Integer playerLevel = 1;

    @Column(precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal monthlySpend = BigDecimal.ZERO;

    @Column(unique = true)
    private String referralCode;

    private LocalDateTime updatedAt;

    @PrePersist @PreUpdate
    void onUpdate() { updatedAt = LocalDateTime.now(); }
}
