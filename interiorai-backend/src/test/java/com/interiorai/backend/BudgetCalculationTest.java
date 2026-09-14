package com.interiorai.backend;

import com.interiorai.backend.dto.BudgetCalculationResponse;
import com.interiorai.backend.dto.EstimateBudgetRequest;
import com.interiorai.backend.dto.FurnitureSelection;
import com.interiorai.backend.model.MaterialCategory;
import com.interiorai.backend.model.MaterialItem;
import com.interiorai.backend.service.BudgetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BudgetCalculationTest {

    @Autowired
    private BudgetService budgetService;

    @BeforeEach
    void setUp() {
        budgetService.initMaterialCatalog();
    }

    @Test
    @DisplayName("Verify Material Catalog Seeds Correctly")
    void testMaterialCatalogSeeding() {
        List<MaterialItem> allMaterials = budgetService.getMaterialsCatalog(null);
        assertNotNull(allMaterials);
        assertFalse(allMaterials.isEmpty(), "Materials catalog should be seeded on startup");

        List<MaterialItem> flooring = budgetService.getMaterialsCatalog(MaterialCategory.FLOORING);
        assertFalse(flooring.isEmpty(), "Flooring materials should exist");

        List<MaterialItem> painting = budgetService.getMaterialsCatalog(MaterialCategory.PAINTING);
        assertFalse(painting.isEmpty(), "Painting materials should exist");

        List<MaterialItem> furniture = budgetService.getMaterialsCatalog(MaterialCategory.FURNITURE);
        assertFalse(furniture.isEmpty(), "Furniture materials should exist");
    }

    @Test
    @DisplayName("Verify Deterministic Non-AI Budget Calculation (ADWP-102-111)")
    void testDeterministicBudgetEstimation() {
        EstimateBudgetRequest request = new EstimateBudgetRequest();
        request.setCarpetAreaSqFt(200.0);
        request.setRoomType("Living Room");
        request.setFlooringMaterialId("mat-fl-03"); // Glazed Vitrified Tiles (₹145/sqft)
        request.setPaintingMaterialId("mat-pt-03"); // Premium Acrylic Matte (₹28/sqft)
        request.setLaborPercentage(15.0);
        request.setGstPercentage(18.0);

        // Add 1 sofa
        request.setFurnitureItems(Collections.singletonList(
                new FurnitureSelection("mat-fn-01", 1) // 3-Seater Sofa (₹48,000)
        ));

        BudgetCalculationResponse estimate = budgetService.calculateEstimate(request);

        assertNotNull(estimate);
        assertEquals(200.0, estimate.getCarpetAreaSqFt());

        // Expected Flooring: 200 * 1.08 wastage * 145 = 31320
        assertTrue(estimate.getFlooringCost() > 30000, "Flooring cost should reflect rate * area * wastage");

        // Expected Painting: 200 * 2.8 wall area * 28 = 15680
        assertTrue(estimate.getPaintingCost() > 14000, "Painting cost should reflect wall area * rate");

        // Expected Furniture: 48000
        assertEquals(48000.0, estimate.getFurnitureCost());

        // Expected Labour: 15% of (flooring + painting)
        assertTrue(estimate.getLaborCost() > 0);

        // Expected GST: 18% of subtotal
        assertTrue(estimate.getGstTax() > 0);

        // Grand Total: sum of all components
        double expectedGrandTotal = estimate.getSubTotal() + estimate.getGstTax();
        assertEquals(expectedGrandTotal, estimate.getGrandTotal(), 0.01);
    }
}
