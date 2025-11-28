package com.sofa.gallery.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldSendAndVerifyOtp() throws Exception {
        String identifier = "admin@example.com";
        MvcResult sendResult = mockMvc.perform(post("/api/auth/otp")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"identifier\":\"" + identifier + "\"}"))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode sendBody = objectMapper.readTree(sendResult.getResponse().getContentAsString());
        assertThat(sendBody.get("status").asText()).isEqualTo("sent");
        String code = sendBody.get("mockCode").asText();

        MvcResult verifyResult = mockMvc.perform(post("/api/auth/verify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"identifier\":\"" + identifier + "\",\"code\":\"" + code + "\"}"))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode verifyBody = objectMapper.readTree(verifyResult.getResponse().getContentAsString());
        assertThat(verifyBody.get("token").asText()).isNotBlank();
    }
}
