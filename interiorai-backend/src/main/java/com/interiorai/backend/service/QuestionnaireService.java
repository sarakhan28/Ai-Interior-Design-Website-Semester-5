package com.interiorai.backend.service;

import com.interiorai.backend.dto.QuestionnaireRequest;
import com.interiorai.backend.dto.QuestionnaireResponse;
import com.interiorai.backend.exception.ResourceNotFoundException;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.model.Questionnaire;
import com.interiorai.backend.repository.QuestionnaireRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class QuestionnaireService {

    private static final Logger log = LoggerFactory.getLogger(QuestionnaireService.class);

    private final QuestionnaireRepository questionnaireRepository;
    private final ProjectService projectService;

    public QuestionnaireService(QuestionnaireRepository questionnaireRepository,
                                ProjectService projectService) {
        this.questionnaireRepository = questionnaireRepository;
        this.projectService = projectService;
    }

    public QuestionnaireResponse saveQuestionnaire(String projectId, QuestionnaireRequest req, String userId) {
        Project project = projectService.getProject(projectId, userId);

        Questionnaire q = questionnaireRepository.findByProjectId(projectId)
                .orElse(new Questionnaire());

        q.setProjectId(projectId);
        q.setUserId(userId);
        req.applyTo(q);
        q.setUpdatedAt(System.currentTimeMillis());

        Questionnaire saved = questionnaireRepository.save(q);

        // Sync key fields back to the main project entity for fast summary rendering
        if (q.getRoomType() != null) project.setRoomType(q.getRoomType());
        if (q.getApartmentType() != null) project.setApartmentType(q.getApartmentType());
        if (q.getCarpetAreaSqFt() != null) project.setCarpetAreaSqFt(q.getCarpetAreaSqFt());
        if (q.getPreferredStyle() != null) project.setStyle(q.getPreferredStyle());
        if (q.getBudgetMax() != null) project.setTargetBudget(q.getBudgetMax());
        project.setQuestionnaire(saved);
        project.setUpdatedAt(System.currentTimeMillis());

        projectService.recordActivity(projectId, userId, "QUESTIONNAIRE_SAVED",
                "Submitted apartment questionnaire details (" + q.getApartmentType() + ", " + q.getPreferredStyle() + ")");

        log.info("Saved questionnaire for project {}", projectId);
        return QuestionnaireResponse.from(saved);
    }

    public QuestionnaireResponse getQuestionnaire(String projectId, String userId) {
        projectService.getProject(projectId, userId); // verify ownership

        Questionnaire q = questionnaireRepository.findByProjectId(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("No questionnaire found for project " + projectId));

        return QuestionnaireResponse.from(q);
    }
}
