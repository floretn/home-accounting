package ru.floretn.ha.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.floretn.ha.domain.AuthInfoEntity;

import java.util.Optional;

@Repository
public interface AuthInfoRepo extends JpaRepository<AuthInfoEntity, Long> {
    Optional<AuthInfoEntity> findAuthInfoEntitiesByEmail(String email);
}
