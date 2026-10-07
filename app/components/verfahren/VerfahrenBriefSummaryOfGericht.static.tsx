import { useTranslations } from "~/services/translations/context";

type VerfahrenBriefSummaryOfGerichtProps = {
  title: string;
  gericht: string | null;
  aktenzeichen: string | null;
  kontoinhaber: string | null;
  iban: string | null;
};

export default function VerfahrenBriefSummaryOfGericht({
  gericht,
  aktenzeichen,
  kontoinhaber,
  iban,
}: Readonly<VerfahrenBriefSummaryOfGerichtProps>) {
  const t = useTranslations();

  return (
    <div className="kern-p-md space-y-(--kern-metric-space-default) rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual)">
      <h3 className="kern-heading-small kern-pb-md border-b border-(--kern-color-decorative-border-contextual) px-0">
        {t.shared.gericht.briefSummaryTitle}
      </h3>

      <dl className="kern-description-list kern-description-list--col">
        {/* Gericht */}
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">
            {t.shared.gericht.label}
          </dt>
          <dd className="kern-description-list-item__value">
            {gericht ?? t.shared.missing}
          </dd>
        </div>

        {/* Aktenzeichen */}
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">
            {t.shared.gericht.azLabel}
          </dt>
          <dd className="kern-description-list-item__value">
            {aktenzeichen ?? t.shared.missing}
          </dd>
        </div>

        {/* IBAN */}
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">
            {t.shared.gericht.ibanLabel}
          </dt>
          <dd className="kern-description-list-item__value">
            {iban ?? t.shared.unknown}
          </dd>
        </div>

        {/* Kontoinhaber */}
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">
            {t.shared.gericht.kontoinhaberLabel}
          </dt>
          <dd className="kern-description-list-item__value">
            {kontoinhaber ?? t.shared.unknown}
          </dd>
        </div>
      </dl>
    </div>
  );
}
