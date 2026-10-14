import StatusBadge from "~/components/StatusBadge";
import { getEinreichungStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenTimelineStatusBadgeProps = {
  status: Einreichung["status"];
};

export default function VerfahrenTimelineStatusBadge({
  status,
}: Readonly<VerfahrenTimelineStatusBadgeProps>) {
  const { shared } = useTranslations();
  const { state, label, icon } = getEinreichungStatusPresentation(
    status,
    shared.status.einreichung,
  );

  return <StatusBadge state={state} icon={icon} label={label} />;
}
