import Badge from "~/components/Badge";
import { getEinreichungStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { useTranslations } from "~/services/translations/context";

// Submitted, but the Gericht hasn't confirmed receipt yet.
const IN_PROGRESS_STATUSES: ReadonlySet<Einreichung["status"]> = new Set<
  Einreichung["status"]
>(["BEANTRAGT", "VERSENDET"]);

type VerfahrenTimelineStatusBadgeProps = {
  status: Einreichung["status"];
};

export default function VerfahrenTimelineStatusBadge({
  status,
}: Readonly<VerfahrenTimelineStatusBadgeProps>) {
  const { shared } = useTranslations();
  const { badgeClassModifier, label } = getEinreichungStatusPresentation(
    status,
    shared.status.einreichung,
  );

  return (
    <Badge
      tone={badgeClassModifier}
      label={label}
      loading={IN_PROGRESS_STATUSES.has(status)}
    />
  );
}
