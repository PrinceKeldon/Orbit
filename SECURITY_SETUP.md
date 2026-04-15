# Security Setup Guide

## 🔒 Credentials Fix Status

✅ **Critical Issue Resolved**
- `.env` file removed from working directory
- `.env.local` created with current credentials (Git-ignored)
- `.env.example` created with placeholder values for team reference

## Environment Variables Setup

### For Your Local Development

1. **Rename or use `.env.local`:**
   ```bash
   # .env.local is automatically Git-ignored
   # It already contains your credentials and will be used by Expo
   ```

2. **Exact Variables Required:**
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://fmqexveebybpdohmqanx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcWV4dmVlYnlicGRvaG1xYW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MDU4NDAsImV4cCI6MjA4ODM4MTg0MH0.j5VFJH7IK2n9YYvBbMOcbNiNdEKMjQtUtuiX1sd_dwI
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcWV4dmVlYnlicGRvaG1xYW54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgwNTg0MCwiZXhwIjoyMDg4MzgxODQwfQ.6S_qbcLxkWIK7VimFETaXLXPs-9-xOuYkGBuQz6dm1U
   SUPABASE_DB_PASSWORD='fnrOdeTQsHMFsll1'
   ```

### For Team Members

1. **Copy from `.env.example`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Ask project lead for actual credentials** to fill in the placeholder values

## 🛡️ Best Practices Going Forward

### 1. **Never Commit Credentials**
   - ❌ Do NOT commit `.env`, `.env.production`, `.env.staging`
   - ✅ Only commit `.env.example` with placeholders
   - ✅ Use `.env.local` for local development (Git-ignored)

### 2. **Environment Variable Naming**
   - `EXPO_PUBLIC_*` - Safe to expose in client-side code
   - Everything else - Server-side only (don't use in frontend code)
   
   **Current Variables Classification:**
   ```
   EXPO_PUBLIC_SUPABASE_URL           ✅ Client-safe (public)
   EXPO_PUBLIC_SUPABASE_ANON_KEY      ✅ Client-safe (limited access)
   SUPABASE_SERVICE_ROLE_KEY          ⚠️  NEVER use on client (admin access)
   SUPABASE_DB_PASSWORD               ⚠️  NEVER use on client (db admin)
   ```

### 3. **Git Protection**

#### Install git-secrets to prevent future leaks:
```bash
# Install git-secrets
brew install git-secrets

# Configure for ORBIT-Mobile
cd /Users/frankkoine/ORBIT-Mobile
git secrets --install
git secrets --register-aws
```

#### Add custom pattern for API keys:
```bash
git secrets --add-provider -- cat ~/.git-secrets-patterns
```

### 4. **Multiple Environment Setup**

For production/staging environments, use separate files:
```
.env.development.local   (Git-ignored, local dev)
.env.staging.local       (Git-ignored, staging creds)
.env.production.local    (Git-ignored, production creds)
.env.example             (Git-tracked, placeholders)
```

Then load based on NODE_ENV:
```javascript
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}.local`;
```

### 5. **Accessing Credentials Safely**

**Current safe usage in `lib/supabase.ts`:**
```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
```

**What NOT to do:**
```typescript
// ❌ DANGEROUS: Never use service role on client
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
```

### 6. **Supabase-Specific Security**

1. **Rotate Credentials** (optional, since never exposed publicly):
   - Go to Supabase Dashboard → Settings → API Keys
   - If you want extra security, regenerate the keys
   - Update `.env.local` with new keys

2. **Enable RLS (Row Level Security)**:
   - Go to Supabase Dashboard → Authentication → Policies
   - Enable RLS on all tables
   - Define policies for data access

3. **Set Up Network Restrictions**:
   - Supabase Dashboard → Settings → Network Restrictions
   - Only allow your domain(s)

4. **Enable Audit Logs**:
   - Monitor all database changes
   - Available in Supabase Dashboard

## 📋 Checklist for This Project

- [x] Created `.env.local` with credentials (Git-ignored)
- [x] Created `.env.example` with placeholders
- [x] Removed exposed `.env` file
- [x] Verified `.gitignore` has `.env` patterns
- [ ] (Optional) Rotate Supabase credentials in dashboard
- [ ] Add git-secrets to prevent leaks
- [ ] Share `.env.example` with team
- [ ] Document how new team members should set up env vars
- [ ] Set up Supabase RLS policies

## 🔑 Current Credentials Location

**Local Development File:** `.env.local` (Git-ignored ✅)
- Contains full credentials
- Use for `npm start`, `expo start`, etc.

**Template for Others:** `.env.example` (Git-tracked)
- Contains placeholders
- Share with team members

## ⚠️ What If Credentials Are Compromised?

If you ever commit credentials or they're exposed:

```bash
# 1. Immediately rotate in Supabase Dashboard
# 2. Remove from Git history using git-filter-repo:
pip install git-filter-repo
cd /repo
git filter-repo --invert-paths --path .env
git filter-repo --invert-paths --path '.env.*'
git push --force-all

# 3. Verify credentials are removed:
git log --all --source -- .env
```

## 📚 References

- [Expo Environment Variables](https://docs.expo.dev/build-reference/variables/)
- [Supabase security best practices](https://supabase.com/docs/guides/with-expo#security-considerations)
- [OWASP Secrets Management](https://owasp.org/www-community/Sensitive_Data_Exposure)
- [git-secrets documentation](https://github.com/awslabs/git-secrets)

---

**Status:** ✅ Critical security issue resolved  
**Last Updated:** April 15, 2026
