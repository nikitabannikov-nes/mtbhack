package com.mtb.game.service;

import com.mtb.game.domain.Task;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserDailyTask;
import com.mtb.game.domain.UserTaskProgress;
import com.mtb.game.domain.enums.EnergyReason;
import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.domain.enums.TaskType;
import com.mtb.game.dto.response.ClaimTaskResponse;
import com.mtb.game.dto.response.TaskProgressResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.TaskRepository;
import com.mtb.game.repository.UserDailyTaskRepository;
import com.mtb.game.repository.UserTaskProgressRepository;
import com.mtb.game.util.PeriodKeyGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserTaskProgressRepository progressRepository;
    private final UserDailyTaskRepository dailyTaskRepository;
    private final EnergyService energyService;
    private final PeriodKeyGenerator periodKeyGenerator;

    private final Random random = new Random();

    @Transactional
    public void trackEvent(User user, TaskEventType eventType) {
        if (eventType == TaskEventType.REFERRAL_SIGNUP) {
            trackReferralEvent(user);
            return;
        }

        if (eventType == TaskEventType.LOGIN
                || eventType == TaskEventType.CREATE_ITEM
                || eventType == TaskEventType.MERGE
                || eventType == TaskEventType.SPEND
                || eventType == TaskEventType.TRANSFER) {
            trackDailyEvent(user, eventType);
        }

        List<Task> weeklyTasks = taskRepository.findByTypeAndIsActiveTrue(TaskType.WEEKLY).stream()
                .filter(t -> t.getEventType() == eventType)
                .toList();
        for (Task task : weeklyTasks) {
            String periodKey = periodKeyGenerator.generate(TaskType.WEEKLY);
            incrementProgress(user, task, periodKey);
        }
    }

    private void trackDailyEvent(User user, TaskEventType eventType) {
        LocalDate today = LocalDate.now();
        String periodKey = periodKeyGenerator.generate(TaskType.DAILY);

        List<Long> selectedTaskIds = getDailyTaskIds(user, today);

        List<Task> mandatoryTasks = taskRepository.findByMandatoryTrueAndIsActiveTrue().stream()
                .filter(t -> t.getEventType() == eventType)
                .toList();
        for (Task task : mandatoryTasks) {
            incrementProgress(user, task, periodKey);
        }

        taskRepository.findByTypeAndIsActiveTrue(TaskType.DAILY).stream()
                .filter(t -> !t.getMandatory() && t.getEventType() == eventType && selectedTaskIds.contains(t.getId()))
                .forEach(task -> incrementProgress(user, task, periodKey));
    }

    private void trackReferralEvent(User user) {
        getCurrentReferralTask(user).ifPresent(task -> {
            String periodKey = periodKeyGenerator.generate(TaskType.REFERRAL);
            incrementProgress(user, task, periodKey);
        });
    }

    private void incrementProgress(User user, Task task, String periodKey) {
        UserTaskProgress progress = progressRepository
                .findByUserIdAndTaskIdAndPeriodKey(user.getId(), task.getId(), periodKey)
                .orElseGet(() -> UserTaskProgress.builder()
                        .user(user).task(task).periodKey(periodKey)
                        .currentCount(0).completed(false).claimed(false)
                        .build());

        if (!Boolean.TRUE.equals(progress.getCompleted())) {
            progress.setCurrentCount(progress.getCurrentCount() + 1);
            if (progress.getCurrentCount() >= task.getTargetCount()) {
                progress.setCompleted(true);
            }
            progressRepository.save(progress);
        }
    }

    public List<TaskProgressResponse> getTasks(User user, TaskType type) {
        return switch (type) {
            case DAILY -> getDailyTasksWithProgress(user);
            case WEEKLY -> getWeeklyTasksWithProgress(user);
            case REFERRAL -> getReferralTaskWithProgress(user);
        };
    }

    private List<TaskProgressResponse> getDailyTasksWithProgress(User user) {
        LocalDate today = LocalDate.now();
        String periodKey = periodKeyGenerator.generate(TaskType.DAILY);

        List<Task> mandatoryTasks = taskRepository.findByMandatoryTrueAndIsActiveTrue();
        List<Long> selectedIds = getDailyTaskIds(user, today);
        List<Task> optionalTasks = taskRepository.findByTypeAndIsActiveTrue(TaskType.DAILY).stream()
                .filter(t -> !t.getMandatory() && selectedIds.contains(t.getId()))
                .toList();

        List<TaskProgressResponse> result = new ArrayList<>();
        for (Task task : mandatoryTasks) {
            result.add(toResponse(getOrEmptyProgress(user, task, periodKey), task));
        }
        for (Task task : optionalTasks) {
            result.add(toResponse(getOrEmptyProgress(user, task, periodKey), task));
        }
        return result;
    }

    private List<TaskProgressResponse> getWeeklyTasksWithProgress(User user) {
        String periodKey = periodKeyGenerator.generate(TaskType.WEEKLY);
        return taskRepository.findByTypeAndIsActiveTrue(TaskType.WEEKLY).stream()
                .map(task -> toResponse(getOrEmptyProgress(user, task, periodKey), task))
                .toList();
    }

    private List<TaskProgressResponse> getReferralTaskWithProgress(User user) {
        return getCurrentReferralTask(user).map(task -> {
            String periodKey = periodKeyGenerator.generate(TaskType.REFERRAL);
            return List.of(toResponse(getOrEmptyProgress(user, task, periodKey), task));
        }).orElse(List.of());
    }

    @Transactional
    public ClaimTaskResponse claim(User user, Long progressId) {
        UserTaskProgress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> ApiException.notFound("Task progress not found"));

        if (!progress.getUser().getId().equals(user.getId())) {
            throw ApiException.unauthorized("Not your task");
        }
        if (!Boolean.TRUE.equals(progress.getCompleted())) {
            throw ApiException.unprocessable("TASK_NOT_COMPLETED", "Task not yet completed");
        }
        if (Boolean.TRUE.equals(progress.getClaimed())) {
            throw ApiException.conflict("Reward already claimed");
        }

        progress.setClaimed(true);
        progressRepository.save(progress);

        Task task = progress.getTask();
        if (task.getType() == TaskType.REFERRAL && task.getNextTaskId() != null) {
            Task nextTask = taskRepository.findById(task.getNextTaskId())
                    .orElseThrow(() -> ApiException.notFound("Next referral task not found"));
            String periodKey = periodKeyGenerator.generate(TaskType.REFERRAL);
            progressRepository.save(UserTaskProgress.builder()
                    .user(user).task(nextTask).periodKey(periodKey)
                    .currentCount(0).completed(false).claimed(false)
                    .build());
        }

        var energyAfter = energyService.addEnergy(user, task.getEnergyReward(), EnergyReason.TASK);
        return new ClaimTaskResponse(task.getEnergyReward(), energyAfter);
    }

    // ── Daily task selection ──────────────────────────────────────────────────

    @Transactional
    public List<Long> getDailyTaskIds(User user, LocalDate date) {
        if (dailyTaskRepository.existsByUserIdAndDate(user.getId(), date)) {
            return dailyTaskRepository.findTaskIdsByUserIdAndDate(user.getId(), date);
        }
        return generateAndStoreDailySelection(user, date);
    }

    private List<Long> generateAndStoreDailySelection(User user, LocalDate date) {
        List<Task> pool = new ArrayList<>(
                taskRepository.findByTypeAndMandatoryFalseAndIsActiveTrue(TaskType.DAILY));
        Collections.shuffle(pool, random);

        List<Task> selected = new ArrayList<>();
        for (Task task : pool) {
            if (selected.size() == 2) break;
            boolean hasMerge  = selected.stream().anyMatch(t -> t.getEventType() == TaskEventType.MERGE);
            boolean hasCreate = selected.stream().anyMatch(t -> t.getEventType() == TaskEventType.CREATE_ITEM);
            if (task.getEventType() == TaskEventType.MERGE && hasCreate) continue;
            if (task.getEventType() == TaskEventType.CREATE_ITEM && hasMerge) continue;
            selected.add(task);
        }

        for (Task task : selected) {
            dailyTaskRepository.save(UserDailyTask.builder()
                    .user(user).task(task).date(date).build());
        }

        return selected.stream().map(Task::getId).toList();
    }

    // ── Referral chain ────────────────────────────────────────────────────────

    private Optional<Task> getCurrentReferralTask(User user) {
        List<Task> chain = taskRepository.findByTypeAndIsActiveTrueOrderByTargetCountAsc(TaskType.REFERRAL);
        String periodKey = periodKeyGenerator.generate(TaskType.REFERRAL);

        for (Task task : chain) {
            Optional<UserTaskProgress> progress = progressRepository
                    .findByUserIdAndTaskIdAndPeriodKey(user.getId(), task.getId(), periodKey);
            if (progress.isEmpty() || !Boolean.TRUE.equals(progress.get().getClaimed())) {
                return Optional.of(task);
            }
        }
        return Optional.empty();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private UserTaskProgress getOrEmptyProgress(User user, Task task, String periodKey) {
        return progressRepository
                .findByUserIdAndTaskIdAndPeriodKey(user.getId(), task.getId(), periodKey)
                .orElse(UserTaskProgress.builder()
                        .task(task).currentCount(0).completed(false).claimed(false).build());
    }

    private TaskProgressResponse toResponse(UserTaskProgress p, Task task) {
        return new TaskProgressResponse(
                p.getId(),
                task.getId(),
                task.getType(),
                task.getEventType(),
                task.getTitle(),
                task.getIcon(),
                task.getEnergyReward(),
                task.getTargetCount(),
                p.getCurrentCount(),
                Boolean.TRUE.equals(p.getCompleted()),
                Boolean.TRUE.equals(p.getClaimed())
        );
    }
}
