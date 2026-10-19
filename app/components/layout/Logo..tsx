import { href, Link } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function Logo() {
  const t = useTranslations();

  return (
    <Link
      to={href("/")}
      className="kern-gap-sm kern-heading-medium flex flex-row items-center justify-center break-all no-underline hover:underline"
    >
      <span
        className="kern-icon kern-icon--network_node kern-icon--large"
        aria-hidden
      />
      {t.layout.header.logo.label}
    </Link>
  );
}
