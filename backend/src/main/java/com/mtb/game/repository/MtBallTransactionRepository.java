package com.mtb.game.repository;

import com.mtb.game.domain.MtBallTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MtBallTransactionRepository extends JpaRepository<MtBallTransaction, Long> {
    List<MtBallTransaction> findTop20ByUserIdOrderByCreatedAtDesc(Long userId);
}
