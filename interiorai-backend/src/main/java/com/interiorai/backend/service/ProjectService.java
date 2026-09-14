package com.interiorai.backend.service;

import com.interiorai.backend.dto.CreateProjectRequest;
import com.interiorai.backend.dto.SaveAiDataRequest;
import com.interiorai.backend.dto.UpdateProjectRequest;
import com.interiorai.backend.exception.ForbiddenAccessException;
import com.interiorai.backend.exception.ResourceNotFoundException;
import com.interiorai.backend.model.*;
import com.interiorai.backend.repository.ProjectHistoryRepository;
import com.interiorai.backend.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private static final Logger log = LoggerFactory.getLogger(ProjectService.class);

    private final ProjectRepository projectRepository;
    private final ProjectHistoryRepository historyRepository;

    public ProjectService(ProjectRepository projectRepository, ProjectHistoryRepository historyRepository) {
        this.projectRepository = projectRepository;
        this.historyRepository = historyRepository;
    }

    public Project createProject(CreateProjectRequest req, String userId) {
        Project project = new Project();
        project.setUserId(userId);
        project.setName(req.getName());
        project.setRoomType(req.getRoomType() != null ? req.getRoomType() : "Living Room");
        project.setApartmentType(req.getApartmentType());
        project.setCarpetAreaSqFt(req.getCarpetAreaSqFt());
        project.setTargetBudget(req.getTargetBudget());
        project.setStyle(req.getStyle() != null ? req.getStyle() : "Modern Minimal");
        project.setStatus(ProjectStatus.DRAFT);
        project.setNotes(req.getNotes());
        project.setOriginalImageUrl(req.getOriginalImageUrl());
        project.setRenderedImageUrl(req.getRenderedImageUrl());

        long now = System.currentTimeMillis();
        project.setCreatedAt(now);
        project.setUpdatedAt(now);

        Project saved = projectRepository.save(project);
        recordActivity(saved.getId(), userId, "PROJECT_CREATED", "Created project: " + saved.getName());
        log.info("Created project {} for user {}", saved.getId(), userId);
        return saved;
    }

    public Project getProject(String id, String userId) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project with ID " + id + " not found."));

        if (!project.getUserId().equals(userId)) {
            throw new ForbiddenAccessException("You do not have permission to view this project.");
        }
        return project;
    }

    public List<Project> getUserProjects(String userId) {
        return projectRepository.findByUserId(userId);
    }

    public Project updateProject(String id, UpdateProjectRequest req, String userId) {
        Project project = getProject(id, userId);

        if (req.getName() != null) project.setName(req.getName());
        if (req.getRoomType() != null) project.setRoomType(req.getRoomType());
        if (req.getApartmentType() != null) project.setApartmentType(req.getApartmentType());
        if (req.getCarpetAreaSqFt() != null) project.setCarpetAreaSqFt(req.getCarpetAreaSqFt());
        if (req.getTargetBudget() != null) project.setTargetBudget(req.getTargetBudget());
        if (req.getStyle() != null) project.setStyle(req.getStyle());
        if (req.getStatus() != null) project.setStatus(req.getStatus());
        if (req.getNotes() != null) project.setNotes(req.getNotes());
        if (req.getOriginalImageUrl() != null) project.setOriginalImageUrl(req.getOriginalImageUrl());
        if (req.getRenderedImageUrl() != null) project.setRenderedImageUrl(req.getRenderedImageUrl());

        project.setUpdatedAt(System.currentTimeMillis());

        Project updated = projectRepository.save(project);
        recordActivity(id, userId, "PROJECT_UPDATED", "Updated project details");
        return updated;
    }

    public void deleteProject(String id, String userId) {
        Project project = getProject(id, userId);
        projectRepository.deleteById(project.getId());
        recordActivity(id, userId, "PROJECT_DELETED", "Deleted project: " + project.getName());
        log.info("Deleted project {} by user {}", id, userId);
    }

    public List<ProjectHistory> getProjectHistory(String projectId, String userId) {
        // Enforce ownership
        getProject(projectId, userId);
        return historyRepository.findByProjectIdOrderByTimestampDesc(projectId);
    }

    public void recordActivity(String projectId, String userId, String action, String description) {
        ProjectHistory history = new ProjectHistory(null, projectId, userId, action, description, System.currentTimeMillis());
        historyRepository.save(history);
    }

    /**
     * Stores already-generated AI design data supplied by the frontend for report generation.
     * ADWP-124/125: Backend stores already-generated AI data without performing AI generation.
     */
    public Project saveAiDesignData(String projectId, SaveAiDataRequest req, String userId) {
        Project project = getProject(projectId, userId);

        DesignPlanData designData = new DesignPlanData();
        designData.setSummary(req.getSummary());
        designData.setPalette(req.getPalette());
        designData.setMaterials(req.getMaterials());
        designData.setItems(req.getItems());
        designData.setTotalCost(req.getTotalCost());
        designData.setDesignScore(req.getDesignScore());
        designData.setVastuNote(req.getVastuNote());
        designData.setRenderedImageUrl(req.getRenderedImageUrl());

        if (req.getRenderedImageUrl() != null) {
            project.setRenderedImageUrl(req.getRenderedImageUrl());
        }

        project.setDesignPlan(designData);
        project.setStatus(ProjectStatus.COMPLETED);
        project.setUpdatedAt(System.currentTimeMillis());

        Project saved = projectRepository.save(project);
        recordActivity(projectId, userId, "AI_DATA_ATTACHED", "Attached AI design plan and renders to project");
        return saved;
    }
}
