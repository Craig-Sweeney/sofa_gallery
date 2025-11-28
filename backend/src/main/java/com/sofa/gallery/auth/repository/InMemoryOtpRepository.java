package com.sofa.gallery.auth.repository;

import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryOtpRepository implements OtpRepository {
    private final Map<String, OtpEntry> storage = new ConcurrentHashMap<>();

    @Override
    public OtpEntry save(OtpEntry entry) {
        storage.put(entry.identifier(), entry);
        return entry;
    }

    @Override
    public Optional<OtpEntry> findByIdentifier(String identifier) {
        return Optional.ofNullable(storage.get(identifier));
    }
}
