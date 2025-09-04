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
    route("verfahren", "./routes/verfahren.tsx", [
      //index page: /verfahren
      route("", "./routes/verfahren._index.tsx"),
      // detail page: /verfahren/:id
      route(":id", "./routes/verfahren.$id.tsx", [
        //index page: /verfahren/:id
        route("", "./routes/verfahren.$id._index.tsx"),
        route(
          "dokument/:dokumentId",
          "./routes/verfahren.$id.dokument.$dokumentId.tsx",
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
  ]),

  // Kubernetes health check
  route("readyz", "./routes/readyz.ts"),
];
