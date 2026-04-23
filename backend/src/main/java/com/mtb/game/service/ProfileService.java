package com.mtb.game.service;

import com.mtb.game.domain.User;
import com.mtb.game.domain.UserCategory;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.Category;
import com.mtb.game.dto.response.ProfileResponse;
import com.mtb.game.dto.response.ProfileLevelResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.CategoryRepository;
import com.mtb.game.repository.UserCategoryRepository;
import com.mtb.game.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedHashSet;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserProfileRepository profileRepository;
    private final UserCategoryRepository categoryRepository;
    private final CategoryRepository categoryRepositoryRef;

    public ProfileResponse getProfile(User user) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));
        applyProgression(profile);
        profileRepository.save(profile);
        List<String> categories = categoryRepository.findSlugsByUserId(user.getId());
        return toResponse(user, profile, categories);
    }

    @Transactional
    public ProfileResponse updateCategories(User user, List<String> categorySlugs) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));
        applyProgression(profile);

        List<String> uniqueCategorySlugs = new ArrayList<>(new LinkedHashSet<>(categorySlugs));
        if (uniqueCategorySlugs.size() != categorySlugs.size()) {
            throw ApiException.badRequest("Duplicate categories are not allowed");
        }

        if (uniqueCategorySlugs.size() > profile.getPlayerLevel()) {
            throw ApiException.unprocessable("CATEGORY_LIMIT_EXCEEDED", "Too many categories for current level");
        }

        List<Category> categories = uniqueCategorySlugs.isEmpty()
                ? List.of()
                : categoryRepositoryRef.findBySlugIn(uniqueCategorySlugs);
        if (categories.size() != uniqueCategorySlugs.size()) {
            throw ApiException.badRequest("One or more categories are invalid");
        }

        categoryRepository.deleteByUserId(user.getId());
        for (Category category : categories) {
            categoryRepository.save(UserCategory.builder()
                    .user(user)
                    .category(category)
                    .build());
        }

        return toResponse(user, profile, categoryRepository.findSlugsByUserId(user.getId()));
    }

    public ProfileLevelResponse getLevel(User user) {
        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));
        applyProgression(profile);
        profileRepository.save(profile);

        BigDecimal spendRequired = switch (profile.getPlayerLevel()) {
            case 1 -> new BigDecimal("500");
            case 2 -> new BigDecimal("1500");
            case 3 -> new BigDecimal("3000");
            default -> profile.getMonthlySpend();
        };

        return new ProfileLevelResponse(
                profile.getPlayerLevel(),
                spendRequired,
                profile.getMonthlySpend(),
                profile.getPlayerLevel(),
                profile.getMaxEnergy()
        );
    }

    public void applyProgression(UserProfile profile) {
        BigDecimal spend = profile.getMonthlySpend() != null ? profile.getMonthlySpend() : BigDecimal.ZERO;

        int level;
        int maxEnergy;
        if (spend.compareTo(new BigDecimal("3000")) >= 0) {
            level = 4;
            maxEnergy = 15;
        } else if (spend.compareTo(new BigDecimal("1500")) >= 0) {
            level = 3;
            maxEnergy = 12;
        } else if (spend.compareTo(new BigDecimal("500")) >= 0) {
            level = 2;
            maxEnergy = 10;
        } else {
            level = 1;
            maxEnergy = 7;
        }

        profile.setPlayerLevel(level);
        profile.setMaxEnergy(maxEnergy);
        if (profile.getEnergy() != null && profile.getEnergy().compareTo(BigDecimal.valueOf(maxEnergy)) > 0) {
            profile.setEnergy(BigDecimal.valueOf(maxEnergy));
        }
    }

    public ProfileResponse toResponse(User user, UserProfile p, List<String> categories) {
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
