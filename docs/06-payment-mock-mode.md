# Issue: Payment not working without Razorpay keys

## Problem Description
The purchase plan button wasn't working at all - it was failing with a generic error because there were no Razorpay keys configured, and there was no fallback/mock mode for development/testing.

## Root Cause
1. The backend's PaymentService required valid Razorpay key ID and secret to create an order, but these weren't set in our Docker environment
2. The frontend's PricingSection component was trying to call `openSignUp` even for paid plans, which didn't make sense
3. The frontend's Subscription page didn't have any error handling for missing Razorpay keys
4. There was no way to test payments without actual Razorpay credentials

## Solution
1. **Backend changes**: Added mock payment mode to `PaymentService.java` - if no Razorpay keys are provided, it creates mock orders and skips real payment verification
2. **Backend changes**: Added `isMock` field to `PaymentDTO` to signal to the frontend whether we're in mock mode
3. **Frontend changes**: Updated `PricingSection` to navigate to the `/subscriptions` page for paid plans (instead of calling `openSignUp`)
4. **Frontend changes**: Updated `Subscription.jsx` to handle mock mode: if `isMock` is true, it skips the Razorpay checkout and directly verifies the payment
5. **Frontend changes**: Improved error handling to display actual error messages from the backend instead of generic ones
6. **Backend changes**: Made Razorpay key and secret optional in `application.properties` (with default empty string)

## Files Modified
- <mcfile>backend/src/main/java/filesharexapi/service/PaymentService.java</mcfile> - Added mock payment mode
- <mcfile>backend/src/main/java/filesharexapi/dto/PaymentDTO.java</mcfile> - Added `isMock` field
- <mcfile>frontend/src/components/landing/PricingSection.jsx</mcfile> - Fixed button actions
- <mcfile>frontend/src/pages/Subscription.jsx</mcfile> - Added mock mode handling, improved error handling
- <mcfile>frontend/src/pages/Landing.jsx</mcfile> - Updated props for PricingSection

## Verification
- Purchase plan button now works and navigates to subscription page
- Payments work without any Razorpay keys (mock mode is used automatically)
- Purchasing a plan adds the correct number of credits to the user's account
