package com.mtb.game.repository;

import com.mtb.game.domain.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {
    List<UserCategory> findByUserId(Long userId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("DELETE FROM UserCategory uc WHERE uc.user.id = :userId")
    void deleteByUserId(Long userId);

    @Query("SELECT uc.category.slug FROM UserCategory uc WHERE uc.user.id = :userId")
    List<String> findSlugsByUserId(Long userId);
}
