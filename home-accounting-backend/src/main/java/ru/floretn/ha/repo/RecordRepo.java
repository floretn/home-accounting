package ru.floretn.ha.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.floretn.ha.domain.RecordEntity;

public interface RecordRepo extends JpaRepository<RecordEntity, Long> {
}
