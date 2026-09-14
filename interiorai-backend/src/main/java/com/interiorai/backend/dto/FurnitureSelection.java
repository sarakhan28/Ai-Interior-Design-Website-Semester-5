package com.interiorai.backend.dto;

public class FurnitureSelection {
    private String materialId;
    private int quantity = 1;

    public FurnitureSelection() {}

    public FurnitureSelection(String materialId, int quantity) {
        this.materialId = materialId;
        this.quantity = quantity;
    }

    public String getMaterialId() { return materialId; }
    public void setMaterialId(String materialId) { this.materialId = materialId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
