package com.farmchainx.farmchainx.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000") // React frontend
public class ChatController {

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {

        String userMessage = request.get("message");

        // ✅ TEMP RESPONSE (we'll replace later with AI)
        String reply = "You said: " + userMessage;

        return Map.of("reply", reply);
    }
}
