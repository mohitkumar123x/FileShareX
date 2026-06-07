# Deployment to Railway

This guide will walk you through deploying FileShareX to Railway using Docker.

## Prerequisites

1. A [Railway](https://railway.app) account
2. Your code on GitHub (optional but recommended)

## Step 1: Deploy using Railway

### Option 1: One-click deploy (if we have a button)

### Option 2: Manual Deployment

1. Go to [Railway](https://railway.app/new)
2. Click `Deploy from GitHub repo` (or `Empty Project`)
3. If you choose `Empty Project`, you can add services via:
   - Add a MongoDB service (from the plugins catalog)
   - Add the backend service (point to your repo and `backend/Dockerfile`)
   - Add the frontend service (point to your repo and `frontend/Dockerfile`)

## Step 2: Configure Environment Variables

### Backend
Set the following environment variables in your Railway backend service:

- `SPRING_DATA_MONGODB_URI`: (should be automatically filled if using Railway MongoDB plugin)
- `PORT`: `8080` (default)
- `UPLOAD_DIR`: `/app/uploads` (default)
- `CLERK_ISSUER`: Your Clerk issuer URL (e.g., `https://<your-clerk-id>.clerk.accounts.dev`)
- `CLERK_JWKS_URL`: Your Clerk JWKS URL (e.g., `https://<your-clerk-id>.clerk.accounts.dev/.well-known/jwks.json`)
- (Optional) `CLERK_WEBHOOK_SECRET`: Your Clerk webhook secret
- (Optional) `RAZORPAY_KEY_ID`: Your Razorpay key ID
- (Optional) `RAZORPAY_KEY_SECRET`: Your Razorpay key secret

### Frontend
Set the following environment variables in your Railway frontend service:

- `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `VITE_API_BASE_URL`: Your backend service URL (e.g., `https://filesharex-backend.railway.app/api/v1.0`)
- (Optional) `VITE_RAZORPAY_KEY`: Your Razorpay publishable key

## Step 3: Add a Volume for Uploads (Optional but Recommended)

In your Railway backend service:
1. Go to `Volumes` tab
2. Create a volume named `uploads`
3. Mount it to `/app/uploads`

## Step 4: Deploy and Test!

Once all services are deployed, you should be able to access your app at the Frontend service URL provided by Railway!

## Local Development

To run locally, just use:
```bash
docker-compose up --build
```
