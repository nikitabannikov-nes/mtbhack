package com.mtb.game.repository;

import com.mtb.game.domain.GameConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GameConfigRepository extends JpaRepository<GameConfig, Long> {
    Optional<GameConfig> findByKey(String key);
}
