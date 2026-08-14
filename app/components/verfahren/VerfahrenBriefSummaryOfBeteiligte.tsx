type Prozessbevollmaechtigte = {
  name?: string | null;
  aktenzeichen?: string | null;
};

type Beteiligte = {
  id: string;
  name?: string | null;
  anschrift?: string | null;
  kontakt?: string | null;
  prozessbevollmaechtigte?: Prozessbevollmaechtigte[] | null;
};

type VerfahrenBriefSummaryOfBeteiligteProps = {
  title: string;
  beteiligte: Beteiligte[];
  fallbackLabel: string;
  notAvailableLabel: string;
};

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
                  key={`${beteiligung.id}-kontakt`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">Kontakt</dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.kontakt ?? notAvailableLabel}
                  </dd>
                </div>

                <div
                  key={`${beteiligung.id}-vertretung`}
                  className="kern-description-list-item"
                >
                  <dt className="kern-description-list-item__key">
                    Vertretung
                  </dt>
                  <dd className="kern-description-list-item__value">
                    {beteiligung.prozessbevollmaechtigte &&
                    beteiligung.prozessbevollmaechtigte.length > 0
                      ? beteiligung.prozessbevollmaechtigte
                          .map((prozessbevollmaechtigte) => {
                            const vertretungName =
                              prozessbevollmaechtigte.name ?? notAvailableLabel;

                            if (prozessbevollmaechtigte.aktenzeichen) {
                              return `${vertretungName} (${prozessbevollmaechtigte.aktenzeichen})`;
                            }

                            return vertretungName;
                          })
                          .join(", ")
                      : notAvailableLabel}
                  </dd>
                </div>
              </div>
            ))}
          </>
        )}
      </dl>
    </div>
  );
}
