package ru.floretn.ha.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.floretn.ha.services.UsersService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/{id}/info")
    public ResponseEntity<?> getUserInfo(@PathVariable long id) {
        Map<Object, Object> resp = new HashMap<>();
        resp.put("info", usersService.getUserById(id));
        System.out.println("Tut " + id + " " + resp);
        return ResponseEntity.ok(resp);
    }
}
