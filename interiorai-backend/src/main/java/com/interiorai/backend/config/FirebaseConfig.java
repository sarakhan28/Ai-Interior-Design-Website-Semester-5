package com.interiorai.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.storage.Storage;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    private static final Logger log = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.credentials.path:}")
    private String credentialsPath;

    @Value("${firebase.credentials.json:}")
    private String credentialsJson;

    @Value("${firebase.storage.bucket:interiorai-studio.appspot.com}")
    private String storageBucket;

    @Value("${firebase.mock.enabled:true}")
    private boolean mockEnabled;

    private synchronized FirebaseApp getOrInitFirebaseApp() {
        if (!FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.getInstance();
        }

        try {
            InputStream credentialsStream = null;

            if (StringUtils.hasText(credentialsJson)) {
                log.info("Initializing Firebase using FIREBASE_CREDENTIALS_JSON");
                credentialsStream = new ByteArrayInputStream(credentialsJson.getBytes(StandardCharsets.UTF_8));
            } else if (StringUtils.hasText(credentialsPath)) {
                File file = new File(credentialsPath);
                if (file.exists()) {
                    log.info("Initializing Firebase using service account file at: {}", credentialsPath);
                    credentialsStream = new FileInputStream(file);
                } else {
                    log.warn("Configured credentials path does not exist: {}", credentialsPath);
                }
            }

            if (credentialsStream != null) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(credentialsStream))
                        .setStorageBucket(storageBucket)
                        .build();
                return FirebaseApp.initializeApp(options);
            }

            // Attempt default application credentials
            try {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.getApplicationDefault())
                        .setStorageBucket(storageBucket)
                        .build();
                log.info("Initializing Firebase using Google Application Default Credentials");
                return FirebaseApp.initializeApp(options);
            } catch (Exception e) {
                log.info("No Google Application Default Credentials found.");
            }

        } catch (Exception e) {
            log.error("Failed to initialize real FirebaseApp: {}", e.getMessage(), e);
        }

        if (mockEnabled) {
            log.warn("Running in Firebase Mock Mode. Real Firebase credentials were not detected. Mock/in-memory services will be used.");
            return null;
        }

        throw new IllegalStateException("Firebase credentials not configured and mock mode is disabled.");
    }

    @Bean
    @Nullable
    public FirebaseApp firebaseApp() {
        return getOrInitFirebaseApp();
    }

    @Bean
    @Nullable
    public FirebaseAuth firebaseAuth() {
        FirebaseApp app = getOrInitFirebaseApp();
        if (app != null) {
            return FirebaseAuth.getInstance(app);
        }
        log.info("FirebaseAuth bean registered as null (Mock Mode active).");
        return null;
    }

    @Bean
    @Nullable
    public Firestore firestore() {
        FirebaseApp app = getOrInitFirebaseApp();
        if (app != null) {
            return FirestoreClient.getFirestore(app);
        }
        log.info("Firestore bean registered as null (In-Memory Repository store active).");
        return null;
    }

    @Bean
    @Nullable
    public Storage storage() {
        FirebaseApp app = getOrInitFirebaseApp();
        if (app != null) {
            return StorageClient.getInstance(app).bucket(storageBucket).getStorage();
        }
        log.info("Cloud Storage bean registered as null (Mock Storage active).");
        return null;
    }
}
