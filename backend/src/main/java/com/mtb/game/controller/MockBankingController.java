package com.mtb.game.controller;

import com.mtb.game.domain.User;
import com.mtb.game.dto.request.MockSpendRequest;
import com.mtb.game.dto.response.MockEventResponse;
import com.mtb.game.service.MockBankingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mock")
@RequiredArgsConstructor
public class MockBankingController {

    private final MockBankingService mockBankingService;

    @PostMapping("/spend")
    public MockEventResponse spend(@AuthenticationPrincipal User user,
                                    @Valid @RequestBody MockSpendRequest req) {
        return mockBankingService.mockSpend(user, req.amount());
    }

    @PostMapping("/transfer")
    public MockEventResponse transfer(@AuthenticationPrincipal User user,
                                       @Valid @RequestBody MockSpendRequest req) {
        return mockBankingService.mockTransfer(user, req.amount());
    }

    @PostMapping("/login")
    public MockEventResponse login(@AuthenticationPrincipal User user) {
        return mockBankingService.mockLogin(user);
    }
}
