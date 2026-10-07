import { prefix, route, RouteConfig } from "@react-router/dev/routes";
import { META_PAGES } from "./config/metaPages";

export default [
  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),

  // actions/callbacks
  route("action/login-user", "./routes/action.login-user.ts"),
  route("action/logout-user", "./routes/action.logout-user.ts"),
  route("auth/callback", "./routes/auth.callback.tsx"),
  route("auth/kompla-idp-callback", "./routes/auth.kompla-idp-callback.tsx"),
  route("api/auth/*", "./routes/api.auth.$.ts"),

  // errors
  route("error", "./routes/error.tsx"),

  // login
  route("login", "./routes/login.tsx"),

  // meta pages (imprint, for example)
  ...META_PAGES.map((page) => route(page.path, page.file)),

  // dashboard route (user is logged in)
  route("/", "./routes/_index.tsx"),

  // verfahren routes
  ...prefix("verfahren", [
    route("neu", "./routes/verfahren.neu.tsx"),
    route("neu/:id/bearbeiten", "./routes/verfahren.neu.$id.bearbeiten.tsx"),
    route(":id", "./routes/verfahren.$id.tsx"),
  ]),

  // Beitrittscode (Lift)
  route("beitreten", "./routes/beitreten.tsx"),
] satisfies RouteConfig;
