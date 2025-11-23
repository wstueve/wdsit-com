# Terraform Infrastructure Guide

This directory contains Terraform configurations for deploying WDSIT.com to Google Cloud Run with Cloud CDN and Load Balancer.

## Prerequisites

1. Install Terraform (>= 1.5.0)
2. Install Google Cloud SDK
3. Authenticate with GCP: `gcloud auth application-default login`
4. Create a GCP project or use an existing one

## Setup Steps

### 1. Configure Variables

Copy the example variables file and edit with your values:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` and set:
- `project_id`: Your GCP project ID
- `domain`: Your custom domain
- Other configuration as needed

### 2. Initialize Terraform

```bash
cd terraform
terraform init
```

### 3. Review the Plan

```bash
terraform plan
```

This will show you all the resources that will be created.

### 4. Apply the Configuration

```bash
terraform apply
```

Review the plan and type `yes` to confirm.

### 5. Configure DNS

After Terraform completes, it will output a static IP address. Point your domain's DNS A records to this IP:

```
A    @           <static_ip_address>
A    www         <static_ip_address>
```

### 6. Wait for SSL Certificate

Google-managed SSL certificates can take up to 60 minutes to provision. Check status:

```bash
terraform output ssl_certificate_status
```

## Resource Overview

### Created Resources

- **Cloud Run Service**: Serverless container service
- **Artifact Registry**: Docker image repository
- **Load Balancer**: Global HTTP(S) load balancer
- **Cloud CDN**: Content delivery network for edge caching
- **SSL Certificate**: Google-managed SSL/TLS certificate
- **Static IP**: Global static IP address
- **IAM Service Accounts**: For Cloud Run and GitHub Actions
- **Secret Manager**: For storing sensitive environment variables

### Estimated Monthly Cost

For low to moderate traffic:
- Cloud Run: ~$10-30/month
- Load Balancer: ~$20/month
- Artifact Registry: ~$0.10/GB/month
- Cloud CDN: $0.02-0.08/GB (data transfer)
- **Total estimate**: ~$30-60/month

Actual costs depend on traffic and usage.

## State Management

### Local State (Default)

By default, Terraform stores state locally in `terraform.tfstate`. For production:

1. **Back up this file regularly**
2. **Do not commit it to git** (already in .gitignore)
3. Consider using remote state (see below)

### Remote State (Recommended for Production)

Create a GCS bucket for state storage:

```bash
gcloud storage buckets create gs://YOUR-PROJECT-wdsit-terraform-state \
  --location=us-central1 \
  --uniform-bucket-level-access

gcloud storage buckets update gs://YOUR-PROJECT-wdsit-terraform-state \
  --versioning
```

Uncomment the backend configuration in `main.tf`:

```hcl
backend "gcs" {
  bucket = "YOUR-PROJECT-wdsit-terraform-state"
  prefix = "terraform/state"
}
```

Then run:

```bash
terraform init -migrate-state
```

## Common Commands

```bash
# View current state
terraform show

# List all resources
terraform state list

# Get specific output value
terraform output cloud_run_url

# Format Terraform files
terraform fmt

# Validate configuration
terraform validate

# Destroy all resources (careful!)
terraform destroy
```

## Deployment Workflow

1. **Initial Setup**: Run Terraform to create infrastructure
2. **Set Secrets**: Use `.devops/push-secrets.sh` to set secret values
3. **Deploy Application**: Use GitHub Actions workflow or `gcloud run deploy`
4. **Update Infrastructure**: Modify Terraform files and run `terraform apply`

## Environments

To create separate staging/production environments:

1. Create separate directories: `terraform/staging` and `terraform/production`
2. Copy configuration files to each
3. Use different `terraform.tfvars` for each environment
4. Use Terraform workspaces or separate state files

## Security Notes

- Never commit `terraform.tfvars` with real values
- Use remote state with encryption
- Regularly rotate service account keys
- Review IAM permissions periodically
- Enable audit logging for production

## Troubleshooting

### SSL Certificate Not Provisioning

- Ensure DNS is correctly configured and propagated
- Wait up to 60 minutes for Google to provision
- Check certificate status: `terraform output ssl_certificate_status`

### Cloud Run Service Not Accessible

- Verify IAM policy allows public access (allUsers)
- Check load balancer backend health
- Review Cloud Run service logs

### Terraform Apply Fails

- Ensure all required APIs are enabled
- Check IAM permissions for your user/service account
- Review error messages for specific resource issues

## Support

For issues with Terraform configuration, check:
- [Terraform GCP Provider Docs](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud CDN Documentation](https://cloud.google.com/cdn/docs)
