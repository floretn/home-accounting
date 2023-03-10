package ru.floretn.ha.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.floretn.ha.repo.AuthInfoRepo;

@Service
public class AuthService implements UserDetailsService {

    private final AuthInfoRepo authInfoRepo;

    public AuthService(AuthInfoRepo authInfoRepo) {
        this.authInfoRepo = authInfoRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authInfoRepo.findAuthInfoEntitiesByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
