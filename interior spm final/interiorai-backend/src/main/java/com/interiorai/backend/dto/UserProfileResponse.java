package com.interiorai.backend.dto;

public class UserProfileResponse {
    private String uid;
    private String email;
    private String name;
    private String picture;
    private boolean emailVerified;

    public UserProfileResponse() {}

    public UserProfileResponse(String uid, String email, String name, String picture, boolean emailVerified) {
        this.uid = uid;
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.emailVerified = emailVerified;
    }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPicture() { return picture; }
    public void setPicture(String picture) { this.picture = picture; }

    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
}
