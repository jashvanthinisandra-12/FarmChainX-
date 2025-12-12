package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin("*")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/ask")
    public String askChatbot(@RequestBody String message) {
        return chatbotService.askChatbot(message);
    }
}
