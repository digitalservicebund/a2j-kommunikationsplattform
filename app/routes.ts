import { index, route, RouteConfig } from "@react-router/dev/routes";
import { META_PAGES } from "./config/metaPages";

export default [
  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),

  // actions/callbacks
  route("action/login-user", "./routes/action.login-user.ts"),
  route("action/logout-user", "./routes/action.logout-user.ts"),
  route("auth/callback", "./routes/auth.callback.tsx"),

  // errors
  route("error", "./routes/error.tsx"),

  // login
  route("login", "./routes/login/_index.tsx"),

  // meta pages (imprint, for example)
  ...META_PAGES.map((page) => route(page.path, page.file)),

  // all "user is logged in" routes
  route("/", "./routes/_layout.tsx", [
    // overview page
    index("./routes/_index.tsx"),
    // verfahren pages
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
    // kitchensink (component playground)
    route("kitchensink", "./routes/kitchensink/_layout.tsx", [
      index("./routes/kitchensink/_index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
