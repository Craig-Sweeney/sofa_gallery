package com.sofa.gallery.auth;

import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
        // 生产环境中应集成短信/邮箱网关并设置频率限制
        return ResponseEntity.ok(Map.of("status", "sent", "identifier", request.identifier()));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyRequest request) {
        // TODO: 连接用户表校验管理员身份
        String token = UUID.randomUUID().toString();
        return ResponseEntity.ok(Map.of(
                "token", token,
                "expiredAt", Instant.now().plusSeconds(3600).toString()
        ));
    }

    public record OtpRequest(@NotBlank String identifier) {}
    public record VerifyRequest(@NotBlank String identifier, @NotBlank String code) {}
}
