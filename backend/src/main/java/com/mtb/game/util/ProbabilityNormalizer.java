package com.mtb.game.util;

import com.mtb.game.domain.enums.Rarity;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;

@Component
public class ProbabilityNormalizer {

    public NavigableMap<Double, Rarity> buildCumulativeMap(Map<String, Double> rawProbabilities) {
        double total = rawProbabilities.values().stream().mapToDouble(Double::doubleValue).sum();
        NavigableMap<Double, Rarity> cumulativeMap = new TreeMap<>();
        double cumulative = 0.0;
        for (Rarity rarity : Rarity.values()) {
            Double weight = rawProbabilities.get(rarity.name());
            if (weight != null && weight > 0) {
                cumulative += weight / total;
                cumulativeMap.put(cumulative, rarity);
            }
        }
        return cumulativeMap;
    }

    public Rarity pick(NavigableMap<Double, Rarity> cumulativeMap, double random) {
        Map.Entry<Double, Rarity> entry = cumulativeMap.ceilingEntry(random);
        return entry != null ? entry.getValue() : cumulativeMap.lastEntry().getValue();
    }
}
