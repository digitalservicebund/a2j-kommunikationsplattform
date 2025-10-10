import {
  index,
  layout,
  prefix,
  route,
  RouteConfig,
} from "@react-router/dev/routes";

export default [
  // auth
  layout("./layouts/narrow-layout.tsx", [
    route("login", "./routes/login/_index.tsx"),
  ]),

  route("action/login-user", "./routes/action.login-user.ts"),
  route("action/logout-user", "./routes/action.logout-user.ts"),
  route("auth/callback", "./routes/auth.callback.tsx"),
  route("error", "./routes/error.tsx"),

  layout("./layouts/default-layout.tsx", [
    // uebersicht
    route("/", "./routes/_layout.tsx", [
      index("./routes/_index.tsx"),
      // verfahren
      route("verfahren", "./routes/verfahren/_layout.tsx", [
        index("./routes/verfahren/_index.tsx"),
        route(":id", "./routes/verfahren/$id/_layout.tsx", [
          index("./routes/verfahren/$id/_index.tsx"),
          route(
            "dokument/:dokumentId",
            "./routes/verfahren/$id/dokument/$dokumentId.tsx",
          ),
        ]),
      ]),
    ]),
    // prototype verfahren
    ...prefix("prototype/verfahren", [
      index("./routes/prototype.verfahren.tsx"),
      route(":id", "./routes/prototype.verfahren.$id.tsx", {}),
      route(
        ":id/dokument/:dokumentId",
        "./routes/prototype.verfahren.$id.dokument.$dokumentId.tsx",
      ),
    ]),

    // static content pages
    route("datenschutz", "./routes/datenschutz.tsx"),
    route("barrierefreiheit", "./routes/barrierefreiheit.tsx"),
    route("impressum", "./routes/impressum.tsx"),
    route("hilfe-und-kontakt", "./routes/hilfe-und-kontakt.tsx"),
    route("open-source", "./routes/open-source.tsx"),
    route("weitere-informationen", "./routes/weitere-informationen.tsx"),
  ]),

  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),
] satisfies RouteConfig;
