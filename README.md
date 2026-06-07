# FileShareX

Full-stack file sharing application with:
- `backend`: Spring Boot + MongoDB API
- `frontend`: React + Vite app

## Tech Stack

### Backend (`backend`)
- Java 21
- Spring Boot 3.5.3
- Gradle
- Spring Security + Clerk JWT integration
- MongoDB
- Razorpay integration

### Frontend (`frontend`)
- React 18
- Vite 5
- Clerk authentication
- Tailwind CSS
- Axios + React Router

## Project Structure

```text
cloud-share-youtube/
  backend/    # Spring Boot API
  frontend/   # React app
```

## Backend Configuration

File: `backend/src/main/resources/application.properties`

Set these values before running:
- `spring.data.mongodb.uri` (example: `mongodb://localhost:27017/FileShareX`)
- `clerk.issuer`
- `clerk.jwks-url`
- `clerk.webhook.secret`
- `razorpay.key.id`
- `razorpay.key.secret`

Backend base path:
- `/api/v1.0`

Health endpoint:
- `GET /api/v1.0/health`

## Frontend Configuration

File: `frontend/.env`

Required values:
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_RAZORPAY_KEY`

Note:
- API base URL is read from `VITE_API_BASE_URL` in `frontend/src/util/apiEndpoints.js`.
- If unset, frontend defaults to `http://localhost:8080/api/v1.0`.

## Main API Endpoints

All routes are prefixed with `/api/v1.0`.

- `POST /register`
- `GET /health`
- `POST /webhooks/clerk`
- `POST /payments/create-order`
- `POST /payments/verify-payment`
- `GET /users/credits`
- `POST /files/upload`
- `GET /files/my`
- `GET /files/public/{id}`
- `GET /files/download/{id}`
- `PATCH /files/{id}/toggle-public`
- `DELETE /files/{id}`
- `GET /transactions`

## Run Locally

### 1) Start backend

```bash
cd backend
gradle clean build
gradle bootRun
```

Backend runs at:
- `http://localhost:8080/api/v1.0`

### 2) Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default:
- `http://localhost:5173`

## Docker

### Backend

```bash
cd backend
docker build -t filesharex-api .
docker run -p 8080:8080 filesharex-api
```

### Frontend

```bash
cd frontend
docker build -t filesharex-webapp .
docker run -p 3000:80 filesharex-webapp
```

Frontend with Docker is served by Nginx at:
- `http://localhost:3000`

## Notes

- Upload and file metadata are managed in backend services/controllers.
- Public file view is available at frontend route: `/file/:fileId`.
- Protected frontend routes use Clerk (`SignedIn` / `SignedOut` guards).

## Deploy on Render

This repo includes a Render Blueprint file: `render.yaml`.

### Services created
- `filesharex-backend` (Docker web service from `backend/`)
- `filesharex-frontend` (Static site from `frontend/`)

### Deploy steps
1. Push this repository to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select your repository and deploy using `render.yaml`.
4. In Render dashboard, fill required secret env vars:
   - Backend: `SPRING_DATA_MONGODB_URI`, `CLERK_ISSUER`, `CLERK_JWKS_URL`, `CLERK_WEBHOOK_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
   - Frontend: `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_RAZORPAY_KEY`
5. Verify frontend `VITE_API_BASE_URL` points to your backend Render URL:
   - Default in blueprint: `https://filesharex-backend.onrender.com/api/v1.0`
   - Update it if your backend service name/domain differs.
6. Redeploy frontend after changing any `VITE_*` env vars (they are build-time variables).

### Render notes
- Render does not provide managed MongoDB; use MongoDB Atlas (or another external MongoDB provider) and set `SPRING_DATA_MONGODB_URI`.
- Health check used by Render backend service: `GET /api/v1.0/health`.
