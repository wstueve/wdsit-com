---
name: dependabot-deployment
description: |
  **DEPLOYMENT SKILL** — Automate merging Dependabot PRs, resolving dependency conflicts, running smoke tests, and executing canary deployment.
  
  **USE FOR:**
  - Merging batches of open Dependabot PRs
  - Resolving peer dependency mismatches automatically
  - Running comprehensive smoke test validation
  - Executing canary deployment with traffic migration
  - Syncing package-lock.json after dependency updates
  
  **WORKFLOW:**
  1. List and merge all open Dependabot PRs
  2. Detect peer dependency conflicts via `npm ci`
  3. Resolve conflicts by updating package.json versions
  4. Sync lock file and commit to main
  5. Run full smoke test suite
  6. Execute canary deployment script with validation
  7. Perform final production smoke tests
  
  **PREREQUISITES:**
  - Workspace has `.scripts/canary-deploy.sh` script
  - GitHub CLI configured and authenticated
  - Cloud Run and Cloudflare access tokens configured
  - Playwright browser binaries installed (runs automatically)
---

# Dependabot Deployment Automation

## Quick Start

When you have open Dependabot PRs ready to merge and deploy:

```
User: Merge all Dependabot PRs and deploy
Agent: I'll run the full deployment workflow...
```

The skill will:
1. **Merge PRs**: Squash-merge all open Dependabot PRs
2. **Resolve Conflicts**: Automatically fix peer dependency mismatches
3. **Sync Dependencies**: Run `npm install` and commit lock file updates
4. **Test**: Execute smoke tests against all browser projects
5. **Deploy**: Run canary deployment with staged traffic migration
6. **Validate**: Run final production smoke tests

## Workflow Steps

### Step 1: List Open Dependabot PRs
```bash
gh pr list --state open --author app/dependabot --json number,title,headRefName,baseRefName,url
```
Identifies all available Dependabot PRs for review before merging.

### Step 2: Merge PRs Sequentially
```bash
for pr in <pr_numbers>; do
  gh pr merge $pr --squash --admin
done
```
- Uses `--squash` for clean commit history
- Handles merge conflicts by requiring admin flag
- Continues on partial failures to maximize merged PRs

### Step 3: Detect Peer Dependency Issues
```bash
npm ci
```
- `npm ci` fails fast if peer dependencies don't match
- Common error: Dev dependency version mismatch with production equivalents
- Example: `@react-router/dev@8.3.1` requires `react-router@^8.3.1`

### Step 4: Resolve Dependency Conflicts
When `npm ci` fails with peer dependency errors:
1. Parse error message to identify conflicting packages
2. Update `package.json` production/dev dependencies to compatible versions
3. Run `npm install` to generate fresh lock file
4. Commit changes: `git commit -m "fix: resolve peer dependency mismatch"`

### Step 5: Run Smoke Tests
```bash
npm run test:deployment
```
- Tests deployment scenarios across all configured browser projects
- Validates pages load, assets load, navigation works, performance acceptable
- Catches issues before production deployment

### Step 6: Execute Canary Deployment
```bash
./.scripts/canary-deploy.sh
```
Script handles:
- Install dependencies with `npm ci`
- Build application with `npm run build`
- Deploy new revision with 0% traffic (canary)
- Run smoke tests against canary URL
- Migrate 100% traffic to new revision
- Purge Cloudflare cache
- Run final smoke tests on production
- Clean up old Cloud Run revisions

### Step 7: Validate Production
Final smoke test run confirms production is healthy after deployment.

## Common Issues & Fixes

### Issue: Peer Dependency Mismatch
**Error**: `npm ci` fails with `ERESOLVE could not resolve`
```
Found: react-router@8.3.0
Could not resolve peer react-router@^8.3.1 from @react-router/dev@8.3.1
```

**Fix**:
1. Identify the conflicting package versions
2. Update both to compatible semver ranges:
   ```json
   "react-router": "^8.3.1"
   ```
