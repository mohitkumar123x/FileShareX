# Issue: Missing Profile for New Users

## Problem Description
When a new user signed in and tried to upload files or access their credits, they got a NullPointerException because there was no ProfileDocument in the database yet.

## Root Cause
The `getCurrentProfile()` method in `ProfileService` only tried to fetch an existing profile from the database, but didn't create a new one if it didn't exist.

## Solution
Updated the `getCurrentProfile()` method to automatically create a new profile with 5 initial credits if no existing profile is found for the authenticated user.

## Files Modified

### `backend/src/main/java/filesharexapi/service/ProfileService.java`
```java
public ProfileDocument getCurrentProfile() {
    if (SecurityContextHolder.getContext().getAuthentication() == null) {
        throw new UsernameNotFoundException("User not authenticated");
    }

    String clerkId = SecurityContextHolder.getContext().getAuthentication().getName();
    ProfileDocument profile = profileRepository.findByClerkId(clerkId);
    
    if (profile == null) {
        // Create a new profile for the authenticated user
        profile = ProfileDocument.builder()
                .clerkId(clerkId)
                .credits(5)
                .createdAt(Instant.now())
                .build();
        profile = profileRepository.save(profile);
    }
    
    return profile;
}
```

## Verification
- New users automatically get a profile created with 5 credits
- Existing users continue to use their existing profiles
- No more NullPointerExceptions when accessing user credits or uploading files
