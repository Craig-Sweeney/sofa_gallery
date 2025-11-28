package com.sofa.gallery.layout.repository;

import com.sofa.gallery.layout.entity.LayoutConfig;

import java.util.Optional;

public interface LayoutRepository {
    Optional<LayoutConfig> get();

    LayoutConfig save(LayoutConfig config);
}
