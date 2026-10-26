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
  // The Empfängergericht is fixed once chosen, so it is shown but not editable
  gericht: GerichtSelectItem | null;
  errors?: Record<string, string[]>;
};

export default function VerfahrenDetailsFormSection({
  kurzrubrum,
  claimReference,
  verfahrensgegenstand,
  gericht,
  errors,
}: Readonly<VerfahrenDetailsFormSectionProps>) {
  const { routes, shared } = useTranslations();

  return (
    <FieldsetCard
      title={routes.verfahrenNeu.verfahrendetails.subline}
      TitleComponent="h3"
    >
      <InputField
        label={shared.form.labels.rubrum}
        id="claim-rubrum"
        name="claimRubrum"
        defaultValue={kurzrubrum}
        errors={errors}
      />

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1 self-end"
          label={shared.form.labels.geschaeftszeichenProzessbevollmaechtigte}
          id="claim-reference"
          name="claimReference"
          defaultValue={claimReference}
        />

        <VerfahrenGerichteSelect
          id="claim-court"
          label={shared.form.labels.empfaengergericht}
          className="flex-1 self-end"
          gerichte={gericht ? [gericht] : []}
          initialSelectedValue={gericht?.id ?? ""}
          disabled
        />
      </div>

      <InputField
        label={shared.form.labels.subjectMatterOfTheProceedings}
        id="subject-matter-of-the-proceedings"
        name="subjectMatterOfTheProceedings"
        required
        defaultValue={verfahrensgegenstand}
        errors={errors}
      />
    </FieldsetCard>
  );
}
