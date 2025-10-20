import { index, layout, route, RouteConfig } from "@react-router/dev/routes";
import { contentPages } from "./constants/contentPages";

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
    // static content pages
    ...contentPages.map((page) => route(page.path, page.file)),
  ]),

  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),
] satisfies RouteConfig;
