package com.interiorai.backend.controller;

import com.interiorai.backend.dto.ApiResponse;
import com.interiorai.backend.dto.BudgetCalculationResponse;
import com.interiorai.backend.dto.EstimateBudgetRequest;
import com.interiorai.backend.model.MaterialCategory;
import com.interiorai.backend.model.MaterialItem;
import com.interiorai.backend.security.SecurityUtils;
import com.interiorai.backend.service.BudgetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Budget (ADWP-102–111)", description = "Deterministic non-AI material price database and cost estimation")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/api/materials")
    @Operation(summary = "Get Materials & Price Catalog", description = "Retrieves current Firestore material catalog for flooring, painting, and furniture with Indian pricing")
    public ResponseEntity<ApiResponse<List<MaterialItem>>> getMaterials(
            @RequestParam(required = false) MaterialCategory category) {

        List<MaterialItem> items = budgetService.getMaterialsCatalog(category);
        return ResponseEntity.ok(ApiResponse.ok("Materials catalog retrieved", items));
    }

    @PostMapping("/api/budget/estimate")
    @Operation(summary = "Ad-hoc Budget Estimation (Non-AI)", description = "Calculates itemized costs for flooring, wall painting, furniture, labour, and GST based on carpet area without saving to a project")
    public ResponseEntity<ApiResponse<BudgetCalculationResponse>> estimateBudget(
            @Valid @RequestBody EstimateBudgetRequest req) {

        BudgetCalculationResponse res = budgetService.calculateEstimate(req);
        return ResponseEntity.ok(ApiResponse.ok("Budget estimate calculated", res));
    }

    @PostMapping("/api/projects/{projectId}/budget")
    @Operation(summary = "Calculate and Save Project Budget", description = "Calculates deterministic budget breakdown and associates it with the project in Firestore")
    public ResponseEntity<ApiResponse<BudgetCalculationResponse>> saveProjectBudget(
            @PathVariable String projectId,
            @RequestBody EstimateBudgetRequest req) {

        String userId = SecurityUtils.getCurrentUserId();
        BudgetCalculationResponse res = budgetService.saveProjectBudget(projectId, req, userId);
        return ResponseEntity.ok(ApiResponse.ok("Project budget saved successfully", res));
    }

    @GetMapping("/api/projects/{projectId}/budget")
    @Operation(summary = "Get Project Budget", description = "Retrieves the saved budget report for a project")
    public ResponseEntity<ApiResponse<BudgetCalculationResponse>> getProjectBudget(
            @PathVariable String projectId) {

        String userId = SecurityUtils.getCurrentUserId();
        BudgetCalculationResponse res = budgetService.getProjectBudget(projectId, userId);
        return ResponseEntity.ok(ApiResponse.ok("Project budget retrieved", res));
    }
}
