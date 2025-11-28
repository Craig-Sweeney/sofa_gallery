package com.sofa.gallery.auth.repository;

import java.time.Instant;
import java.util.Optional;

public interface OtpRepository {
    record OtpEntry(String identifier, String code, Instant expiresAt) {}

    OtpEntry save(OtpEntry entry);

    Optional<OtpEntry> findByIdentifier(String identifier);
}
