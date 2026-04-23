package com.mtb.game.repository;

import com.mtb.game.domain.UserDailyTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface UserDailyTaskRepository extends JpaRepository<UserDailyTask, Long> {

    @Query("SELECT udt.task.id FROM UserDailyTask udt WHERE udt.user.id = :userId AND udt.date = :date")
    List<Long> findTaskIdsByUserIdAndDate(Long userId, LocalDate date);

    boolean existsByUserIdAndDate(Long userId, LocalDate date);
}
