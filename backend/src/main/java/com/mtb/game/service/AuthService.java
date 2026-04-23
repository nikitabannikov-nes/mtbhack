package com.mtb.game.service;

import com.mtb.game.config.JwtService;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.dto.request.LoginRequest;
import com.mtb.game.dto.request.RegisterRequest;
import com.mtb.game.dto.response.AuthResponse;
import com.mtb.game.dto.response.ProfileResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.UserCategoryRepository;
import com.mtb.game.repository.UserProfileRepository;
import com.mtb.game.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserProfileRepository profileRepository;
    private final UserCategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TaskService taskService;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw ApiException.conflict("Email already registered");
        }

        User user = User.builder()
                .email(req.email())
                .passwordHash(passwordEncoder.encode(req.password()))
                .build();
        user = userRepository.save(user);

        UserProfile profile = UserProfile.builder()
                .user(user)
                .username(req.username())
                .energy(new BigDecimal("7.0"))
                .referralCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .build();
        profileRepository.save(profile);
        taskService.trackEvent(user, TaskEventType.LOGIN);

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token, buildProfileResponse(user, profile, List.of()));
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> ApiException.unauthorized("Invalid credentials"));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw ApiException.unauthorized("Invalid credentials");
        }

        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));

        List<String> categories = categoryRepository.findSlugsByUserId(user.getId());
        taskService.trackEvent(user, TaskEventType.LOGIN);
        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token, buildProfileResponse(user, profile, categories));
    }

    private ProfileResponse buildProfileResponse(User user, UserProfile profile, List<String> categories) {
        return new ProfileResponse(
                user.getId(),
                user.getEmail(),
                profile.getUsername(),
                profile.getEnergy(),
                profile.getMaxEnergy(),
                profile.getMtBalls(),
                profile.getPlayerLevel(),
                profile.getMonthlySpend(),
                profile.getReferralCode(),
                categories
        );
    }
}
