import { dictionaries } from "~/services/translations";

export interface BreadcrumbConfig {
  [key: string]: {
    label: string | ((params: Record<string, string>) => string);
    parent?: string;
  };
}

export const breadcrumbConfig: BreadcrumbConfig = {
  "/": { label: dictionaries.de.breadcrumb.START },

  "/verfahren": { label: dictionaries.de.breadcrumb.VERFAHREN, parent: "/" },
  "/verfahren/neu": {
    label: dictionaries.de.breadcrumb.VERFAHREN_NEU,
    parent: "/verfahren",
  },
  "/verfahren/:id": {
    label: dictionaries.de.breadcrumb.VERFAHREN_ID,
    parent: "/verfahren",
  },
  "/verfahren/:id/bearbeiten": {
    label: dictionaries.de.breadcrumb.VERFAHREN_ID_BEARBEITEN,
    parent: "/verfahren/:id",
  },

  //   for later, an example with a passed param:

  //   "/products/:id/reviews/:reviewId": {
  //     label: (params) => `Review by ${params.reviewId}`,
  //     parent: "/products/:id/reviews",
  //   },
};
