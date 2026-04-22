package com.mtb.game.controller;

import com.mtb.game.domain.User;
import com.mtb.game.dto.response.ProfileResponse;
import com.mtb.game.service.ProfileService;
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
}
