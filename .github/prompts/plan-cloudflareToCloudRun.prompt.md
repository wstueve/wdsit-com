# Plan: Migrate from Cloudflare Pages to Google Cloud Run

Migrate the React Router SSR application from Cloudflare Workers to Google Cloud Run by containerizing the app, replacing the Worker entry point with an Express server, and updating the build/deployment pipeline.

## Steps

1. **Create containerization files** — Add `Dockerfile` with multi-stage build (build stage + production stage with Node.js), `.dockerignore`, and `.gcloudignore` to optimize container size

2. **Replace Worker with Node.js server** — Convert `workers/app.ts` to Express/Fastify server that handles SSR using `app/entry.server.tsx`, serve static assets from `build/client`, and remove Cloudflare-specific code

3. **Update build configuration** — Remove `@cloudflare/vite-plugin-cloudflare` from `vite.config.ts`, update target to Node.js, and configure for standard SSR instead of Workers environment

4. **Update dependencies and scripts** — Remove `wrangler`, `@cloudflare/workers-types`, and Cloudflare Vite plugin from `package.json`; add `express` (or alternative); update `deploy` script to use `gcloud run deploy`; remove `tsconfig.cloudflare.json` and merge settings into `tsconfig.json`

5. **Create Terraform infrastructure configuration** — Add Terraform files to define Cloud Run service, Artifact Registry repository, Cloud Load Balancer, Cloud CDN, IAM roles, and all necessary GCP resources with proper configuration (memory, CPU, autoscaling, env vars, custom domain mapping)

6. **Create Cloud Run deployment workflow** — Update `.github/workflows/playwright.yml` to build Docker image with Cloud Build, push to Google Artifact Registry, and deploy to Cloud Run using Terraform or gcloud CLI commands

7. **Configure static asset serving** — Serve assets from Cloud Run container directly initially; Cloud CDN will cache at edge automatically via Load Balancer configuration

## Infrastructure as Code Options

### Option A: Terraform (Recommended)
- **Pros**: Full state management, declarative config, reusable modules, change preview with `terraform plan`, easy to version control
- **Cons**: Learning curve, requires state management (can use GCS bucket)
- **Structure**: 
  - `terraform/main.tf` - Cloud Run service definition
  - `terraform/artifact-registry.tf` - Container registry
  - `terraform/load-balancer.tf` - Global LB + Cloud CDN
  - `terraform/iam.tf` - Service accounts and permissions
  - `terraform/variables.tf` - Configurable values (project ID, region, domain)
  - `terraform/outputs.tf` - Service URLs and endpoints

### Option B: gcloud CLI Commands
- **Pros**: Simpler, no state management, direct GCP API interaction, easier for quick changes
- **Cons**: Harder to maintain, no built-in rollback, manual dependency management, less visibility into infrastructure drift
- **Structure**: Shell scripts in `scripts/` directory:
  - `scripts/setup-infrastructure.sh` - Initial setup commands
  - `scripts/deploy.sh` - Deployment commands
  - `scripts/teardown.sh` - Cleanup commands

### Recommendation
**Use Terraform** for production-grade infrastructure that's maintainable, auditable, and allows for easy replication across environments (staging/production). Keep gcloud CLI commands in scripts for quick manual operations.

## Further Considerations

1. **Cold start optimization** — Min instances set to 2 to allow for canary deployments and reduce cold start latency on Cloud Run

2. **Regional vs global deployment** — Deploy to single region (us-central1) with Cloud Load Balancer + Cloud CDN for global distribution

3. **Local development environment** — Keep current `react-router dev` setup and only use Docker for production builds

4. **Domain configuration** — Configure custom domain (wdsit.com) in Terraform with SSL certificate provisioning via Google-managed certificates

5. **Environment variables** — Store sensitive config in Google Secret Manager, reference in Cloud Run service via Terraform

6. **Cost optimization** — Start with CPU allocated only during request processing, 256MB memory (smallest instance), scale 0-10 instances based on traffic

7. **Contact form email handling** — Implement backend API route at `/api/contact` in Express server to handle form submissions with email sending via **Resend** (3k emails/month free tier). API key stored in `RESEND_API_KEY` environment variable, managed via Google Secret Manager

8. **DevOps secrets management scripts** — Create `.devops/` folder with shell scripts for bidirectional secret synchronization:
   - `pull-secrets.sh` - Fetches current secret versions from Google Secret Manager and generates `.env` file for local development
   - `push-secrets.sh` - Reads `.env` file and creates/updates secret versions in Google Secret Manager
   - `list-secrets.sh` - Lists all secrets and their versions for auditing
   - Secrets to manage: `RESEND_API_KEY`, plus any future additions
   - `.env` file should be gitignored for security
