import InputField from "~/components/InputField";
import { useTranslations } from "~/services/translations/context";

type VerfahrenAdresseKontaktFieldsProps = {
  idPrefix: string;
  namePrefix: string;
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  ort: string;
  email: string;
  telefon: string;
};

export default function VerfahrenAdresseKontaktFields({
  idPrefix,
  namePrefix,
  strasse,
  hausnummer,
  postleitzahl,
  ort,
  email,
  telefon,
}: Readonly<VerfahrenAdresseKontaktFieldsProps>) {
  const { shared } = useTranslations();

  return (
    <>
      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-2"
          label={shared.form.labels.strasse}
          id={`${idPrefix}-strasse`}
          name={`${namePrefix}Strasse`}
          defaultValue={strasse}
        />
        <InputField
          className="flex-1"
          label={shared.form.labels.hausnummer}
          id={`${idPrefix}-hausnummer`}
          name={`${namePrefix}Hausnummer`}
          defaultValue={hausnummer}
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1"
          label={shared.form.labels.postleitzahl}
          id={`${idPrefix}-plz`}
          name={`${namePrefix}Plz`}
          inputMode="numeric"
          defaultValue={postleitzahl}
        />
        <InputField
          className="flex-2"
          label={shared.form.labels.ort}
          id={`${idPrefix}-ort`}
          name={`${namePrefix}Ort`}
          defaultValue={ort}
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1"
          label={shared.form.labels.email}
          id={`${idPrefix}-email`}
          name={`${namePrefix}Email`}
          type="email"
          defaultValue={email}
        />
        <InputField
          className="flex-1"
          label={shared.form.labels.telefon}
          id={`${idPrefix}-telefon`}
          name={`${namePrefix}Telefon`}
          type="tel"
          defaultValue={telefon}
        />
      </div>
    </>
  );
}
