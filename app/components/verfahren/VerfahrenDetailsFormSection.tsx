import InputField from "~/components/InputField";
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
          <InputField
            label={shared.form.labels.rubrum}
            id="claim-rubrum"
            name="claimRubrum"
            defaultValue={kurzrubrum}
          />

          <div className="kern-gap-md flex w-full">
            <InputField
              className="flex-1 self-end"
              label={shared.form.labels.legalRepresentativesReferenceNumber}
              id="claim-reference"
              name="claimReference"
              defaultValue={claimReference}
            />

            <VerfahrenGerichteSelect
              id="claim-court"
              label={shared.form.labels.recipientCourt}
              className="flex-1 self-end"
              placeholder={shared.form.select.placeholder}
              gerichtePromise={gerichtePromise}
              initialSelectedValue={courtId}
            />
          </div>

          <InputField
            label={shared.form.labels.subjectMatterOfTheProceedings}
            id="subject-matter-of-the-proceedings"
            name="subjectMatterOfTheProceedings"
            required
            defaultValue={verfahrensgegenstand}
          />
        </section>
      </div>
    </div>
  );
}
