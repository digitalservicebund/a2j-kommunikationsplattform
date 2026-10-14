import StatusBadge from "~/components/StatusBadge";
import { getVerfahrenStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenStatusBadgeProps = {
  status: Verfahren["status"];
  className?: string;
};

export default function VerfahrenStatusBadge({
  status,
  className,
}: Readonly<VerfahrenStatusBadgeProps>) {
  const { shared } = useTranslations();
  const { state, label, icon } = getVerfahrenStatusPresentation(
    status,
    shared.status.verfahren,
  );

  return (
    <StatusBadge
      state={state}
      icon={icon}
      label={label}
      className={className}
    />
  );
}
