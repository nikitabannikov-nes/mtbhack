package com.mtb.game.controller;

import com.mtb.game.dto.request.LoginRequest;
import com.mtb.game.dto.request.RegisterRequest;
import com.mtb.game.dto.response.AuthResponse;
import com.mtb.game.dto.response.ProfileResponse;
import com.mtb.game.service.AuthService;
import com.mtb.game.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.mtb.game.domain.User;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/me")
    public ProfileResponse me(@AuthenticationPrincipal User user) {
        return profileService.getProfile(user);
    }
}
