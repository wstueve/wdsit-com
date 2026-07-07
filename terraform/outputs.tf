# Outputs summary

output "deployment_summary" {
  value = {
    project_id            = var.project_id
    region                = var.region
    service_name          = var.service_name
    environment           = var.environment
    cloud_run_url         = google_cloud_run_v2_service.wdsit_app.uri
    deployment_type       = "cloud-run-origin-behind-cloudflare"
    domain                = var.domain
    cloudflare_zone_id    = var.cloudflare_zone_id
    cloudflare_proxied_to = trimsuffix(replace(google_cloud_run_v2_service.wdsit_app.uri, "https://", ""), "/")
  }
  description = "Summary of deployed infrastructure"
}
