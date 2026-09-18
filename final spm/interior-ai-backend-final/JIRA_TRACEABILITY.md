# Jira Traceability Matrix — InteriorAI Studio Backend

Scope reviewed and finished in this pass: **ADWP-44 to ADWP-127**, excluding the
AI generation ranges (ADWP-94–101, ADWP-112–119), which are explicitly out of
scope and not implemented.

Status legend: ✅ Implemented & verified by code review · ⚠️ Implemented, manual
Firebase/API check recommended (see README §3) · ⛔ Out of scope (not implemented).

---

## ADWP-44–53 — Authentication

| Item | Implementation | Status |
|---|---|---|
| Firebase ID token verification | `FirebaseTokenFilter` verifies `Authorization: Bearer <token>` via `FirebaseAuth.verifyIdToken()`; falls back to mock principal in mock mode | ✅ |
| Authenticated principal / current user | `FirebaseUserPrincipal`, `FirebaseAuthenticationToken`, `SecurityUtils.getCurrentUser()/getCurrentUserId()` | ✅ |
| Get current user profile | `GET /api/auth/me` → `AuthController` → `AuthService.getCurrentUserProfile()` | ✅ |
| Verify session/token | `POST /api/auth/verify` (public endpoint) | ✅ |
| Unauthenticated request handling | `SecurityConfig` custom `authenticationEntryPoint` returns structured 401 `ErrorResponse` | ✅ |
| Public vs protected routes | `SecurityConfig.securityFilterChain` allow-lists docs/health/materials/estimate/verify, requires auth on everything else | ✅ |
| Real Firebase project verification | Requires a live Firebase project + real ID token | ⚠️ manual check |

## ADWP-54–61 — Dashboard

| Item | Implementation | Status |
|---|---|---|
| Project counts by status (draft/in-progress/completed/archived) | `DashboardService.getStats()` | ✅ |
| Total estimated budget across projects | Same method, sums `budget.grandTotal` or falls back to `targetBudget` | ✅ |
| Recent projects | Top 5 by recency via `ProjectResponse.from` | ✅ |
| Recent activity feed | `historyRepository.findByUserIdOrderByTimestampDesc(userId, 10)` | ✅ |
| Endpoint | `GET /api/dashboard/stats` | ✅ |

## ADWP-62–68 — Project Management

| Item | Implementation | Status |
|---|---|---|
| Create/Read/Update/Delete project | `ProjectController` + `ProjectService` | ✅ |
| Strict per-user ownership enforcement | `ProjectService.getProject()` throws `ForbiddenAccessException` on cross-user access; covered by `ProjectManagementTest.testProjectLifecycleAndSecurity` | ✅ |
| Status lifecycle (DRAFT → IN_PROGRESS → COMPLETED → ARCHIVED) | `ProjectStatus` enum, `UpdateProjectRequest` | ✅ |
| Audit/activity history per project | `ProjectHistory` model, `ProjectService.recordActivity()`, `GET /api/projects/{id}/history` | ✅ |
| Validation on create | `@Valid CreateProjectRequest` with Bean Validation | ✅ |

## ADWP-69–75 — Apartment Media

| Item | Implementation | Status |
|---|---|---|
| Upload video walkthrough / photo | `POST /api/projects/{projectId}/media` (multipart), up to 100MB video / 15MB image | ✅ |
| Format & size validation | `StorageService.validateAndGetMediaType()` — allow-lists image/video MIME types, rejects everything else with `InvalidFileException` | ✅ |
| Firebase Storage upload | `StorageService.uploadFile()` — uploads to Cloud Storage bucket when configured, falls back to local disk (`local_storage_uploads/`) in mock mode | ✅ |
| List / get / delete project media | `ApartmentMediaController` + `ApartmentMediaService`, ownership-checked | ✅ |
| Real Cloud Storage bucket delivery | Requires a live Firebase Storage bucket | ⚠️ manual check |

## ADWP-76–85 — Questionnaire

| Item | Implementation | Status |
|---|---|---|
| Submit / update apartment questionnaire | `POST` / `PUT /api/projects/{projectId}/questionnaire` | ✅ |
| Fields: apartment type, area, sunlight, humidity, flooring/style prefs, Vastu, budget range | `Questionnaire` model + `QuestionnaireRequest.applyTo()` | ✅ |
| Sync key answers back onto the project (room type, area, style, target budget) | `QuestionnaireService.saveQuestionnaire()` | ✅ |
| Retrieve saved questionnaire | `GET /api/projects/{projectId}/questionnaire` | ✅ |
| Ownership enforcement | Delegates to `ProjectService.getProject()` | ✅ |

