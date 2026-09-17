package com.interiorai.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "FirebaseBearerToken";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("InteriorAI Studio Backend API")
                        .version("1.0.0")
                        .description("Backend REST API for InteriorAI Studio — ADWP-44 to ADWP-127 scope.\n" +
                                "Includes Firebase Authentication verification, Project Management, Apartment Media Storage, " +
                                "Design Questionnaire, Deterministic Budgeting, and PDFBox Report generation.")
                        .contact(new Contact().name("InteriorAI Studio Engineering").email("dev@interiorai.studio")))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                new SecurityScheme()
                                        .name(SECURITY_SCHEME_NAME)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Provide a valid Firebase ID Token (e.g. from client Firebase Auth `getIdToken()`, or `dev-token-<uid>` in mock mode).")));
    }
}
