package com.interiorai.backend.controller;

import com.interiorai.backend.dto.ApiResponse;
import com.interiorai.backend.dto.DashboardStatsResponse;
import com.interiorai.backend.security.SecurityUtils;
import com.interiorai.backend.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard (ADWP-54–61)", description = "User dashboard metrics, counts by status, and recent project activity")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    @Operation(summary = "Get Dashboard Statistics", description = "Retrieves project counts by status, total estimated budget, and recent activity for the authenticated UID")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        String userId = SecurityUtils.getCurrentUserId();
        DashboardStatsResponse stats = dashboardService.getStats(userId);
        return ResponseEntity.ok(ApiResponse.ok("Dashboard statistics retrieved", stats));
    }
}
