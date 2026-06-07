# API Contracts (LLD Addendum)

## Conventions
- Base path: `/api/v1.0`
- Auth header for protected routes: `Authorization: Bearer <token>`
- Content type:
  - JSON for most endpoints
  - `multipart/form-data` for upload

## Endpoint Summary

### Health
- `GET /health`
- 200 OK when service is healthy

### User Credits
- `GET /users/credits`
- Response (example):
```json
{ "credits": 42 }
```

### Files
- `POST /files/upload`
  - multipart field: `files`
- `GET /files/my`
  - list user files
- `GET /files/public/{id}`
  - fetch public metadata
- `GET /files/download/{id}`
  - binary download
- `PATCH /files/{id}/toggle-public`
  - flips `isPublic`
- `DELETE /files/{id}`
  - deletes file metadata/content

### Payments
- `POST /payments/create-order`
  - request: plan/payment info
  - response: order id/details for Razorpay
- `POST /payments/verify-payment`
  - verifies Razorpay signature
  - updates credits on success

### Transactions
- `GET /transactions`
  - returns user payment transactions

## Error Behavior (Expected)
- `401/403` for missing or invalid token on protected routes
- `400` for invalid payload
- `404` for unknown file/resource
- `500` for unexpected server failures

