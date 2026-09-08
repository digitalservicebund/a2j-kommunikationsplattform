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
          label={shared.form.labels.street}
          id={`${idPrefix}-strasse`}
          name={`${namePrefix}Strasse`}
          defaultValue={strasse}
        />
        <InputField
          className="flex-1"
          label={shared.form.labels.houseNumber}
          id={`${idPrefix}-hausnummer`}
          name={`${namePrefix}Hausnummer`}
          defaultValue={hausnummer}
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1"
          label={shared.form.labels.postcode}
          id={`${idPrefix}-plz`}
          name={`${namePrefix}Plz`}
          inputMode="numeric"
          defaultValue={postleitzahl}
        />
        <InputField
          className="flex-2"
          label={shared.form.labels.place}
          id={`${idPrefix}-ort`}
          name={`${namePrefix}Ort`}
          defaultValue={ort}
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1"
          label={shared.form.labels.eMail}
          id={`${idPrefix}-email`}
          name={`${namePrefix}Email`}
          type="email"
          defaultValue={email}
        />
        <InputField
          className="flex-1"
          label={shared.form.labels.phone}
          id={`${idPrefix}-telefon`}
          name={`${namePrefix}Telefon`}
          type="tel"
          defaultValue={telefon}
        />
      </div>
    </>
  );
}
