package com.mtb.game.domain;

import com.mtb.game.domain.enums.EnergyReason;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "energy_transactions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class EnergyTransaction {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(precision = 5, scale = 1, nullable = false)
    private BigDecimal delta;

    @Enumerated(EnumType.STRING)
    private EnergyReason reason;

    private LocalDateTime createdAt;

    @PrePersist
    void prePersist() { createdAt = LocalDateTime.now(); }
}
