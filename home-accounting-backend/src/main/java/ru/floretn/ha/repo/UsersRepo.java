package ru.floretn.ha.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.floretn.ha.domain.UserEntity;

@Repository
public interface UsersRepo extends JpaRepository<UserEntity, Long> {
}
