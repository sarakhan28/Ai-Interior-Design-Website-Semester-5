package com.interiorai.backend.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.interiorai.backend.model.ProjectBudget;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class FirestoreProjectBudgetRepository implements ProjectBudgetRepository {

    private static final Logger log = LoggerFactory.getLogger(FirestoreProjectBudgetRepository.class);
    private static final String COLLECTION_NAME = "project_budgets";

    private final Firestore firestore;
    private final Map<String, ProjectBudget> memoryStore = new ConcurrentHashMap<>();

    public FirestoreProjectBudgetRepository(@Nullable Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public ProjectBudget save(ProjectBudget budget) {
        if (budget.getCalculatedAt() == null) {
            budget.setCalculatedAt(System.currentTimeMillis());
        }
        memoryStore.put(budget.getProjectId(), budget);

        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(budget.getProjectId()).set(budget).get();
            } catch (Exception e) {
                log.warn("Failed to write project budget to Firestore: {}", e.getMessage());
            }
        }
        return budget;
    }

    @Override
    public Optional<ProjectBudget> findByProjectId(String projectId) {
        if (firestore != null) {
            try {
                DocumentSnapshot doc = firestore.collection(COLLECTION_NAME).document(projectId).get().get();
                if (doc.exists()) {
                    ProjectBudget pb = doc.toObject(ProjectBudget.class);
                    if (pb != null) {
                        memoryStore.put(projectId, pb);
                        return Optional.of(pb);
                    }
                }
            } catch (Exception e) {
                log.debug("Firestore fetch failed for budget {}: {}", projectId, e.getMessage());
            }
        }
        return Optional.ofNullable(memoryStore.get(projectId));
    }

    @Override
    public void deleteByProjectId(String projectId) {
        memoryStore.remove(projectId);
        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(projectId).delete().get();
            } catch (Exception e) {
                log.warn("Failed to delete budget for project {} from Firestore: {}", projectId, e.getMessage());
            }
        }
    }
}
