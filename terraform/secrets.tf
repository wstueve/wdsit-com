# Secret Manager configuration for sensitive environment variables

# Enable Secret Manager API
resource "google_project_service" "secretmanager" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

# Resend API Key secret
resource "google_secret_manager_secret" "resend_api_key" {
  secret_id = "${var.service_name}-resend-api-key"

  replication {
    auto {}
  }

  labels = {
    environment = var.environment
    managed_by  = "terraform"
    service     = var.service_name
  }

  depends_on = [google_project_service.secretmanager]
}

# Secret version with actual API key value
resource "google_secret_manager_secret_version" "resend_api_key_version" {
  secret      = google_secret_manager_secret.resend_api_key.id
  secret_data = var.resend_api_key
}

# Output secret IDs
output "resend_api_key_secret_id" {
  value       = google_secret_manager_secret.resend_api_key.secret_id
  description = "Secret ID for Resend API key"
}
