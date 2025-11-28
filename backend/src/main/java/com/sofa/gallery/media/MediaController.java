package com.sofa.gallery.media;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/media")
public class MediaController {
    @PostMapping("/presign")
    public ResponseEntity<?> presign(@RequestBody Map<String, Object> payload) {
        // TODO: 生成 S3/MinIO 直传凭证并校验文件类型
        return ResponseEntity.ok(Map.of(
                "uploadId", UUID.randomUUID().toString(),
                "url", "https://minio.local/uploads/demo",
                "fields", Map.of("policy", "<policy>")
        ));
    }
}
