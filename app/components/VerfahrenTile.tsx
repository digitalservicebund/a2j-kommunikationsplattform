import { clsx } from "clsx";
import { Link } from "react-router";
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

function getVertretungNamesByRoleCode(
  beteiligungen: VerfahrenTileProps["beteiligungen"],
  roleCode: string,
) {
  return beteiligungen
    .filter((b) => b.rollen.some((r) => r.code === roleCode))
    .flatMap((b) => b.prozessbevollmaechtigte)
    .map((p) => p.bevollmaechtigter?.name)
    .filter(Boolean);
}

function getGeschaeftszeichenByRoleCode(
  beteiligungen: VerfahrenTileProps["beteiligungen"],
  roleCode: string,
) {
  return (
    getBeteiligungByRoleCode(
      beteiligungen,
      roleCode,
    )?.prozessbevollmaechtigte.find((p) => p.aktenzeichen)?.aktenzeichen || null
  );
}

function VerfahrenTileDataItem({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="kern-col kern-col-12 kern-col-md-6 kern-col-lg-4">
      <dt className="kern-body kern-body--muted">{label}</dt>
      <dd className="kern-label m-0">{value}</dd>
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

  // TODO: when we refactor this component, we will need to make the below variables more dynamic depending on the User Role, e.g., Kläger:in or Beklagte:r

  // Extract values from beteiligungen based on rollen codes
  const klaegerin =
    getBeteiligungByRoleCode(beteiligungen, ROLLE_CODE_KLAEGERIN)?.name || null;
  const beklagte =
    getBeteiligungByRoleCode(beteiligungen, ROLLE_CODE_BEKLAGTE)?.name || null;

  const gegenparteiVertretungNames = getVertretungNamesByRoleCode(
    beteiligungen,
    ROLLE_CODE_BEKLAGTE,
  );
  const gegenparteiVertretung =
    gegenparteiVertretungNames.length > 0
      ? gegenparteiVertretungNames.join(", ")
      : null;

  const geschaeftszeichen = getGeschaeftszeichenByRoleCode(
    beteiligungen,
    ROLLE_CODE_KLAEGERIN,
  );

  const cssClasses = clsx(
    "relative",
    "after:border-y-1 sm:after:border-x-1 sm:after:rounded-kern-default after:border-kern-layout-border",
    "after:absolute after:-z-1 after:top-0 after:-right-16 after:bottom-0 after:-left-16",
  );

  return (
    <article className={cssClasses}>
      <dl className="kern-row my-0">
        <VerfahrenTileDataItem
          label="Kläger:in"
          value={klaegerin || notAvailable}
        />
        <VerfahrenTileDataItem
          label="Beklagte:r"
          value={beklagte || notAvailable}
        />
        <VerfahrenTileDataItem
          label="Anwaltliche Vertretung Gegenpartei-en"
          value={gegenparteiVertretung || notAvailable}
        />
        <VerfahrenTileDataItem
          label="Eigenes Geschäftszeichen"
          value={geschaeftszeichen || notAvailable}
        />
        <VerfahrenTileDataItem
          label="Zuständiges Gericht"
          value={gericht?.wert || notAvailable}
        />
        <VerfahrenTileDataItem
          label="Aktenzeichen des Gerichts"
          value={aktenzeichen_gericht || notAvailable}
        />
      </dl>

      <hr
        className="kern-divider mb-kern-space-large mt-kern-space-small"
        aria-hidden
      />

      <div className="mb-kern-space-large gap-kern-space-x-large flex flex-wrap">
        <Link to={`/verfahren/${id}`} className="kern-btn kern-btn--primary">
          <span className="kern-icon kern-icon--open-in-new" aria-hidden />
          <span className="kern-label">{buttons.SHOW_VERFAHREN_DETAILS}</span>
        </Link>
      </div>
    </article>
  );
}
