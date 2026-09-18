package com.interiorai.backend.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.interiorai.backend.model.Questionnaire;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class FirestoreQuestionnaireRepository implements QuestionnaireRepository {

    private static final Logger log = LoggerFactory.getLogger(FirestoreQuestionnaireRepository.class);
    private static final String COLLECTION_NAME = "questionnaires";

    private final Firestore firestore;
    private final Map<String, Questionnaire> memoryStore = new ConcurrentHashMap<>();

    public FirestoreQuestionnaireRepository(@Nullable Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public Questionnaire save(Questionnaire questionnaire) {
        if (questionnaire.getUpdatedAt() == null) {
            questionnaire.setUpdatedAt(System.currentTimeMillis());
        }
        memoryStore.put(questionnaire.getProjectId(), questionnaire);

        if (firestore != null) {
            try {
                firestore.collection(COLLECTION_NAME).document(questionnaire.getProjectId()).set(questionnaire).get();
            } catch (Exception e) {
                log.warn("Failed to write questionnaire for project {} to Firestore: {}", questionnaire.getProjectId(), e.getMessage());
            }
        }
        return questionnaire;
    }

    @Override
    public Optional<Questionnaire> findByProjectId(String projectId) {
        if (firestore != null) {
            try {
                DocumentSnapshot doc = firestore.collection(COLLECTION_NAME).document(projectId).get().get();
                if (doc.exists()) {
                    Questionnaire q = doc.toObject(Questionnaire.class);
                    if (q != null) {
                        memoryStore.put(projectId, q);
                        return Optional.of(q);
                    }
                }
            } catch (Exception e) {
                log.debug("Firestore fetch failed for questionnaire project {}: {}", projectId, e.getMessage());
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
                log.warn("Failed to delete questionnaire for project {} from Firestore: {}", projectId, e.getMessage());
            }
        }
    }
}
