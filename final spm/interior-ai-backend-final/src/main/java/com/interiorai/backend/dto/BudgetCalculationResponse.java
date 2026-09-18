package com.interiorai.backend.dto;

import com.interiorai.backend.model.BudgetItem;
import com.interiorai.backend.model.ProjectBudget;

import java.util.ArrayList;
import java.util.List;

public class BudgetCalculationResponse {
    private Double carpetAreaSqFt;
    private Double flooringCost = 0.0;
    private List<BudgetItem> flooringDetails = new ArrayList<>();
    private Double paintingCost = 0.0;
    private List<BudgetItem> paintingDetails = new ArrayList<>();
    private Double furnitureCost = 0.0;
    private List<BudgetItem> furnitureDetails = new ArrayList<>();
    private Double laborCost = 0.0;
    private Double gstTax = 0.0;
    private Double subTotal = 0.0;
    private Double grandTotal = 0.0;
    private String currency = "INR";
    private Long calculatedAt;

    public static BudgetCalculationResponse from(ProjectBudget pb) {
        if (pb == null) return null;
        BudgetCalculationResponse r = new BudgetCalculationResponse();
        r.setCarpetAreaSqFt(pb.getCarpetAreaSqFt());
        r.setFlooringCost(pb.getFlooringCost());
        r.setFlooringDetails(pb.getFlooringDetails());
        r.setPaintingCost(pb.getPaintingCost());
        r.setPaintingDetails(pb.getPaintingDetails());
        r.setFurnitureCost(pb.getFurnitureCost());
        r.setFurnitureDetails(pb.getFurnitureDetails());
        r.setLaborCost(pb.getLaborCost());
        r.setGstTax(pb.getGstTax());
        r.setSubTotal(pb.getFlooringCost() + pb.getPaintingCost() + pb.getFurnitureCost() + pb.getLaborCost());
        r.setGrandTotal(pb.getGrandTotal());
        r.setCalculatedAt(pb.getCalculatedAt());
        return r;
    }

    public BudgetCalculationResponse() {}

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

    public Double getSubTotal() { return subTotal; }
    public void setSubTotal(Double subTotal) { this.subTotal = subTotal; }

    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double grandTotal) { this.grandTotal = grandTotal; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public Long getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(Long calculatedAt) { this.calculatedAt = calculatedAt; }
}
