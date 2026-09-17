# InteriorAI Studio — Backend

Spring Boot 3 (Java 17) backend for InteriorAI Studio: Firebase Authentication, Firestore,
Firebase Cloud Storage, deterministic (non-AI) budget calculation, and PDFBox report
generation.

> **AI scope note:** AI generation logic (ADWP-94–101, ADWP-112–119) is intentionally
> **out of scope** for this backend. The backend only *receives and stores* AI-generated
> design data supplied by the frontend/AI service (`POST /api/projects/{id}/ai-data`) — it
> never calls an AI model itself. See `JIRA_TRACEABILITY.md`.

---

## 1. Tech Stack

| Layer            | Technology                                             |
|-------------------|---------------------------------------------------------|
| Framework          | Spring Boot 3.3.4 (Java 17)                             |
| Auth               | Firebase Admin SDK — Firebase Authentication (ID tokens) |
| Database           | Cloud Firestore (with graceful in-memory fallback)       |
| File Storage       | Firebase Cloud Storage (with graceful local-disk fallback) |
| PDF Generation     | Apache PDFBox 2.0.32                                     |
| API Docs           | springdoc-openapi (Swagger UI)                           |
| Build              | Maven                                                     |

---

## 2. Firebase Mock Mode vs Real Firebase

The backend can run in two modes, controlled by `firebase.mock.enabled`
(env var `FIREBASE_MOCK_ENABLED`, defaults to `true`):

- **Mock mode (`true`, default)** — no real Firebase project is required. All
  Firebase beans (`FirebaseApp`, `FirebaseAuth`, `Firestore`, `Storage`) safely
  resolve to `null`, and every repository/service falls back to an equivalent
  in-memory (Firestore) or local-disk (`local_storage_uploads/`) implementation.
  The security filter also accepts `dev-token-<uid>`, `mock-token-<uid>`, and
  `test-token` bearer tokens so the API and frontend can be exercised end-to-end
  without any Firebase project. This is what `mvn test` and local frontend
  development use.
- **Real Firebase mode** — set `FIREBASE_MOCK_ENABLED=false` and supply real
  credentials (see §3). Real ID tokens are verified against Firebase Auth, and
  all data is persisted to Firestore/Cloud Storage.

In mock mode, the app **never attempts a network call** to Google's Application
Default Credentials endpoint — this was fixed in this pass (see "What was fixed"
below) so the app/tests boot instantly and deterministically instead of stalling
on a network lookup that would only fail anyway in an offline environment.

---

## 3. Firebase Project Setup (for real mode)

1. Create a Firebase project at https://console.firebase.google.com.
2. Enable **Authentication** (Email/Password and/or any providers your frontend uses).
3. Enable **Cloud Firestore** (Native mode).
4. Enable **Cloud Storage** and note the bucket name (e.g. `your-project.appspot.com`).
5. Project Settings → Service Accounts → **Generate new private key** → download the
   JSON file. **Never commit this file.**
6. Configure credentials one of two ways:
   - **File path:** place the JSON file locally (e.g. `serviceAccountKey.json` at the
     project root — already covered by `.gitignore`) and set:
     ```
     FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
     ```
   - **Inline JSON** (useful for containers/CI secrets managers):
     ```
     FIREBASE_CREDENTIALS_JSON={"type":"service_account", ...}
     ```
7. Set `FIREBASE_STORAGE_BUCKET` to your bucket name and `FIREBASE_MOCK_ENABLED=false`.

Copy `.env.example` to `.env` (or export the same variables in your shell / deployment
platform) and fill these in. See `.env.example` for the full variable list.

---

## 4. Build, Test, Run

```bash
# Build (compiles main + test sources)
mvn clean compile

# Run the full test suite
mvn clean test

# Package a runnable JAR
mvn clean package

# Run locally (mock mode by default — no Firebase project needed)
mvn spring-boot:run

# Or run the packaged jar
java -jar target/interiorai-backend-1.0.0.jar

# Run against a real Firebase project
FIREBASE_MOCK_ENABLED=false \
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json \
FIREBASE_STORAGE_BUCKET=your-project.appspot.com \
mvn spring-boot:run
```

