package com.sofa.gallery.layout.entity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class LayoutConfig {
    private final String heroTitle;
    private final String heroSubtitle;
    private final List<LayoutSection> sections;

    public LayoutConfig(String heroTitle, String heroSubtitle, List<LayoutSection> sections) {
        this.heroTitle = Objects.requireNonNull(heroTitle, "heroTitle is required");
        this.heroSubtitle = Objects.requireNonNull(heroSubtitle, "heroSubtitle is required");
        this.sections = Collections.unmodifiableList(new ArrayList<>(sections == null ? List.of() : sections));
    }

    public String getHeroTitle() {
        return heroTitle;
    }

    public String getHeroSubtitle() {
        return heroSubtitle;
    }

    public List<LayoutSection> getSections() {
        return sections;
    }
}
