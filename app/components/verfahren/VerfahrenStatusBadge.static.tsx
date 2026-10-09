import Badge from "~/components/Badge";
import { getVerfahrenStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenStatusBadgeProps = {
  status: Verfahren["status"];
  small?: boolean;
  className?: string;
};

export default function VerfahrenStatusBadge({
  status,
  small,
  className,
}: Readonly<VerfahrenStatusBadgeProps>) {
  const { shared } = useTranslations();
  const { badgeClassModifier, label } = getVerfahrenStatusPresentation(
    status,
    shared.status.verfahren,
  );

  return (
    <Badge
      tone={badgeClassModifier}
      label={label}
      small={small}
      className={className}
    />
  );
}
