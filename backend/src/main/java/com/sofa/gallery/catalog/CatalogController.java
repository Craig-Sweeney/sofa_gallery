package com.sofa.gallery.catalog;

import com.sofa.gallery.catalog.entity.Product;
import com.sofa.gallery.catalog.entity.ProductVariant;
import com.sofa.gallery.catalog.service.CatalogService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CatalogController {
    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/products")
    public ResponseEntity<?> listProducts() {
        return ResponseEntity.ok(catalogService.listProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> productDetail(@PathVariable String id) {
        return ResponseEntity.ok(catalogService.getProduct(id));
    }

    @PostMapping("/admin/products")
    public ResponseEntity<?> upsertProduct(@Valid @RequestBody ProductRequest payload) {
        Product product = new Product(
                payload.id(),
                payload.name(),
                payload.category(),
                payload.description(),
                payload.basePrice(),
                payload.featured(),
                payload.variants().stream()
                        .map(v -> new ProductVariant(v.id(), v.color(), v.material(), v.priceModifier(), v.imageUrl()))
                        .toList()
        );
        return ResponseEntity.ok(catalogService.upsert(product));
    }

    public record ProductRequest(
            @NotBlank String id,
            @NotBlank String name,
            @NotBlank String category,
            @NotBlank String description,
            @NotNull BigDecimal basePrice,
            boolean featured,
            @NotNull List<ProductVariantRequest> variants
    ) {}

    public record ProductVariantRequest(
            @NotBlank String id,
            @NotBlank String color,
            @NotBlank String material,
            BigDecimal priceModifier,
            @NotBlank String imageUrl
    ) {}
}
