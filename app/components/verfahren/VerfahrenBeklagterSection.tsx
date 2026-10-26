import InputField from "~/components/InputField";
import VerfahrenAdresseKontaktFields from "~/components/verfahren/VerfahrenAdresseKontaktFields";
import type { Anschrift } from "~/domains/verfahren/services/beteiligteContactInfo";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

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
    <FieldsetCard
      title={routes.verfahrenNeu.beteiligte.form.beklagtePartei.title}
      subline={routes.verfahrenNeu.beteiligte.form.beklagtePartei.description}
      TitleComponent="h3"
    >
      <p className="kern-subline -mbs-(--kern-metric-space-default) mbe-(--kern-metric-space-default)"></p>

      <div className="kern-gap-md flex w-full">
        <InputField
          label={shared.form.labels.vorname}
          id="beklagte-partei-vorname"
          name="beklagteParteiVorname"
          defaultValue={firstName}
          className="flex-1"
        />
        <InputField
          label={shared.form.labels.nachname}
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
    </FieldsetCard>
  );
}
