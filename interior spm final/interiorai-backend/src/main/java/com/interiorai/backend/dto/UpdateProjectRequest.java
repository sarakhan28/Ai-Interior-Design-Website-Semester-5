package com.interiorai.backend.dto;

import com.interiorai.backend.model.ProjectStatus;
import jakarta.validation.constraints.Size;

public class UpdateProjectRequest {

    @Size(max = 100, message = "Project name must not exceed 100 characters")
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

    public UpdateProjectRequest() {}

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
}
