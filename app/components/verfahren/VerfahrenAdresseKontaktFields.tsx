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
        <div className="kern-form-input flex-2">
          <label className="kern-label" htmlFor={`${idPrefix}-strasse`}>
            {shared.form.labels.street}
          </label>
          <input
            className="kern-form-input__input"
            id={`${idPrefix}-strasse`}
            name={`${namePrefix}Strasse`}
            type="text"
            defaultValue={strasse}
          />
        </div>
        <div className="kern-form-input flex-1">
          <label className="kern-label" htmlFor={`${idPrefix}-hausnummer`}>
            {shared.form.labels.houseNumber}
          </label>
          <input
            className="kern-form-input__input"
            id={`${idPrefix}-hausnummer`}
            name={`${namePrefix}Hausnummer`}
            type="text"
            defaultValue={hausnummer}
          />
        </div>
      </div>

      <div className="kern-gap-md flex w-full">
        <div className="kern-form-input flex-1">
          <label className="kern-label" htmlFor={`${idPrefix}-plz`}>
            {shared.form.labels.postcode}
          </label>
          <input
            className="kern-form-input__input"
            id={`${idPrefix}-plz`}
            name={`${namePrefix}Plz`}
            type="text"
            defaultValue={postleitzahl}
          />
        </div>
        <div className="kern-form-input flex-2">
          <label className="kern-label" htmlFor={`${idPrefix}-ort`}>
            {shared.form.labels.place}
          </label>
          <input
            className="kern-form-input__input"
            id={`${idPrefix}-ort`}
            name={`${namePrefix}Ort`}
            type="text"
            defaultValue={ort}
          />
        </div>
      </div>

      <div className="kern-gap-md flex w-full">
        <div className="kern-form-input flex-1">
          <label className="kern-label" htmlFor={`${idPrefix}-email`}>
            {shared.form.labels.eMail}
          </label>
          <input
            className="kern-form-input__input"
            id={`${idPrefix}-email`}
            name={`${namePrefix}Email`}
            type="email"
            defaultValue={email}
          />
        </div>
        <div className="kern-form-input flex-1">
          <label className="kern-label" htmlFor={`${idPrefix}-telefon`}>
            {shared.form.labels.phone}
          </label>
          <input
            className="kern-form-input__input"
            id={`${idPrefix}-telefon`}
            name={`${namePrefix}Telefon`}
            type="tel"
            defaultValue={telefon}
          />
        </div>
      </div>
    </>
  );
}
