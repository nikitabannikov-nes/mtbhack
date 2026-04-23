package com.mtb.game.domain;

import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.BonusUnit;
import com.mtb.game.domain.enums.Rarity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "bonus_templates")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BonusTemplate {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rarity rarity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BonusType bonusType;

    @Column(precision = 8, scale = 2, nullable = false)
    private BigDecimal value;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BonusUnit unit;

    @Column(nullable = false)
    private Integer timerDays;

    @Column(length = 500)
    private String description;

    private String partnerName;

    @Column(name = "icon_path", length = 200)
    private String iconPath;

    private String itemName;
}
