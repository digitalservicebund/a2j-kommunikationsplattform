import { UIMatch, useMatches } from "react-router";

export type BreadcrumbTitle =
  | "Verfahrensübersicht"
  | "verfahrendetails"
  | "dateiansicht";

export type MatchHandle = {
  breadcrumb: BreadcrumbMeta;
};

export type BreadcrumbMeta = {
  title: BreadcrumbTitle;
  icon?: string;
};

export type BreadcrumbItem = BreadcrumbMeta & {
  url: string;
  id: string;
  disabled?: boolean;
};

export type CustomUIMatch = UIMatch & {
  handle?: MatchHandle;
};

export const Breadcrumbs = () => {
  const matches = useMatches() as CustomUIMatch[];

  const withCrumbs: CustomUIMatch[] = matches
    .filter((match) => match.handle?.breadcrumb as BreadcrumbMeta)
    .filter(Boolean);

  const items: BreadcrumbItem[] = withCrumbs.map((match: CustomUIMatch) => {
    const { title, icon } = match?.handle?.breadcrumb as BreadcrumbMeta;
    return {
      title,
      icon: icon || "kern-icon--keyboard-double-arrow-right",
      url: match.pathname,
      id: match.id,
      disabled: match.id === withCrumbs[withCrumbs.length - 1].id,
    };
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
