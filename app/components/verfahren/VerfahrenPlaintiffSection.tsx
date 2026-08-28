import InputCheckbox from "~/components/InputCheckbox";
import VerfahrenAdresseKontaktFields from "~/components/verfahren/VerfahrenAdresseKontaktFields";
import VerfahrenKanzleiformSelect, {
  type KanzleiformSelectItem,
} from "~/components/verfahren/VerfahrenKanzleiformSelect";
import type { Anschrift } from "~/domains/verfahren/services/beteiligteContactInfo";
import { useTranslations } from "~/services/translations/context";

type VerfahrenPlaintiffSectionProps = {
  firstName: string;
  lastName: string;
  anschrift: Anschrift | undefined;
  email: string;
  telefon: string;
  hasLawyer: boolean;
  onHasLawyerChange: (hasLawyer: boolean) => void;
  lawyerName: string;
  lawyerAnschrift: Anschrift | undefined;
  lawyerEmail: string;
  lawyerTelefon: string;
  lawyerKanzleiformId: string;
  kanzleiformenPromise: Promise<KanzleiformSelectItem[]>;
};

export default function VerfahrenPlaintiffSection({
  firstName,
  lastName,
  anschrift,
  email,
  telefon,
  hasLawyer,
  onHasLawyerChange,
  lawyerName,
  lawyerAnschrift,
  lawyerEmail,
  lawyerTelefon,
  lawyerKanzleiformId,
  kanzleiformenPromise,
}: Readonly<VerfahrenPlaintiffSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <div className="kern-card">
      <div className="kern-card__container mb-kern-space-default">
        <header className="kern-card__header">
          <hgroup>
            <h3 className="kern-title">
              {routes.verfahrenNeu.step2.form.plaintiff.title}
            </h3>
          </hgroup>
        </header>
        <section className="kern-card__body">
          <p className="kern-body">
            {routes.verfahrenNeu.step2.form.plaintiff.description}
          </p>

          <div className="kern-gap-md flex w-full">
            <div className="kern-form-input flex-1">
              <label className="kern-label" htmlFor="klagende-partei-vorname">
                {shared.form.labels.forename}
              </label>
              <input
                className="kern-form-input__input"
                id="klagende-partei-vorname"
                name="klagendeParteiVorname"
                type="text"
                defaultValue={firstName}
              />
            </div>
            <div className="kern-form-input flex-1">
              <label className="kern-label" htmlFor="klagende-partei-nachname">
                {shared.form.labels.lastname}
              </label>
              <input
                className="kern-form-input__input"
                id="klagende-partei-nachname"
                name="klagendeParteiNachname"
                type="text"
                defaultValue={lastName}
                required
              />
            </div>
          </div>

          <VerfahrenAdresseKontaktFields
            idPrefix="klagende-partei"
            namePrefix="klagendePartei"
            strasse={anschrift?.strasse ?? ""}
            hausnummer={anschrift?.hausnummer ?? ""}
            postleitzahl={anschrift?.postleitzahl ?? ""}
            ort={anschrift?.ort ?? ""}
            email={email}
            telefon={telefon}
          />

          <hr
            className="kern-divider border-kern-layout-border mt-kern-space-x-large w-full"
            aria-hidden="true"
          />

          <InputCheckbox
            className={
              hasLawyer ? "my-kern-space-default" : "mt-kern-space-default"
            }
            label={routes.verfahrenNeu.step2.form.plaintiff.hasLawyer.checkbox}
            id="has-lawyer"
            name="hasLawyer"
            checked={hasLawyer}
            onChange={(event) => onHasLawyerChange(event.target.checked)}
          />

          {hasLawyer && (
            <>
              <h3 className="kern-title kern-title--small">
                {routes.verfahrenNeu.step2.form.plaintiff.hasLawyer.title}
              </h3>
              <div className="kern-form-input">
                <label className="kern-label" htmlFor="lawyer-name">
                  {
                    routes.verfahrenNeu.step2.form.plaintiff.hasLawyer
                      .nameOfLawFirm
                  }
                </label>
                <input
                  className="kern-form-input__input"
                  id="lawyer-name"
                  name="lawyerName"
                  type="text"
                  defaultValue={lawyerName}
                />
              </div>

              <VerfahrenKanzleiformSelect
                id="lawyerKanzleiformId"
                label={
                  routes.verfahrenNeu.step2.form.plaintiff.hasLawyer.kanzleiform
                }
                placeholder={shared.form.select.placeholder}
                kanzleiformenPromise={kanzleiformenPromise}
                initialSelectedValue={lawyerKanzleiformId}
                required
              />

              <VerfahrenAdresseKontaktFields
                idPrefix="lawyer"
                namePrefix="lawyer"
                strasse={lawyerAnschrift?.strasse ?? ""}
                hausnummer={lawyerAnschrift?.hausnummer ?? ""}
                postleitzahl={lawyerAnschrift?.postleitzahl ?? ""}
                ort={lawyerAnschrift?.ort ?? ""}
                email={lawyerEmail}
                telefon={lawyerTelefon}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
