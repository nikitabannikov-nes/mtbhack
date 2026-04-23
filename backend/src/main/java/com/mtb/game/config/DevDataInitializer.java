package com.mtb.game.config;

import com.mtb.game.domain.User;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.repository.UserCategoryRepository;
import com.mtb.game.repository.UserProfileRepository;
import com.mtb.game.repository.UserRepository;
import com.mtb.game.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.UUID;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class DevDataInitializer implements CommandLineRunner {

    private static final String DEMO_EMAIL = "demo@mtb.local";
    private static final String DEMO_PASSWORD = "demo123";
    private static final String DEMO_USERNAME = "Demo Player";

    private final UserRepository userRepository;
    private final UserProfileRepository profileRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final TaskService taskService;

    @Override
    public void run(String... args) {
        User user = userRepository.findByEmail(DEMO_EMAIL)
                .orElseGet(() -> userRepository.save(User.builder()
                        .email(DEMO_EMAIL)
                        .passwordHash(passwordEncoder.encode(DEMO_PASSWORD))
                        .build()));

        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> profileRepository.save(UserProfile.builder()
                        .user(user)
                        .username(DEMO_USERNAME)
                        .energy(new BigDecimal("20.0"))
                        .maxEnergy(20)
                        .playerLevel(2)
                        .monthlySpend(new BigDecimal("700.00"))
                        .referralCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                        .build()));

        if (profile.getUsername() == null || profile.getUsername().isBlank()) {
            profile.setUsername(DEMO_USERNAME);
        }
        if (profile.getEnergy() == null || profile.getEnergy().compareTo(new BigDecimal("20.0")) < 0) {
            profile.setEnergy(new BigDecimal("20.0"));
        }
        profile.setMaxEnergy(20);
        profile.setPlayerLevel(2);
        if (profile.getReferralCode() == null || profile.getReferralCode().isBlank()) {
            profile.setReferralCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        profile.setMonthlySpend(new BigDecimal("700.00"));
        profileRepository.save(profile);

        if (profile.getCategoriesChangedAt() == null && !userCategoryRepository.findByUserId(user.getId()).isEmpty()) {
            userCategoryRepository.deleteByUserId(user.getId());
        }

        taskService.trackEvent(user, TaskEventType.LOGIN);
    }
}
