package com.mtb.game.repository;

import com.mtb.game.domain.Task;
import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.domain.enums.TaskType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTypeAndIsActiveTrue(TaskType type);
    List<Task> findByEventTypeAndIsActiveTrue(TaskEventType eventType);
}
