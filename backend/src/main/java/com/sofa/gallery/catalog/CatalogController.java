package com.sofa.gallery.catalog;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CatalogController {

    @GetMapping("/products")
    public ResponseEntity<?> listProducts() {
        // 示例数据，生产中应查询数据库
        var sample = List.of(
                Map.of(
                        "id", "demo-1",
                        "name", "云感布艺沙发",
                        "category", "fabric",
                        "description", "柔软坐垫与模块化靠背，适合北欧/极简风格。",
                        "basePrice", BigDecimal.valueOf(8999),
                        "featured", true,
                        "variants", List.of()
                )
        );
        return ResponseEntity.ok(sample);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> productDetail(@PathVariable String id) {
        return ResponseEntity.ok(Map.of(
                "id", id,
                "name", "云感布艺沙发",
                "category", "fabric",
                "description", "柔软坐垫与模块化靠背，适合北欧/极简风格。",
                "basePrice", BigDecimal.valueOf(8999),
                "featured", true,
                "variants", List.of()
        ));
    }

    @PostMapping("/admin/products")
    public ResponseEntity<?> upsertProduct(@RequestBody Map<String, Object> payload) {
        // TODO: 保存产品、颜色/材质、图片等
        return ResponseEntity.ok(payload);
    }
}
