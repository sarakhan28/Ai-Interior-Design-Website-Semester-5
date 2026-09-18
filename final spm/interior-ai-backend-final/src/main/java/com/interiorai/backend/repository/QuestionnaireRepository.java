package com.interiorai.backend.repository;

import com.interiorai.backend.model.Questionnaire;

import java.util.Optional;

public interface QuestionnaireRepository {
    Questionnaire save(Questionnaire questionnaire);
    Optional<Questionnaire> findByProjectId(String projectId);
    void deleteByProjectId(String projectId);
}
