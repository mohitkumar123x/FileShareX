# FileShareX Low Level Design (LLD)

## 1. Backend Package Structure

Base package: `filesharexapi`

- `controller/`  
  REST endpoints (`FileController`, `PaymentController`, `ProfileController`, etc.)
- `service/`  
  Business logic (`FileMetadataService`, `PaymentService`, `UserCreditsService`, etc.)
- `repository/`  
  Mongo repositories
- `document/`  
  Mongo entities (`FileMetadataDocument`, `PaymentTransaction`, `ProfileDocument`, `UserCredits`)
- `dto/`  
  API request/response DTOs
- `security/`  
  Clerk JWT filter and JWKS provider
- `config/`  
  Security and static-resource configuration

## 2. Frontend Structure

- `pages/` route-level screens (`Dashboard`, `Upload`, `MyFiles`, `Subscription`, `Transactions`, `PublicFileView`)
- `components/` reusable UI blocks (navbar, cards, upload widgets, modals)
- `context/` shared state (credits and theme)
- `util/apiEndpoints.js` centralized backend endpoint map

## 3. API Design

Base URL: `/api/v1.0`

### Public/Permitted
- `GET /health`
- `POST /webhooks/clerk`
- `GET /files/public/{id}`
- `GET /files/download/{id}`

### Authenticated
- `GET /users/credits`
- `POST /files/upload`
- `GET /files/my`
- `PATCH /files/{id}/toggle-public`
- `DELETE /files/{id}`
- `POST /payments/create-order`
- `POST /payments/verify-payment`
- `GET /transactions`

## 4. Data Model (Logical)

### ProfileDocument
- clerk user identifiers
- display/profile fields

### UserCredits
- user reference
- available credit count

### FileMetadataDocument
- owner reference
- filename/type/size/path metadata
- public/private flag
- timestamps

### PaymentTransaction
- user reference
- order/payment identifiers
- amount, currency
- status and timestamps

## 5. Security Design
- Stateless authentication using Clerk-issued JWT
- Custom JWT filter validates token and sets security context
- Spring Security protects all non-whitelisted endpoints
- CORS currently allows all origins/patterns

## 6. Config & Environment Variables

Backend:
- `PORT`
- `SPRING_DATA_MONGODB_URI`
- `CLERK_ISSUER`
- `CLERK_JWKS_URL`
- `CLERK_WEBHOOK_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Frontend:
- `VITE_API_BASE_URL`
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_RAZORPAY_KEY`

## 7. Sequence Summary

### Upload
Frontend file select -> token fetch -> backend upload endpoint -> credits decrement -> metadata saved -> UI refresh.

### Payment
Frontend create-order -> Razorpay checkout -> verify-payment -> backend signature validation -> credits update -> success message.

