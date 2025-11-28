package com.sofa.gallery.layout;

import com.sofa.gallery.layout.entity.LayoutConfig;
import com.sofa.gallery.layout.entity.LayoutSection;
import com.sofa.gallery.layout.service.LayoutService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LayoutController {
    private final LayoutService layoutService;

    public LayoutController(LayoutService layoutService) {
        this.layoutService = layoutService;
    }

    @GetMapping("/layout")
    public ResponseEntity<?> getLayout() {
        return ResponseEntity.ok(layoutService.currentLayout());
    }

    @PutMapping("/admin/layout")
    public ResponseEntity<?> updateLayout(@Valid @RequestBody LayoutRequest payload) {
        LayoutConfig config = new LayoutConfig(payload.heroTitle(), payload.heroSubtitle(),
                payload.sections().stream()
                        .map(section -> new LayoutSection(section.id(), section.title(), section.description()))
                        .toList());
        return ResponseEntity.ok(layoutService.updateLayout(config));
    }

    public record LayoutRequest(@NotBlank String heroTitle, @NotBlank String heroSubtitle, List<LayoutSectionRequest> sections) {}

    public record LayoutSectionRequest(@NotBlank String id, @NotBlank String title, @NotBlank String description) {}
}
