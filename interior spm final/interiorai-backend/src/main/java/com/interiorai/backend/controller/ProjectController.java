package com.interiorai.backend.controller;

import com.interiorai.backend.dto.*;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.model.ProjectHistory;
import com.interiorai.backend.security.SecurityUtils;
import com.interiorai.backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
@Tag(name = "Project Management (ADWP-62–68)", description = "CRUD operations, project validation, status tracking, and audit history")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    @Operation(summary = "Create Project", description = "Creates a new interior design project associated with the authenticated user's Firebase UID")
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(@Valid @RequestBody CreateProjectRequest req) {
        String userId = SecurityUtils.getCurrentUserId();
        Project created = projectService.createProject(req, userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Project created successfully", ProjectResponse.from(created)));
    }

    @GetMapping
    @Operation(summary = "List User Projects", description = "Retrieves all projects owned by the authenticated user")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> listProjects() {
        String userId = SecurityUtils.getCurrentUserId();
        List<ProjectResponse> projects = projectService.getUserProjects(userId).stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok("User projects retrieved", projects));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Project by ID", description = "Retrieves details of a specific project. Strict user ownership is enforced.")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProject(@PathVariable String id) {
        String userId = SecurityUtils.getCurrentUserId();
        Project project = projectService.getProject(id, userId);
        return ResponseEntity.ok(ApiResponse.ok("Project details retrieved", ProjectResponse.from(project)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Project", description = "Updates fields of an existing project (name, status, room specs, target budget, notes)")
    public ResponseEntity<ApiResponse<ProjectResponse>> updateProject(@PathVariable String id,
                                                                      @Valid @RequestBody UpdateProjectRequest req) {
        String userId = SecurityUtils.getCurrentUserId();
        Project updated = projectService.updateProject(id, req, userId);
        return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", ProjectResponse.from(updated)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Project", description = "Deletes a project owned by the authenticated user")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable String id) {
        String userId = SecurityUtils.getCurrentUserId();
        projectService.deleteProject(id, userId);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully", null));
    }

    @GetMapping("/{id}/history")
    @Operation(summary = "Get Project History / Activity Log", description = "Retrieves chronological audit log of actions performed on this project")
    public ResponseEntity<ApiResponse<List<ProjectHistory>>> getProjectHistory(@PathVariable String id) {
        String userId = SecurityUtils.getCurrentUserId();
        List<ProjectHistory> history = projectService.getProjectHistory(id, userId);
        return ResponseEntity.ok(ApiResponse.ok("Project history retrieved", history));
    }

    @PostMapping("/{id}/ai-data")
    @Operation(summary = "Attach Already-Generated AI Design Plan", description = "Stores already-generated AI design plan and renders from the frontend for inclusion in PDF reports (ADWP-124/125). Backend does NOT generate AI content.")
    public ResponseEntity<ApiResponse<ProjectResponse>> attachAiData(@PathVariable String id,
                                                                     @RequestBody SaveAiDataRequest req) {
        String userId = SecurityUtils.getCurrentUserId();
        Project updated = projectService.saveAiDesignData(id, req, userId);
        return ResponseEntity.ok(ApiResponse.ok("AI design data attached to project for reports", ProjectResponse.from(updated)));
    }
}
