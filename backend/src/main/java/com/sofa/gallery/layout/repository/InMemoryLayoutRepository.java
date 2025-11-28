package com.sofa.gallery.layout.repository;

import com.sofa.gallery.layout.entity.LayoutConfig;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Repository
public class InMemoryLayoutRepository implements LayoutRepository {
    private final AtomicReference<LayoutConfig> storage = new AtomicReference<>();

    @Override
    public Optional<LayoutConfig> get() {
        return Optional.ofNullable(storage.get());
    }

    @Override
    public LayoutConfig save(LayoutConfig config) {
        storage.set(config);
        return config;
    }
}
