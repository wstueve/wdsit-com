import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("course", "routes/course.tsx"),
  route("companies", "routes/companies.tsx"),
  route("about", "routes/about.tsx"),
  route("enroll", "routes/enroll.tsx"),
  route("enroll/success", "routes/enroll-success.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
] satisfies RouteConfig;
