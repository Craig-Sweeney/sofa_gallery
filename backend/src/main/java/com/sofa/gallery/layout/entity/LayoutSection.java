package com.sofa.gallery.layout.entity;

import java.util.Objects;

public class LayoutSection {
    private final String id;
    private final String title;
    private final String description;

    public LayoutSection(String id, String title, String description) {
        this.id = Objects.requireNonNull(id, "id is required");
        this.title = Objects.requireNonNull(title, "title is required");
        this.description = Objects.requireNonNull(description, "description is required");
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
