package com.interiorai.backend.service;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.interiorai.backend.exception.InvalidFileException;
import com.interiorai.backend.model.MediaTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class StorageService {

    private static final Logger log = LoggerFactory.getLogger(StorageService.class);

    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic"
    );

    private static final List<String> ALLOWED_VIDEO_TYPES = Arrays.asList(
            "video/mp4", "video/quicktime", "video/webm", "video/x-matroska", "video/avi"
    );

    private static final long MAX_IMAGE_SIZE = 15 * 1024 * 1024L; // 15 MB
    private static final long MAX_VIDEO_SIZE = 100 * 1024 * 1024L; // 100 MB

    private final Storage storage;
    private final String bucketName;
    private final String mockStorageDir = "local_storage_uploads";

    public StorageService(@org.springframework.beans.factory.annotation.Autowired(required = false) @Nullable Storage storage,
                          @Value("${firebase.storage.bucket:interiorai-studio.appspot.com}") String bucketName) {
        this.storage = storage;
        this.bucketName = bucketName;
    }

    public MediaTypeEnum validateAndGetMediaType(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("Uploaded file is empty or missing.");
        }

        String contentType = file.getContentType();
        if (contentType == null) {
            String name = file.getOriginalFilename();
            if (name != null && (name.endsWith(".mp4") || name.endsWith(".mov") || name.endsWith(".webm"))) {
                contentType = "video/mp4";
            } else {
                contentType = "image/jpeg";
            }
        }

        contentType = contentType.toLowerCase();

        if (ALLOWED_IMAGE_TYPES.contains(contentType)) {
            if (file.getSize() > MAX_IMAGE_SIZE) {
                throw new InvalidFileException("Image size exceeds maximum limit of 15MB. Current size: " + (file.getSize() / 1024 / 1024) + "MB");
            }
            return MediaTypeEnum.IMAGE;
        }

        if (ALLOWED_VIDEO_TYPES.contains(contentType)) {
            if (file.getSize() > MAX_VIDEO_SIZE) {
                throw new InvalidFileException("Video size exceeds maximum limit of 100MB. Current size: " + (file.getSize() / 1024 / 1024) + "MB");
            }
            return MediaTypeEnum.VIDEO;
        }

        throw new InvalidFileException("Unsupported file type: " + contentType + ". Allowed formats: JPG, PNG, WEBP, MP4, MOV, WEBM.");
    }

    public String uploadFile(MultipartFile file, String userId, String projectId) throws IOException {
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "file");
        String extension = "";
        int extIndex = originalFilename.lastIndexOf(".");
        if (extIndex > 0) {
            extension = originalFilename.substring(extIndex);
        }

        String storageFileName = "projects/" + projectId + "/" + UUID.randomUUID() + extension;

        if (storage != null) {
            try {
                BlobId blobId = BlobId.of(bucketName, storageFileName);
                BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                        .setContentType(file.getContentType())
                        .build();
                storage.create(blobInfo, file.getBytes());
                String downloadUrl = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                        bucketName, storageFileName.replace("/", "%2F"));
                log.info("Uploaded file to Firebase Storage: {}", downloadUrl);
                return downloadUrl;
            } catch (Exception e) {
                log.warn("Firebase Storage upload failed: {}. Falling back to local storage.", e.getMessage());
            }
        }

        // Mock / local storage fallback
        Path localDirPath = Paths.get(mockStorageDir, projectId);
        Files.createDirectories(localDirPath);
        Path localFilePath = localDirPath.resolve(UUID.randomUUID() + extension);
        try (FileOutputStream fos = new FileOutputStream(localFilePath.toFile())) {
            fos.write(file.getBytes());
        }

        log.info("Saved file locally to: {}", localFilePath.toAbsolutePath());
        return "/api/media/file/" + projectId + "/" + localFilePath.getFileName();
    }
}
