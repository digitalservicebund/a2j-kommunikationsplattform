import Badge from "~/components/Badge";
import { resolveDokumentPresentation } from "~/components/verfahren/presentation/einreichungReadiness";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { isValidierungslaufRunning } from "~/domains/verfahren/services/validierungslauf";
import { useTranslations } from "~/services/translations/context";

type VerfahrenDokumentStatusBadgeProps = {
  validierungsstatus: Validierungsstatus;
};

export default function VerfahrenDokumentStatusBadge({
  validierungsstatus,
}: Readonly<VerfahrenDokumentStatusBadgeProps>) {
  const { routes } = useTranslations();
  const { readinessBadgeClass, readinessLabel } = resolveDokumentPresentation(
    validierungsstatus,
    routes.verfahrenId.draftKlageeinreichung.summary.badgeLabels,
  );

  return (
    <Badge
      tone={readinessBadgeClass}
      label={readinessLabel}
      loading={isValidierungslaufRunning(validierungsstatus)}
    />
  );
}
