package com.interiorai.backend.dto;

import com.interiorai.backend.model.Questionnaire;

public class QuestionnaireRequest {
    private String apartmentType; // 1BHK, 2BHK, 3BHK, Villa, Studio
    private Double carpetAreaSqFt;
    private String roomType; // Living Room, Bedroom, Kitchen, etc.
    private Double budgetMin;
    private Double budgetMax;
    private String currency = "INR";
    private String preferredStyle;
    private String flooringPreference;
    private String paintWallpaperPreference;
    private String furniturePreference;
    private String sunlightLevel;
    private String humidityLevel;
    private Boolean vastuCompliant = true;
    private String vastuNotes;
    private String additionalRequirements;

    public QuestionnaireRequest() {}

    public void applyTo(Questionnaire q) {
        if (apartmentType != null) q.setApartmentType(apartmentType);
        if (carpetAreaSqFt != null) q.setCarpetAreaSqFt(carpetAreaSqFt);
        if (roomType != null) q.setRoomType(roomType);
        if (budgetMin != null) q.setBudgetMin(budgetMin);
        if (budgetMax != null) q.setBudgetMax(budgetMax);
        if (currency != null) q.setCurrency(currency);
        if (preferredStyle != null) q.setPreferredStyle(preferredStyle);
        if (flooringPreference != null) q.setFlooringPreference(flooringPreference);
        if (paintWallpaperPreference != null) q.setPaintWallpaperPreference(paintWallpaperPreference);
        if (furniturePreference != null) q.setFurniturePreference(furniturePreference);
        if (sunlightLevel != null) q.setSunlightLevel(sunlightLevel);
        if (humidityLevel != null) q.setHumidityLevel(humidityLevel);
        if (vastuCompliant != null) q.setVastuCompliant(vastuCompliant);
        if (vastuNotes != null) q.setVastuNotes(vastuNotes);
        if (additionalRequirements != null) q.setAdditionalRequirements(additionalRequirements);
    }

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
}
