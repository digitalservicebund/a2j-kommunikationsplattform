import InputCheckbox from "~/components/InputCheckbox";
import InputField from "~/components/InputField";
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
  errors: Record<string, string[]>;
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
  errors,
}: Readonly<VerfahrenPlaintiffSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <div className="kern-card">
      <div className="kern-card__container kern-mb-md">
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
            <InputField
              className="flex-1"
              id="klagende-partei-vorname"
              name="klagendeParteiVorname"
              label={shared.form.labels.forename}
              defaultValue={firstName}
            />
            <InputField
              className="flex-1"
              id="klagende-partei-nachname"
              name="klagendeParteiNachname"
              label={shared.form.labels.lastname}
              defaultValue={lastName}
              error={errors.klagendeParteiNachname?.join(" ")}
            />
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

          <InputCheckbox
            className={hasLawyer ? "kern-my-md" : "kern-mt-md"}
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
              <InputField
                id="lawyer-name"
                name="lawyerName"
                label={
                  routes.verfahrenNeu.step2.form.plaintiff.hasLawyer
                    .nameOfLawFirm
                }
                defaultValue={lawyerName}
                error={errors.lawyerName?.join(" ")}
              />

              <VerfahrenKanzleiformSelect
                id="lawyerKanzleiformId"
                label={
                  routes.verfahrenNeu.step2.form.plaintiff.hasLawyer.kanzleiform
                }
                placeholder={shared.form.select.placeholder}
                kanzleiformenPromise={kanzleiformenPromise}
                initialSelectedValue={lawyerKanzleiformId}
                error={errors.lawyerKanzleiformId?.join(" ")}
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
