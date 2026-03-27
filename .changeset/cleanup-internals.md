---
"bridgerton": patch
---

Remove dead code and fix sloppy patterns:

- Remove unused `promptForKey`/`ensureApiKey` from client (duplicated by bin.ts onboarding)
- Simplify `request()` to synchronous API key check
- Replace `as any` cast with proper Format type assertion
- Use Node shebang for cross-runtime compatibility (Node + Bun)
- Read version from package.json at runtime to prevent drift
