import { UIMatch, useMatches } from "react-router";

export type MatchHandle = {
  breadcrumb: BreadcrumbMeta;
};

export type BreadcrumbMeta = {
  title: string;
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
    const { title } = match?.handle?.breadcrumb as BreadcrumbMeta;
    const isLast = match.id === withCrumbs[withCrumbs.length - 1].id;
    return {
      title,
      url: match.pathname,
      id: match.id,
      disabled: isLast,
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
              disabled={item.disabled}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
const Breadcrumb = ({ title, url, disabled }: Omit<BreadcrumbItem, "id">) => {
  if (disabled) {
    return (
      <div className="gap-kern-space-small flex items-center">
        <p className="kern-body--muted">{title}</p>
      </div>
    );
  }
  return (
    <div className="gap-kern-space-small flex items-center">
      <a
        href={url}
        className="text-kern-layout-text-muted visited:text-kern-layout-text-muted no-underline hover:underline"
      >
        {title}
      </a>
      {!disabled && (
        <span
          className="kern-icon kern-icon--keyboard-double-arrow-right bg-kern-layout-text-muted"
          aria-hidden="true"
        ></span>
      )}
    </div>
  );
};
