import InputField from "~/components/InputField";
import VerfahrenGerichteSelect, {
  type GerichtSelectItem,
} from "~/components/verfahren/VerfahrenGerichteSelect";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

type VerfahrenDetailsFormSectionProps = {
  kurzrubrum: string;
  claimReference: string;
  verfahrensgegenstand: string;
  courtId: string;
  gerichte: GerichtSelectItem[];
};

export default function VerfahrenDetailsFormSection({
  kurzrubrum,
  claimReference,
  verfahrensgegenstand,
  courtId,
  gerichte,
}: Readonly<VerfahrenDetailsFormSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <FieldsetCard
      title={routes.verfahrenNeu.step2.form.verfahrenDetails.title}
      TitleComponent="h3"
    >
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
          label={shared.form.labels.empfaengergericht}
          className="flex-1 self-end"
          placeholder={shared.form.select.placeholder}
          gerichte={gerichte}
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
    </FieldsetCard>
  );
}
