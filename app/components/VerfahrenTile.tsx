import { clsx } from "clsx";
import { Link } from "react-router";

export type VerfahrenTileProps = {
  update?: string;
  abgeschlossen?: boolean;
  detailsHref: string;
  urteilsHref?: string;
  mandantin?: string;
  gegenpartei?: string;
  vertretung?: string;
  geschaeftszeichen?: string;
  gericht?: string;
  aktenzeichen?: string;
  verfahrensstand?: string;
  rechtsgebiet?: string;
  sachverhalt?: string;
};

function VerfahrenTileDataItem({
  label,
  value,
  abgeschlossen,
}: {
  label: string;
  value: string;
  abgeschlossen?: boolean;
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

export default function VerfahrenTile({
  update,
  abgeschlossen = false,
  detailsHref,
  urteilsHref,
  mandantin = "nicht verfügbar",
  gegenpartei = "nicht verfügbar",
  vertretung = "nicht verfügbar",
  geschaeftszeichen = "nicht verfügbar",
  gericht = "nicht verfügbar",
  aktenzeichen = "nicht verfügbar",
  verfahrensstand = "nicht verfügbar",
  rechtsgebiet = "nicht verfügbar",
  sachverhalt = "nicht verfügbar",
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
          value={mandantin}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Gegenpartei bzw. -parteien"
          value={gegenpartei}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Vertreten durch"
          value={vertretung}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Eigenes Geschäftszeichen"
          value={geschaeftszeichen}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Zuständiges Gericht"
          value={gericht}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Aktenzeichen des Gerichts"
          value={aktenzeichen}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Verfahrensstand"
          value={verfahrensstand}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Rechtsgebiet"
          value={rechtsgebiet}
          abgeschlossen={abgeschlossen}
        />
        <VerfahrenTileDataItem
          label="Sachverhalt"
          value={sachverhalt}
          abgeschlossen={abgeschlossen}
        />
      </dl>

      <hr
        className="kern-divider mb-kern-space-large mt-kern-space-small"
        aria-hidden
      />

      <div className="mb-kern-space-large gap-kern-space-x-large flex flex-wrap">
        <Link to={detailsHref} className="kern-btn kern-btn--primary">
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
