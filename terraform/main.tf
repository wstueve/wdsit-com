# Terraform configuration for WDSIT.com Cloud Run deployment

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }

  # Backend configuration for state management
  # Uncomment and configure after creating GCS bucket
  # backend "gcs" {
  #   bucket = "wdsit-terraform-state"
  #   prefix = "terraform/state"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
