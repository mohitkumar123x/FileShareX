# Issue: Missing Clerk Configuration in Docker

## Problem Description
File uploads were failing because the backend didn't have the required Clerk configuration to validate JWT tokens. The requests were being rejected with 403 Forbidden errors.

## Root Cause
The `docker-compose.yml` file didn't set the `CLERK_ISSUER` and `CLERK_JWKS_URL` environment variables required by the backend to validate Clerk-issued JWT tokens.

## Solution
1. Decoded the Clerk publishable key from the frontend's .env file to find the issuer:
   - Publishable key: `pk_test_a2V5LWZveGhvdW5kLTU2LmNsZXJrLmFjY291bnRzLmRldiQ`
   - Base64 decoded: `key-foxhound-56.clerk.accounts.dev`
2. Set the appropriate environment variables in `docker-compose.yml`

## Files Modified

### `docker-compose.yml`
```yaml
backend:
  environment:
    SPRING_DATA_MONGODB_URI: mongodb://mongo:27017/FileShareX
    PORT: "8080"
    UPLOAD_DIR: "/app/uploads"
    CLERK_ISSUER: "https://key-foxhound-56.clerk.accounts.dev"
    CLERK_JWKS_URL: "https://key-foxhound-56.clerk.accounts.dev/.well-known/jwks.json"
```

### `backend/src/main/java/filesharexapi/exceptions/GlobalExceptionHandler.java`
- Added `@Slf4j` annotation for logging
- Added logging statements to all exception handlers for better debugging

## Verification
- Backend starts successfully and connects to MongoDB
- JWT tokens from Clerk are now validated correctly
- File uploads work properly
