package com.interiorai.backend.dto;

import com.interiorai.backend.model.*;

import java.util.List;

public class ProjectResponse {
    private String id;
    private String userId;
    private String name;
    private String roomType;
    private String apartmentType;
    private Double carpetAreaSqFt;
    private Double targetBudget;
    private String style;
    private ProjectStatus status;
    private String notes;
    private String originalImageUrl;
    private String renderedImageUrl;
    private Questionnaire questionnaire;
    private ProjectBudget budget;
    private DesignPlanData designPlan;
    private List<String> mediaIds;
    private Long createdAt;
    private Long updatedAt;

    public static ProjectResponse from(Project project) {
        ProjectResponse r = new ProjectResponse();
        r.setId(project.getId());
        r.setUserId(project.getUserId());
        r.setName(project.getName());
        r.setRoomType(project.getRoomType());
        r.setApartmentType(project.getApartmentType());
        r.setCarpetAreaSqFt(project.getCarpetAreaSqFt());
        r.setTargetBudget(project.getTargetBudget());
        r.setStyle(project.getStyle());
        r.setStatus(project.getStatus());
        r.setNotes(project.getNotes());
        r.setOriginalImageUrl(project.getOriginalImageUrl());
        r.setRenderedImageUrl(project.getRenderedImageUrl());
        r.setQuestionnaire(project.getQuestionnaire());
        r.setBudget(project.getBudget());
        r.setDesignPlan(project.getDesignPlan());
        r.setMediaIds(project.getMediaIds());
        r.setCreatedAt(project.getCreatedAt());
        r.setUpdatedAt(project.getUpdatedAt());
        return r;
    }

    public ProjectResponse() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public String getApartmentType() { return apartmentType; }
    public void setApartmentType(String apartmentType) { this.apartmentType = apartmentType; }

    public Double getCarpetAreaSqFt() { return carpetAreaSqFt; }
    public void setCarpetAreaSqFt(Double carpetAreaSqFt) { this.carpetAreaSqFt = carpetAreaSqFt; }

    public Double getTargetBudget() { return targetBudget; }
    public void setTargetBudget(Double targetBudget) { this.targetBudget = targetBudget; }

    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }

    public ProjectStatus getStatus() { return status; }
    public void setStatus(ProjectStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getOriginalImageUrl() { return originalImageUrl; }
    public void setOriginalImageUrl(String originalImageUrl) { this.originalImageUrl = originalImageUrl; }

    public String getRenderedImageUrl() { return renderedImageUrl; }
    public void setRenderedImageUrl(String renderedImageUrl) { this.renderedImageUrl = renderedImageUrl; }

    public Questionnaire getQuestionnaire() { return questionnaire; }
    public void setQuestionnaire(Questionnaire questionnaire) { this.questionnaire = questionnaire; }

    public ProjectBudget getBudget() { return budget; }
    public void setBudget(ProjectBudget budget) { this.budget = budget; }

    public DesignPlanData getDesignPlan() { return designPlan; }
    public void setDesignPlan(DesignPlanData designPlan) { this.designPlan = designPlan; }

    public List<String> getMediaIds() { return mediaIds; }
    public void setMediaIds(List<String> mediaIds) { this.mediaIds = mediaIds; }

    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }

    public Long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Long updatedAt) { this.updatedAt = updatedAt; }
}
