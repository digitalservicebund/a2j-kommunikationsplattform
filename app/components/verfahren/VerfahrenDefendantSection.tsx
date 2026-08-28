import VerfahrenAdresseKontaktFields from "~/components/verfahren/VerfahrenAdresseKontaktFields";
import type { Anschrift } from "~/domains/verfahren/services/beteiligteContactInfo";
import { useTranslations } from "~/services/translations/context";

type VerfahrenDefendantSectionProps = {
  firstName: string;
  lastName: string;
  anschrift: Anschrift | undefined;
  email: string;
  telefon: string;
};

export default function VerfahrenDefendantSection({
  firstName,
  lastName,
  anschrift,
  email,
  telefon,
}: Readonly<VerfahrenDefendantSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <div className="kern-card">
      <div className="kern-card__container mb-kern-space-default">
        <header className="kern-card__header">
          <hgroup>
            <h3 className="kern-title">
              {routes.verfahrenNeu.step2.form.defendant.title}
            </h3>
          </hgroup>
        </header>
        <section className="kern-card__body">
          <p className="kern-body">
            {routes.verfahrenNeu.step2.form.defendant.description}
          </p>

          <div className="kern-gap-md flex w-full">
            <div className="kern-form-input flex-1">
              <label className="kern-label" htmlFor="beklagte-partei-vorname">
                {shared.form.labels.forename}
              </label>
              <input
                className="kern-form-input__input"
                id="beklagte-partei-vorname"
                name="beklagteParteiVorname"
                type="text"
                defaultValue={firstName}
              />
            </div>
            <div className="kern-form-input flex-1">
              <label className="kern-label" htmlFor="beklagte-partei-nachname">
                {shared.form.labels.lastname}
              </label>
              <input
                className="kern-form-input__input"
                id="beklagte-partei-nachname"
                name="beklagteParteiNachname"
                type="text"
                defaultValue={lastName}
                required
              />
            </div>
          </div>

          <VerfahrenAdresseKontaktFields
            idPrefix="beklagte-partei"
            namePrefix="beklagtePartei"
            strasse={anschrift?.strasse ?? ""}
            hausnummer={anschrift?.hausnummer ?? ""}
            postleitzahl={anschrift?.postleitzahl ?? ""}
            ort={anschrift?.ort ?? ""}
            email={email}
            telefon={telefon}
          />
        </section>
      </div>
    </div>
  );
}