The server starts on `http://localhost:8080` by default (`server.port` /
`PORT` env var to change it).

> **Note on this review pass:** this sandbox's outbound network access is
> restricted to a small package-registry allow-list and does **not** include
> Maven Central, so `mvn clean test` could not be executed inside this
> environment. Run the commands above in your normal dev machine or CI
> (both have standard Maven Central access) — see the end-of-task report for
> full detail on what was verified by manual code review instead.

---

## 5. API Documentation

Once running:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

Public endpoints (no auth required): `/api/materials/**`, `/api/budget/estimate`,
`/api/auth/verify`, `/swagger-ui/**`, `/v3/api-docs/**`, `/actuator/**`.
Everything else under `/api/**` requires a `Authorization: Bearer <token>` header —
a real Firebase ID token in production, or a `dev-token-<uid>` / `mock-token-<uid>` /
`test-token` value in mock mode.

### Endpoint summary

| Area | Method & Path | Jira |
|---|---|---|
| Auth | `GET /api/auth/me`, `POST /api/auth/verify` | ADWP-44–53 |
| Dashboard | `GET /api/dashboard/stats` | ADWP-54–61 |
| Projects | `POST/GET/PUT/DELETE /api/projects`, `/api/projects/{id}`, `/api/projects/{id}/history` | ADWP-62–68 |
| Apartment Media | `POST/GET/DELETE /api/projects/{projectId}/media`, `/{mediaId}` | ADWP-69–75 |
| Questionnaire | `POST/GET/PUT /api/projects/{projectId}/questionnaire` | ADWP-76–85 |
| Budget | `GET /api/materials`, `POST /api/budget/estimate`, `POST/GET /api/projects/{projectId}/budget` | ADWP-102–111 |
| PDF Report | `GET /api/projects/{projectId}/report`, `GET /api/projects/{projectId}/report/download` | ADWP-120–127 |
| AI data (storage only, no AI logic) | `POST /api/projects/{id}/ai-data` | out of scope (ADWP-94–101/112–119), included for frontend compatibility |

---

## 6. Frontend Integration Notes

- CORS origins default to `http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173`
  (Create React App / Vite dev servers). Override with `CORS_ALLOWED_ORIGINS` (comma-separated)
  for staging/production frontend origins.
- All responses are wrapped in a consistent envelope: `{ "success": bool, "message": string, "data": ... }`
  (`ApiResponse<T>`); errors use `ErrorResponse` with `status`, `error`, `message`, `path`,
  and (for validation failures) a `validationErrors` map — this shape is stable and safe
  for the existing frontend to keep parsing as-is.
- Uploads: `POST /api/projects/{projectId}/media` expects `multipart/form-data` with a
  `file` field. Images up to 15MB, videos up to 100MB.
- AI-generated design data (palette, shopping list, summary, Vastu note, render URL)
  from the frontend/AI service is attached via `POST /api/projects/{id}/ai-data` and is
  automatically included in the generated PDF report — no backend change needed on the
  frontend's existing AI integration.

---

## 7. Project Structure

```
src/main/java/com/interiorai/backend/
  config/       Spring configuration (Firebase, Security, CORS, OpenAPI)
  controller/   REST controllers (one per Jira epic area)
  dto/          Request/response DTOs
  exception/    Custom exceptions + global exception handler
  model/        Domain models (Firestore-serializable)
  repository/   Repository interfaces + Firestore implementations (with in-memory fallback)
  security/     Firebase token filter, principal, security utilities
  service/      Business logic
  util/         Shared helpers (currency formatting, etc.)
src/test/java/com/interiorai/backend/   Integration tests (Spring context, project
                                          lifecycle/security, budget calc, PDF generation)
```
