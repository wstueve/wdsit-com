# Source-Based Deployment Update

## Changes Made

Simplified the Cloud Run deployment to use **source-based deployment** instead of Docker containers. This eliminates the need for Dockerfiles and manual containerization.

## Benefits

✅ **Simpler deployment** - No Docker knowledge required
✅ **No Dockerfile maintenance** - Google handles containerization
✅ **Faster CI/CD** - No image building/pushing steps
✅ **Automatic optimization** - Cloud Buildpacks apply best practices
✅ **Less infrastructure** - No Artifact Registry needed
✅ **Lower costs** - Simplified architecture

## How It Works

1. **`gcloud run deploy --source .`** - Deploys directly from source code
2. **Cloud Buildpacks** - Google automatically detects Node.js and containerizes
3. **`Procfile`** - Specifies how to start the application (`web: node server.js`)
4. **`.gcloudignore`** - Excludes unnecessary files from upload

## Files Modified

### Removed/Optional
- `Dockerfile` - No longer required (kept for reference, but not used)
- `terraform/artifact-registry.tf` - Commented out (not needed)
- Docker-related scripts in `package.json`

### Updated
- `.github/workflows/deploy.yml` - Direct source deployment
- `package.json` - Simplified `deploy` script
- `.gcloudignore` - Optimized for source deployment
- `terraform/cloud-run.tf` - Updated for source-based deployment
- `terraform/iam.tf` - Removed Artifact Registry permissions
- `terraform/apis.tf` - Removed Artifact Registry API
- Documentation files

### Added
- `Procfile` - Tells Cloud Run how to start the app

## Deployment Commands

### Local Development
```bash
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Test production build locally
```

### Deploy to Cloud Run
```bash
npm run deploy       # Deploy from source (no Docker needed!)
```

### What Happens
1. Uploads source code to Google Cloud
2. Cloud Buildpacks detect Node.js project
3. Installs dependencies (`npm ci`)
4. Runs build script (`npm run build`)
5. Creates optimized container
6. Deploys to Cloud Run
7. Routes traffic

## GitHub Actions Workflow

The CI/CD pipeline now:
1. ✅ Runs tests
2. ✅ Authenticates to GCP
3. ✅ Deploys from source with `gcloud run deploy --source=.`
4. ✅ Gradual traffic migration (10% → 50% → 100%)
5. ✅ Post-deployment smoke tests

**No Docker build/push steps required!**

## Terraform Changes

- Artifact Registry resource commented out (optional)
- Cloud Run service uses placeholder image initially
- First deployment via `gcloud` establishes the service
- Terraform manages configuration, gcloud manages deployments

## Prerequisites

**Before:**
- Node.js, Docker, Google Cloud SDK, Terraform

**After:**
- Node.js, Google Cloud SDK, Terraform
- **Docker removed** from requirements! 🎉

## Cost Impact

**Reduced costs** by removing Artifact Registry:
- Before: ~$30-60/month (includes registry storage)
- After: ~$30-50/month (no registry costs)

## Migration Path

If already deployed with Docker:

1. Pull latest changes
2. Run `npm install` to ensure dependencies are current
3. Deploy with `npm run deploy`
4. Cloud Run will automatically switch to source-based deployment
5. Old container images can be cleaned up (if any)

No downtime required!

## Troubleshooting

### Local Testing
```bash
npm run build
npm run preview
# Visit http://localhost:8080
```

### View Cloud Build Logs
```bash
gcloud builds list --limit=5
gcloud builds log <BUILD_ID>
```

### Check Deployed Service
```bash
gcloud run services describe wdsit-com --region=us-central1
```

## Additional Notes

- Cloud Buildpacks automatically detect Node.js version from `package.json`
- The `Procfile` is optional but recommended for explicit control
- `.gcloudignore` prevents uploading test files, docs, etc.
- Build happens in Cloud Build (included in Cloud Run pricing)
- Deployment takes ~2-5 minutes depending on app size

## Summary

This change makes the deployment process **significantly simpler** while maintaining all functionality. No Docker expertise needed - just push your code and Cloud Run handles the rest!
