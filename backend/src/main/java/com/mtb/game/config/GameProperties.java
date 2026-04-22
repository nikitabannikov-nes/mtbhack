package com.mtb.game.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@ConfigurationProperties(prefix = "app")
@Data
public class GameProperties {

    private GameConfig game = new GameConfig();
    private Map<String, Double> rarityProbabilities = new HashMap<>();
    private MockConfig mock = new MockConfig();
    private CorsConfig cors = new CorsConfig();

    @Data
    public static class GameConfig {
        private int boardSize = 25;
        private double itemDeleteEnergyRefund = 0.5;
    }

    @Data
    public static class MockConfig {
        private int dailyEventCap = 5;
    }

    @Data
    public static class CorsConfig {
        private String allowedOrigins = "http://localhost:3000";
    }
}
