# FileShareX High Level Design (HLD)

## 1. Objective
FileShareX is a full-stack file sharing platform where users can:
- authenticate via Clerk
- upload/manage files
- share files publicly through links
- buy credits through Razorpay

## 2. High-Level Architecture

### Frontend (`frontend`)
- React + Vite SPA
- Clerk client-side auth
- Calls backend REST APIs
- Deployed as static site (Render)

### Backend (`backend`)
- Spring Boot REST API
- JWT validation via Clerk JWKS
- Business logic for files, credits, payments, transactions
- MongoDB persistence
- Deployed as Docker web service (Render)

### External Systems
- **MongoDB Atlas**: primary datastore
- **Clerk**: identity and token issuer
- **Razorpay**: payment gateway

## 3. Deployment View
- `filesharex-frontend` (Render static service)
- `filesharex-backend` (Render web service, Docker)
- MongoDB hosted externally (Atlas URI via env var)

## 4. Core Functional Flows

### A) Authenticated Upload Flow
1. User signs in via Clerk on frontend.
2. Frontend obtains token (`getToken()`).
3. Frontend calls `POST /api/v1.0/files/upload` with bearer token + multipart files.
4. Backend validates token, checks credits, stores file metadata and decrements credits.

### B) Public Share Flow
1. User toggles file visibility (`PATCH /files/{id}/toggle-public`).
2. Frontend shares route `/file/:fileId`.
3. Public viewer calls `GET /files/public/{id}` and optionally download endpoint.

### C) Credit Purchase Flow
1. Frontend creates order (`POST /payments/create-order`).
2. User completes Razorpay checkout.
3. Frontend sends payment verification (`POST /payments/verify-payment`).
4. Backend verifies signature and credits user account.

## 5. Non-Functional Requirements (Current)
- Stateless backend sessions (JWT)
- CORS enabled for cross-origin frontend/backend
- Health endpoint for deployment monitoring (`/api/v1.0/health`)
- File upload limits via Spring multipart config

## 6. Risks / Considerations
- Public download endpoint currently exposed without auth (intended for shared files).
- CORS is permissive (`*`) and should be restricted in production.
- File storage approach should be monitored for growth/retention strategy.

