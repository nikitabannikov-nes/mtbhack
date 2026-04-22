package com.mtb.game.domain.enums;

public enum Rarity {
    DEFAULT, COMMON, RARE, EPIC, LEGENDARY;

    public Rarity next() {
        Rarity[] values = values();
        int idx = ordinal() + 1;
        return idx < values.length ? values[idx] : null;
    }
}
