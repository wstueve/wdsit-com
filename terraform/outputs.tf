# Outputs summary

output "deployment_summary" {
  value = {
    project_id       = var.project_id
    region           = var.region
    service_name     = var.service_name
    environment      = var.environment
    cloud_run_url    = google_cloud_run_v2_service.wdsit_app.uri
    static_ip        = google_compute_global_address.wdsit_ip.address
    deployment_type  = "source-based (Cloud Buildpacks)"
    domain           = var.domain
  }
  description = "Summary of deployed infrastructure"
}
