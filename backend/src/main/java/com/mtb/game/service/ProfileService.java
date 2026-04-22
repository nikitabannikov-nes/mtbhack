package com.mtb.game.service;

import com.mtb.game.domain.User;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.dto.response.ProfileResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.UserCategoryRepository;
import com.mtb.game.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserProfileRepository profileRepository;
    private final UserCategoryRepository categoryRepository;

    public ProfileResponse getProfile(User user) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));
        List<String> categories = categoryRepository.findSlugsByUserId(user.getId());
        return toResponse(user, profile, categories);
    }

    private ProfileResponse toResponse(User user, UserProfile p, List<String> categories) {
        return new ProfileResponse(
                user.getId(),
                user.getEmail(),
                p.getUsername(),
                p.getEnergy(),
                p.getMaxEnergy(),
                p.getMtBalls(),
                p.getPlayerLevel(),
                p.getMonthlySpend(),
                p.getReferralCode(),
                categories
        );
    }
}
