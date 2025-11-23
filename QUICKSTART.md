# Quick Start Guide - Cloud Run Deployment

This is a condensed version of the full migration guide. For complete details, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md).

## Prerequisites Checklist

- [ ] Node.js 20+ installed
- [ ] Google Cloud SDK installed
- [ ] Terraform >= 1.5.0 installed
- [ ] GCP account with billing enabled
- [ ] Resend account with API key

## Quick Setup (15 minutes)

### 1. Authenticate with GCP

```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Deploy Infrastructure

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your project ID
terraform init
terraform apply
```

**Note the output values** - especially `static_ip_address`

### 4. Configure Secrets

Secrets are configured in `terraform/terraform.tfvars`:

```bash
cd terraform
# Edit terraform.tfvars and add your Resend API key:
# resend_api_key = "re_your_actual_key"
```

Terraform automatically creates the secret in Google Secret Manager during deployment.

### 5. Point DNS

Add A records to your domain:
```
A    @           <static_ip_from_terraform>
A    www         <static_ip_from_terraform>
```

### 7. Deploy Application

```bash
# Build and test locally first
npm run build
npm run preview

# Deploy to Cloud Run
npm run deploy
```

### 8. Verify

```bash
# Check health endpoint
curl https://YOUR_DOMAIN/health

# Run smoke tests
npm run test:deployment
```

## Common Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Cloud Run (from source)
npm run deploy

# View logs
gcloud logs read --limit=50 --resource-type=cloud_run_revision

# View secrets
gcloud secrets list
gcloud secrets versions access latest --secret=svc-wdsit-com-resend-api-key
```

## CI/CD with GitHub Actions

1. Set up Workload Identity Federation (see MIGRATION_GUIDE.md)
2. Add GitHub Secrets:
   - `GCP_PROJECT_ID`
   - `GCP_WORKLOAD_IDENTITY_PROVIDER`
   - `GCP_SERVICE_ACCOUNT`
3. Push to main branch → automatic deployment

## Project Structure

```
wdsit-com/
├── app/                 # React Router application
├── terraform/           # Infrastructure as Code
│   ├── terraform.tfvars # Variables including secrets
│   └── *.tf            # Infrastructure definitions
├── .github/workflows/  # CI/CD pipelines
├── server.js           # Express server
└── tests/              # Playwright tests
```

## Troubleshooting

### Build fails locally
```bash
npm run build
node server.js
```

### Deploy fails
```bash
gcloud logs read --limit=50
```

### SSL not working
```bash
terraform output ssl_certificate_status
# Wait up to 60 minutes for provisioning
```

### Contact form not working
```bash
# Check secret
gcloud secrets versions access latest --secret=svc-wdsit-com-resend-api-key

# Check logs
gcloud logs read --filter="resource.labels.service_name=svc-wdsit-com" --limit=50
```

## Cost Estimates

- Cloud Run: $10-30/month
- Load Balancer: $20/month
- Cloud CDN: $0.02-0.08/GB
- **Total: ~$30-60/month** for moderate traffic

## Next Steps

1. ✅ Deploy infrastructure
2. ✅ Configure secrets
3. ✅ Deploy application
4. ⏳ Wait for SSL certificate (up to 60 min)
5. ✅ Run smoke tests
6. 📊 Set up monitoring and alerts
7. 🚀 Go live!

## Help

- **Full Guide**: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Terraform Docs**: [terraform/README.md](terraform/README.md)
- **Cloud Run Docs**: https://cloud.google.com/run/docs

## Emergency Rollback

```bash
# List revisions
gcloud run revisions list --service=svc-wdsit-com --region=us-central1

# Rollback to previous revision
gcloud run services update-traffic svc-wdsit-com \
  --region=us-central1 \
  --to-revisions=PREVIOUS_REVISION=100
```
