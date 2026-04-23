package com.mtb.game.repository;

import com.mtb.game.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    List<Category> findBySlugIn(List<String> slugs);

    default List<Category> findAllSorted() {
        return findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
}
