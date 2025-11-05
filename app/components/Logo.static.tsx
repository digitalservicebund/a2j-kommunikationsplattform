import { dictionaries } from "~/services/translations";

export default function Logo() {
  // Using German labels as default/static labels
  const { labels } = dictionaries["de"];
  return (
    <a
      aria-label={labels.TO_START_PAGE_LABEL}
      href="/"
      className="gap-kern-space-small kern-link visited:text-kern-action-default flex flex-row flex-wrap items-center break-all no-underline"
    >
      <span
        className="kern-icon kern-icon--network_node kern-icon--large bg-current"
        aria-hidden
      />
      <div className="kern-heading-large">{labels.LOGO_LABEL}</div>
    </a>
  );
}
