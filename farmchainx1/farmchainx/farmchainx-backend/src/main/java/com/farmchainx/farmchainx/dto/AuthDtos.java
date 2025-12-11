package com.farmchainx.farmchainx.dto;

import com.farmchainx.farmchainx.model.Role;

public class AuthDtos {

    public static class RegisterRequest {
        public String username;
        public String password;
        public Role role;
    }

    public static class LoginRequest {
        public String username;
        public String password;
    }

    public static class AuthResponse {
        public String username;
        public Role role;

        public AuthResponse(String username, Role role) {
            this.username = username;
            this.role = role;
        }
    }
}
