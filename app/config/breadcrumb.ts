import { dictionaries } from "~/services/translations";

export interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    parent?: string;
  };
}

export const breadcrumbConfig: BreadcrumbConfig = {
  "/": { label: dictionaries.de.breadcrumb.START },
  "/verfahren/neu": {
    label: dictionaries.de.breadcrumb.VERFAHREN_NEU,
    parent: "/",
  },
  "/verfahren/:id": {
    label: dictionaries.de.breadcrumb.VERFAHREN_ID,
    parent: "/",
  },
  "/verfahren/:id/bearbeiten": {
    label: dictionaries.de.breadcrumb.VERFAHREN_ID_BEARBEITEN,
    parent: "/verfahren/:id",
  },
};
