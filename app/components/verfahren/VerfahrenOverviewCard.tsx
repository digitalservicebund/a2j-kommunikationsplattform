import ConfirmDeleteDialog from "~/components/ConfirmDeleteDialog";
import { buildBeteiligteSummaryItems } from "~/components/verfahren/presentation/buildBeteiligteSummaryItems";
import { NOT_AVAILABLE_LABEL } from "~/components/verfahren/presentation/placeholders";
import VerfahrenBriefSummaryOfBeteiligte from "~/components/verfahren/VerfahrenBriefSummaryOfBeteiligte";
import VerfahrenBriefSummaryOfGericht from "~/components/verfahren/VerfahrenBriefSummaryOfGericht.static";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import type { Verfahren } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { GerichtInformation } from "~/domains/verfahren/infrastructure/schemas/gerichtInformation.schema";
import {
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/services/beteiligteByRole";
import { useTranslations } from "~/services/translations/context";
import { getVerfahrenDisplayName } from "./presentation/verfahrenDisplayName";

export const DELETE_VERFAHREN_FORM_TYPE = "delete-verfahren";

type VerfahrenOverviewCardProps = {
  verfahren: Verfahren;
  gerichtInformation: GerichtInformation | null;
  isDraft: boolean;
};

export default function VerfahrenOverviewCard({
  verfahren,
  gerichtInformation,
  isDraft,
}: Readonly<VerfahrenOverviewCardProps>) {
  const t = useTranslations();

  const klaegerinnenSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteSummary = buildBeteiligteSummaryItems(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );

  const gerichtBankverbindung = gerichtInformation?.bankverbindungen[0];

  return (
    <div className="kern-card" data-testid="verfahren-overview-card">
      <div className="kern-card__container">
        <div className="algin-start kern-gap-md flex w-full flex-wrap items-start">
          <div className="flex-1">
            <h1 className="kern-heading-medium">
              {getVerfahrenDisplayName(verfahren)}
            </h1>
            <div className="align-center kern-body kern-body--muted kern-gap-sm flex flex-wrap">
              <span>
                {verfahren.aktenzeichenGericht ??
                  t.routes.verfahrenId.draftKlageeinreichung.summary
                    .aktenzeichen}
              </span>
              <span>·</span>
              <span>
                {verfahren.gericht?.wert ??
                  t.routes.verfahrenId.draftKlageeinreichung.summary.gericht}
              </span>
              <span>·</span>
              <span>
                {verfahren.verfahrensgegenstand ?? NOT_AVAILABLE_LABEL}
              </span>
            </div>
          </div>
          <div className="kern-gap-md flex flex-wrap items-center">
            <VerfahrenStatusBadge status={verfahren.status} />
            {isDraft && (
              <ConfirmDeleteDialog
                formType={DELETE_VERFAHREN_FORM_TYPE}
                title={t.routes.verfahrenId.deleteVerfahren.title}
                message={t.routes.verfahrenId.deleteVerfahren.message}
              />
            )}
          </div>
        </div>
        <div className="kern-gap-md grid w-full grid-cols-1 md:grid-cols-3">
          <VerfahrenBriefSummaryOfBeteiligte
            notAvailableLabel={NOT_AVAILABLE_LABEL}
            title={t.shared.beteiligte.klaegerLabel}
            beteiligte={klaegerinnenSummary}
            fallbackLabel={t.shared.beteiligte.fallbackLabel}
          />
          <VerfahrenBriefSummaryOfBeteiligte
            notAvailableLabel={NOT_AVAILABLE_LABEL}
            title={t.shared.beteiligte.beklagteLabel}
            beteiligte={beklagteSummary}
            fallbackLabel={t.shared.beteiligte.fallbackLabel}
          />
          <VerfahrenBriefSummaryOfGericht
            title={t.shared.gericht.briefSummaryTitle}
            gericht={verfahren.gericht?.wert ?? null}
            aktenzeichen={verfahren.aktenzeichenGericht}
            kontoinhaber={gerichtBankverbindung?.kontoinhaber ?? null}
            iban={gerichtBankverbindung?.iban ?? null}
          />
        </div>
      </div>
    </div>
  );
}
