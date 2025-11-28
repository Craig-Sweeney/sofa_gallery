package com.sofa.gallery.layout;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LayoutController {
    private Map<String, Object> layout = Map.of(
            "heroTitle", "沉浸式舒适体验",
            "heroSubtitle", "精选布艺与皮艺系列，满足客厅每一寸的格调与舒适",
            "sections", List.of()
    );

    @GetMapping("/layout")
    public ResponseEntity<?> getLayout() {
        return ResponseEntity.ok(layout);
    }

    @PutMapping("/admin/layout")
    public ResponseEntity<?> updateLayout(@RequestBody Map<String, Object> payload) {
        this.layout = payload;
        return ResponseEntity.ok(this.layout);
    }
}
