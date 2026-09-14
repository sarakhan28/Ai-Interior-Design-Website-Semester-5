package com.interiorai.backend;

import com.interiorai.backend.dto.CreateProjectRequest;
import com.interiorai.backend.dto.EstimateBudgetRequest;
import com.interiorai.backend.dto.QuestionnaireRequest;
import com.interiorai.backend.dto.SaveAiDataRequest;
import com.interiorai.backend.model.PaletteColor;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.model.ShoppingItem;
import com.interiorai.backend.service.BudgetService;
import com.interiorai.backend.service.PdfReportService;
import com.interiorai.backend.service.ProjectService;
import com.interiorai.backend.service.QuestionnaireService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PdfReportGenerationTest {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private QuestionnaireService questionnaireService;

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private PdfReportService pdfReportService;

    @Test
    @DisplayName("Verify PDFBox Report Generation with Real Project Data (ADWP-120-127)")
    void testPdfGeneration() throws IOException {
        String userId = "pdf-test-user";

        // 1. Create Project
        CreateProjectRequest createReq = new CreateProjectRequest();
        createReq.setName("Bengaluru Penthouse Lounge");
        createReq.setRoomType("Living Room");
        createReq.setStyle("Scandinavian");
        createReq.setCarpetAreaSqFt(280.0);
        createReq.setTargetBudget(450000.0);
        Project project = projectService.createProject(createReq, userId);

        // 2. Add Questionnaire
        QuestionnaireRequest qReq = new QuestionnaireRequest();
        qReq.setApartmentType("Penthouse");
        qReq.setCarpetAreaSqFt(280.0);
        qReq.setSunlightLevel("North-Facing Indirect");
        qReq.setHumidityLevel("Moderate");
        qReq.setFlooringPreference("Engineered Oak Hardwood");
        qReq.setVastuCompliant(true);
        questionnaireService.saveQuestionnaire(project.getId(), qReq, userId);

        // 3. Add Budget Calculation
        EstimateBudgetRequest bReq = new EstimateBudgetRequest();
        bReq.setCarpetAreaSqFt(280.0);
        bReq.setRoomType("Living Room");
        budgetService.saveProjectBudget(project.getId(), bReq, userId);

        // 4. Attach sample frontend design data (ADWP-124/125)
        SaveAiDataRequest aiData = new SaveAiDataRequest();
        aiData.setSummary("An airy Scandinavian lounge layered with neutral oak tones, linen fabrics, and soft diffuse lighting.");
        aiData.setPalette(Arrays.asList(
                new PaletteColor("Warm Sand", "#E8E2D5"),
                new PaletteColor("Nordic Sage", "#B5C2B7"),
                new PaletteColor("Charcoal Slate", "#2D3436")
        ));
        aiData.setItems(Arrays.asList(
                new ShoppingItem("Fluted Oak Sofa", "3-seater textured linen", 48000.0, "Seating"),
                new ShoppingItem("Travertine Coffee Table", "Honed natural stone", 16000.0, "Tables")
        ));
        aiData.setVastuNote("Position the master seating along the south wall facing north for optimal energy flow.");
        projectService.saveAiDesignData(project.getId(), aiData, userId);

        // 5. Generate PDF
        byte[] pdfBytes = pdfReportService.generateProjectReportPdf(project.getId(), userId);

        assertNotNull(pdfBytes, "Generated PDF byte array should not be null");
        assertTrue(pdfBytes.length > 2000, "Generated PDF must contain substantial report content");

        // Verify PDF Magic Bytes (%PDF-)
        String header = new String(pdfBytes, 0, Math.min(5, pdfBytes.length));
        assertEquals("%PDF-", header, "Generated file must be a valid PDF document");

        // Verify PDF can be opened and parsed by PDFBox
        try (PDDocument doc = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
            assertTrue(doc.getNumberOfPages() >= 1, "PDF should have at least 1 page");
        }
    }
}
