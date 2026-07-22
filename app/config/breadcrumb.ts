import { dictionaries } from "~/services/translations";

export interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    parent?: string;
  };
}

export const breadcrumbConfig: BreadcrumbConfig = {
  "/": { label: dictionaries.de.breadcrumb.start },
  "/verfahren/neu": {
    label: dictionaries.de.breadcrumb.verfahrenNeu,
    parent: "/",
  },
  "/verfahren/neu/:id/bearbeiten": {
    label: dictionaries.de.breadcrumb.verfahrenNeu,
    parent: "/",
  },
  "/verfahren/neu/:id/abgabe": {
    label: dictionaries.de.breadcrumb.verfahrenNeu,
    parent: "/",
  },
  "/verfahren/:id": {
    label: dictionaries.de.breadcrumb.verfahrenId,
    parent: "/",
  },
  "/verfahren/:id/bearbeiten": {
    label: dictionaries.de.breadcrumb.verfahrenIdBearbeiten,
    parent: "/verfahren/:id",
  },
};
