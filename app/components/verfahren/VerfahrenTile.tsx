import { Link } from "react-router";
import FolderInfoIcon from "~/components/icons/FolderInfoIcon.static";
import {
  getBeteiligungByRoleCode,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/beteiligteByRole";
import { NOT_AVAILABLE_LABEL } from "~/domains/verfahren/presentationPlaceholders";
import { Verfahren } from "~/routes/_index";
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
  id,
  aktenzeichen_gericht,
  gericht,
  beteiligungen,
  status,
  withoutDetailsLink = false,
}: VerfahrenTileProps) {
  const { buttons } = useTranslations();

  // Extract values from beteiligungen based on rollen codes
  const klaegerinData =
    getBeteiligungByRoleCode(beteiligungen, ROLE_CODE_KLAEGERIN) || null;
  const beklagteData =
    getBeteiligungByRoleCode(beteiligungen, ROLE_CODE_BEKLAGTE) || null;

  const prozessbevollmaechtigteKlaegerin =
    klaegerinData?.prozessbevollmaechtigte || [];
  const prozessbevollmaechtigteBeklagte =
    beklagteData?.prozessbevollmaechtigte || [];

  return (
    <article className="gap-kern-space-large border-t-kern-layout-border pt-kern-dimension-x-large flex flex-col border-t-1 first-of-type:border-0 first-of-type:pt-0">
      <div className="flex flex-col justify-between md:flex-row">
        <h2 className="kern-heading-medium">Platzhalter</h2>
        <div className="gap-kern-space-large inline-flex">
          {!withoutDetailsLink && (
            <>
              <div className="flex">
                <span
                  className={`kern-badge grow-0 ${status === "ERSTELLT" ? "kern-badge--info" : "kern-badge--warning"}`}
                >
                  <span className="kern-label kern-label--small">
                    {status === "ERSTELLT"
                      ? "Klage noch nicht eingereicht"
                      : "Klage eingereicht"}
                  </span>
                </span>
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
          <DataItem
            label="Name"
            value={klaegerinData?.name || NOT_AVAILABLE_LABEL}
          />
          <DataItem
            key={prozessbevollmaechtigteKlaegerin[0]?.id}
            label="Geschäftszeichen"
            value={
              prozessbevollmaechtigteKlaegerin[0]?.aktenzeichen ||
              NOT_AVAILABLE_LABEL
            }
          />
        </DataCard>
        <DataCard label="Beklagte Partei">
          <DataItem
            label="Name"
            value={beklagteData?.name || NOT_AVAILABLE_LABEL}
          />
          <DataItem
            key={prozessbevollmaechtigteBeklagte[0]?.id}
            label="Geschäftszeichen"
            value={
              prozessbevollmaechtigteBeklagte[0]?.aktenzeichen ||
              NOT_AVAILABLE_LABEL
            }
          />
        </DataCard>
        <DataCard label="Gericht">
          <DataItem
            label="Zuständiges Gericht"
            value={gericht?.wert || NOT_AVAILABLE_LABEL}
          />
          <DataItem
            label="Aktenzeichen des Gerichts"
            value={aktenzeichen_gericht || NOT_AVAILABLE_LABEL}
          />
        </DataCard>
      </dl>
    </article>
  );
}
