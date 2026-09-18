package com.interiorai.backend.service;

import com.interiorai.backend.model.*;
import com.interiorai.backend.util.CurrencyUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PdfReportService {

    private static final Logger log = LoggerFactory.getLogger(PdfReportService.class);

    private final ProjectService projectService;

    // Palette Colors matching InteriorAI Studio Design System
    private static final Color COLOR_PRIMARY = new Color(24, 115, 78);     // Jade Green
    private static final Color COLOR_DARK = new Color(33, 43, 38);          // Charcoal Slate
    private static final Color COLOR_MUTED = new Color(110, 125, 118);      // Muted Sage
    private static final Color COLOR_ACCENT = new Color(205, 140, 30);      // Warm Gold
    private static final Color COLOR_BG_LIGHT = new Color(244, 248, 245);   // Leaf Tint
    private static final Color COLOR_BORDER = new Color(210, 225, 218);     // Soft Border

    public PdfReportService(ProjectService projectService) {
        this.projectService = projectService;
    }

    public byte[] generateProjectReportPdf(String projectId, String userId) throws IOException {
        Project project = projectService.getProject(projectId, userId);

        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            float pageWidth = PDRectangle.A4.getWidth();
            float pageHeight = PDRectangle.A4.getHeight();
            float margin = 45f;
            float contentWidth = pageWidth - (margin * 2);
            float y = pageHeight - margin;

            PDPageContentStream cs = new PDPageContentStream(document, page);

            // ================= PAGE 1: HEADER & BANNER =================
            // Top Accent Bar
            cs.setNonStrokingColor(COLOR_PRIMARY);
            cs.addRect(margin, y - 4, contentWidth, 4);
            cs.fill();
            y -= 25;

            // Brand Title
            drawText(cs, PDType1Font.HELVETICA_BOLD, 20, margin, y, "INTERIORAI STUDIO", COLOR_PRIMARY);
            drawText(cs, PDType1Font.HELVETICA, 10, pageWidth - margin - 150, y + 5,
                    "Generated: " + new SimpleDateFormat("dd MMM yyyy, HH:mm").format(new Date()), COLOR_MUTED);
            y -= 14;

            drawText(cs, PDType1Font.HELVETICA, 10, margin, y,
                    "Comprehensive Interior Design Specification & Non-AI Budget Plan", COLOR_MUTED);
            y -= 25;

            // Project Details Box
            cs.setNonStrokingColor(COLOR_BG_LIGHT);
            cs.setStrokingColor(COLOR_BORDER);
            cs.addRect(margin, y - 85, contentWidth, 85);
            cs.fillAndStroke();

            float boxY = y - 20;
            drawText(cs, PDType1Font.HELVETICA_BOLD, 14, margin + 15, boxY, sanitize(project.getName()), COLOR_DARK);
            boxY -= 18;

            String roomStyle = "Room: " + sanitize(project.getRoomType()) + "  |  Style: " + sanitize(project.getStyle());
            drawText(cs, PDType1Font.HELVETICA, 10, margin + 15, boxY, roomStyle, COLOR_MUTED);
            boxY -= 16;

            String statusBudget = "Status: " + project.getStatus() +
                    "  |  Target Budget: " + formatCurrency(project.getTargetBudget()) +
                    "  |  Project ID: " + project.getId().substring(0, Math.min(8, project.getId().length()));
            drawText(cs, PDType1Font.HELVETICA, 10, margin + 15, boxY, statusBudget, COLOR_MUTED);

            y -= 105;

            // ================= QUESTIONNAIRE / SPACE DETAILS =================
            drawSectionTitle(cs, margin, y, "1. APARTMENT & SPACE SPECIFICATIONS");
            y -= 22;

            Questionnaire q = project.getQuestionnaire();
            String aptType = q != null && q.getApartmentType() != null ? q.getApartmentType() : (project.getApartmentType() != null ? project.getApartmentType() : "Standard Residential");
            String carpetArea = q != null && q.getCarpetAreaSqFt() != null ? q.getCarpetAreaSqFt() + " sq ft" : (project.getCarpetAreaSqFt() != null ? project.getCarpetAreaSqFt() + " sq ft" : "180 sq ft");
            String sunlight = q != null && q.getSunlightLevel() != null ? q.getSunlightLevel() : "Moderate Natural Light";
            String humidity = q != null && q.getHumidityLevel() != null ? q.getHumidityLevel() : "Moderate / Controlled";
            String vastu = q != null && Boolean.TRUE.equals(q.getVastuCompliant()) ? "Vastu Compliant Layout Required" : "Standard Orientation";
            String flooringPref = q != null && q.getFlooringPreference() != null ? q.getFlooringPreference() : "Premium Finish";

            String[][] specGrid = {
                    {"Apartment Layout:", aptType, "Carpet Area:", carpetArea},
                    {"Natural Sunlight:", sunlight, "Humidity Index:", humidity},
                    {"Vastu Preference:", vastu, "Flooring Preference:", flooringPref}
            };

            for (String[] row : specGrid) {
                drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin + 10, y, row[0], COLOR_DARK);
                drawText(cs, PDType1Font.HELVETICA, 9, margin + 120, y, row[1], COLOR_MUTED);
                drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin + 260, y, row[2], COLOR_DARK);
                drawText(cs, PDType1Font.HELVETICA, 9, margin + 370, y, row[3], COLOR_MUTED);
                y -= 16;
            }
            y -= 15;

            // ================= NON-AI BUDGET BREAKDOWN =================
            drawSectionTitle(cs, margin, y, "2. DETERMINISTIC MATERIAL & LABOUR BUDGET (NON-AI)");
            y -= 20;

            ProjectBudget budget = project.getBudget();
            // Table Header
            cs.setNonStrokingColor(COLOR_BG_LIGHT);
            cs.addRect(margin, y - 16, contentWidth, 18);
            cs.fill();
            cs.setStrokingColor(COLOR_BORDER);
            cs.addRect(margin, y - 16, contentWidth, 18);
            cs.stroke();

            drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin + 8, y - 12, "CATEGORY / COMPONENT", COLOR_DARK);
            drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin + 240, y - 12, "SPECIFICATION", COLOR_DARK);
            drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin + 410, y - 12, "EST. AMOUNT", COLOR_DARK);
            y -= 22;

            if (budget != null) {
                String[][] budgetRows = {
                        {"Flooring Works", "Supply, cutting wastage (8%), prep & laying", formatCurrency(budget.getFlooringCost())},
                        {"Painting & Wall Finishes", "2 coats premium emulsion, wall prep & primer", formatCurrency(budget.getPaintingCost())},
                        {"Furniture & Woodwork", "Essential room package & fixtures", formatCurrency(budget.getFurnitureCost())},
                        {"Skilled Labour & Installation", "Site execution, finishing & clean-up", formatCurrency(budget.getLaborCost())},
                        {"Applicable Taxes (GST 18%)", "Standard statutory goods & services tax", formatCurrency(budget.getGstTax())}
                };

                for (String[] row : budgetRows) {
                    drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin + 8, y, row[0], COLOR_DARK);
                    drawText(cs, PDType1Font.HELVETICA, 8.5f, margin + 240, y, row[1], COLOR_MUTED);
                    drawText(cs, PDType1Font.HELVETICA, 9, margin + 410, y, row[2], COLOR_DARK);

                    cs.setStrokingColor(new Color(235, 240, 238));
                    cs.moveTo(margin, y - 5);
                    cs.lineTo(margin + contentWidth, y - 5);
                    cs.stroke();
                    y -= 18;
                }

                // Total Row
                cs.setNonStrokingColor(new Color(230, 243, 236));
                cs.addRect(margin, y - 8, contentWidth, 22);
                cs.fill();
                drawText(cs, PDType1Font.HELVETICA_BOLD, 10, margin + 8, y - 3, "TOTAL ESTIMATED PROJECT COST", COLOR_PRIMARY);
                drawText(cs, PDType1Font.HELVETICA_BOLD, 10, margin + 410, y - 3, formatCurrency(budget.getGrandTotal()), COLOR_PRIMARY);
                y -= 28;
            } else {
                drawText(cs, PDType1Font.HELVETICA_OBLIQUE, 9, margin + 10, y,
                        "Budget estimation not yet calculated for this project. Target budget: " + formatCurrency(project.getTargetBudget()), COLOR_MUTED);
                y -= 25;
            }

            y -= 10;

            // ================= EXISTING DESIGN & SHOPPING SPECIFICATION =================
            DesignPlanData design = project.getDesignPlan();
            if (design != null) {
                drawSectionTitle(cs, margin, y, "3. DESIGN SCHEME & SHOPPABLE SELECTIONS");
                y -= 20;

                if (design.getSummary() != null && !design.getSummary().isEmpty()) {
                    drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin, y, "Design Direction:", COLOR_DARK);
                    y -= 13;
                    drawParagraph(cs, margin, y, contentWidth, design.getSummary(), PDType1Font.HELVETICA, 8.5f, COLOR_MUTED);
                    y -= 28;
                }

                // Palette Swatches
                if (design.getPalette() != null && !design.getPalette().isEmpty()) {
                    drawText(cs, PDType1Font.HELVETICA_BOLD, 9, margin, y, "Curated Color Palette:", COLOR_DARK);
                    y -= 18;
                    float swatchX = margin;
                    for (PaletteColor color : design.getPalette()) {
                        Color parsedColor = parseHex(color.getHex());
                        cs.setNonStrokingColor(parsedColor);
                        cs.addRect(swatchX, y - 10, 16, 16);
                        cs.fill();
                        cs.setStrokingColor(COLOR_BORDER);
                        cs.addRect(swatchX, y - 10, 16, 16);
                        cs.stroke();

                        drawText(cs, PDType1Font.HELVETICA, 8, swatchX + 22, y - 2,
                                sanitize(color.getName()) + " (" + color.getHex() + ")", COLOR_DARK);
                        swatchX += 130;
                    }
                    y -= 25;
                }

                // Vastu Tip if present
                if (design.getVastuNote() != null && !design.getVastuNote().isEmpty()) {
                    cs.setNonStrokingColor(new Color(254, 250, 240));
                    cs.addRect(margin, y - 20, contentWidth, 24);
                    cs.fill();
                    cs.setStrokingColor(new Color(230, 200, 140));
                    cs.addRect(margin, y - 20, contentWidth, 24);
                    cs.stroke();

                    drawText(cs, PDType1Font.HELVETICA_BOLD, 8.5f, margin + 8, y - 13, "Vastu Alignment: ", COLOR_ACCENT);
                    drawText(cs, PDType1Font.HELVETICA, 8.5f, margin + 110, y - 13, sanitize(design.getVastuNote()), COLOR_DARK);
                    y -= 32;
                }
            }

            // Footer on Page 1
            drawFooter(cs, margin, contentWidth, 25);
            cs.close();

            // ================= PAGE 2: ITEMIZED SHOPPING LIST & MEDIA REFERENCES =================
            if (design != null && design.getItems() != null && !design.getItems().isEmpty()) {
                PDPage page2 = new PDPage(PDRectangle.A4);
                document.addPage(page2);
                PDPageContentStream cs2 = new PDPageContentStream(document, page2);
                float y2 = pageHeight - margin;

                // Header Page 2
                cs2.setNonStrokingColor(COLOR_PRIMARY);
                cs2.addRect(margin, y2 - 4, contentWidth, 4);
                cs2.fill();
                y2 -= 25;

                drawText(cs2, PDType1Font.HELVETICA_BOLD, 16, margin, y2, "ITEMIZED SHOPPING LIST & PROCUREMENT", COLOR_PRIMARY);
                y2 -= 14;
                drawText(cs2, PDType1Font.HELVETICA, 9.5f, margin, y2,
                        "Approved furnishings, fixtures and accessories specified for " + sanitize(project.getName()), COLOR_MUTED);
                y2 -= 25;

                // Table Header
                cs2.setNonStrokingColor(COLOR_BG_LIGHT);
                cs2.addRect(margin, y2 - 16, contentWidth, 18);
                cs2.fill();
                cs2.setStrokingColor(COLOR_BORDER);
                cs2.addRect(margin, y2 - 16, contentWidth, 18);
                cs2.stroke();

                drawText(cs2, PDType1Font.HELVETICA_BOLD, 9, margin + 8, y2 - 12, "ITEM & DESCRIPTION", COLOR_DARK);
                drawText(cs2, PDType1Font.HELVETICA_BOLD, 9, margin + 280, y2 - 12, "CATEGORY", COLOR_DARK);
                drawText(cs2, PDType1Font.HELVETICA_BOLD, 9, margin + 410, y2 - 12, "PRICE (INR)", COLOR_DARK);
                y2 -= 22;

                double totalShopping = 0.0;
                for (ShoppingItem item : design.getItems()) {
                    if (y2 < margin + 60) break; // prevent page overflow

                    drawText(cs2, PDType1Font.HELVETICA_BOLD, 9, margin + 8, y2, sanitize(item.getName()), COLOR_DARK);
                    if (item.getDescription() != null) {
                        drawText(cs2, PDType1Font.HELVETICA, 8, margin + 8, y2 - 10, truncate(sanitize(item.getDescription()), 55), COLOR_MUTED);
                    }
                    drawText(cs2, PDType1Font.HELVETICA, 9, margin + 280, y2, sanitize(item.getCategory()), COLOR_MUTED);
                    drawText(cs2, PDType1Font.HELVETICA, 9, margin + 410, y2, formatCurrency(item.getPrice()), COLOR_DARK);

                    totalShopping += (item.getPrice() != null ? item.getPrice() : 0.0);

                    cs2.setStrokingColor(new Color(240, 243, 241));
                    cs2.moveTo(margin, y2 - 15);
                    cs2.lineTo(margin + contentWidth, y2 - 15);
                    cs2.stroke();
                    y2 -= 26;
                }

                // Shopping Total Row
                cs2.setNonStrokingColor(new Color(230, 243, 236));
                cs2.addRect(margin, y2 - 6, contentWidth, 20);
                cs2.fill();
                drawText(cs2, PDType1Font.HELVETICA_BOLD, 9.5f, margin + 8, y2 - 2, "TOTAL SHOPPING LIST ESTIMATE", COLOR_PRIMARY);
                drawText(cs2, PDType1Font.HELVETICA_BOLD, 9.5f, margin + 410, y2 - 2, formatCurrency(totalShopping), COLOR_PRIMARY);

                // Media References note
                y2 -= 45;
                drawSectionTitle(cs2, margin, y2, "4. APARTMENT MEDIA & VERIFICATION REFERENCES");
                y2 -= 20;

                String mediaInfo = "Apartment walk-through media and photo scans are securely archived in Cloud Storage under project folder: " +
                        project.getId();
                drawParagraph(cs2, margin, y2, contentWidth, mediaInfo, PDType1Font.HELVETICA, 9, COLOR_MUTED);

                drawFooter(cs2, margin, contentWidth, 25);
                cs2.close();
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            log.info("Successfully generated PDF report for project {} ({} bytes)", projectId, baos.size());
            return baos.toByteArray();
        }
    }

    private void drawSectionTitle(PDPageContentStream cs, float x, float y, String title) throws IOException {
        drawText(cs, PDType1Font.HELVETICA_BOLD, 10.5f, x, y, title, COLOR_PRIMARY);
        cs.setStrokingColor(COLOR_PRIMARY);
        cs.moveTo(x, y - 4);
        cs.lineTo(x + 280, y - 4);
        cs.stroke();
    }

    private void drawText(PDPageContentStream cs, PDFont font, float size, float x, float y, String text, Color color) throws IOException {
        cs.setNonStrokingColor(color);
        cs.beginText();
        cs.setFont(font, size);
        cs.newLineAtOffset(x, y);
        cs.showText(sanitize(text));
        cs.endText();
    }

    private void drawParagraph(PDPageContentStream cs, float x, float y, float maxWidth, String text, PDFont font, float size, Color color) throws IOException {
        String clean = sanitize(text);
        float currentY = y;
        int maxCharsPerLine = (int) (maxWidth / (size * 0.55));

        while (!clean.isEmpty()) {
            String line;
            if (clean.length() <= maxCharsPerLine) {
                line = clean;
                clean = "";
            } else {
                int splitIndex = clean.lastIndexOf(' ', maxCharsPerLine);
                if (splitIndex == -1) splitIndex = maxCharsPerLine;
                line = clean.substring(0, splitIndex).trim();
                clean = clean.substring(splitIndex).trim();
            }
            drawText(cs, font, size, x, currentY, line, color);
            currentY -= (size + 3);
        }
    }

    private void drawFooter(PDPageContentStream cs, float margin, float contentWidth, float y) throws IOException {
        cs.setStrokingColor(COLOR_BORDER);
        cs.moveTo(margin, y + 14);
        cs.lineTo(margin + contentWidth, y + 14);
        cs.stroke();

        drawText(cs, PDType1Font.HELVETICA, 8, margin, y,
                "InteriorAI Studio • Proprietary & Confidential Architectural Specification", COLOR_MUTED);
        drawText(cs, PDType1Font.HELVETICA, 8, margin + contentWidth - 85, y,
                "www.interiorai.studio", COLOR_MUTED);
    }

    private String formatCurrency(Double amount) {
        if (amount == null) return "INR 0";
        return "INR " + CurrencyUtils.formatNumber(amount);
    }

    private String sanitize(String input) {
        if (input == null) return "";
        return input.replace("₹", "INR ")
                .replace("’", "'")
                .replace("“", "\"")
                .replace("”", "\"")
                .replace("—", "-")
                .replace("–", "-")
                .replaceAll("[^\\x00-\\x7F]", " ");
    }

    private String truncate(String s, int max) {
        if (s == null) return "";
        return s.length() <= max ? s : s.substring(0, max - 3) + "...";
    }

    private Color parseHex(String hex) {
        if (hex == null || hex.isEmpty()) return COLOR_MUTED;
        try {
            String clean = hex.replace("#", "");
            if (clean.length() == 6) {
                return new Color(
                        Integer.parseInt(clean.substring(0, 2), 16),
                        Integer.parseInt(clean.substring(2, 4), 16),
                        Integer.parseInt(clean.substring(4, 6), 16)
                );
            }
        } catch (Exception ignored) {}
        return COLOR_MUTED;
    }
}
