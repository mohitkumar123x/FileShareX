# Phase 1 — MVP Cloud Drive

Word document: **[PHASE-1-MVP-Cloud-Drive.docx](./PHASE-1-MVP-Cloud-Drive.docx)**

This document covers Phase 1 of the FileShareX cloud drive conversion:

- Storage abstraction + Cloudflare R2
- Folder hierarchy
- Storage quota (GB-based plans)
- Upload improvements
- Drive UI

Open the `.docx` file in Microsoft Word, Google Docs, or LibreOffice.

**Implementation order:** lock existing file APIs first (auth on download, ownership checks, no `fileLocation` leak, Clerk webhook verification). Then R2 storage, byte quotas, folders, and Drive UI.
