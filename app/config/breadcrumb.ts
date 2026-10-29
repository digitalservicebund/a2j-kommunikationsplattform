import { dictionaries } from "~/services/translations";

export interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    parent?: string;
  };
}

export const breadcrumbConfig: BreadcrumbConfig = {
  "/": { label: dictionaries.de.breadcrumb.start },
  "/verfahren/neu/gericht-auswahl": {
    label: dictionaries.de.breadcrumb.verfahrenGerichtAuswahl,
    parent: "/",
  },
  "/verfahren/neu/dokumente": {
    label: dictionaries.de.breadcrumb.verfahrenNeu,
    parent: "/",
  },
  "/verfahren/neu/verfahrendetails": {
    label: dictionaries.de.breadcrumb.verfahrenNeu,
    parent: "/",
  },
  "/verfahren/neu/beteiligte": {
    label: dictionaries.de.breadcrumb.verfahrenNeu,
    parent: "/",
  },
  "/verfahren/:id": {
    label: dictionaries.de.breadcrumb.verfahrenId,
    parent: "/",
  },
};
