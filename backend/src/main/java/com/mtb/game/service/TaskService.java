package com.mtb.game.service;

import com.mtb.game.domain.Task;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserTaskProgress;
import com.mtb.game.domain.enums.EnergyReason;
import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.domain.enums.TaskType;
import com.mtb.game.dto.response.ClaimTaskResponse;
import com.mtb.game.dto.response.TaskProgressResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.TaskRepository;
import com.mtb.game.repository.UserTaskProgressRepository;
import com.mtb.game.util.PeriodKeyGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserTaskProgressRepository progressRepository;
    private final EnergyService energyService;
    private final PeriodKeyGenerator periodKeyGenerator;

    @Transactional
    public void trackEvent(User user, TaskEventType eventType) {
        List<Task> tasks = taskRepository.findByEventTypeAndIsActiveTrue(eventType);
        for (Task task : tasks) {
            String periodKey = periodKeyGenerator.generate(task.getType());
            UserTaskProgress progress = progressRepository
                    .findByUserIdAndTaskIdAndPeriodKey(user.getId(), task.getId(), periodKey)
                    .orElseGet(() -> UserTaskProgress.builder()
                            .user(user)
                            .task(task)
                            .periodKey(periodKey)
                            .currentCount(0)
                            .completed(false)
                            .claimed(false)
                            .build());

            if (!isCompleted(progress)) {
                progress.setCurrentCount(progress.getCurrentCount() + 1);
                if (progress.getCurrentCount() >= task.getTargetCount()) {
                    progress.setCompleted(true);
                }
                progressRepository.save(progress);
            }
        }
    }

    public List<TaskProgressResponse> getTasks(User user, TaskType type) {
        String periodKey = periodKeyGenerator.generate(type);
        List<Task> tasks = taskRepository.findByTypeAndIsActiveTrue(type);

        return tasks.stream().map(task -> {
            UserTaskProgress progress = progressRepository
                    .findByUserIdAndTaskIdAndPeriodKey(user.getId(), task.getId(), periodKey)
                    .orElse(UserTaskProgress.builder()
                            .task(task)
                            .currentCount(0)
                            .completed(false)
                            .claimed(false)
                            .build());
            return toResponse(progress, task);
        }).toList();
    }

    @Transactional
    public ClaimTaskResponse claim(User user, Long progressId) {
        UserTaskProgress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> ApiException.notFound("Task progress not found"));

        if (!progress.getUser().getId().equals(user.getId())) {
            throw ApiException.unauthorized("Not your task");
        }
        if (!isCompleted(progress)) {
            throw ApiException.unprocessable("TASK_NOT_COMPLETED", "Task not yet completed");
        }
        if (isClaimed(progress)) {
            throw ApiException.conflict("Reward already claimed");
        }

        progress.setClaimed(true);
        progressRepository.save(progress);

        var energyAfter = energyService.addEnergy(user, progress.getTask().getEnergyReward(), EnergyReason.TASK);
        return new ClaimTaskResponse(progress.getTask().getEnergyReward(), energyAfter);
    }

    private TaskProgressResponse toResponse(UserTaskProgress p, Task task) {
        Long progressId = p.getId();
        return new TaskProgressResponse(
                progressId,
                task.getId(),
                task.getType(),
                task.getEventType(),
                task.getTitle(),
                task.getIcon(),
                task.getEnergyReward(),
                task.getTargetCount(),
                p.getCurrentCount(),
                isCompleted(p),
                isClaimed(p)
        );
    }

    private boolean isCompleted(UserTaskProgress progress) {
        return Boolean.TRUE.equals(progress.getCompleted());
    }

    private boolean isClaimed(UserTaskProgress progress) {
        return Boolean.TRUE.equals(progress.getClaimed());
    }
}
