import type {
  BeteiligteSummaryItem,
  ProzessbevollmaechtigterSummaryItem,
} from "~/domains/verfahren/buildBeteiligteSummaryItems";

type VerfahrenBriefSummaryOfBeteiligteProps = {
  title: string;
  beteiligte: BeteiligteSummaryItem[];
  fallbackLabel: string;
  notAvailableLabel: string;
};

function formatVertretungName(
  prozessbevollmaechtigte: ProzessbevollmaechtigterSummaryItem,
  notAvailableLabel: string,
): string {
  const name = prozessbevollmaechtigte.name ?? notAvailableLabel;

  if (prozessbevollmaechtigte.aktenzeichen) {
    return `${name} (${prozessbevollmaechtigte.aktenzeichen})`;
  }

  return name;
}

export default function VerfahrenBriefSummaryOfBeteiligte({
  title,
  beteiligte,
  fallbackLabel,
  notAvailableLabel,
}: Readonly<VerfahrenBriefSummaryOfBeteiligteProps>) {
  return (
    <div className="p-kern-space-default space-y-kern-space-default rounded-kern-default border border-(--kern-color-decorative-border-contextual)">
      <h3 className="kern-heading-small pb-kern-space-default border-b border-(--kern-color-decorative-border-contextual) px-0">
        {title}
      </h3>
      <dl className="kern-description-list kern-description-list--col">
        {beteiligte.length === 0 ? (
          <div>
            <div className="kern-description-list-item">
              <dd className="kern-description-list-item__value">
                {fallbackLabel}
              </dd>
            </div>
          </div>
        ) : (
          <>
            {beteiligte.map((beteiligung) => (
              <div key={`${beteiligung.id}-name`}>
                <div className="kern-description-list-item">
                  <dt className="kern-description-list-item__key">Name</dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.name ?? notAvailableLabel}
                  </dd>
                </div>

                <div
                  key={`${beteiligung.id}-anschrift`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">Anschrift</dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.anschrift ?? notAvailableLabel}
                  </dd>
                </div>

                <div
                  key={`${beteiligung.id}-email`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">E-Mail</dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.email ?? notAvailableLabel}
                  </dd>
                </div>

                <div
                  key={`${beteiligung.id}-telefon`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">Telefon</dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.telefon ?? notAvailableLabel}
                  </dd>
                </div>

                {beteiligung.prozessbevollmaechtigte &&
                beteiligung.prozessbevollmaechtigte.length > 0 ? (
                  beteiligung.prozessbevollmaechtigte.map(
                    (prozessbevollmaechtigte, index) => (
                      <div key={`${beteiligung.id}-vertretung-${index}`}>
                        <div className="kern-description-list-item">
                          <dt className="kern-description-list-item__key">
                            Vertretung
                          </dt>
                          <dd className="kern-description-list-item__value">
                            {formatVertretungName(
                              prozessbevollmaechtigte,
                              notAvailableLabel,
                            )}
                          </dd>
                        </div>
                        <div className="kern-description-list-item">
                          <dt className="kern-description-list-item__key">
                            Anschrift der Vertretung
                          </dt>
                          <dd className="kern-description-list-item__value">
                            {prozessbevollmaechtigte.anschrift ??
                              notAvailableLabel}
                          </dd>
                        </div>
                        <div className="kern-description-list-item">
                          <dt className="kern-description-list-item__key">
                            Kontakt der Vertretung
                          </dt>
                          <dd className="kern-description-list-item__value">
                            {prozessbevollmaechtigte.email ?? notAvailableLabel}
                          </dd>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div className="kern-description-list-item">
                    <dt className="kern-description-list-item__key">
                      Vertretung
                    </dt>
                    <dd className="kern-description-list-item__value">
                      {notAvailableLabel}
                    </dd>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </dl>
    </div>
  );
}
