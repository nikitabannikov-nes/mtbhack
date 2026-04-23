package com.mtb.game.controller;

import com.mtb.game.domain.User;
import com.mtb.game.dto.request.UpdateCategoriesRequest;
import com.mtb.game.dto.response.ProfileLevelResponse;
import com.mtb.game.dto.response.ProfileResponse;
import com.mtb.game.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ProfileResponse getProfile(@AuthenticationPrincipal User user) {
        return profileService.getProfile(user);
    }

    @GetMapping("/level")
    public ProfileLevelResponse getLevel(@AuthenticationPrincipal User user) {
        return profileService.getLevel(user);
    }

    @PutMapping("/categories")
    public ProfileResponse updateCategories(@AuthenticationPrincipal User user,
                                            @Valid @RequestBody UpdateCategoriesRequest req) {
        return profileService.updateCategories(user, req.categoryIds());
    }
}
