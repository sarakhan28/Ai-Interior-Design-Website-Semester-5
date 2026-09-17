package com.interiorai.backend.controller;

import com.interiorai.backend.dto.ApiResponse;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.security.SecurityUtils;
import com.interiorai.backend.service.PdfReportService;
import com.interiorai.backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/projects/{projectId}/report")
@Tag(name = "PDF Report (ADWP-120–127)", description = "PDFBox report generation with project specs, non-AI budget table, shopping list, and renders")
public class PdfReportController {

    private final PdfReportService pdfReportService;
    private final ProjectService projectService;

    public PdfReportController(PdfReportService pdfReportService, ProjectService projectService) {
        this.pdfReportService = pdfReportService;
        this.projectService = projectService;
    }

    @GetMapping
    @Operation(summary = "Get Report Metadata / Status", description = "Checks whether project data, questionnaire, and budget are ready for PDF export")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getReportStatus(@PathVariable String projectId) {
        String userId = SecurityUtils.getCurrentUserId();
        Project project = projectService.getProject(projectId, userId);

        Map<String, Object> status = new HashMap<>();
        status.put("projectId", project.getId());
        status.put("projectName", project.getName());
        status.put("hasQuestionnaire", project.getQuestionnaire() != null);
        status.put("hasBudget", project.getBudget() != null);
        status.put("hasDesignPlan", project.getDesignPlan() != null);
        status.put("readyForDownload", true);
        status.put("downloadEndpoint", "/api/projects/" + projectId + "/report/download");

        return ResponseEntity.ok(ApiResponse.ok("Report status retrieved", status));
    }

    @GetMapping("/download")
    @Operation(summary = "Download Project PDF Report", description = "Generates and streams an executive PDF report built with PDFBox containing real project specifications, deterministic budget tables, and shopping lists")
    public ResponseEntity<byte[]> downloadReport(@PathVariable String projectId) throws IOException {
        String userId = SecurityUtils.getCurrentUserId();
        byte[] pdfBytes = pdfReportService.generateProjectReportPdf(projectId, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "InteriorAI-Report-" + projectId + ".pdf");
        headers.setContentLength(pdfBytes.length);

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
