import { Link, useLocation, useParams } from "react-router";
import { breadcrumbConfig } from "~/config/breadcrumb";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumb = () => {
  const location = useLocation();
  const params = useParams();

  /**
   * Find matching route pattern for current pathname
   * Handles dynamic segments like /products/:id
   */
  const findMatchingPattern = (pathname: string): string | null => {
    // Exact match first
    if (breadcrumbConfig[pathname]) {
      return pathname;
    }

    // Pattern matching for dynamic routes
    const pathSegments = pathname.split("/").filter(Boolean);

    for (const configPath of Object.keys(breadcrumbConfig)) {
      const configSegments = configPath.split("/").filter(Boolean);

      if (pathSegments.length !== configSegments.length) continue;

      let isMatch = true;
      for (let i = 0; i < configSegments.length; i++) {
        // Check if segment is dynamic (starts with :)
        if (
          !configSegments[i].startsWith(":") &&
          configSegments[i] !== pathSegments[i]
        ) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) return configPath;
    }

    return null;
  };

  /**
   * Convert dynamic route pattern to actual path
   * Replaces :id with actual param value
   */
  const resolvePathWithParams = (pattern: string): string => {
    let path = pattern;
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value || "");
    });
    return path;
  };

  /**
   * Get label for a breadcrumb item
   */
  const getLabel = (configPath: string): string => {
    const config = breadcrumbConfig[configPath];
    return config.label;
  };

  /**
   * Build breadcrumb chain by following parent references
   */
  const getBreadcrumbs = (): BreadcrumbItem[] | null => {
    const matchingPattern = findMatchingPattern(location.pathname);

    if (!matchingPattern) {
      return null;
    }

    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPattern: string | undefined = matchingPattern;

    while (currentPattern) {
      const label = getLabel(currentPattern);
      const path = resolvePathWithParams(currentPattern);

      breadcrumbs.unshift({ label, path });

      currentPattern = breadcrumbConfig[currentPattern]?.parent;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="kern-container">
      <ul className="m-0 flex list-none space-x-2 p-0">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={crumb.path}
              className="gap-kern-space-small flex items-center"
            >
              {isLast ? (
                <span className="kern-body kern-body--muted">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    to={crumb.path}
                    className="kern-body text-kern-layout-text-muted visited:text-kern-layout-text-muted no-underline hover:underline"
                  >
                    {crumb.label}
                  </Link>
                  <span
                    className="kern-icon kern-icon--keyboard-double-arrow-right bg-kern-layout-text-muted"
                    aria-hidden="true"
                  ></span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
