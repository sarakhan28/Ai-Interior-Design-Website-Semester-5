package com.interiorai.backend.controller;

import com.interiorai.backend.dto.ApiResponse;
import com.interiorai.backend.dto.QuestionnaireRequest;
import com.interiorai.backend.dto.QuestionnaireResponse;
import com.interiorai.backend.security.SecurityUtils;
import com.interiorai.backend.service.QuestionnaireService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects/{projectId}/questionnaire")
@Tag(name = "Questionnaire (ADWP-76–85)", description = "Apartment design questionnaire: budget, style, flooring, paint, furniture, lighting, humidity")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
    }

    @PostMapping
    @Operation(summary = "Submit Questionnaire", description = "Saves apartment preferences and requirements for a project in Firestore")
    public ResponseEntity<ApiResponse<QuestionnaireResponse>> submitQuestionnaire(
            @PathVariable String projectId,
            @RequestBody QuestionnaireRequest req) {

        String userId = SecurityUtils.getCurrentUserId();
        QuestionnaireResponse res = questionnaireService.saveQuestionnaire(projectId, req, userId);
        return ResponseEntity.ok(ApiResponse.ok("Questionnaire saved successfully", res));
    }

    @GetMapping
    @Operation(summary = "Get Questionnaire", description = "Retrieves the saved questionnaire for a project")
    public ResponseEntity<ApiResponse<QuestionnaireResponse>> getQuestionnaire(@PathVariable String projectId) {
        String userId = SecurityUtils.getCurrentUserId();
        QuestionnaireResponse res = questionnaireService.getQuestionnaire(projectId, userId);
        return ResponseEntity.ok(ApiResponse.ok("Questionnaire retrieved successfully", res));
    }

    @PutMapping
    @Operation(summary = "Update Questionnaire", description = "Updates apartment specifications and design preferences")
    public ResponseEntity<ApiResponse<QuestionnaireResponse>> updateQuestionnaire(
            @PathVariable String projectId,
            @RequestBody QuestionnaireRequest req) {

        String userId = SecurityUtils.getCurrentUserId();
        QuestionnaireResponse res = questionnaireService.saveQuestionnaire(projectId, req, userId);
        return ResponseEntity.ok(ApiResponse.ok("Questionnaire updated successfully", res));
    }
}
