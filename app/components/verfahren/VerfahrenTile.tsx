import { Link } from "react-router";
import FolderInfoIcon from "~/components/icons/FolderInfoIcon.static";
import VerfahrenStatusBadge from "~/components/verfahren/VerfahrenStatusBadge.static";
import { NOT_AVAILABLE_LABEL } from "~/components/verfahren/presentation/placeholders";
import { getVerfahrenStatusPresentation } from "~/components/verfahren/presentation/statusPresentation";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import {
  getBeteiligteDisplayName,
  getBeteiligungByRoleCode,
  getGeschaeftszeichenByRoleCode,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/services/beteiligteByRole";
import { useTranslations } from "~/services/translations/context";

function DataItem({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div>
      <dt className="kern-body kern-body--muted">{label}</dt>
      <dd className="kern-label m-0">{value}</dd>
    </div>
  );
}

function DataCard({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="p-kern-space-default gap-kern-space-large rounded-kern-border-radius-default bg-kern-layout-background-hued flex min-h-352 flex-col items-start overflow-hidden">
      <div className="space-y-kern-space-default w-full">
        <h4 className="kern-heading-small">{label}</h4>
        <hr
          className="kern-divider border-kern-layout-border w-full"
          aria-hidden="true"
        />
      </div>
      {children}
    </div>
  );
}

type VerfahrenTileProps = Readonly<Verfahren> & {
  withoutDetailsLink?: boolean;
};

export type { VerfahrenTileProps };

export default function VerfahrenTile({
  withoutDetailsLink = false,
  ...verfahren
}: VerfahrenTileProps) {
  const { buttons, shared } = useTranslations();
  const {
    beteiligungen,
    status,
    id,
    gericht,
    aktenzeichenGericht,
    kurzrubrum,
  } = verfahren;

  // Extract values from beteiligungen based on rollen codes
  const klaegerinData = getBeteiligungByRoleCode(
    beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteData = getBeteiligungByRoleCode(
    beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );

  const klaegerinName = getBeteiligteDisplayName(klaegerinData);
  const beklagteName = getBeteiligteDisplayName(beklagteData);

  const klaegerinGeschaeftszeichen = getGeschaeftszeichenByRoleCode(
    klaegerinData,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagteGeschaeftszeichen = getGeschaeftszeichenByRoleCode(
    beklagteData,
    ROLE_CODE_BEKLAGTE,
  );

  const rubrum =
    kurzrubrum ||
    `${klaegerinName || NOT_AVAILABLE_LABEL} ./. ${beklagteName || NOT_AVAILABLE_LABEL}`;
  const statusPresentation = getVerfahrenStatusPresentation(
    status,
    shared.statusPresentation.verfahren,
  );

  return (
    <article className="gap-kern-space-large border-t-kern-layout-border pt-kern-dimension-x-large flex flex-col border-t-1 first-of-type:border-0 first-of-type:pt-0">
      <div className="flex flex-col justify-between md:flex-row">
        <h2 className="kern-heading-medium">{rubrum}</h2>
        <div className="gap-kern-space-large inline-flex">
          {!withoutDetailsLink && (
            <>
              <div className="flex">
                <VerfahrenStatusBadge
                  small
                  tone={statusPresentation.badgeClassModifier}
                  label={statusPresentation.label}
                />
              </div>

              <Link
                to={`/verfahren/${id}`}
                className="kern-btn kern-btn--primary my-2.5"
              >
                <FolderInfoIcon />
                <span className="kern-label">
                  {buttons.SHOW_VERFAHREN_DETAILS}
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
      <dl className="gap-kern-space-large my-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DataCard label="Klagende Partei">
          <DataItem label="Name" value={klaegerinName || NOT_AVAILABLE_LABEL} />
          <DataItem
            label="Geschäftszeichen"
            value={klaegerinGeschaeftszeichen || NOT_AVAILABLE_LABEL}
          />
        </DataCard>
        <DataCard label="Beklagte Partei">
          <DataItem label="Name" value={beklagteName || NOT_AVAILABLE_LABEL} />
          <DataItem
            label="Geschäftszeichen"
            value={beklagteGeschaeftszeichen || NOT_AVAILABLE_LABEL}
          />
        </DataCard>
        <DataCard label="Gericht">
          <DataItem
            label="Zuständiges Gericht"
            value={gericht?.wert || NOT_AVAILABLE_LABEL}
          />
          <DataItem
            label="Aktenzeichen des Gerichts"
            value={aktenzeichenGericht || NOT_AVAILABLE_LABEL}
          />
        </DataCard>
      </dl>
    </article>
  );
}
