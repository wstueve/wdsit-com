# Cloud Run custom domain mappings for strict TLS compatibility behind Cloudflare.

resource "google_cloud_run_domain_mapping" "apex" {
  location = var.region
  name     = var.domain

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name       = google_cloud_run_v2_service.wdsit_app.name
    certificate_mode = "AUTOMATIC"
    force_override   = true
  }

  depends_on = [google_cloud_run_v2_service.wdsit_app]
}