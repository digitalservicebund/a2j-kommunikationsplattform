import { clsx } from "clsx";
import { Link } from "react-router";

export type VerfahrenTileProps = {
  readonly update?: string;
  readonly abgeschlossen?: boolean;
  readonly urteilsHref?: string;
  readonly id: string;
  readonly aktenzeichen?: string | null;
  readonly gericht_name?: string | null;
  readonly mandantin?: string | null;
  readonly gegenpartei?: string | null;
  readonly vertretung?: string | null;
  readonly geschaeftszeichen?: string | null;
};

function VerfahrenTileDataItem({
  label,
  value,
  abgeschlossen,
}: {
  readonly label: string;
  readonly value: string;
  readonly abgeschlossen?: boolean;
}) {
  const valueCssClasses = clsx("kern-label m-0", {
    "text-kern-layout-text-muted": abgeschlossen,
  });
  return (
    <div className="kern-col kern-col-12 kern-col-md-6 kern-col-lg-4">
      <dd className={valueCssClasses}>{value}</dd>
      <dt className="kern-body kern-body--muted">{label}</dt>
    </div>
  );
}

const notAvailable = "nicht verfügbar";

export default function VerfahrenTile({
  update,
  abgeschlossen = false,
  urteilsHref,
  id,
  mandantin,
  gegenpartei,
  vertretung,
  geschaeftszeichen,
  gericht_name,
  aktenzeichen,
}: VerfahrenTileProps) {
  const cssClasses = clsx(
    "relative",
    "after:border-y-1 sm:after:border-x-1 sm:after:rounded-kern-default after:border-kern-layout-border",
    "after:absolute after:-z-1 after:top-0 after:-right-16 after:bottom-0 after:-left-16",
    {
      "after:bg-kern-layout-background-hued": abgeschlossen,
    },
  );

  return (
    <article className={cssClasses}>
      {update ? (
        <div className="kern-row mt-kern-space-small">
          <div className="kern-col-12 pb-kern-space-small">
            <span className="kern-badge kern-badge--info">
              <span className="kern-icon kern-icon--info" aria-hidden />
              <span className="kern-label kern-label--small">{update}</span>
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      <dl className="kern-row my-0">
        <VerfahrenTileDataItem
          label="Mandant:in"
          value={mandantin || notAvailable}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Gegenpartei bzw. -parteien"
          value={gegenpartei || notAvailable}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Vertreten durch"
          value={vertretung || notAvailable}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Eigenes Geschäftszeichen"
          value={geschaeftszeichen || notAvailable}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Zuständiges Gericht"
          value={gericht_name || notAvailable}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Aktenzeichen des Gerichts"
          value={aktenzeichen || notAvailable}
          abgeschlossen={abgeschlossen}
        />
      </dl>

      <hr
        className="kern-divider mb-kern-space-large mt-kern-space-small"
        aria-hidden
      />

      <div className="mb-kern-space-large gap-kern-space-x-large flex flex-wrap">
        <Link
          to={`/uebersicht/verfahren/${id}`}
          className="kern-btn kern-btn--primary"
        >
          <span className="kern-icon kern-icon--open-in-new" aria-hidden />
          <span className="kern-label">Verfahrensdetails anzeigen</span>
        </Link>
        {abgeschlossen && urteilsHref ? (
          <Link to={urteilsHref} className="kern-btn kern-btn--secondary">
            <span
              className="kern-icon kern-icon--insert-drive-file"
              aria-hidden
            />
            <span className="kern-label">Urteil anzeigen</span>
          </Link>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}
