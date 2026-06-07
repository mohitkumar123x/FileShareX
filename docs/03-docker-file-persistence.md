# Issue: File Persistence in Docker

## Problem Description
When running the application in Docker containers, uploaded files were stored inside the backend container's filesystem. This means files would be lost if the container was restarted or recreated.

## Root Cause
The application was storing files locally on the container's ephemeral filesystem without any volume persistence.

## Solution
1. **Added Docker Volume for Uploads**
2. **Made Upload Directory Configurable via Environment Variable**

## Files Modified

### 1. `docker-compose.yml`
**Changes:**
- Added volume `uploads_data` volume mount to backend service
- Added `UPLOAD_DIR` environment variable
- Added `uploads_data` to volumes section at bottom

```yaml
services:
  backend:
    # ... existing config ...
    environment:
      # ... existing env vars ...
      UPLOAD_DIR: "/app/uploads"
    volumes:
      - uploads_data:/app/uploads

volumes:
  mongo_data:
  uploads_data:
```

### 2. `backend/src/main/java/filesharexapi/service/FileMetadataService.java`
**Change:** Made upload directory configurable via `UPLOAD_DIR` environment variable

### 3. `backend/src/main/java/filesharexapi/config/StaticResourceConfig.java`
**Change:** Made static resource directory also configurable via `UPLOAD_DIR` environment variable

## Verification
- Files now persist across container restarts
- Works both in Docker and local development
- Backwards compatible - defaults to "uploads" if no env var set
