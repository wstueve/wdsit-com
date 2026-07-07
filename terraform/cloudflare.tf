# Cloudflare edge configuration with Cloud Run as origin

locals {
  cloud_run_origin_hostname = trimsuffix(replace(google_cloud_run_v2_service.wdsit_app.uri, "https://", ""), "/")
  cloud_run_mapping_ipv4 = [
    "216.239.32.21",
    "216.239.34.21",
    "216.239.36.21",
    "216.239.38.21",
  ]
  cloud_run_mapping_ipv6 = [
    "2001:4860:4802:32::15",
    "2001:4860:4802:34::15",
    "2001:4860:4802:36::15",
    "2001:4860:4802:38::15",
  ]

  admin_ip_allowlist_expr = length(var.admin_ip_cidrs) > 0 ? format("ip.src in {%s}", join(" ", var.admin_ip_cidrs)) : "false"

  blocked_countries_expr = length(var.blocked_country_codes) > 0 ? format("ip.geoip.country in {%s}", join(" ", [for code in var.blocked_country_codes : format("\"%s\"", upper(code))])) : "false"
}

resource "cloudflare_dns_record" "root_a" {
  for_each = toset(local.cloud_run_mapping_ipv4)

  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "A"
  content = each.value
  proxied = false
  ttl     = 1
}

resource "cloudflare_dns_record" "root_aaaa" {
  for_each = toset(local.cloud_run_mapping_ipv6)

  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "AAAA"
  content = each.value
  proxied = false
  ttl     = 1
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  content = "ghs.googlehosted.com"
  proxied = true
  ttl     = 1
}

resource "cloudflare_ruleset" "www_redirect" {
  zone_id     = var.cloudflare_zone_id
  name        = "WDSIT www redirect"
  description = "Redirect www host to apex"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules = [
    {
      ref         = "redirect-www-to-apex"
      description = "Permanent redirect from www to apex"
      expression  = "http.host eq \"www.${var.domain}\""
      action      = "redirect"
      enabled     = true
      action_parameters = {
        from_value = {
          status_code           = 301
          preserve_query_string = true
          target_url = {
            expression = "concat(\"https://${var.domain}\", http.request.uri.path)"
          }
        }
      }
    },
  ]
}

resource "cloudflare_zone_setting" "ssl_mode" {
  zone_id    = var.cloudflare_zone_id
  setting_id = "ssl"
  value      = "strict"
}

resource "cloudflare_zone_setting" "always_use_https" {
  zone_id    = var.cloudflare_zone_id
  setting_id = "always_use_https"
  value      = "on"
}

resource "cloudflare_ruleset" "custom_firewall" {
  zone_id     = var.cloudflare_zone_id
  name        = "WDSIT custom firewall rules"
  description = "Admin allowlist and geo blocking"
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules = [
    {
      ref         = "admin-ip-allowlist-first"
      description = "Admin IP allowlist first to prevent lockout"
      expression  = local.admin_ip_allowlist_expr
      action      = "skip"
      enabled     = true
      action_parameters = {
        phases = [
          "http_request_firewall_managed",
        ]
      }
    },
    {
      ref         = "geo-block-high-risk"
      description = "Block high-risk countries"
      expression  = local.blocked_countries_expr
      action      = "block"
      enabled     = var.enable_geo_block
    },
  ]
}

resource "cloudflare_ruleset" "managed_waf" {
  zone_id     = var.cloudflare_zone_id
  name        = "WDSIT managed WAF"
  description = "Cloudflare managed WAF ruleset"
  kind        = "zone"
  phase       = "http_request_firewall_managed"

  rules = [
    {
      ref         = "cloudflare-managed-waf"
      description = "Enable Cloudflare Managed Ruleset"
      expression  = "true"
      action      = "execute"
      enabled     = true
      action_parameters = {
        id = "77454fe2d30c4220b5701f6fdfb893ba"
      }
    },
  ]
}

resource "cloudflare_ruleset" "cache_settings" {
  count       = var.enable_cloudflare_cache_rules ? 1 : 0
  zone_id     = var.cloudflare_zone_id
  name        = "WDSIT cache settings"
  description = "Bypass dynamic paths and honor origin cache elsewhere"
  kind        = "zone"
  phase       = "http_request_cache_settings"

  rules = [
    {
      ref         = "bypass-api-and-health"
      description = "Bypass cache for API and health endpoints"
      expression  = "starts_with(http.request.uri.path, \"/api/\") or http.request.uri.path eq \"/health\""
      action      = "set_cache_settings"
      enabled     = true
      action_parameters = {
        browser_ttl = {
          mode = "bypass"
        }
      }
    },
    {
      ref         = "default-cache-policy"
      description = "Use origin caching for all other paths"
      expression  = "true"
      action      = "set_cache_settings"
      enabled     = true
      action_parameters = {
        cache = true
        edge_ttl = {
          mode = "respect_origin"
        }
        browser_ttl = {
          mode = "respect_origin"
        }
      }
    },
  ]
}
