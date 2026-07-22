import { href, Link } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function Logo() {
  const { shared } = useTranslations();

  return (
    <Link
      to={href("/")}
      className="gap-kern-space-small kern-heading-medium flex flex-row items-center justify-center break-all no-underline hover:underline"
      aria-label={shared.LOGO_ARIA_LABEL}
    >
      <span
        className="kern-icon kern-icon--network_node kern-icon--large"
        aria-hidden
      />
      {shared.LOGO_LABEL}
    </Link>
  );
}
