import { index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/narrow-layout.tsx", [index("./routes/_index.tsx")]),

  // auth
  route("login", "./routes/login.ts"),
  route("auth/callback", "./routes/auth.callback.tsx"),
  route("error", "./routes/error.tsx"),
  route("action/logout-user", "./routes/action.logout-user.ts"),

  layout("./layouts/default-layout.tsx", [
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

    // redirect links
    route("link/*", "./routes/link.$.tsx"),
  ]),

  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),
];
