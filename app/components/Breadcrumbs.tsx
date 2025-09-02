import { useLocation } from "react-router";

export type BreadcrumbTitle = "verfahren" | "verfahrendetails" | "dateiansicht";

type RouteMeta = {
  title: BreadcrumbTitle;
  icon: string;
};

const routeMetadata: Record<BreadcrumbTitle, RouteMeta> = {
  verfahren: {
    title: "verfahren",
    icon: "kern-icon--icon--storage",
  },
  verfahrendetails: {
    title: "verfahrendetails",
    icon: "kern-icon--keyboard-double-arrow-right",
  },
  dateiansicht: {
    title: "dateiansicht",
    icon: "kern-icon--keyboard-double-arrow-right",
  },
};

export type BreadcrumbItem = {
  title: BreadcrumbTitle;
  url: string;
  icon: string;
  disabled: boolean;
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = pathSegments
    .map((segment, index) => {
      const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
      let title: BreadcrumbTitle | undefined;
      let icon: string = "";

      if (segment === routeMetadata.verfahren.title) {
        title = routeMetadata.verfahren.title;
        icon = routeMetadata.verfahren.icon;
      } else if (
        index > 0 &&
        pathSegments[index - 1] === routeMetadata.verfahren.title
      ) {
        title = routeMetadata.verfahrendetails.title;
        icon = routeMetadata.verfahrendetails.icon;
      } else if (segment === "dokument") {
        title = routeMetadata.dateiansicht.title;
        icon = routeMetadata.dateiansicht.icon;
      }

      if (!title) return null;
      return { title, url, icon };
    })
    .filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="kern-container">
      <ul className="m-0 flex list-none space-x-2 p-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center">
              <Breadcrumb
                title={item.title}
                url={item.url}
                icon={item.icon}
                disabled={isLast}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Breadcrumb = ({ title, url, icon, disabled }: BreadcrumbItem) => {
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
      <span className={`kern-icon ${icon} `} aria-hidden="true"></span>
      <span className="capitalize">{title}</span>
    </a>
  );
};
