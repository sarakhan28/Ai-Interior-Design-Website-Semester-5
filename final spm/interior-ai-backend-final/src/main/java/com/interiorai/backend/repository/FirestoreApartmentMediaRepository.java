package com.interiorai.backend.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.interiorai.backend.model.ApartmentMedia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class FirestoreApartmentMediaRepository implements ApartmentMediaRepository {

    private static final Logger log = LoggerFactory.getLogger(FirestoreApartmentMediaRepository.class);
    private static final String COLLECTION_NAME = "apartment_media";

    private final Firestore firestore;
    private final Map<String, ApartmentMedia> memoryStore = new ConcurrentHashMap<>();

    public FirestoreApartmentMediaRepository(@Nullable Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public ApartmentMedia save(ApartmentMedia media) {
        if (media.getId() == null) {
            media.setId(UUID.randomUUID().toString());
        }
        if (media.getUploadedAt() == null) {
            media.setUploadedAt(System.currentTimeMillis());
        }
        memoryStore.put(media.getId(), media);

        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(media.getId()).set(media).get();
            } catch (Exception e) {
                log.warn("Failed to write apartment media to Firestore: {}", e.getMessage());
            }
        }
        return media;
    }

    @Override
    public Optional<ApartmentMedia> findById(String id) {
        if (firestore != null) {
            try {
                DocumentSnapshot doc = firestore.collection(COLLECTION_NAME).document(id).get().get();
                if (doc.exists()) {
                    ApartmentMedia m = doc.toObject(ApartmentMedia.class);
                    if (m != null) {
                        memoryStore.put(m.getId(), m);
                        return Optional.of(m);
                    }
                }
            } catch (Exception e) {
                log.debug("Firestore fetch failed for media {}: {}", id, e.getMessage());
            }
        }
        return Optional.ofNullable(memoryStore.get(id));
    }

    @Override
    public List<ApartmentMedia> findByProjectId(String projectId) {
        if (firestore != null) {
            try {
                QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME)
                        .whereEqualTo("projectId", projectId)
                        .get().get();
                List<ApartmentMedia> list = snapshot.getDocuments().stream()
                        .map(d -> d.toObject(ApartmentMedia.class))
                        .filter(Objects::nonNull)
                        .sorted(Comparator.comparing(ApartmentMedia::getUploadedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                        .collect(Collectors.toList());
                if (!list.isEmpty()) {
                    list.forEach(m -> memoryStore.put(m.getId(), m));
                    return list;
                }
            } catch (Exception e) {
                log.debug("Firestore query failed for media by projectId {}: {}", projectId, e.getMessage());
            }
        }
        return memoryStore.values().stream()
                .filter(m -> projectId.equals(m.getProjectId()))
                .sorted(Comparator.comparing(ApartmentMedia::getUploadedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(String id) {
        memoryStore.remove(id);
        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(id).delete().get();
            } catch (Exception e) {
                log.warn("Failed to delete media {} from Firestore: {}", id, e.getMessage());
            }
        }
    }
}
