# IAM configuration for Cloud Run and related services

# Service account for Cloud Run
resource "google_service_account" "cloud_run_sa" {
  account_id   = "${var.service_name}-sa"
  display_name = "Service Account for ${var.service_name} Cloud Run"
  description  = "Used by Cloud Run service to access GCP resources"
}

# Grant Secret Manager access to Cloud Run service account
resource "google_secret_manager_secret_iam_member" "cloud_run_secret_access" {
  secret_id = google_secret_manager_secret.resend_api_key.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}

# Service account for GitHub Actions CI/CD
resource "google_service_account" "github_actions_sa" {
  account_id   = "github-actions-${var.service_name}"
  display_name = "GitHub Actions Service Account"
  description  = "Used by GitHub Actions for CI/CD deployments"
}

# Grant GitHub Actions SA permissions to deploy Cloud Run
resource "google_project_iam_member" "github_actions_cloud_run_developer" {
  project = var.project_id
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_service_account.github_actions_sa.email}"
}

# Grant GitHub Actions SA permissions to act as Cloud Run service account
resource "google_service_account_iam_member" "github_actions_act_as" {
  service_account_id = google_service_account.cloud_run_sa.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.github_actions_sa.email}"
}

# Grant GitHub Actions SA permissions to manage Cloud Build
resource "google_project_iam_member" "github_actions_cloud_build_editor" {
  project = var.project_id
  role    = "roles/cloudbuild.builds.editor"
  member  = "serviceAccount:${google_service_account.github_actions_sa.email}"
}

# Output service account emails
output "cloud_run_service_account_email" {
  value       = google_service_account.cloud_run_sa.email
  description = "Email of the Cloud Run service account"
}

output "github_actions_service_account_email" {
  value       = google_service_account.github_actions_sa.email
  description = "Email of the GitHub Actions service account"
}
