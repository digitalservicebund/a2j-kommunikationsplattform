type VerfahrenBriefSummaryOfGerichtProps = {
  title: string;
  gerichtLabel: string;
  gericht: string;
  azLabel: string;
  az: string;
  kontoinhaberLabel: string;
  kontoinhaber: string;
  ibanLabel: string;
  iban: string;
};

export default function VerfahrenBriefSummaryOfGericht({
  title,
  gerichtLabel,
  gericht,
  azLabel,
  az,
  kontoinhaberLabel,
  kontoinhaber,
  ibanLabel,
  iban,
}: Readonly<VerfahrenBriefSummaryOfGerichtProps>) {
  return (
    <div className="p-kern-space-default space-y-kern-space-default rounded-kern-default border border-(--kern-color-decorative-border-contextual)">
      <h3 className="kern-heading-small pb-kern-space-default border-b border-(--kern-color-decorative-border-contextual)">
        {title}
      </h3>
      <dl className="kern-description-list kern-description-list--col">
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">{gerichtLabel}</dt>
          <dd className="kern-description-list-item__value">{gericht}</dd>
        </div>
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">{azLabel}</dt>
          <dd className="kern-description-list-item__value">{az}</dd>
        </div>
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">
            {kontoinhaberLabel}
          </dt>
          <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
            {kontoinhaber}
          </dd>
        </div>
        <div className="kern-description-list-item">
          <dt className="kern-description-list-item__key">{ibanLabel}</dt>
          <dd className="kern-description-list-item__value bg-kern-feedback-info-background">
            {iban}
          </dd>
        </div>
      </dl>
    </div>
  );
}
