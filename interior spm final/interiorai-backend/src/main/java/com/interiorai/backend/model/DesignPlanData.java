package com.interiorai.backend.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Stores already-generated AI design data supplied by the frontend or external system.
 * NOTE: The backend does NOT generate AI data (ADWP-94-101 is OUT OF SCOPE).
 * This entity solely persists and presents already-supplied design information in PDF reports (ADWP-124/125).
 */
public class DesignPlanData {
    private String summary;
    private List<PaletteColor> palette = new ArrayList<>();
    private List<String> materials = new ArrayList<>();
    private List<ShoppingItem> items = new ArrayList<>();
    private Double totalCost;
    private Integer designScore;
    private String vastuNote;
    private String renderedImageUrl;

    public DesignPlanData() {}

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public List<PaletteColor> getPalette() { return palette; }
    public void setPalette(List<PaletteColor> palette) { this.palette = palette; }

    public List<String> getMaterials() { return materials; }
    public void setMaterials(List<String> materials) { this.materials = materials; }

    public List<ShoppingItem> getItems() { return items; }
    public void setItems(List<ShoppingItem> items) { this.items = items; }

    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }

    public Integer getDesignScore() { return designScore; }
    public void setDesignScore(Integer designScore) { this.designScore = designScore; }

    public String getVastuNote() { return vastuNote; }
    public void setVastuNote(String vastuNote) { this.vastuNote = vastuNote; }

    public String getRenderedImageUrl() { return renderedImageUrl; }
    public void setRenderedImageUrl(String renderedImageUrl) { this.renderedImageUrl = renderedImageUrl; }
}
