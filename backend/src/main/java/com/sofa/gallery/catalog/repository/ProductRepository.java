package com.sofa.gallery.catalog.repository;

import com.sofa.gallery.catalog.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    List<Product> findAll();

    Optional<Product> findById(String id);

    Product save(Product product);
}
