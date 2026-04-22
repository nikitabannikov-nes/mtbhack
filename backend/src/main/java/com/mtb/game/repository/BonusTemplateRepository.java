package com.mtb.game.repository;

import com.mtb.game.domain.BonusTemplate;
import com.mtb.game.domain.enums.BonusType;
import com.mtb.game.domain.enums.Rarity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface BonusTemplateRepository extends JpaRepository<BonusTemplate, Long> {

    List<BonusTemplate> findByCategoryIdAndRarity(Long categoryId, Rarity rarity);

    @Query("SELECT bt FROM BonusTemplate bt WHERE bt.category.id IN :categoryIds AND bt.rarity = :rarity AND bt.bonusType NOT IN :excludedTypes")
    List<BonusTemplate> findAvailable(List<Long> categoryIds, Rarity rarity, List<BonusType> excludedTypes);

    @Query("SELECT bt FROM BonusTemplate bt WHERE bt.category.id IN :categoryIds AND bt.rarity = :rarity")
    List<BonusTemplate> findByCategoryIdsAndRarity(List<Long> categoryIds, Rarity rarity);
}
