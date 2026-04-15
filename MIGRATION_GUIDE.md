# Migration Guide: Separating ORBIT-Mobile & Santoori-Webapp

This guide helps you implement the new architecture with separate repos.

## Step 1: Setup `@santoori/core` Repository

**Status:** ✅ DONE

Location: `/Users/frankkoine/santoori-core`

### Initialize git:

```bash
cd /Users/frankkoine/santoori-core
git init
git add .
git commit -m "feat: create @santoori/core shared package

- Shared types for User, Track, Playlist
- Zod validation schemas
- Utility functions
- Music duration formatting
- Email/password validation"
```

### Create GitHub repository:

1. Go to https://github.com/new
2. Create repo: `santoori-core`
3. Push:
   ```bash
   git remote add origin https://github.com/PrinceKeldon/santoori-core.git
   git push -u origin main
   ```

### Publish to npm:

```bash
cd santoori-core
npm login
npm publish --access public
```

## Step 2: Update ORBIT-Mobile

### Remove local copies:

```bash
cd /Users/frankkoine/ORBIT-Mobile

# Remove files that will come from @santoori/core
rm -rf types/index.ts
rm -rf types/schemas.ts
rm -rf utils/index.ts
```

### Update package.json:

```json
{
  "dependencies": {
    "@santoori/core": "^1.0.0",
    "@supabase/supabase-js": "^2.99.2",
    "zod": "^3.22.0"
  }
}
```

### Update imports:

```typescript
// Before: import from local files
import { AppUser } from "@/types";

// After: import from shared package
import { AppUser } from "@santoori/core";

// Same for schemas
import { SignInSchema } from "@santoori/core";

// Same for utilities
import { formatDuration, validateEmail } from "@santoori/core";
```

### Files to update:

- `services/auth.service.ts`
- `services/user.service.ts`
- `hooks/useAuthState.ts`
- Remove `types/` folder (use package instead)
- Remove `utils/` folder (use package instead)

### Install and test:

```bash
npm install
npm run lint
npm test
```

### Commit:

```bash
git add .
git commit -m "refactor: use @santoori/core package

- Removed local type definitions
- Removed local utility functions
- Updated imports to use @santoori/core
- Reduced code duplication"
```

## Step 3: Create Santoori-Webapp Repository

### Clone or create new:

```bash
# Option 1: If webapp doesn't exist yet
mkdir /Users/frankkoine/santoori-webapp
cd santoori-webapp
git init

# Option 2: If webapp exists in santoori-orbit-music
# Extract it to separate location
cp -r /path/to/webapp ~/santoori-webapp
cd santoori-webapp
git init
```

### Setup webapp structure:

```
santoori-webapp/
├── src/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

### Update package.json:

```json
{
  "name": "santoori-webapp",
  "dependencies": {
    "@santoori/core": "^1.0.0",
    "react": "^18.0.0",
    "next": "^14.0.0"
  }
}
```

### Update imports in webapp:

```typescript
// Use shared types from package
import { AppUser, Track, Playlist } from "@santoori/core";
import { SignInSchema, validateEmail } from "@santoori/core";
import { formatDuration, getRelativeTime } from "@santoori/core";
```

### Install and test:

```bash
npm install
npm run dev
```

## Step 4: Setup ORBIT-Mobile Independent Repo

### Current state:

- Already in `/Users/frankkoine/ORBIT-Mobile`
- Already has git initialized
- Already committed initial work

### Push to GitHub:

```bash
cd /Users/frankkoine/ORBIT-Mobile

# Remove old remote (santoori-orbit-music)
git remote remove origin

# Add new remote (ORBIT-Mobile)
git remote add origin https://github.com/PrinceKeldon/ORBIT-Mobile.git
git push -u origin main
```

### Verify setup:

```bash
git log --oneline -1  # Should show your commit
git remote -v        # Should show ORBIT-Mobile repo
npm run lint         # Should pass
```

## Step 5: Update santoori-orbit-music (if keeping)

If the monorepo is needed for deployment:

```bash
cd /Users/frankkoine/santoori-orbit-music

# Remove ORBIT-Mobile folder
git rm -r app/ components/ hooks/ services/ types/ utils/
git rm package.json  # or selectively remove entries

# Add as git submodule (or separate dependency)
git submodule add https://github.com/PrinceKeldon/ORBIT-Mobile.git orbit-mobile
git submodule add https://github.com/PrinceKeldon/santoori-webapp.git webapp

git commit -m "refactor: use separate repos as submodules

- ORBIT-Mobile is now PrinceKeldon/ORBIT-Mobile
- Webapp is now PrinceKeldon/santoori-webapp
- Core package is @santoori/core
- Changed from monorepo to separate repos pattern"
```

## Verification Checklist

- [ ] `@santoori/core` published to npm
- [ ] ORBIT-Mobile uses `@santoori/core` package
- [ ] Santoori-Webapp uses `@santoori/core` package
- [ ] ORBIT-Mobile pushed to separate repo
- [ ] Santoori-Webapp pushed to separate repo
- [ ] All lint checks pass
- [ ] All imports updated
- [ ] No local type/schema files in apps
- [ ] Tests pass in all repos
- [ ] Documentation updated

## Troubleshooting

### Circular dependencies

**Problem:** If types import from each app
**Solution:** Ensure all shared code is in `@santoori/core`

### Version conflicts

**Problem:** Different versions of `@santoori/core` in different apps
**Solution:** `npm install @santoori/core@latest` in each app

### Import errors

**Problem:** `Cannot find module '@santoori/core'`
**Solution:** Ensure `npm install` was run and package is in package.json

### Build failures

**Problem:** Types not recognized after migration
**Solution:** Run `npm run lint:fix` and rebuild

## Timeline

- **Today:** Setup @santoori/core ✅
- **This week:** Update ORBIT-Mobile, push repos
- **Next week:** Update Santoori-Webapp, verify integration
- **Later:** Deprecate monorepo if no longer needed

---

**Migration Date:** April 15, 2026  
**Status:** Ready to execute ✅
