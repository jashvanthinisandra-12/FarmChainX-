package com.farmchainx.farmchainx.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ChatbotService {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    public String askChatbot(String userMessage) {
        try {
            HttpClient client = HttpClient.newHttpClient();

            String body = """
            {
              "model": "gpt-4o-mini",
              "messages": [
                {"role": "user", "content": "%s"}
              ]
            }
            """.formatted(userMessage);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://api.openai.com/v1/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + openaiApiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
