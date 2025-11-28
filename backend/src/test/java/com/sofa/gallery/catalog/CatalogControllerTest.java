package com.sofa.gallery.catalog;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CatalogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AuthService authService;

    private String adminToken;

    @BeforeEach
    void setUp() {
        String code = authService.sendOtp("admin@test.io");
        adminToken = authService.verifyOtp("admin@test.io", code);
    }

    @Test
    void shouldUpsertProductAndExposeInCatalog() throws Exception {
        String payload = "{\n" +
                "  \"id\": \"demo-1\",\n" +
                "  \"name\": \"云感布艺沙发\",\n" +
                "  \"category\": \"fabric\",\n" +
                "  \"description\": \"柔软坐垫与模块化靠背\",\n" +
                "  \"basePrice\": 8999,\n" +
                "  \"featured\": true,\n" +
                "  \"variants\": [\n" +
                "    {\n" +
                "      \"id\": \"v1\",\n" +
                "      \"color\": \"ivory\",\n" +
                "      \"material\": \"linen\",\n" +
                "      \"priceModifier\": 0,\n" +
                "      \"imageUrl\": \"https://cdn/sofa.png\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";

        mockMvc.perform(post("/api/admin/products")
                        .header("X-Admin-Token", adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk());

        MvcResult listResult = mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode body = objectMapper.readTree(listResult.getResponse().getContentAsString());
        assertThat(body).hasSize(1);
        assertThat(body.get(0).get("id").asText()).isEqualTo("demo-1");
        assertThat(body.get(0).get("variants")).hasSize(1);
    }
}
