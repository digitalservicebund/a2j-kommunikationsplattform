import { UIMatch, useMatches } from "react-router";

export type BreadcrumbTitle = "verfahren" | "verfahrendetails" | "dateiansicht";

export type MatchHandle = {
  breadcrumb?: (match: { params: Record<string, string> }) => {
    title: string;
    url: string;
    icon?: string;
  };
};

export type BreadcrumbItem = {
  id: string;
  title: BreadcrumbTitle;
  url: string;
  icon: string;
  disabled: boolean;
};

export type CustomUIMatch = UIMatch & {
  handle?: MatchHandle;
};

export const Breadcrumbs = () => {
  const matches = useMatches() as CustomUIMatch[];

  const items = matches
    .filter((match) => match.handle?.breadcrumb) // Ensure handle and breadcrumb exist
    .map((match) => {
      const breadcrumb = match.handle?.breadcrumb?.({
        params: match.params as Record<string, string>,
      }) || { title: "", url: "" };

      const lastItem = match.id === matches[matches.length - 1].id;

      return {
        id: match.id,
        title: breadcrumb.title as BreadcrumbTitle,
        url: breadcrumb.url,
        icon: breadcrumb.icon || "kern-icon--keyboard-double-arrow-right",
        disabled: lastItem,
      } as BreadcrumbItem;
    });

  return (
    <nav aria-label="Breadcrumb" className="kern-container">
      <ul className="m-0 flex list-none space-x-2 p-0">
        {items.map((item) => (
          <li key={item.id} className="flex items-center">
            <Breadcrumb
              title={item.title}
              url={item.url}
              icon={item.icon}
              disabled={item.disabled}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
const Breadcrumb = ({
  title,
  url,
  icon,
  disabled,
}: Omit<BreadcrumbItem, "id">) => {
  if (disabled) {
    return (
      <span className="kern-link">
        <span
          className={`kern-icon ${icon} kern-icon--default`}
          aria-hidden="true"
        ></span>
        <span className="capitalize">{title}</span>
      </span>
    );
  }
  return (
    <a href={url} className="kern-link">
      <span className={`kern-icon ${icon}`} aria-hidden="true"></span>
      <span className="capitalize">{title}</span>
    </a>
  );
};
