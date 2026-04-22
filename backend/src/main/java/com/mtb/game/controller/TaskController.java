package com.mtb.game.controller;

import com.mtb.game.domain.User;
import com.mtb.game.domain.enums.TaskType;
import com.mtb.game.dto.request.ClaimTaskRequest;
import com.mtb.game.dto.response.ClaimTaskResponse;
import com.mtb.game.dto.response.TaskProgressResponse;
import com.mtb.game.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskProgressResponse> getTasks(@AuthenticationPrincipal User user,
                                                @RequestParam(defaultValue = "DAILY") TaskType type) {
        return taskService.getTasks(user, type);
    }

    @PostMapping("/claim")
    public ClaimTaskResponse claimTask(@AuthenticationPrincipal User user,
                                        @Valid @RequestBody ClaimTaskRequest req) {
        return taskService.claim(user, req.taskProgressId());
    }
}
