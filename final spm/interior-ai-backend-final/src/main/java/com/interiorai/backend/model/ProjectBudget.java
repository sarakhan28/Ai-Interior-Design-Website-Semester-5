package com.interiorai.backend.model;

import java.util.ArrayList;
import java.util.List;

public class ProjectBudget {
    private String projectId;
    private Double carpetAreaSqFt;
    private Double flooringCost = 0.0;
    private List<BudgetItem> flooringDetails = new ArrayList<>();
    private Double paintingCost = 0.0;
    private List<BudgetItem> paintingDetails = new ArrayList<>();
    private Double furnitureCost = 0.0;
    private List<BudgetItem> furnitureDetails = new ArrayList<>();
    private Double laborCost = 0.0;
    private Double gstTax = 0.0;
    private Double grandTotal = 0.0;
    private Long calculatedAt;

    public ProjectBudget() {}

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public Double getCarpetAreaSqFt() { return carpetAreaSqFt; }
    public void setCarpetAreaSqFt(Double carpetAreaSqFt) { this.carpetAreaSqFt = carpetAreaSqFt; }

    public Double getFlooringCost() { return flooringCost; }
    public void setFlooringCost(Double flooringCost) { this.flooringCost = flooringCost; }

    public List<BudgetItem> getFlooringDetails() { return flooringDetails; }
    public void setFlooringDetails(List<BudgetItem> flooringDetails) { this.flooringDetails = flooringDetails; }

    public Double getPaintingCost() { return paintingCost; }
    public void setPaintingCost(Double paintingCost) { this.paintingCost = paintingCost; }

    public List<BudgetItem> getPaintingDetails() { return paintingDetails; }
    public void setPaintingDetails(List<BudgetItem> paintingDetails) { this.paintingDetails = paintingDetails; }

    public Double getFurnitureCost() { return furnitureCost; }
    public void setFurnitureCost(Double furnitureCost) { this.furnitureCost = furnitureCost; }

    public List<BudgetItem> getFurnitureDetails() { return furnitureDetails; }
    public void setFurnitureDetails(List<BudgetItem> furnitureDetails) { this.furnitureDetails = furnitureDetails; }

    public Double getLaborCost() { return laborCost; }
    public void setLaborCost(Double laborCost) { this.laborCost = laborCost; }

    public Double getGstTax() { return gstTax; }
    public void setGstTax(Double gstTax) { this.gstTax = gstTax; }

    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double grandTotal) { this.grandTotal = grandTotal; }

    public Long getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(Long calculatedAt) { this.calculatedAt = calculatedAt; }
}
