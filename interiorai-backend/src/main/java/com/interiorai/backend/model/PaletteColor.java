package com.interiorai.backend.model;

public class PaletteColor {
    private String name;
    private String hex;

    public PaletteColor() {}

    public PaletteColor(String name, String hex) {
        this.name = name;
        this.hex = hex;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getHex() { return hex; }
    public void setHex(String hex) { this.hex = hex; }
}
