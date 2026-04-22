package com.mtb.game.service;

import com.mtb.game.domain.EnergyTransaction;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.enums.EnergyReason;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.EnergyTransactionRepository;
import com.mtb.game.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class EnergyService {

    private final UserProfileRepository profileRepository;
    private final EnergyTransactionRepository transactionRepository;

    @Transactional
    public BigDecimal addEnergy(User user, BigDecimal delta, EnergyReason reason) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));

        BigDecimal newEnergy = profile.getEnergy().add(delta);
        BigDecimal max = BigDecimal.valueOf(profile.getMaxEnergy());
        if (newEnergy.compareTo(max) > 0) newEnergy = max;
        if (newEnergy.compareTo(BigDecimal.ZERO) < 0) newEnergy = BigDecimal.ZERO;

        profile.setEnergy(newEnergy);
        profileRepository.save(profile);

        transactionRepository.save(EnergyTransaction.builder()
                .user(user)
                .delta(delta)
                .reason(reason)
                .build());

        return newEnergy;
    }

    @Transactional
    public BigDecimal spendEnergy(User user, BigDecimal cost) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));

        if (profile.getEnergy().compareTo(cost) < 0) {
            throw ApiException.unprocessable("INSUFFICIENT_ENERGY", "Not enough energy");
        }

        return addEnergy(user, cost.negate(), EnergyReason.CREATE_ITEM);
    }
}
