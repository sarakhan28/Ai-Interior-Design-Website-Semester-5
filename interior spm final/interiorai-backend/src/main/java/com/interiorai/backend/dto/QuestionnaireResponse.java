package com.interiorai.backend.dto;

import com.interiorai.backend.model.Questionnaire;

public class QuestionnaireResponse {
    private String projectId;
    private String apartmentType;
    private Double carpetAreaSqFt;
    private String roomType;
    private Double budgetMin;
    private Double budgetMax;
    private String currency;
    private String preferredStyle;
    private String flooringPreference;
    private String paintWallpaperPreference;
    private String furniturePreference;
    private String sunlightLevel;
    private String humidityLevel;
    private Boolean vastuCompliant;
    private String vastuNotes;
    private String additionalRequirements;
    private Long updatedAt;

    public static QuestionnaireResponse from(Questionnaire q) {
        if (q == null) return null;
        QuestionnaireResponse r = new QuestionnaireResponse();
        r.setProjectId(q.getProjectId());
        r.setApartmentType(q.getApartmentType());
        r.setCarpetAreaSqFt(q.getCarpetAreaSqFt());
        r.setRoomType(q.getRoomType());
        r.setBudgetMin(q.getBudgetMin());
        r.setBudgetMax(q.getBudgetMax());
        r.setCurrency(q.getCurrency());
        r.setPreferredStyle(q.getPreferredStyle());
        r.setFlooringPreference(q.getFlooringPreference());
        r.setPaintWallpaperPreference(q.getPaintWallpaperPreference());
        r.setFurniturePreference(q.getFurniturePreference());
        r.setSunlightLevel(q.getSunlightLevel());
        r.setHumidityLevel(q.getHumidityLevel());
        r.setVastuCompliant(q.getVastuCompliant());
        r.setVastuNotes(q.getVastuNotes());
        r.setAdditionalRequirements(q.getAdditionalRequirements());
        r.setUpdatedAt(q.getUpdatedAt());
        return r;
    }

    public QuestionnaireResponse() {}

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getApartmentType() { return apartmentType; }
    public void setApartmentType(String apartmentType) { this.apartmentType = apartmentType; }

    public Double getCarpetAreaSqFt() { return carpetAreaSqFt; }
    public void setCarpetAreaSqFt(Double carpetAreaSqFt) { this.carpetAreaSqFt = carpetAreaSqFt; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public Double getBudgetMin() { return budgetMin; }
    public void setBudgetMin(Double budgetMin) { this.budgetMin = budgetMin; }

    public Double getBudgetMax() { return budgetMax; }
    public void setBudgetMax(Double budgetMax) { this.budgetMax = budgetMax; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getPreferredStyle() { return preferredStyle; }
    public void setPreferredStyle(String preferredStyle) { this.preferredStyle = preferredStyle; }

    public String getFlooringPreference() { return flooringPreference; }
    public void setFlooringPreference(String flooringPreference) { this.flooringPreference = flooringPreference; }

    public String getPaintWallpaperPreference() { return paintWallpaperPreference; }
    public void setPaintWallpaperPreference(String paintWallpaperPreference) { this.paintWallpaperPreference = paintWallpaperPreference; }

    public String getFurniturePreference() { return furniturePreference; }
    public void setFurniturePreference(String furniturePreference) { this.furniturePreference = furniturePreference; }

    public String getSunlightLevel() { return sunlightLevel; }
    public void setSunlightLevel(String sunlightLevel) { this.sunlightLevel = sunlightLevel; }

    public String getHumidityLevel() { return humidityLevel; }
    public void setHumidityLevel(String humidityLevel) { this.humidityLevel = humidityLevel; }

    public Boolean getVastuCompliant() { return vastuCompliant; }
    public void setVastuCompliant(Boolean vastuCompliant) { this.vastuCompliant = vastuCompliant; }

    public String getVastuNotes() { return vastuNotes; }
    public void setVastuNotes(String vastuNotes) { this.vastuNotes = vastuNotes; }

    public String getAdditionalRequirements() { return additionalRequirements; }
    public void setAdditionalRequirements(String additionalRequirements) { this.additionalRequirements = additionalRequirements; }

    public Long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Long updatedAt) { this.updatedAt = updatedAt; }
}
