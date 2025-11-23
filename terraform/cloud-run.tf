# Cloud Run service configuration

resource "google_cloud_run_v2_service" "wdsit_app" {
  name                = var.service_name
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    # Scaling configuration
    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    # Service account
    service_account = google_service_account.cloud_run_sa.email

    # Container configuration
    # Note: Image is managed by gcloud CLI deployments from source
    # The first deployment must be done via gcloud to establish the service
    containers {
      # Placeholder image - will be replaced by actual deployment
      image = "us-docker.pkg.dev/cloudrun/container/hello:latest"

      # Resource limits
      resources {
        limits = {
          cpu    = var.cpu
          memory = var.memory
        }
        cpu_idle = true # Only allocate CPU during request processing
      }

      # Port configuration
      ports {
        container_port = 8080
      }

      # Environment variables
      env {
        name  = "NODE_ENV"
        value = "production"
      }

      # Secret environment variables from Secret Manager
      env {
        name = "RESEND_API_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.resend_api_key.secret_id
            version = "latest"
          }
        }
      }

      # Startup and liveness probes
      startup_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        initial_delay_seconds = 10
        timeout_seconds       = 3
        period_seconds        = 10
        failure_threshold     = 3
      }

      liveness_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        initial_delay_seconds = 30
        timeout_seconds       = 3
        period_seconds        = 30
        failure_threshold     = 3
      }
    }

    # Request timeout
    timeout = "${var.timeout}s"

    # Max concurrent requests per instance
    max_instance_request_concurrency = var.concurrency
  }

  # Traffic configuration
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  labels = {
    environment = var.environment
    managed_by  = "terraform"
  }

  lifecycle {
    ignore_changes = [
      # Allow gcloud CLI to update the service without Terraform interference
      template[0].containers[0].image,
      template[0].revision,
    ]
  }
}

# Allow unauthenticated access (public website)
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  name     = google_cloud_run_v2_service.wdsit_app.name
  location = google_cloud_run_v2_service.wdsit_app.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Output the service URL
output "cloud_run_url" {
  value       = google_cloud_run_v2_service.wdsit_app.uri
  description = "URL of the Cloud Run service"
}
