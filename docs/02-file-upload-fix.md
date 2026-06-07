# Issue: File Upload Not Working

## Problem Description
Users were unable to upload files, and the application was showing an error without clear details.

## Root Causes Identified

### 1. Upload Directory Mismatch (`FileMetadataService.java`)
**Problem:** The code was trying to save files to "upload" directory, but the static resource config and expectations were for "uploads" (plural).

**Location:** `backend/src/main/java/filesharexapi/service/FileMetadataService.java`

**Before:**
```java
Path uploadPath = Paths.get("upload").toAbsolutePath().normalize();
```

**After:**
```java
Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
```

### 2. Null Pointer for Files Without Extensions
**Problem:** Files without extensions would cause a NullPointerException when trying to get file extension.

**Location:** `backend/src/main/java/filesharexapi/service/FileMetadataService.java`

**Before:**
```java
String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
String fileName = UUID.randomUUID().toString() + "." + extension;
```

**After:**
```java
String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
String fileName = UUID.randomUUID().toString() + (extension != null ? "." + extension : "");
```

### 3. Incomplete Exception Handling
**Problem:** Only specific exceptions were handled, so RuntimeExceptions and generic Exceptions weren't returning proper error responses to the frontend.

**Location:** `backend/src/main/java/filesharexapi/exceptions/GlobalExceptionHandler.java`

**Added handlers:**
```java
@ExceptionHandler(RuntimeException.class)
public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
    Map<String, Object> data = new HashMap<>();
    data.put("status", HttpStatus.BAD_REQUEST);
    data.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(data);
}

@ExceptionHandler(Exception.class)
public ResponseEntity<?> handleGenericException(Exception ex) {
    Map<String, Object> data = new HashMap<>();
    data.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
    data.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(data);
}
```

## Verification
- Files now upload successfully
- Clear error messages are displayed when issues occur
- Files with and without extensions work properly
- Uploaded files are stored in the correct "uploads" directory
