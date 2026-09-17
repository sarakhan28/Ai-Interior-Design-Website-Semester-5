package com.interiorai.backend.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.interiorai.backend.model.MaterialCategory;
import com.interiorai.backend.model.MaterialItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class FirestoreMaterialRepository implements MaterialRepository {

    private static final Logger log = LoggerFactory.getLogger(FirestoreMaterialRepository.class);
    private static final String COLLECTION_NAME = "materials";

    private final Firestore firestore;
    private final Map<String, MaterialItem> memoryStore = new ConcurrentHashMap<>();

    public FirestoreMaterialRepository(@Nullable Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public MaterialItem save(MaterialItem item) {
        if (item.getId() == null) {
            item.setId(UUID.randomUUID().toString());
        }
        memoryStore.put(item.getId(), item);

        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(item.getId()).set(item).get();
            } catch (Exception e) {
                log.warn("Failed to write material {} to Firestore: {}", item.getId(), e.getMessage());
            }
        }
        return item;
    }

    @Override
    public List<MaterialItem> saveAll(List<MaterialItem> items) {
        items.forEach(this::save);
        return items;
    }

    @Override
    public Optional<MaterialItem> findById(String id) {
        if (firestore != null) {
            try {
                DocumentSnapshot doc = firestore.collection(COLLECTION_NAME).document(id).get().get();
                if (doc.exists()) {
                    MaterialItem item = doc.toObject(MaterialItem.class);
                    if (item != null) {
                        memoryStore.put(item.getId(), item);
                        return Optional.of(item);
                    }
                }
            } catch (Exception e) {
                log.debug("Firestore fetch failed for material {}: {}", id, e.getMessage());
            }
        }
        return Optional.ofNullable(memoryStore.get(id));
    }

    @Override
    public List<MaterialItem> findAll() {
        if (firestore != null) {
            try {
                QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME).get().get();
                List<MaterialItem> list = snapshot.getDocuments().stream()
                        .map(d -> d.toObject(MaterialItem.class))
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList());
                if (!list.isEmpty()) {
                    list.forEach(i -> memoryStore.put(i.getId(), i));
                    return list;
                }
            } catch (Exception e) {
                log.debug("Firestore findAll failed for materials: {}", e.getMessage());
            }
        }
        return new ArrayList<>(memoryStore.values());
    }

    @Override
    public List<MaterialItem> findByCategory(MaterialCategory category) {
        return findAll().stream()
                .filter(m -> category == m.getCategory())
                .collect(Collectors.toList());
    }

    @Override
    public long count() {
        return findAll().size();
    }
}
