import React from "react";
import type { UIMatch } from "react-router";
import { useMatches } from "react-router";

export type BreadcrumbsHandle = {
  breadcrumb: (match: UIMatch) => React.ReactNode;
};
export const Breadcrumbs = () => {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => Boolean((match.handle as BreadcrumbsHandle)?.breadcrumb))
    .map((match) => ({
      id: match.id,
      breadcrumb: (match.handle as BreadcrumbsHandle).breadcrumb(match),
    }));

  // Remove "root" breadcrumb if there are more crumbs, so that the breadcrumbs start from the route Verfahren
  const items =
    crumbs.length > 0 && crumbs[0].id === "root" ? crumbs.slice(1) : crumbs;

  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ul className="m-0 flex list-none space-x-2 p-0">
        {items.map((item) => (
          <li key={item.id} className="flex items-center">
            {item.breadcrumb}
          </li>
        ))}
      </ul>
    </nav>
  );
};
