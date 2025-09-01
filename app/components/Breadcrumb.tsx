export type BreadcrumbProps = {
  title: "verfahren" | "verfahrensdetails" | "dateiansicht";
  url: string;
};
export const Breadcrumb = ({ title, url }: BreadcrumbProps) => {
  const icon = {
    verfahren: "kern-icon--home",
    verfahrensdetails: "kern-icon--keyboard-double-arrow-right",
    dateiansicht: "kern-icon--keyboard-double-arrow-right",
  }[title];

  return (
    <a href={url} className="kern-link">
      <span
        className={`kern-icon ${icon} kern-icon--default`}
        aria-hidden="true"
      ></span>
      <span className="capitalize">{title}</span>
    </a>
  );
};
