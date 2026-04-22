package com.mtb.game.controller;

import com.mtb.game.domain.User;
import com.mtb.game.dto.request.TakeMtBallsRequest;
import com.mtb.game.dto.response.MtBallsResponse;
import com.mtb.game.service.MtBallService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mt-balls")
@RequiredArgsConstructor
public class MtBallController {

    private final MtBallService mtBallService;

    @PostMapping("/take")
    public MtBallsResponse takeMtBalls(@AuthenticationPrincipal User user,
                                        @Valid @RequestBody TakeMtBallsRequest req) {
        return mtBallService.takeMtBalls(user, req.itemId());
    }
}
