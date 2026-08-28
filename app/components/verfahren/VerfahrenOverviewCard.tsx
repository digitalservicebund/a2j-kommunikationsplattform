import { buildBeteiligteSummaryItems } from "~/components/verfahren/presentation/buildBeteiligteSummaryItems";
import { NOT_AVAILABLE_LABEL } from "~/components/verfahren/presentation/placeholders";
import { getVerfahrenStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import VerfahrenBriefSummaryOfBeteiligte from "~/components/verfahren/VerfahrenBriefSummaryOfBeteiligte";
import VerfahrenBriefSummaryOfGericht from "~/components/verfahren/VerfahrenBriefSummaryOfGericht.static";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import type { Verfahren } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import {
  getBeteiligteNamesByRoleCode,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/services/beteiligteByRole";
import { useTranslations } from "~/services/translations/context";

type VerfahrenOverviewCardProps = {
  verfahren: Verfahren;
};

export default function VerfahrenOverviewCard({
  verfahren,
}: Readonly<VerfahrenOverviewCardProps>) {
  const { routes, shared } = useTranslations();

  const klaegerinnenNamen = getBeteiligteNamesByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
    NOT_AVAILABLE_LABEL,
  );
  const beklagteNamen = getBeteiligteNamesByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
    NOT_AVAILABLE_LABEL,
  );
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
    shared.statusPresentation.verfahren,
  );

  return (
    <article className="kern-card">
      <div className="kern-card__container">
        <div className="algin-start gap-kern-space-default flex w-full flex-wrap items-start">
          <div className="flex-1">
            <h2 className="kern-heading-medium">
              {verfahren.kurzrubrum ??
                `${klaegerinnenNamen} ./. ${beklagteNamen}`}
            </h2>
            <div className="align-center kern-body kern-body--muted gap-kern-space-small flex flex-wrap">
              <span>
                {verfahren.aktenzeichenGericht ??
                  routes.verfahrenNeu.step3.summary.aktenzeichen}
              </span>
              <span>·</span>
              <span>
                {verfahren.gericht?.wert ??
                  routes.verfahrenNeu.step3.summary.gericht}
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
        <div className="gap-kern-space-default grid w-full grid-cols-1 md:grid-cols-3">
          <VerfahrenBriefSummaryOfBeteiligte
            notAvailableLabel={NOT_AVAILABLE_LABEL}
            title={shared.beteiligte.klaegerLabel}
            beteiligte={klaegerinnenSummary}
            fallbackLabel={shared.beteiligte.fallbackLabel}
          />
          <VerfahrenBriefSummaryOfBeteiligte
            notAvailableLabel={NOT_AVAILABLE_LABEL}
            title={shared.beteiligte.beklagteLabel}
            beteiligte={beklagteSummary}
            fallbackLabel={shared.beteiligte.fallbackLabel}
          />
          <VerfahrenBriefSummaryOfGericht
            title={shared.gericht.briefSummaryTitle}
            gerichtLabel={shared.gericht.label}
            gericht={verfahren.gericht?.wert ?? NOT_AVAILABLE_LABEL}
            azLabel={shared.gericht.azLabel}
            az={verfahren.aktenzeichenGericht ?? NOT_AVAILABLE_LABEL}
            kontoinhaberLabel={shared.gericht.kontoinhaberLabel}
            kontoinhaber={NOT_AVAILABLE_LABEL}
            ibanLabel={shared.gericht.ibanLabel}
            iban={NOT_AVAILABLE_LABEL}
          />
        </div>
      </div>
    </article>
  );
}
