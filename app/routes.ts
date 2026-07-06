import { index, prefix, route, RouteConfig } from "@react-router/dev/routes";
import { config } from "./config/config";
import { META_PAGES } from "./config/metaPages";

export default [
  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),

  // actions/callbacks
  route("action/login-user", "./routes/action.login-user.ts"),
  route("action/logout-user", "./routes/action.logout-user.ts"),
  route("auth/callback", "./routes/auth.callback.tsx"),
  route("auth/magic-link-callback", "./routes/auth.magic-link-callback.tsx"),
  route("auth/kompla-idp-callback", "./routes/auth.kompla-idp-callback.tsx"),
  route("auth/start-demo-login", "./routes/auth.start-demo-login.ts"),

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
    index("./routes/verfahren.tsx"),
    route("neu", "./routes/verfahren.neu.tsx"),
    route("neu/:id/bearbeiten", "./routes/verfahren.neu.$id.bearbeiten.tsx"),
    route(":id", "./routes/verfahren.$id.tsx"),
    route(":id/bearbeiten", "./routes/verfahren.$id.bearbeiten.tsx"),
  ]),

  // exclude route(s) from production environment
  ...(config().ENVIRONMENT === "production"
    ? []
    : [route("kitchensink", "./routes/kitchensink.tsx")]),
] satisfies RouteConfig;
