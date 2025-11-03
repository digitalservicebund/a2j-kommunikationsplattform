import { dictionaries } from "~/services/translations";

export default function Logo() {
  // Using German labels as default/static labels
  const { labels } = dictionaries["de"];
  return (
    <div className="gap-kern-space-small flex flex-row flex-wrap items-center break-all">
      <span
        className="kern-icon kern-icon--network_node kern-icon--large"
        aria-hidden
      />
      <h1 className="kern-heading-large">{labels.LOGO_LABEL}</h1>
    </div>
  );
}
