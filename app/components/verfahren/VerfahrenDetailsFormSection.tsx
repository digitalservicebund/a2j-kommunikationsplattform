import InputText from "~/components/InputText";
import VerfahrenGerichteSelect, {
  type GerichtSelectItem,
} from "~/components/verfahren/VerfahrenGerichteSelect";
import { useTranslations } from "~/services/translations/context";

type VerfahrenDetailsFormSectionProps = {
  kurzrubrum: string;
  claimReference: string;
  verfahrensgegenstand: string;
  courtId: string;
  gerichtePromise: Promise<GerichtSelectItem[]>;
};

export default function VerfahrenDetailsFormSection({
  kurzrubrum,
  claimReference,
  verfahrensgegenstand,
  courtId,
  gerichtePromise,
}: Readonly<VerfahrenDetailsFormSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <div className="kern-card">
      <div className="kern-card__container mb-kern-space-default">
        <header className="kern-card__header">
          <hgroup>
            <h3 className="kern-title">
              {routes.verfahrenNeu.step2.form.verfahrenDetails.title}
            </h3>
          </hgroup>
        </header>
        <section className="kern-card__body">
          <div className="kern-form-input">
            <InputText
              label={shared.form.labels.rubrum}
              id="claim-rubrum"
              name="claimRubrum"
              defaultValue={kurzrubrum}
            />
          </div>

          <div className="kern-gap-md flex w-full">
            <div className="kern-form-input flex-1 self-end">
              <label className="kern-label" htmlFor="claim-reference">
                {shared.form.labels.legalRepresentativesReferenceNumber}
              </label>
              <input
                className="kern-form-input__input"
                id="claim-reference"
                name="claimReference"
                type="text"
                defaultValue={claimReference}
              />
            </div>

            <VerfahrenGerichteSelect
              id="claim-court"
              label={shared.form.labels.recipientCourt}
              className="flex-1 self-end"
              placeholder={shared.form.select.placeholder}
              gerichtePromise={gerichtePromise}
              initialSelectedValue={courtId}
            />
          </div>

          <div className="kern-form-input">
            <InputText
              label={shared.form.labels.subjectMatterOfTheProceedings}
              id="subject-matter-of-the-proceedings"
              name="subjectMatterOfTheProceedings"
              required
              defaultValue={verfahrensgegenstand}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
