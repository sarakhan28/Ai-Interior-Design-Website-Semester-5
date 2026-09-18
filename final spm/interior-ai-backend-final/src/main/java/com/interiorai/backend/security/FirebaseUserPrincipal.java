package com.interiorai.backend.security;

import java.security.Principal;

public class FirebaseUserPrincipal implements Principal {
    private final String uid;
    private final String email;
    private final String name;
    private final String picture;

    public FirebaseUserPrincipal(String uid, String email, String name, String picture) {
        this.uid = uid;
        this.email = email;
        this.name = name != null ? name : (email != null ? email.split("@")[0] : "User");
        this.picture = picture;
    }

    public String getUid() {
        return uid;
    }

    public String getEmail() {
        return email;
    }

    public String getPicture() {
        return picture;
    }

    @Override
    public String getName() {
        return name;
    }
}
