import { href, Link } from "react-router";
import Icon from "~/components/Icon";
import { useTranslations } from "~/services/translations/context";

export default function Logo() {
  const t = useTranslations();

  return (
    <Link
      to={href("/")}
      className="kern-gap-sm kern-heading-medium flex flex-row items-center justify-center break-all no-underline hover:underline"
    >
      <Icon name="network_node" size="large" />
      {t.layout.header.logo.label}
    </Link>
  );
}
