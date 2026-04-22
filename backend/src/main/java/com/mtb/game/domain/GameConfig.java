package com.mtb.game.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "game_config")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GameConfig {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "config_key", unique = true, nullable = false)
    private String key;

    @Column(name = "config_value", nullable = false)
    private String value;

    private String description;
}
