package ru.floretn.ha.services.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.floretn.ha.domain.AuthInfoEntity;
import ru.floretn.ha.utils.JwtTokenProvider;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginService(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public Map<Object, Object> login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.createToken(loginRequest.getEmail());
        Map<Object, Object> response = new HashMap<>();
        AuthInfoEntity authInfoEntity = (AuthInfoEntity) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        response.put("userId", authInfoEntity.getUser().getUserId());
        response.put("token", token);
        return response;
    }
}
