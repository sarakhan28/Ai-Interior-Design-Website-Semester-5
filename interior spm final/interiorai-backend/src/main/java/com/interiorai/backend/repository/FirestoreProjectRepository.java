package com.interiorai.backend.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.model.ProjectStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class FirestoreProjectRepository implements ProjectRepository {

    private static final Logger log = LoggerFactory.getLogger(FirestoreProjectRepository.class);
    private static final String COLLECTION_NAME = "projects";

    private final Firestore firestore;
    private final Map<String, Project> memoryStore = new ConcurrentHashMap<>();

    public FirestoreProjectRepository(@Nullable Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public Project save(Project project) {
        if (project.getId() == null) {
            project.setId(UUID.randomUUID().toString());
        }
        memoryStore.put(project.getId(), project);

        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(project.getId()).set(project).get();
                log.debug("Persisted project {} to Firestore", project.getId());
            } catch (Exception e) {
                log.warn("Failed to write project {} to Firestore, stored in memory: {}", project.getId(), e.getMessage());
            }
        }
        return project;
    }

    @Override
    public Optional<Project> findById(String id) {
        if (firestore != null) {
            try {
                DocumentSnapshot doc = firestore.collection(COLLECTION_NAME).document(id).get().get();
                if (doc.exists()) {
                    Project p = doc.toObject(Project.class);
                    if (p != null) {
                        memoryStore.put(p.getId(), p);
                        return Optional.of(p);
                    }
                }
            } catch (Exception e) {
                log.debug("Firestore fetch failed for project {}: {}, checking memory", id, e.getMessage());
            }
        }
        return Optional.ofNullable(memoryStore.get(id));
    }

    @Override
    public List<Project> findByUserId(String userId) {
        if (firestore != null) {
            try {
                QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME)
                        .whereEqualTo("userId", userId)
                        .get().get();
                List<Project> list = snapshot.getDocuments().stream()
                        .map(d -> d.toObject(Project.class))
                        .filter(Objects::nonNull)
                        .sorted(Comparator.comparing(Project::getUpdatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                        .collect(Collectors.toList());
                if (!list.isEmpty()) {
                    list.forEach(p -> memoryStore.put(p.getId(), p));
                    return list;
                }
            } catch (Exception e) {
                log.debug("Firestore list failed for userId {}: {}, falling back to memory", userId, e.getMessage());
            }
        }
        return memoryStore.values().stream()
                .filter(p -> userId.equals(p.getUserId()))
                .sorted(Comparator.comparing(Project::getUpdatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(String id) {
        memoryStore.remove(id);
        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(id).delete().get();
                log.debug("Deleted project {} from Firestore", id);
            } catch (Exception e) {
                log.warn("Failed to delete project {} from Firestore: {}", id, e.getMessage());
            }
        }
    }

    @Override
    public long countByUserId(String userId) {
        return findByUserId(userId).size();
    }

    @Override
    public long countByUserIdAndStatus(String userId, ProjectStatus status) {
        return findByUserId(userId).stream()
                .filter(p -> status == p.getStatus())
                .count();
    }
}
