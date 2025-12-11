package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.dto.AuthDtos.*;
import com.farmchainx.farmchainx.model.UserAccount;
import com.farmchainx.farmchainx.repository.UserAccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserAccountRepository userRepo;

    public AuthController(UserAccountRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.findByUsername(req.username).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        UserAccount user = new UserAccount(req.username, req.password, req.role);
        userRepo.save(user);

        return ResponseEntity.ok(new AuthResponse(user.username, user.role));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return userRepo.findByUsername(req.username)
                .filter(u -> u.password.equals(req.password))
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(new AuthResponse(u.username, u.role)))
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }
}
