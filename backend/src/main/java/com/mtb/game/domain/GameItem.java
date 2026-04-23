package com.mtb.game.domain;

import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.BonusUnit;
import com.mtb.game.domain.enums.ItemStatus;
import com.mtb.game.domain.enums.Rarity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GameItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rarity rarity;

    private String name;

    @Column(name = "icon_path", length = 200)
    private String iconPath;

    @Column(nullable = false)
    private Integer boardPosition;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ItemStatus status = ItemStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private BonusType bonusType = BonusType.NONE;

    @Column(length = 500)
    private String description;

    @Column(precision = 8, scale = 2)
    private BigDecimal bonusValue;

    @Enumerated(EnumType.STRING)
    private BonusUnit bonusUnit;

    private String partnerName;

    private Integer timerDays;

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt;

    @PrePersist
    void prePersist() { createdAt = LocalDateTime.now(); }
}
