import InputCheckbox from "~/components/InputCheckbox";
import InputField from "~/components/InputField";
import VerfahrenAdresseKontaktFields from "~/components/verfahren/VerfahrenAdresseKontaktFields";
import VerfahrenKanzleiformSelect, {
  type KanzleiformSelectItem,
} from "~/components/verfahren/VerfahrenKanzleiformSelect";
import type { Anschrift } from "~/domains/verfahren/services/beteiligteContactInfo";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

export type VerfahrenKlaegerSectionProps = {
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
  kanzleiformen: KanzleiformSelectItem[];
  errors: Record<string, string[]>;
};

export default function VerfahrenKlaegerSection({
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
  kanzleiformen,
  errors,
}: Readonly<VerfahrenKlaegerSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <FieldsetCard
      title={routes.verfahrenNeu.step2.form.klagendePartei.title}
      subline={routes.verfahrenNeu.step2.form.klagendePartei.description}
      TitleComponent="h3"
    >
      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1"
          id="klagende-partei-vorname"
          name="klagendeParteiVorname"
          label={shared.form.labels.vorname}
          defaultValue={firstName}
        />
        <InputField
          className="flex-1"
          id="klagende-partei-nachname"
          name="klagendeParteiNachname"
          label={shared.form.labels.nachname}
          defaultValue={lastName}
          errors={errors}
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
        label={routes.verfahrenNeu.step2.form.klagendePartei.hasLawyer.checkbox}
        id="has-lawyer"
        name="hasLawyer"
        checked={hasLawyer}
        onChange={(event) => onHasLawyerChange(event.target.checked)}
      />

      {hasLawyer && (
        <>
          <h3 className="kern-title kern-title--small">
            {routes.verfahrenNeu.step2.form.klagendePartei.hasLawyer.title}
          </h3>
          <InputField
            id="lawyer-name"
            name="lawyerName"
            label={
              routes.verfahrenNeu.step2.form.klagendePartei.hasLawyer
                .nameOfLawFirm
            }
            defaultValue={lawyerName}
            errors={errors}
          />

          <VerfahrenKanzleiformSelect
            id="lawyerKanzleiformId"
            label={
              routes.verfahrenNeu.step2.form.klagendePartei.hasLawyer
                .kanzleiform
            }
            placeholder={shared.form.select.placeholder}
            kanzleiformen={kanzleiformen}
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
    </FieldsetCard>
  );
}
