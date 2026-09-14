package com.interiorai.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateProjectRequest {

    @NotBlank(message = "Project name is required")
    @Size(max = 100, message = "Project name must not exceed 100 characters")
    private String name;

    private String roomType; // Living Room, Bedroom, Kitchen, Dining Room, Home Office, Bathroom
    private String apartmentType; // 1BHK, 2BHK, 3BHK, Villa, Studio
    private Double carpetAreaSqFt;
    private Double targetBudget;
    private String style; // Modern Minimal, Scandinavian, Indian Contemporary, etc.
    private String notes;
    private String originalImageUrl;
    private String renderedImageUrl;

    public CreateProjectRequest() {}

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

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getOriginalImageUrl() { return originalImageUrl; }
    public void setOriginalImageUrl(String originalImageUrl) { this.originalImageUrl = originalImageUrl; }

    public String getRenderedImageUrl() { return renderedImageUrl; }
    public void setRenderedImageUrl(String renderedImageUrl) { this.renderedImageUrl = renderedImageUrl; }
}
