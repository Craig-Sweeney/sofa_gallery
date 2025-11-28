package com.sofa.gallery.media;

import com.sofa.gallery.media.service.MediaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/media")
public class MediaController {
    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping("/presign")
    public ResponseEntity<?> presign(@Valid @RequestBody PresignRequest payload) {
        Map<String, Object> result = mediaService.generatePresignedUpload(payload.filename(), payload.contentType());
        return ResponseEntity.ok(result);
    }

    public record PresignRequest(@NotBlank String filename, @NotBlank String contentType) {}
}
