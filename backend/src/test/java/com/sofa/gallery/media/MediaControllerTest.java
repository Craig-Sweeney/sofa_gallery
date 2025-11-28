package com.sofa.gallery.media;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sofa.gallery.auth.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MediaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AuthService authService;

    private String adminToken;

    @BeforeEach
    void setUp() {
        String code = authService.sendOtp("media@test.io");
        adminToken = authService.verifyOtp("media@test.io", code);
    }

    @Test
    void shouldRejectUnsupportedContentType() throws Exception {
        mockMvc.perform(post("/api/admin/media/presign")
                        .header("X-Admin-Token", adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"filename\":\"demo.bin\",\"contentType\":\"application/octet-stream\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void shouldGeneratePresignForImage() throws Exception {
        var result = mockMvc.perform(post("/api/admin/media/presign")
                        .header("X-Admin-Token", adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"filename\":\"demo.png\",\"contentType\":\"image/png\"}"))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode body = objectMapper.readTree(result.getResponse().getContentAsString());
        assertThat(body.get("uploadId").asText()).isNotBlank();
        assertThat(body.get("url").asText()).contains("demo.png");
    }
}
