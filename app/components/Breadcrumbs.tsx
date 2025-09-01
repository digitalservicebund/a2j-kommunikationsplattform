import { UIMatch, useMatches } from "react-router";

type BreadcrumbMatch = UIMatch<
  Record<string, unknown>,
  { breadcrumb: (data?: unknown) => JSX.Element }
>;
export const Breadcrumbs = () => {
  const matches = useMatches() as BreadcrumbMatch[];

  console.log("matches", matches);

  const crumbs = matches.filter((match) => match.handle?.breadcrumb);

  return (
    <nav aria-label="Breadcrumb" className="kern-container">
      <ul className="m-0 flex list-none space-x-2 p-0">
        {crumbs.map((match) => (
          <li key={match.id}>{match.handle.breadcrumb(match)}</li>
        ))}
      </ul>
    </nav>
  );
};
