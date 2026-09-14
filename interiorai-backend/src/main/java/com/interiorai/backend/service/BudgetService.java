package com.interiorai.backend.service;

import com.interiorai.backend.dto.BudgetCalculationResponse;
import com.interiorai.backend.dto.EstimateBudgetRequest;
import com.interiorai.backend.dto.FurnitureSelection;
import com.interiorai.backend.exception.ResourceNotFoundException;
import com.interiorai.backend.model.*;
import com.interiorai.backend.repository.MaterialRepository;
import com.interiorai.backend.repository.ProjectBudgetRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class BudgetService {

    private static final Logger log = LoggerFactory.getLogger(BudgetService.class);

    private final MaterialRepository materialRepository;
    private final ProjectBudgetRepository budgetRepository;
    private final ProjectService projectService;

    public BudgetService(MaterialRepository materialRepository,
                         ProjectBudgetRepository budgetRepository,
                         ProjectService projectService) {
        this.materialRepository = materialRepository;
        this.budgetRepository = budgetRepository;
        this.projectService = projectService;
    }

    @PostConstruct
    public void initMaterialCatalog() {
        if (materialRepository.count() == 0) {
            log.info("Seeding standard Indian interior materials and furniture database into Firestore/Repository...");
            List<MaterialItem> seedItems = Arrays.asList(
                    // Flooring Materials
                    new MaterialItem("mat-fl-01", MaterialCategory.FLOORING, "Marble", "Italian Bottochino Marble", "SQ_FT", 380.0, "Imported polished Italian marble with natural veining", "LUXURY"),
                    new MaterialItem("mat-fl-02", MaterialCategory.FLOORING, "Wood", "Engineered European Oak Hardwood", "SQ_FT", 290.0, "Warm matte natural oak with anti-scratch UV lacquer", "PREMIUM"),
                    new MaterialItem("mat-fl-03", MaterialCategory.FLOORING, "Tiles", "Glazed Vitrified Tiles (1200x600mm)", "SQ_FT", 145.0, "High-traffic stain-resistant satin finish vitrified tiles", "STANDARD"),
                    new MaterialItem("mat-fl-04", MaterialCategory.FLOORING, "Tiles", "Ceramic Matte Floor Tiles", "SQ_FT", 85.0, "Durable anti-skid ceramic tiles suitable for daily wear", "BUDGET"),
                    new MaterialItem("mat-fl-05", MaterialCategory.FLOORING, "Granite", "Honed Black Pearl Granite", "SQ_FT", 220.0, "Subtle textured natural granite slab flooring", "PREMIUM"),
                    new MaterialItem("mat-fl-06", MaterialCategory.FLOORING, "Vinyl", "Luxury Vinyl Plank (LVP)", "SQ_FT", 120.0, "100% waterproof click-lock acoustic vinyl flooring", "STANDARD"),

                    // Painting & Wall Finishes
                    new MaterialItem("mat-pt-01", MaterialCategory.PAINTING, "Luxury", "Royale Luxury Emulsion & Base Primer", "SQ_FT", 45.0, "Silky smooth washable acrylic emulsion with low VOC", "PREMIUM"),
                    new MaterialItem("mat-pt-02", MaterialCategory.PAINTING, "Texture", "Artisanal Textured Accent Wall Paint", "SQ_FT", 85.0, "Stone, stucco or metallic decorative feature wall finish", "LUXURY"),
                    new MaterialItem("mat-pt-03", MaterialCategory.PAINTING, "Matte", "Premium Interior Acrylic Matte", "SQ_FT", 28.0, "Rich matte finish with high stain-guard protection", "STANDARD"),
                    new MaterialItem("mat-pt-04", MaterialCategory.PAINTING, "Eco", "Natural Limewash Mineral Paint", "SQ_FT", 55.0, "Breathable, organic, chalky textured Mediterranean finish", "PREMIUM"),
                    new MaterialItem("mat-pt-05", MaterialCategory.PAINTING, "Wallpaper", "Designer Heavy Textured Wallpaper", "SQ_FT", 110.0, "Imported non-woven geometric or botanical wall covering", "LUXURY"),

                    // Furniture Items
                    new MaterialItem("mat-fn-01", MaterialCategory.FURNITURE, "Seating", "3-Seater Fluted Oak Fabric Sofa", "PIECE", 48000.0, "Solid beech frame with stain-resistant textured linen upholstery", "PREMIUM"),
                    new MaterialItem("mat-fn-02", MaterialCategory.FURNITURE, "Seating", "Ergonomic Sculptural Accent Armchair", "PIECE", 18500.0, "Curved high-density foam chair with brushed brass legs", "PREMIUM"),
                    new MaterialItem("mat-fn-03", MaterialCategory.FURNITURE, "Tables", "Travertine Stone Low Coffee Table", "PIECE", 16000.0, "Honed natural beige travertine stone with rounded corners", "LUXURY"),
                    new MaterialItem("mat-fn-04", MaterialCategory.FURNITURE, "Dining", "Solid Sheesham 6-Seater Dining Table", "PIECE", 38000.0, "Handcrafted solid Indian rosewood table in walnut polish", "PREMIUM"),
                    new MaterialItem("mat-fn-05", MaterialCategory.FURNITURE, "Dining", "Cushioned Dining Chairs (Set of 2)", "PIECE", 14000.0, "Ergonomic oak frame chairs with boucle fabric seating", "STANDARD"),
                    new MaterialItem("mat-fn-06", MaterialCategory.FURNITURE, "Bedroom", "King-Size Bed with Tufted Headboard", "PIECE", 52000.0, "Engineered hardwood platform bed with premium linen backing", "PREMIUM"),
                    new MaterialItem("mat-fn-07", MaterialCategory.FURNITURE, "Storage", "3-Door Modular Wardrobe with Overhead Loft", "PIECE", 68000.0, "Soft-close Hettich hardware with fluted acrylic shutters", "PREMIUM"),
                    new MaterialItem("mat-fn-08", MaterialCategory.FURNITURE, "Media", "Minimalist Floating TV Console (6 ft)", "PIECE", 22000.0, "Warm oak laminate with hidden wire management channels", "STANDARD"),
                    new MaterialItem("mat-fn-09", MaterialCategory.FURNITURE, "Lighting", "Brushed Brass Ambient Floor Lamp", "PIECE", 8500.0, "Warm 2700K integrated LED light with marble pedestal base", "STANDARD"),
                    new MaterialItem("mat-fn-10", MaterialCategory.FURNITURE, "Decor", "Hand-Tufted Jute & Wool Rug (8x10 ft)", "PIECE", 19500.0, "Natural organic fibers woven by artisans in Bhadohi, India", "PREMIUM")
            );
            materialRepository.saveAll(seedItems);
            log.info("Successfully seeded {} material items into database.", seedItems.size());
        }
    }

    public List<MaterialItem> getMaterialsCatalog(MaterialCategory category) {
        if (category != null) {
            return materialRepository.findByCategory(category);
        }
        return materialRepository.findAll();
    }

    /**
     * Deterministic non-AI calculation based on carpet area and standard Indian building specs.
     * ADWP-102-111: Purely rule-based and material-driven, zero AI computation.
     */
    public BudgetCalculationResponse calculateEstimate(EstimateBudgetRequest req) {
        double area = req.getCarpetAreaSqFt();

        // 1. Flooring Calculation (Carpet Area + 8% cutting wastage)
        double flooringWastageFactor = 1.08;
        double flooringEffectiveArea = area * flooringWastageFactor;
        MaterialItem floorMaterial = null;
        if (req.getFlooringMaterialId() != null) {
            floorMaterial = materialRepository.findById(req.getFlooringMaterialId()).orElse(null);
        }
        if (floorMaterial == null) {
            floorMaterial = materialRepository.findById("mat-fl-03")
                    .orElse(new MaterialItem("default", MaterialCategory.FLOORING, "Tiles", "Standard Vitrified Tiles", "SQ_FT", 145.0, "", "STANDARD"));
        }

        double flooringRate = floorMaterial.getUnitPriceInr();
        double flooringCost = Math.round(flooringEffectiveArea * flooringRate);
        List<BudgetItem> flooringDetails = new ArrayList<>();
        flooringDetails.add(new BudgetItem(floorMaterial.getName(), "Flooring Material",
                Math.round(flooringEffectiveArea * 100.0) / 100.0, "SQ_FT", flooringRate, flooringCost,
                "Includes 8% cutting and layout wastage"));

        // 2. Painting Calculation (Wall area estimate: floor perimeter * height - door/window openings ≈ area * 2.8)
        double wallAreaRatio = 2.8;
        double wallArea = Math.round(area * wallAreaRatio);
        MaterialItem paintMaterial = null;
        if (req.getPaintingMaterialId() != null) {
            paintMaterial = materialRepository.findById(req.getPaintingMaterialId()).orElse(null);
        }
        if (paintMaterial == null) {
            paintMaterial = materialRepository.findById("mat-pt-03")
                    .orElse(new MaterialItem("default", MaterialCategory.PAINTING, "Matte", "Premium Interior Matte Paint", "SQ_FT", 28.0, "", "STANDARD"));
        }

        double paintRate = paintMaterial.getUnitPriceInr();
        double paintingCost = Math.round(wallArea * paintRate);
        List<BudgetItem> paintingDetails = new ArrayList<>();
        paintingDetails.add(new BudgetItem(paintMaterial.getName(), "Wall Finishes & Painting",
                wallArea, "SQ_FT", paintRate, paintingCost,
                "Covers 2 coats of paint plus wall preparation & primer"));

        // 3. Furniture Calculation
        double furnitureCost = 0.0;
        List<BudgetItem> furnitureDetails = new ArrayList<>();
        if (req.getFurnitureItems() != null && !req.getFurnitureItems().isEmpty()) {
            for (FurnitureSelection sel : req.getFurnitureItems()) {
                MaterialItem item = materialRepository.findById(sel.getMaterialId()).orElse(null);
                if (item != null && sel.getQuantity() > 0) {
                    double total = item.getUnitPriceInr() * sel.getQuantity();
                    furnitureCost += total;
                    furnitureDetails.add(new BudgetItem(item.getName(), item.getSubCategory(),
                            (double) sel.getQuantity(), item.getUnit(), item.getUnitPriceInr(), total, item.getDescription()));
                }
            }
        } else {
            // Default essential furniture package based on room type
            List<String> defaultIds = getRoomDefaultFurniture(req.getRoomType());
            for (String id : defaultIds) {
                materialRepository.findById(id).ifPresent(item -> {
                    furnitureDetails.add(new BudgetItem(item.getName(), item.getSubCategory(),
                            1.0, item.getUnit(), item.getUnitPriceInr(), item.getUnitPriceInr(), item.getDescription()));
                });
            }
            furnitureCost = furnitureDetails.stream().mapToDouble(BudgetItem::getTotalPrice).sum();
        }

        // 4. Labor & Installation Cost
        double laborPct = (req.getLaborPercentage() != null) ? req.getLaborPercentage() : 15.0;
        double laborCost = Math.round((flooringCost + paintingCost) * (laborPct / 100.0));

        // 5. Subtotal & GST Tax
        double subTotal = flooringCost + paintingCost + furnitureCost + laborCost;
        double gstPct = (req.getGstPercentage() != null) ? req.getGstPercentage() : 18.0;
        double gstTax = Math.round(subTotal * (gstPct / 100.0));
        double grandTotal = subTotal + gstTax;

        BudgetCalculationResponse response = new BudgetCalculationResponse();
        response.setCarpetAreaSqFt(area);
        response.setFlooringCost(flooringCost);
        response.setFlooringDetails(flooringDetails);
        response.setPaintingCost(paintingCost);
        response.setPaintingDetails(paintingDetails);
        response.setFurnitureCost(furnitureCost);
        response.setFurnitureDetails(furnitureDetails);
        response.setLaborCost(laborCost);
        response.setGstTax(gstTax);
        response.setSubTotal(subTotal);
        response.setGrandTotal(grandTotal);
        response.setCalculatedAt(System.currentTimeMillis());

        return response;
    }

    public BudgetCalculationResponse saveProjectBudget(String projectId, EstimateBudgetRequest req, String userId) {
        Project project = projectService.getProject(projectId, userId);

        // Inherit project carpet area if not explicitly passed
        if (req.getCarpetAreaSqFt() == null && project.getCarpetAreaSqFt() != null) {
            req.setCarpetAreaSqFt(project.getCarpetAreaSqFt());
        }
        if (req.getCarpetAreaSqFt() == null) {
            req.setCarpetAreaSqFt(180.0); // Standard bedroom/living room default
        }
        if (req.getRoomType() == null) {
            req.setRoomType(project.getRoomType());
        }

        BudgetCalculationResponse calc = calculateEstimate(req);

        ProjectBudget pb = new ProjectBudget();
        pb.setProjectId(projectId);
        pb.setCarpetAreaSqFt(calc.getCarpetAreaSqFt());
        pb.setFlooringCost(calc.getFlooringCost());
        pb.setFlooringDetails(calc.getFlooringDetails());
        pb.setPaintingCost(calc.getPaintingCost());
        pb.setPaintingDetails(calc.getPaintingDetails());
        pb.setFurnitureCost(calc.getFurnitureCost());
        pb.setFurnitureDetails(calc.getFurnitureDetails());
        pb.setLaborCost(calc.getLaborCost());
        pb.setGstTax(calc.getGstTax());
        pb.setGrandTotal(calc.getGrandTotal());
        pb.setCalculatedAt(System.currentTimeMillis());

        ProjectBudget saved = budgetRepository.save(pb);

        // Update project budget reference
        project.setBudget(saved);
        project.setUpdatedAt(System.currentTimeMillis());
        projectService.recordActivity(projectId, userId, "BUDGET_CALCULATED",
                "Generated itemized non-AI budget estimate: ₹" + Math.round(saved.getGrandTotal()));

        log.info("Saved budget for project {}: Grand Total ₹{}", projectId, saved.getGrandTotal());
        return BudgetCalculationResponse.from(saved);
    }

    public BudgetCalculationResponse getProjectBudget(String projectId, String userId) {
        projectService.getProject(projectId, userId); // verify ownership
        ProjectBudget pb = budgetRepository.findByProjectId(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("No budget calculation found for project " + projectId));
        return BudgetCalculationResponse.from(pb);
    }

    private List<String> getRoomDefaultFurniture(String roomType) {
        if (roomType == null) return Arrays.asList("mat-fn-01", "mat-fn-03", "mat-fn-08", "mat-fn-09");
        String r = roomType.toLowerCase();
        if (r.contains("bed")) {
            return Arrays.asList("mat-fn-06", "mat-fn-07", "mat-fn-09", "mat-fn-10");
        } else if (r.contains("dining")) {
            return Arrays.asList("mat-fn-04", "mat-fn-05", "mat-fn-09");
        } else {
            return Arrays.asList("mat-fn-01", "mat-fn-02", "mat-fn-03", "mat-fn-08", "mat-fn-09", "mat-fn-10");
        }
    }
}
