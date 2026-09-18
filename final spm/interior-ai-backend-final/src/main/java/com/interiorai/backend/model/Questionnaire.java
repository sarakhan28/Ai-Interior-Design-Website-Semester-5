package com.interiorai.backend.model;

public class Questionnaire {
    private String projectId;
    private String userId;
    private String apartmentType; // 1BHK, 2BHK, 3BHK, Villa, Studio, etc.
    private Double carpetAreaSqFt;
    private String roomType; // Living Room, Bedroom, Kitchen, etc.
    private Double budgetMin;
    private Double budgetMax;
    private String currency = "INR";
    private String preferredStyle; // Modern Minimal, Scandinavian, Indian Contemporary, etc.
    private String flooringPreference; // Hardwood, Marble, Vitrified Tiles, Granite, Vinyl
    private String paintWallpaperPreference; // Accent Wall, Textured, Neutral Matte, Limewash
    private String furniturePreference; // Custom Built-in, Modular, Antique, Minimalist
    private String sunlightLevel; // Direct Sunlight, Moderate, Low/Shaded, North-Facing
    private String humidityLevel; // High/Coastal, Moderate, Low/Dry
    private Boolean vastuCompliant = true;
    private String vastuNotes;
    private String additionalRequirements;
    private Long updatedAt;

    public Questionnaire() {}

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

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
