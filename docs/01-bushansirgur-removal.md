# Issue: Remove "bushansirgur" from Application

## Problem Description
The application contained references to "bushansirgur" in multiple places:
- Package structure
- Gradle configuration
- Documentation files
- Source code comments

## Files Modified

### 1. `backend/build.gradle`
**Change:** Updated group ID from `in.bushansirgur` to `filesharex`

**Before:**
```gradle
group 'in.bushansirgur'
```

**After:**
```gradle
group 'filesharex'
```

### 2. Java Source Files
All Java files had their package declarations updated from `in.bushansirgur.filesharexapi` to `filesharexapi`:

**Example - `FileShareXApplication.java`:**
```java
// Before
package in.bushansirgur.filesharexapi;

// After
package filesharexapi;
```

### 3. LLD Documentation (`LLD/README.md`)
Updated base package reference throughout the documentation.

### 4. Source Code Files Moved
All Java source files were moved from:
- `backend/src/main/java/in/bushansirgur/filesharexapi/`
to:
- `backend/src/main/java/filesharexapi/`

### 5. Old Bin Directory Deleted
Removed `backend/bin` directory which contained outdated compiled class files with old package structure.

## Verification
- Application compiles successfully with new package structure
- No references to "bushansirgur" remain in codebase
- All functionality works as expected
