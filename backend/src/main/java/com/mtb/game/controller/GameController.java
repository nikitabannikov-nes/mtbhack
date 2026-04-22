package com.mtb.game.controller;

import com.mtb.game.domain.User;
import com.mtb.game.dto.request.ActivateItemRequest;
import com.mtb.game.dto.request.CreateItemRequest;
import com.mtb.game.dto.request.DeleteItemRequest;
import com.mtb.game.dto.request.MergeRequest;
import com.mtb.game.dto.response.BoardResponse;
import com.mtb.game.dto.response.CreateItemResponse;
import com.mtb.game.dto.response.GameItemResponse;
import com.mtb.game.service.GameService;
import com.mtb.game.service.MergeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final MergeService mergeService;

    @GetMapping("/board")
    public BoardResponse getBoard(@AuthenticationPrincipal User user) {
        return gameService.getBoard(user);
    }

    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public CreateItemResponse createItem(@AuthenticationPrincipal User user,
                                         @Valid @RequestBody CreateItemRequest req) {
        return gameService.createItem(user, req.boardPosition());
    }

    @PostMapping("/items/merge")
    public GameItemResponse merge(@AuthenticationPrincipal User user,
                                   @Valid @RequestBody MergeRequest req) {
        return mergeService.merge(user, req.sourceItemId(), req.targetItemId(), req.targetPosition());
    }

    @PostMapping("/items/activate")
    public GameItemResponse activate(@AuthenticationPrincipal User user,
                                      @Valid @RequestBody ActivateItemRequest req) {
        return gameService.activateItem(user, req.itemId());
    }

    @DeleteMapping("/items")
    public Map<String, Object> deleteItem(@AuthenticationPrincipal User user,
                                           @Valid @RequestBody DeleteItemRequest req) {
        BigDecimal energyAfter = gameService.deleteItem(user, req.itemId());
        return Map.of("energyAfter", energyAfter);
    }
}