3. Run `npm install` to regenerate lock file
4. Commit and push: `git add package.json package-lock.json && git commit -m "fix: resolve peer dependency mismatch" && git push origin main`

### Issue: Lock File Out of Sync
**Error**: `npm ci` fails with `lock file's X does not satisfy Y`
```
Invalid: lock file's isbot@5.2.2 does not satisfy isbot@5.1.26
Missing: tsconfck@3.1.6 from lock file
```

**Fix**:
1. Run `npm install` (not `npm ci`) to regenerate lock file
2. Commit and push updates:
   ```bash
   git add package-lock.json
   git commit -m "chore: update lock file"
   git push origin main
   ```

### Issue: Playwright Browsers Missing
**Error**: Tests fail with `Executable doesn't exist at .../playwright/...`

**Fix**: 
Run `npx playwright install` before executing smoke tests.
The canary deployment script does this automatically in step 6.

### Issue: Merge Conflicts on Dependabot Branches
**Error**: `gh pr merge` fails with `merge conflicts`

**Fix**:
1. Rebase the branch on updated main:
   ```bash
   git checkout <branch_name>
   git rebase origin/main -X ours
   git push --force-with-lease
   ```
2. Retry merge after rebase resolves conflicts

## Key Practices

### Before Merging Dependabot PRs
- ✅ Always run `npm ci` to check for peer dependency conflicts
- ✅ Review Dependabot PR titles to understand what's being updated
- ✅ Check for grouped updates vs. single packages

### During Deployment
- ✅ Smoke tests run against canary URL before traffic migration
- ✅ Final smoke tests validate production after deployment
- ✅ Cloudflare cache is purged to ensure fresh content

### After Deployment
- ✅ Monitor Cloud Run logs for any errors
- ✅ Check production at https://wdsit.com for visual validation
- ✅ Review Playwright smoke test report if any tests fail

## Automation Integration

This skill can be invoked by:
- Direct user request: "Merge all Dependabot PRs and deploy"
- CI/CD workflow: Triggered after Dependabot creates PRs
- Scheduled task: Weekly Dependabot merge + deployment

## Environment & Tools

**Required Tools:**
- `gh` (GitHub CLI) - authenticated with repo access
- `npm` - Node package manager with npm ci support
- `gcloud` - Google Cloud CLI for Cloud Run access
- `npx` - For Playwright browser installation
- Bash shell with standard utilities

**Environment Variables:**
- `WDSIT_CLOUDFLARE_ZONE_ID` - Cloudflare zone identifier
- `WDSIT_CLOUDFLARE_API_TOKEN` - Cloudflare API token
- `RESEND_API_KEY` - Resend email service key (in Cloud Run)

## Troubleshooting

**Question**: Why does `npm ci` fail after merging PRs?
**Answer**: Dependabot PRs may update dev and production dependencies at different rates. If dev dependencies require newer versions of shared packages, peer conflicts emerge. Always run `npm ci` immediately after merging to detect this early.

**Question**: Can I merge only specific Dependabot PRs?
**Answer**: Yes. Modify the merge loop to target specific PR numbers:
```bash
for pr in 6 7 12; do gh pr merge $pr --squash --admin; done
```

**Question**: What if canary tests fail?
**Answer**: The deployment script will stop before migrating traffic to production. Investigate the failed test, fix the code, and rerun the canary deploy. Old production revision remains healthy until you migrate traffic.

**Question**: How long does full deployment take?
**Answer**: Typical timeline:
- Dependencies install: ~2 min
- Build: ~1 min
- Cloud Run deployment: ~3-5 min
- Smoke tests (canary): ~4-5 min
- Traffic migration: <1 min
- Final smoke tests: ~4-5 min
- **Total: ~15-20 min**

## References

- [Dependabot Docs](https://docs.github.com/en/code-security/dependabot)
- [Cloud Run Deployment Guide](https://cloud.google.com/run/docs/deploying-overview)
- [Playwright Testing](https://playwright.dev/docs/intro)
- [Canary Deployment Best Practices](https://cloud.google.com/run/docs/deploying-source-code)
