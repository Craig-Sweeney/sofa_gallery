package com.sofa.gallery.catalog.service;

import com.sofa.gallery.catalog.entity.Product;
import com.sofa.gallery.catalog.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogService {
    private final ProductRepository productRepository;

    public CatalogService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("product not found: " + id));
    }

    public Product upsert(Product product) {
        return productRepository.save(product);
    }
}
