package com.mtb.game.repository;

import com.mtb.game.domain.UserTaskProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface UserTaskProgressRepository extends JpaRepository<UserTaskProgress, Long> {

    Optional<UserTaskProgress> findByUserIdAndTaskIdAndPeriodKey(Long userId, Long taskId, String periodKey);

    @Query("SELECT p FROM UserTaskProgress p JOIN p.task t WHERE p.user.id = :userId AND t.type = :#{#type.name()} AND (p.periodKey = :periodKey OR t.type = 'REFERRAL')")
    List<UserTaskProgress> findByUserAndTypeAndPeriod(Long userId, com.mtb.game.domain.enums.TaskType type, String periodKey);
}
