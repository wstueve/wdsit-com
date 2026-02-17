# Load Balancer and Cloud CDN configuration

# Cloud Armor security policy (WAF)
resource "google_compute_security_policy" "wdsit_security" {
  name        = "${var.service_name}-security-policy"
  description = "Cloud Armor security policy for ${var.service_name}"

  # Default rule: allow all traffic
  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default allow rule"
  }

  # Rate limiting rule
  rule {
    action   = "throttle"
    priority = "1000"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      conform_action = "allow"
      exceed_action  = "deny(429)"
      rate_limit_threshold {
        count        = 100
        interval_sec = 60
      }
    }
    description = "Rate limiting: 100 requests per minute per IP"
  }

  # Block common attack patterns (XSS, SQLi)
  rule {
    action   = "deny(403)"
    priority = "900"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('xss-v33-stable')"
      }
    }
    description = "Block XSS attacks"
  }

  rule {
    action   = "deny(403)"
    priority = "901"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-v33-stable')"
      }
    }
    description = "Block SQL injection attacks"
  }
}

# Reserve a static external IP address
resource "google_compute_global_address" "wdsit_ip" {
  name = "${var.service_name}-ip"
}

# Create a Network Endpoint Group (NEG) for Cloud Run
resource "google_compute_region_network_endpoint_group" "cloud_run_neg" {
  name                  = "${var.service_name}-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region

  cloud_run {
    service = google_cloud_run_v2_service.wdsit_app.name
  }
}

# Backend service for Cloud Run
resource "google_compute_backend_service" "wdsit_backend" {
  name                    = "${var.service_name}-backend"
  protocol                = "HTTP"
  port_name               = "http"
  load_balancing_scheme   = "EXTERNAL_MANAGED"
  security_policy         = google_compute_security_policy.wdsit_security.self_link
  # Note: timeout_sec is not supported for serverless NEGs

  # Enable Cloud CDN
  enable_cdn = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    default_ttl       = 3600
    client_ttl        = 7200
    max_ttl           = 86400
    negative_caching  = true
    serve_while_stale = 86400

    cache_key_policy {
      include_host         = true
      include_protocol     = true
      include_query_string = true
    }

    # Bypass cache for API endpoints and HTML
    bypass_cache_on_request_headers {
      header_name = "Authorization"
    }

    negative_caching_policy {
      code = 404
      ttl  = 120
    }

    negative_caching_policy {
      code = 410
      ttl  = 120
    }
  }

  backend {
    group = google_compute_region_network_endpoint_group.cloud_run_neg.id
  }

  # Custom request headers
  custom_request_headers = [
    "X-Client-Region: {client_region}",
    "X-Client-City: {client_city}",
  ]

  log_config {
    enable      = true
    sample_rate = 0.1 # Log 10% of requests
  }
}

# URL map for routing
resource "google_compute_url_map" "wdsit_urlmap" {
  name            = "${var.service_name}-urlmap"
  default_service = google_compute_backend_service.wdsit_backend.id
}

# SSL certificate (Google-managed)
resource "google_compute_managed_ssl_certificate" "wdsit_cert" {
  name = "${var.service_name}-cert"

  managed {
    domains = [var.domain, "www.${var.domain}"]
  }
}

# HTTPS proxy
resource "google_compute_target_https_proxy" "wdsit_https_proxy" {
  name             = "${var.service_name}-https-proxy"
  url_map          = google_compute_url_map.wdsit_urlmap.id
  ssl_certificates = [google_compute_managed_ssl_certificate.wdsit_cert.id]
}

# HTTP proxy for redirect to HTTPS
resource "google_compute_target_http_proxy" "wdsit_http_proxy" {
  name    = "${var.service_name}-http-proxy"
  url_map = google_compute_url_map.http_redirect.id
}

# URL map for HTTP to HTTPS redirect
resource "google_compute_url_map" "http_redirect" {
  name = "${var.service_name}-http-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

# Global forwarding rule for HTTPS
resource "google_compute_global_forwarding_rule" "wdsit_https_forwarding" {
  name                  = "${var.service_name}-https-forwarding"
  target                = google_compute_target_https_proxy.wdsit_https_proxy.id
  port_range            = "443"
  ip_address            = google_compute_global_address.wdsit_ip.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
}

# Global forwarding rule for HTTP
resource "google_compute_global_forwarding_rule" "wdsit_http_forwarding" {
  name                  = "${var.service_name}-http-forwarding"
  target                = google_compute_target_http_proxy.wdsit_http_proxy.id
  port_range            = "80"
  ip_address            = google_compute_global_address.wdsit_ip.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
}

# Output the static IP address
output "static_ip_address" {
  value       = google_compute_global_address.wdsit_ip.address
  description = "Static IP address for the load balancer (point your domain DNS here)"
}

output "ssl_certificate_id" {
  value       = google_compute_managed_ssl_certificate.wdsit_cert.id
  description = "ID of the SSL certificate (check status in GCP Console)"
}
