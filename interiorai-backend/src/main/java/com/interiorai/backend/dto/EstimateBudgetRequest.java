package com.interiorai.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class EstimateBudgetRequest {

    private String roomType; // Living Room, Bedroom, Kitchen, etc.

    @NotNull(message = "Carpet area in sq ft is required")
    @DecimalMin(value = "20.0", message = "Carpet area must be at least 20 sq ft")
    private Double carpetAreaSqFt;

    private String flooringMaterialId; // Reference to MaterialItem ID
    private String paintingMaterialId; // Reference to MaterialItem ID
    private List<FurnitureSelection> furnitureItems = new ArrayList<>();

    private Double laborPercentage = 15.0; // Default 15% labor
    private Double gstPercentage = 18.0; // Standard 18% GST

    public EstimateBudgetRequest() {}

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public Double getCarpetAreaSqFt() { return carpetAreaSqFt; }
    public void setCarpetAreaSqFt(Double carpetAreaSqFt) { this.carpetAreaSqFt = carpetAreaSqFt; }

    public String getFlooringMaterialId() { return flooringMaterialId; }
    public void setFlooringMaterialId(String flooringMaterialId) { this.flooringMaterialId = flooringMaterialId; }

    public String getPaintingMaterialId() { return paintingMaterialId; }
    public void setPaintingMaterialId(String paintingMaterialId) { this.paintingMaterialId = paintingMaterialId; }

    public List<FurnitureSelection> getFurnitureItems() { return furnitureItems; }
    public void setFurnitureItems(List<FurnitureSelection> furnitureItems) { this.furnitureItems = furnitureItems; }

    public Double getLaborPercentage() { return laborPercentage; }
    public void setLaborPercentage(Double laborPercentage) { this.laborPercentage = laborPercentage; }

    public Double getGstPercentage() { return gstPercentage; }
    public void setGstPercentage(Double gstPercentage) { this.gstPercentage = gstPercentage; }
}
