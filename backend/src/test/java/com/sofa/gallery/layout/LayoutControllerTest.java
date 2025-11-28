package com.sofa.gallery.layout;

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
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class LayoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AuthService authService;

    private String adminToken;

    @BeforeEach
    void setUp() {
        String code = authService.sendOtp("layout@test.io");
        adminToken = authService.verifyOtp("layout@test.io", code);
    }

    @Test
    void shouldUpdateLayoutAndFetch() throws Exception {
        String payload = "{\n" +
                "  \"heroTitle\": \"主题区域\",\n" +
                "  \"heroSubtitle\": \"舒适客厅\",\n" +
                "  \"sections\": [{\n" +
                "    \"id\": \"s1\",\n" +
                "    \"title\": \"布艺系列\",\n" +
                "    \"description\": \"适合北欧风\"\n" +
                "  }]\n" +
                "}";

        mockMvc.perform(put("/api/admin/layout")
                        .header("X-Admin-Token", adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk());

        MvcResult layoutResult = mockMvc.perform(get("/api/layout"))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode body = objectMapper.readTree(layoutResult.getResponse().getContentAsString());
        assertThat(body.get("heroTitle").asText()).isEqualTo("主题区域");
        assertThat(body.get("sections")).hasSize(1);
    }
}
