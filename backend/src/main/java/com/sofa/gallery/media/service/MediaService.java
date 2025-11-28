package com.sofa.gallery.media.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class MediaService {
    private static final Set<String> ALLOWED_TYPES = Set.of("image/png", "image/jpeg", "image/webp");

    public Map<String, Object> generatePresignedUpload(String filename, String contentType) {
        if (!ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("unsupported content type: " + contentType);
        }
        return Map.of(
                "uploadId", UUID.randomUUID().toString(),
                "url", "https://minio.local/uploads/%s".formatted(filename),
                "fields", Map.of("contentType", contentType)
        );
    }
}
