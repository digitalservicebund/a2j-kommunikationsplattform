import InputField from "~/components/InputField";
import VerfahrenAdresseKontaktFields from "~/components/verfahren/VerfahrenAdresseKontaktFields";
import type { Anschrift } from "~/domains/verfahren/services/beteiligteContactInfo";
import { useTranslations } from "~/services/translations/context";

type VerfahrenBeklagterSectionProps = {
  firstName: string;
  lastName: string;
  anschrift: Anschrift | undefined;
  email: string;
  telefon: string;
  errors: Record<string, string[]>;
};

export default function VerfahrenBeklagterSection({
  firstName,
  lastName,
  anschrift,
  email,
  telefon,
  errors,
}: Readonly<VerfahrenBeklagterSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <div className="kern-card">
      <div className="kern-card__container kern-mb-md">
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
            <InputField
              label={shared.form.labels.forename}
              id="beklagte-partei-vorname"
              name="beklagteParteiVorname"
              defaultValue={firstName}
              className="flex-1"
            />
            <InputField
              label={shared.form.labels.lastname}
              id="beklagte-partei-nachname"
              name="beklagteParteiNachname"
              defaultValue={lastName}
              className="flex-1"
              errors={errors}
            />
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
