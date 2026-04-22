package com.mtb.game.repository;

import com.mtb.game.domain.EnergyTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnergyTransactionRepository extends JpaRepository<EnergyTransaction, Long> {}
