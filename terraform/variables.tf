# Variables for Terraform configuration

variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region for Cloud Run service"
  type        = string
  default     = "us-central1"
}

variable "service_name" {
  description = "Name of the Cloud Run service"
  type        = string
  default     = "wdsit-com"
}

variable "domain" {
  description = "Custom domain for the service"
  type        = string
  default     = "wdsit.com"
}

variable "environment" {
  description = "Environment (production, staging, development)"
  type        = string
  default     = "production"
}

variable "min_instances" {
  description = "Minimum number of Cloud Run instances"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum number of Cloud Run instances"
  type        = number
  default     = 10
}

variable "memory" {
  description = "Memory allocation for Cloud Run container"
  type        = string
  default     = "256Mi"
}

variable "cpu" {
  description = "CPU allocation for Cloud Run container"
  type        = string
  default     = "1"
}

variable "timeout" {
  description = "Request timeout in seconds"
  type        = number
  default     = 60
}

variable "concurrency" {
  description = "Maximum concurrent requests per instance"
  type        = number
  default     = 80
}

variable "artifact_registry_location" {
  description = "Location for Artifact Registry repository"
  type        = string
  default     = "us-central1"
}

variable "resend_api_key" {
  description = "Resend API key for sending emails"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for the domain"
  type        = string
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with DNS, Zone settings, and WAF permissions"
  type        = string
  sensitive   = true
}

variable "admin_ip_cidrs" {
  description = "Admin IP/CIDR allowlist applied before WAF and geo controls"
  type        = list(string)

  validation {
    condition     = length(var.admin_ip_cidrs) > 0
    error_message = "Provide at least one admin IP/CIDR to avoid lockout during WAF cutover."
  }
}

variable "blocked_country_codes" {
  description = "ISO 3166-1 alpha-2 country codes to block at Cloudflare edge"
  type        = list(string)
  default     = []
}

variable "enable_geo_block" {
  description = "Enable or disable custom geo blocking rule"
  type        = bool
  default     = true
}

variable "enable_cloudflare_cache_rules" {
  description = "Enable Cloudflare cache rules resources when token supports ruleset APIs"
  type        = bool
  default     = true
}
