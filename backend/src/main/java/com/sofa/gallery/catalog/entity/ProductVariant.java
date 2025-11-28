package com.sofa.gallery.catalog.entity;

import java.math.BigDecimal;
import java.util.Objects;

public class ProductVariant {
    private final String id;
    private final String color;
    private final String material;
    private final BigDecimal priceModifier;
    private final String imageUrl;

    public ProductVariant(String id, String color, String material, BigDecimal priceModifier, String imageUrl) {
        this.id = Objects.requireNonNull(id, "id is required");
        this.color = Objects.requireNonNull(color, "color is required");
        this.material = Objects.requireNonNull(material, "material is required");
        this.priceModifier = Objects.requireNonNullElse(priceModifier, BigDecimal.ZERO);
        this.imageUrl = Objects.requireNonNull(imageUrl, "imageUrl is required");
    }

    public String getId() {
        return id;
    }

    public String getColor() {
        return color;
    }

    public String getMaterial() {
        return material;
    }

    public BigDecimal getPriceModifier() {
        return priceModifier;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
