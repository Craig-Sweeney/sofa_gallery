package com.sofa.gallery.auth;

import com.sofa.gallery.auth.service.AuthService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
        String code = authService.sendOtp(request.identifier());
        return ResponseEntity.ok(Map.of(
                "status", "sent",
                "identifier", request.identifier(),
                "expiresAt", Instant.now().plusSeconds(300).toString(),
                "mockCode", code
        ));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyRequest request) {
        String token = authService.verifyOtp(request.identifier(), request.code());
        return ResponseEntity.ok(Map.of("token", token));
    }

    public record OtpRequest(@NotBlank String identifier) {}
    public record VerifyRequest(@NotBlank String identifier, @NotBlank String code) {}
}
