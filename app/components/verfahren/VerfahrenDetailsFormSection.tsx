import InputField from "~/components/InputField";
import VerfahrenGerichteSelect, {
  type GerichtSelectItem,
} from "~/components/verfahren/VerfahrenGerichteSelect";
import { useTranslations } from "~/services/translations/context";
import FieldsetCard from "../FieldsetCard";

type VerfahrenDetailsFormSectionProps = {
  kurzrubrum: string;
  verfahrensgegenstand: string;
  // The Empfängergericht is fixed once chosen, so it is shown but not editable
  gericht: GerichtSelectItem | null;
  errors?: Record<string, string[]>;
};

export default function VerfahrenDetailsFormSection({
  kurzrubrum,
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
      <VerfahrenGerichteSelect
        id="claim-court"
        label={shared.form.labels.empfaengergericht}
        gerichte={gericht ? [gericht] : []}
        initialSelectedValue={gericht?.id ?? ""}
        disabled
      />
      <InputField
        label={shared.form.labels.rubrum}
        id="claim-rubrum"
        name="claimRubrum"
        defaultValue={kurzrubrum}
        errors={errors}
      />
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
