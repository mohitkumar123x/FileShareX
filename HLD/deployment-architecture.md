# Deployment Architecture (HLD Addendum)

## Render Blueprint
Defined in `render.yaml`:

1. `filesharex-backend` (type: `web`, runtime: `docker`)
   - root: `backend`
   - health: `/api/v1.0/health`
   - env-driven config

2. `filesharex-frontend` (type: `web`, runtime: `static`)
   - root: `frontend`
   - build: `npm ci && npm run build`
   - publish: `dist`
   - SPA rewrite to `/index.html`

## Runtime Dependencies
- External MongoDB cluster (Atlas recommended)
- Clerk project (issuer/JWKS/publishable keys)
- Razorpay merchant keys

## Traffic Model
- Browser -> Render Frontend (static assets)
- Browser -> Render Backend REST APIs
- Backend -> MongoDB / Clerk JWKS / Razorpay

## Health & Availability
- Render monitors backend via health endpoint.
- Frontend is static and served via CDN edge.

