package com.sofa.gallery.catalog.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Product {
    private final String id;
    private final String name;
    private final String category;
    private final String description;
    private final BigDecimal basePrice;
    private final boolean featured;
    private final List<ProductVariant> variants;

    public Product(String id, String name, String category, String description, BigDecimal basePrice, boolean featured, List<ProductVariant> variants) {
        this.id = Objects.requireNonNull(id, "id is required");
        this.name = Objects.requireNonNull(name, "name is required");
        this.category = Objects.requireNonNull(category, "category is required");
        this.description = Objects.requireNonNull(description, "description is required");
        this.basePrice = Objects.requireNonNull(basePrice, "basePrice is required");
        this.featured = featured;
        this.variants = Collections.unmodifiableList(new ArrayList<>(variants == null ? List.of() : variants));
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public boolean isFeatured() {
        return featured;
    }

    public List<ProductVariant> getVariants() {
        return variants;
    }
}
