package com.interiorai.backend.model;

import java.util.ArrayList;
import java.util.List;

public class Project {
    private String id;
    private String userId;
    private String name;
    private String roomType; // Living Room, Bedroom, Kitchen, Dining Room, Home Office, Bathroom
    private String apartmentType; // 1BHK, 2BHK, 3BHK, Villa, Studio
    private Double carpetAreaSqFt;
    private Double targetBudget;
    private String style; // Modern Minimal, Scandinavian, Indian Contemporary, etc.
    private ProjectStatus status = ProjectStatus.DRAFT;
    private String notes;
    private String originalImageUrl;
    private String renderedImageUrl;
    private Questionnaire questionnaire;
    private ProjectBudget budget;
    private DesignPlanData designPlan; // Stores already-generated AI data if supplied by frontend
    private List<String> mediaIds = new ArrayList<>();
    private Long createdAt;
    private Long updatedAt;

    public Project() {}

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
