import { Link } from "react-router";
import DraftIcon from "~/components/icons/DraftIcon";
import FolderInfoIcon from "~/components/icons/FolderAlertIcon";
import { useTranslations } from "~/services/translations/context";

const ROLLE_CODE_KLAEGERIN = "101";
const ROLLE_CODE_BEKLAGTE = "028";

export type VerfahrenTileProps = {
  readonly id: string;
  readonly aktenzeichen_gericht?: string | null;
  readonly gericht?: {
    readonly id: string;
    readonly wert: string;
    readonly code: string;
  } | null;
  readonly beteiligungen: Array<{
    readonly id: string;
    readonly name: string;
    readonly rollen: Array<{
      readonly id: string;
      readonly wert: string;
      readonly code: string;
    }>;
    readonly prozessbevollmaechtigte: Array<{
      readonly aktenzeichen: string;
      readonly bevollmaechtigter: {
        readonly id: string;
        readonly safe_id: string;
        readonly name: string;
      };
    }>;
  }>;
};

// Helper functions to extract data based on role codes - we can move these to a separate utils file and create tests for them later
function getBeteiligungByRoleCode(
  beteiligungen: VerfahrenTileProps["beteiligungen"],
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
    <div className="">
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

const notAvailable = "nicht verfügbar";

export default function VerfahrenTile({
  id,
  aktenzeichen_gericht,
  gericht,
  beteiligungen,
}: VerfahrenTileProps) {
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
        <DataCard label="Kläger:in">
          <DataItem label="Name" value={klaegerinData?.name || notAvailable} />
          {prozessbevollmaechtigteKlaegerin.map((p) => (
            <>
              <DataItem
                key={p.bevollmaechtigter.id}
                label="Geschäftszeichen"
                value={p.aktenzeichen || notAvailable}
              />
              <DataItem
                label="Anwaltliche Vertretung"
                value={p.bevollmaechtigter.name || notAvailable}
              />
            </>
          ))}
        </DataCard>
        <DataCard label="Beklagte:r">
          <DataItem label="Name" value={beklagteData?.name || notAvailable} />
          {prozessbevollmaechtigteBeklagte.map((p) => (
            <>
              <DataItem
                key={p.bevollmaechtigter.id}
                label="Geschäftszeichen"
                value={p.aktenzeichen || notAvailable}
              />
              <DataItem
                label="Anwaltliche Vertretung"
                value={p.bevollmaechtigter.name || notAvailable}
              />
            </>
          ))}
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
