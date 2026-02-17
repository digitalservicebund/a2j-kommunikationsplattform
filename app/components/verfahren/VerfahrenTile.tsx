import { Link } from "react-router";
import DraftIcon from "~/components/icons/DraftIcon";
import FolderInfoIcon from "~/components/icons/FolderAlertIcon";
import type { Verfahren } from "~/routes/verfahren/_index";
import { useTranslations } from "~/services/translations/context";

const ROLLE_CODE_KLAEGERIN = "101";
const ROLLE_CODE_BEKLAGTE = "028";

// Helper functions to extract data based on role codes - we can move these to a separate utils file and create tests for them later
function getBeteiligungByRoleCode(
  beteiligungen: Verfahren["beteiligungen"],
  roleCode: string,
) {
  return beteiligungen.find((b) => b.rollen.some((r) => r.code === roleCode));
}

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

const notAvailable = "Unbekannt";

export default function VerfahrenTile({
  id,
  aktenzeichen_gericht,
  gericht,
  beteiligungen,
}: Verfahren) {
  const { buttons } = useTranslations();

  // Extract values from beteiligungen based on rollen codes
  const klaegerinData =
    getBeteiligungByRoleCode(beteiligungen, ROLLE_CODE_KLAEGERIN) || null;
  const beklagteData =
    getBeteiligungByRoleCode(beteiligungen, ROLLE_CODE_BEKLAGTE) || null;

  const prozessbevollmaechtigteKlaegerin =
    klaegerinData?.prozessbevollmaechtigte || [];
  const prozessbevollmaechtigteBeklagte =
    beklagteData?.prozessbevollmaechtigte || [];

  return (
    <article className="gap-kern-space-large flex flex-col">
      <h2 className="kern-heading-medium">
        Placeholder for Kläger:in ./. Beklagte:r
      </h2>
      <dl className="gap-kern-space-large my-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DataCard label="Klagende Partei">
          {/* TODO: display Vorname & Nachname using separate DataItem when these data points are available. See https://digitalservicebund.atlassian.net/browse/KOMMPLA-987 */}
          <DataItem label="Name" value={klaegerinData?.name || notAvailable} />
          <DataItem
            key={prozessbevollmaechtigteKlaegerin[0]?.id}
            label="Geschäftszeichen"
            value={
              prozessbevollmaechtigteKlaegerin[0]?.aktenzeichen || notAvailable
            }
          />
        </DataCard>
        <DataCard label="Beklagte Partei">
          <DataItem label="Name" value={beklagteData?.name || notAvailable} />
          <DataItem
            key={prozessbevollmaechtigteBeklagte[0]?.id}
            label="Geschäftszeichen"
            value={
              prozessbevollmaechtigteBeklagte[0]?.aktenzeichen || notAvailable
            }
          />
        </DataCard>
        <DataCard label="Gericht">
          <DataItem
            label="Zuständiges Gericht"
            value={gericht?.wert || notAvailable}
          />
          <DataItem
            label="Aktenzeichen des Gerichts"
            value={aktenzeichen_gericht || notAvailable}
          />
        </DataCard>
      </dl>

      <div className="gap-kern-space-large my-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="mb-kern-space-large gap-kern-space-large">
          <Link
            to={`/verfahren/${id}`}
            className="kern-btn kern-btn--primary w-full"
          >
            <FolderInfoIcon />
            <span className="kern-label">{buttons.SHOW_VERFAHREN_DETAILS}</span>
          </Link>
        </div>

        <div className="mb-kern-space-large gap-kern-space-large">
          <Link
            to="#"
            className="kern-btn kern-btn kern-btn--secondary w-full"
            aria-disabled
          >
            <DraftIcon />
            <span className="kern-label">Weitere Funktion</span>
          </Link>
        </div>
      </div>

      <hr
        className="kern-divider mb-kern-space-large mt-kern-space-small"
        aria-hidden
      />
    </article>
  );
}
