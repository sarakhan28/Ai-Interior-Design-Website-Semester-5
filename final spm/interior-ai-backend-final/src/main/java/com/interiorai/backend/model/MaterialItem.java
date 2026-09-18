package com.interiorai.backend.model;

public class MaterialItem {
    private String id;
    private MaterialCategory category;
    private String subCategory;
    private String name;
    private String unit; // SQ_FT, PIECE, LITRE, ROOM
    private Double unitPriceInr;
    private String description;
    private String tier; // BUDGET, STANDARD, PREMIUM, LUXURY

    public MaterialItem() {}

    public MaterialItem(String id, MaterialCategory category, String subCategory, String name, 
                        String unit, Double unitPriceInr, String description, String tier) {
        this.id = id;
        this.category = category;
        this.subCategory = subCategory;
        this.name = name;
        this.unit = unit;
        this.unitPriceInr = unitPriceInr;
        this.description = description;
        this.tier = tier;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public MaterialCategory getCategory() { return category; }
    public void setCategory(MaterialCategory category) { this.category = category; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Double getUnitPriceInr() { return unitPriceInr; }
    public void setUnitPriceInr(Double unitPriceInr) { this.unitPriceInr = unitPriceInr; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }
}
