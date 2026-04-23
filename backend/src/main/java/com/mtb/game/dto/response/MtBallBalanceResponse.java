package com.mtb.game.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record MtBallBalanceResponse(
        BigDecimal balance,
        List<TransactionItem> transactions
) {
    public record TransactionItem(
            Long id,
            BigDecimal delta,
            String reason,
            LocalDateTime createdAt
    ) {}
}
