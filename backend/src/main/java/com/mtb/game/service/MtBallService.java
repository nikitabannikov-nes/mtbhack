package com.mtb.game.service;

import com.mtb.game.domain.GameItem;
import com.mtb.game.domain.MtBallTransaction;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.enums.ItemStatus;
import com.mtb.game.domain.enums.Rarity;
import com.mtb.game.dto.response.MtBallBalanceResponse;
import com.mtb.game.dto.response.MtBallsResponse;
import com.mtb.game.dto.response.WithdrawResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.GameItemRepository;
import com.mtb.game.repository.MtBallTransactionRepository;
import com.mtb.game.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MtBallService {

    private final GameItemRepository gameItemRepository;
    private final UserProfileRepository profileRepository;
    private final MtBallTransactionRepository transactionRepository;

    private final Random random = new Random();

    @Transactional
    public MtBallsResponse takeMtBalls(User user, Long itemId) {
        GameItem item = gameItemRepository.findById(itemId)
                .orElseThrow(() -> ApiException.notFound("Item not found"));

        if (!item.getUser().getId().equals(user.getId())) {
            throw ApiException.unauthorized("Not your item");
        }
        if (item.getRarity() != Rarity.LEGENDARY) {
            throw ApiException.badRequest("Only LEGENDARY items can yield MT-balls");
        }
        if (item.getStatus() == ItemStatus.FROZEN) {
            throw ApiException.badRequest("Item is already activated");
        }

        BigDecimal amount = randomMtBalls();
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));

        profile.setMtBalls(profile.getMtBalls().add(amount));
        profileRepository.save(profile);

        transactionRepository.save(MtBallTransaction.builder()
                .user(user)
                .delta(amount)
                .reason("LEGENDARY item: " + item.getName())
                .build());

        gameItemRepository.delete(item);

        return new MtBallsResponse(amount, profile.getMtBalls());
    }

    @Transactional(readOnly = true)
    public MtBallBalanceResponse getBalance(User user) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));

        var transactions = transactionRepository.findTop20ByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(tx -> new MtBallBalanceResponse.TransactionItem(
                        tx.getId(),
                        tx.getDelta(),
                        tx.getReason(),
                        tx.getCreatedAt()
                ))
                .toList();

        return new MtBallBalanceResponse(profile.getMtBalls(), transactions);
    }

    @Transactional
    public WithdrawResponse withdraw(User user) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));

        if (profile.getMtBalls().compareTo(BigDecimal.ZERO) <= 0) {
            throw ApiException.unprocessable("NO_MT_BALLS", "No MT-balls available for withdrawal");
        }

        BigDecimal amount = profile.getMtBalls();
        profile.setMtBalls(BigDecimal.ZERO);
        profileRepository.save(profile);

        transactionRepository.save(MtBallTransaction.builder()
                .user(user)
                .delta(amount.negate())
                .reason("Withdrawal to bonus account")
                .build());

        return new WithdrawResponse(true, "MT-balls withdrawn successfully");
    }

    private BigDecimal randomMtBalls() {
        // Skewed toward 0.5: 70% chance of 0.5, 20% chance of 1.0, 7% of 1.5, 3% of 2.0
        double roll = random.nextDouble();
        if (roll < 0.70) return new BigDecimal("0.5");
        if (roll < 0.90) return new BigDecimal("1.0");
        if (roll < 0.97) return new BigDecimal("1.5");
        return new BigDecimal("2.0");
    }
}
