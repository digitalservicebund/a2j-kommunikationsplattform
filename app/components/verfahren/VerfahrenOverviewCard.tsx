import { buildBeteiligteSummaryItems } from "~/components/verfahren/presentation/buildBeteiligteSummaryItems";
import { NOT_AVAILABLE_LABEL } from "~/components/verfahren/presentation/placeholders";
import { getVerfahrenStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
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

type VerfahrenOverviewCardProps = {
  verfahren: Verfahren;
  gerichtInformation: GerichtInformation | null;
};

export default function VerfahrenOverviewCard({
  verfahren,
  gerichtInformation,
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

  const overviewBadge = getVerfahrenStatusPresentation(
    verfahren.status,
    t.shared.status.verfahren,
  );

  const gerichtBankverbindung = gerichtInformation?.bankverbindungen[0];

  return (
    <article className="kern-card">
      <div className="kern-card__container">
        <div className="algin-start kern-gap-md flex w-full flex-wrap items-start">
          <div className="flex-1">
            <h2 className="kern-heading-medium">
              {getVerfahrenDisplayName(verfahren)}
            </h2>
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
          <VerfahrenStatusBadge
            small
            tone={overviewBadge.badgeClassModifier}
            label={overviewBadge.label}
          />
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
    </article>
  );
}
