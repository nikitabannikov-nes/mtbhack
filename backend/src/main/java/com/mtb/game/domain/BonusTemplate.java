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

    @Column(precision = 8, scale = 2)
    private BigDecimal valueMin;

    @Column(precision = 8, scale = 2)
    private BigDecimal valueMax;

    @Enumerated(EnumType.STRING)
    private BonusUnit unit;

    private Integer timerMinDays;
    private Integer timerMaxDays;

    @Column(length = 500)
    private String descriptionTemplate;

    private String partnerName;
    private String icon;
    private String itemName;
}
