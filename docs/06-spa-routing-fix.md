# Issue: SPA routing wasn't working on refresh or direct navigation

## Problem Description
When trying to navigate directly to a URL like /subscriptions or /dashboard, you'd get a 404 Not Found error because Nginx was trying to find a physical file at that path instead of serving index.html for all routes.

## Root Cause
The default Nginx configuration was missing the `try_files` directive, which tells Nginx to serve index.html for any route that doesn't exist as a physical file (standard for single-page applications).

## Solution
- Created a custom `nginx.conf` file for the frontend with proper SPA routing
- Updated the frontend's Dockerfile to copy this custom config into the container
- Added `try_files $uri $uri/ /index.html;` to handle all SPA routes

## Files Modified
- frontend/nginx.conf - Created custom nginx config for SPA
- frontend/Dockerfile - Updated to use the custom nginx config

## Verification
- Directly navigating to /subscriptions, /dashboard, etc. now works correctly
- Reloading the page on any route doesn't give a 404 anymore
