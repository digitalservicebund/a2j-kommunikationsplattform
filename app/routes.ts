import { prefix, route, RouteConfig } from "@react-router/dev/routes";

export default [
  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),

  // Actions
  route("action/login-user", "./routes/action.login-user.ts"),
  route("action/logout-user", "./routes/action.logout-user.ts"),

  // Authorization Callbacks (OAuth)
  route("auth/callback", "./routes/auth.callback.tsx"),
  route("auth/kompla-idp-callback", "./routes/auth.kompla-idp-callback.tsx"),

  // Better Auth API
  route("api/auth/*", "./routes/api.auth.$.ts"),

  // Errors
  route("error", "./routes/error.tsx"),

  // Login
  route("login", "./routes/login.tsx"),

  // Meta pages
  route("datenschutz", "./routes/datenschutz.tsx"),
  route("barrierefreiheit", "./routes/barrierefreiheit.tsx"),
  route("impressum", "./routes/impressum.tsx"),
  route("hilfe-und-kontakt", "./routes/hilfe-und-kontakt.tsx"),
  route("open-source", "./routes/open-source.tsx"),
  route("weitere-informationen", "./routes/weitere-informationen.tsx"),

  // dashboard route (user is logged in)
  route("/", "./routes/_index.tsx"),

  // verfahren routes
  ...prefix("verfahren", [
    route("neu/gericht-auswahl", "./routes/verfahren.neu.gericht-auswahl.tsx"),
    route("neu/dokumente", "./routes/verfahren.neu.dokumente.tsx"),
    route(
      "neu/verfahrendetails",
      "./routes/verfahren.neu.verfahrendetails.tsx",
    ),
    route("neu/beteiligte", "./routes/verfahren.neu.beteiligte.tsx"),
    route(":id", "./routes/verfahren.$id.tsx"),
    route(
      ":id/einreichungen/:einreichungId/dokumente/:dokumentId/datei",
      "./routes/verfahren.$id.einreichungen.$einreichungId.dokumente.$dokumentId.datei.ts",
    ),
  ]),

  // Beitrittscode (Lift)
  route("beitreten", "./routes/beitreten.tsx"),
] satisfies RouteConfig;
