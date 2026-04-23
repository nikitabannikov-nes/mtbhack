package com.mtb.game.config;

import com.mtb.game.domain.Category;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserCategory;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.repository.CategoryRepository;
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
    private final CategoryRepository categoryRepository;
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
                        .energy(new BigDecimal("7.0"))
                        .referralCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                        .build()));

        if (profile.getUsername() == null || profile.getUsername().isBlank()) {
            profile.setUsername(DEMO_USERNAME);
        }
        if (profile.getEnergy() == null) {
            profile.setEnergy(new BigDecimal("7.0"));
        }
        if (profile.getReferralCode() == null || profile.getReferralCode().isBlank()) {
            profile.setReferralCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        profileRepository.save(profile);

        if (userCategoryRepository.findByUserId(user.getId()).isEmpty()) {
            categoryRepository.findAllSorted().stream().findFirst().ifPresent(category ->
                    userCategoryRepository.save(UserCategory.builder()
                            .user(user)
                            .category(category)
                            .build())
            );
        }

        taskService.trackEvent(user, TaskEventType.LOGIN);
    }
}
