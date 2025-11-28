package com.sofa.gallery.auth.service;

import com.sofa.gallery.auth.repository.OtpRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {
    private final OtpRepository otpRepository;
    private final SecureRandom random = new SecureRandom();
    private final Set<String> activeTokens = new HashSet<>();

    public AuthService(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    public String sendOtp(String identifier) {
        String code = String.format("%06d", random.nextInt(1_000_000));
        otpRepository.save(new OtpRepository.OtpEntry(identifier, code, Instant.now().plusSeconds(300)));
        return code;
    }

    public String verifyOtp(String identifier, String code) {
        OtpRepository.OtpEntry entry = otpRepository.findByIdentifier(identifier)
                .filter(saved -> saved.expiresAt().isAfter(Instant.now()))
                .orElseThrow(() -> new IllegalArgumentException("OTP expired or missing"));
        if (!entry.code().equals(code)) {
            throw new IllegalArgumentException("OTP does not match");
        }
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString((identifier + ":" + Instant.now().toString()).getBytes());
        activeTokens.add(token);
        return token;
    }

    public boolean isTokenActive(String token) {
        return activeTokens.contains(token);
    }
}