## ADWP-94–101 — AI Design Generation

⛔ **Out of scope — not implemented**, per explicit instruction. No AI provider
calls, prompts, or generation logic exist anywhere in this backend (verified by
repository-wide scan for AI SDK/API references). The backend only exposes
`POST /api/projects/{id}/ai-data` to **receive and store** an already-generated
design plan (summary, palette, shopping items, Vastu note, render URL) supplied
by the frontend or an external AI service, purely for inclusion in the PDF report.

## ADWP-102–111 — Budget

| Item | Implementation | Status |
|---|---|---|
| Material/price catalog (flooring, painting, furniture) | `BudgetService.initMaterialCatalog()` seeds 21 Indian-market-priced items on startup | ✅ |
| `GET /api/materials` (filterable by category) | `BudgetController.getMaterials()` | ✅ |
| Deterministic, non-AI cost calculation | `BudgetService.calculateEstimate()` — rule-based: area × wastage × rate (flooring), wall-area ratio × rate (painting), itemized furniture, % labour, % GST | ✅ |
| Ad-hoc estimate (no project) | `POST /api/budget/estimate` (public) | ✅ |
| Save budget to a project | `POST /api/projects/{projectId}/budget` | ✅ |
| Get saved project budget | `GET /api/projects/{projectId}/budget` | ✅ |
| Calculation correctness | Verified by `BudgetCalculationTest` (catalog seeding + full deterministic estimate assertions) | ✅ |

## ADWP-112–119 — AI Rendering / Visualization

⛔ **Out of scope — not implemented**, per explicit instruction. No image
generation, rendering pipeline, or AI visualization logic exists in this backend.
Rendered image URLs (`renderedImageUrl`) are accepted and stored as plain strings
via the same AI-data-storage endpoint (ADWP-94–101 note above) and referenced in
the PDF report — the backend never produces them.

## ADWP-120–127 — PDF Report

| Item | Implementation | Status |
|---|---|---|
| Report status / readiness check | `GET /api/projects/{projectId}/report` | ✅ |
| PDF generation with PDFBox | `PdfReportService.generateProjectReportPdf()` | ✅ |
| Project specs + questionnaire section | Page 1, section 1 | ✅ |
| Deterministic (non-AI) budget table | Page 1, section 2, pulled from saved `ProjectBudget` | ✅ |
| Design scheme, colour palette, shopping list (from stored AI data) | Page 1 section 3 + page 2 itemized list | ✅ |
| Media reference note | Page 2 section 4 | ✅ |
| Streamed file download | `GET /api/projects/{projectId}/report/download` (`application/pdf`, `Content-Disposition: attachment`) | ✅ |
| Unicode/currency-safe text rendering | `sanitize()` strips characters unsupported by the standard PDFBox Type1 fonts (e.g. `₹` → `INR`) to avoid rendering exceptions | ✅ |
| Generation correctness | Verified by `PdfReportGenerationTest` — builds a full project incl. questionnaire, budget, AI data, then asserts valid PDF magic bytes and that PDFBox can re-parse the output | ✅ |

---

## Cross-cutting concerns

| Item | Implementation | Status |
|---|---|---|
| Global error handling / consistent error envelope | `GlobalExceptionHandler` | ✅ |
| CORS for frontend origins | `CorsConfig` | ✅ |
| Swagger / OpenAPI docs with bearer-token scheme | `OpenApiConfig` | ✅ |
| Firestore-optional persistence (in-memory fallback per repository) | All `Firestore*Repository` implementations | ✅ |
| Firebase mock mode for offline dev/tests | `FirebaseConfig`, `FirebaseTokenFilter` (fixed in this pass — see below) | ✅ |

## What was fixed in this pass

- **`FirebaseConfig`**: in mock mode (`firebase.mock.enabled=true`, the default,
  and what `mvn test` uses), the app previously still attempted a Google
  Application Default Credentials lookup — a network/metadata-server call that
  is slow and, in network-restricted environments, guaranteed to fail before
  falling back to mock mode. This attempt is now skipped entirely when mock
  mode is active and no explicit credentials are configured, so the Spring
  context boots immediately and deterministically. Real-Firebase-mode behavior
  is unchanged.
- Added `src/test/resources/application.properties` to explicitly pin the test
  profile to mock mode (defensive — matches the existing default, but removes
  any ambiguity if `FIREBASE_MOCK_ENABLED` is ever set to `false` in a shell
  that then runs `mvn test`).
- Removed the committed `target/` build directory from the final package (build
  output, regenerated by `mvn clean package`) and confirmed no service-account
  keys or other secrets are present anywhere in the source tree.
