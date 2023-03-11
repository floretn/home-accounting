package ru.floretn.ha.services;

import org.springframework.stereotype.Service;
import ru.floretn.ha.beans.HARuntimeException;
import ru.floretn.ha.domain.UserEntity;
import ru.floretn.ha.repo.UsersRepo;

@Service
public class UsersService {

    private final UsersRepo usersRepo;

    public UsersService(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    public UserEntity getUserById(long id) {
        return usersRepo.findById(id).orElseThrow(() -> new HARuntimeException("Пользователь с " + id + " не найден!"));
    }
}
