import React from "react";
import type { UIMatch } from "react-router";
import { useMatches } from "react-router";
import { Breadcrumb } from "~/components/Breadcrumb";

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

  const items = [
    {
      id: "verfahren",
      breadcrumb: <Breadcrumb title="verfahren" url="/verfahren" />,
    },
    ...crumbs,
  ];

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
