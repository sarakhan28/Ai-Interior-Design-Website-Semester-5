package com.interiorai.backend.repository;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.interiorai.backend.model.ProjectHistory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class FirestoreProjectHistoryRepository implements ProjectHistoryRepository {

    private static final Logger log = LoggerFactory.getLogger(FirestoreProjectHistoryRepository.class);
    private static final String COLLECTION_NAME = "project_history";

    private final Firestore firestore;
    private final Map<String, ProjectHistory> memoryStore = new ConcurrentHashMap<>();

    public FirestoreProjectHistoryRepository(@Nullable Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public ProjectHistory save(ProjectHistory history) {
        if (history.getId() == null) {
            history.setId(UUID.randomUUID().toString());
        }
        if (history.getTimestamp() == null) {
            history.setTimestamp(System.currentTimeMillis());
        }
        memoryStore.put(history.getId(), history);

        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(history.getId()).set(history).get();
            } catch (Exception e) {
                log.warn("Failed to write project history to Firestore: {}", e.getMessage());
            }
        }
        return history;
    }

    @Override
    public List<ProjectHistory> findByProjectIdOrderByTimestampDesc(String projectId) {
        if (firestore != null) {
            try {
                QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME)
                        .whereEqualTo("projectId", projectId)
                        .get().get();
                List<ProjectHistory> list = snapshot.getDocuments().stream()
                        .map(d -> d.toObject(ProjectHistory.class))
                        .filter(Objects::nonNull)
                        .sorted(Comparator.comparing(ProjectHistory::getTimestamp, Comparator.nullsLast(Comparator.reverseOrder())))
                        .collect(Collectors.toList());
                if (!list.isEmpty()) {
                    return list;
                }
            } catch (Exception e) {
                log.debug("Firestore query failed for project history: {}", e.getMessage());
            }
        }

        return memoryStore.values().stream()
                .filter(h -> projectId.equals(h.getProjectId()))
                .sorted(Comparator.comparing(ProjectHistory::getTimestamp, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectHistory> findByUserIdOrderByTimestampDesc(String userId, int limit) {
        if (firestore != null) {
            try {
                QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME)
                        .whereEqualTo("userId", userId)
                        .get().get();
                List<ProjectHistory> list = snapshot.getDocuments().stream()
                        .map(d -> d.toObject(ProjectHistory.class))
                        .filter(Objects::nonNull)
                        .sorted(Comparator.comparing(ProjectHistory::getTimestamp, Comparator.nullsLast(Comparator.reverseOrder())))
                        .limit(limit)
                        .collect(Collectors.toList());
                if (!list.isEmpty()) {
                    return list;
                }
            } catch (Exception e) {
                log.debug("Firestore history query by userId failed: {}", e.getMessage());
            }
        }

        return memoryStore.values().stream()
                .filter(h -> userId.equals(h.getUserId()))
                .sorted(Comparator.comparing(ProjectHistory::getTimestamp, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(limit)
                .collect(Collectors.toList());
    }
}
