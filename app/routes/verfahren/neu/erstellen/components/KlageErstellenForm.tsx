import { Form, Link } from "react-router";
import InputSelect from "~/components/InputSelect";
import InputText from "~/components/InputText";
import { mockGerichte } from "../../../../../../mocks/api/data/mockGerichte";

const gegenstande = [
  { id: "1", wert: "Arbeitsrecht" },
  { id: "2", wert: "Familienrecht" },
  { id: "3", wert: "Mietrecht" },
  { id: "4", wert: "Verkehrsrecht" },
  { id: "5", wert: "Strafrecht" },
];

export function KlageErstellenForm() {
  const isSubmitting = false; // Placeholder for actual submission state
  return (
    <div className="border-kern-layout-border gap-y-kern-space-default flex flex-col rounded-lg border p-8">
      <h2 className="kern-heading-small">Verfahrensbeteiligte & Details</h2>
      <Form method="post" className="gap-y-kern-space-default flex flex-col">
        <h4 className="kern-title kern-title--small">
          Einreichende Person / Partei
        </h4>
        <InputText
          label="Absender:in"
          id="absender"
          placeholder="Kim Neumann"
        />
        <h4 className="kern-title kern-title--small">
          Das Geschäftszeichen der / des klägerischen Prozessbevollmächtigten
        </h4>
        <InputText
          label="Geschäftszeichen des Prozessbevollmächtigten"
          id="geschaeftszeichen"
          placeholder="2602/34ZO12"
        />
        <h4 className="kern-title kern-title--small">
          Die Bezeichnung des Gerichts
        </h4>
        <InputSelect
          label="Empfängergericht"
          id="Empfängergericht"
          options={mockGerichte.map((gericht) => ({
            value: gericht.id,
            label: gericht.wert,
          }))}
          selectedValue={mockGerichte[0].id}
        />
        <h4 className="kern-title kern-title--small">
          Angabe des Verfahrensgegenstandes
        </h4>
        <InputSelect
          label="Verfahrensgegenstand"
          id="Verfahrensgegenstand"
          options={gegenstande.map((gegenstand) => ({
            value: gegenstand.id,
            label: gegenstand.wert,
          }))}
          selectedValue=""
          placeholder="Auswahl des Gegenstands"
        />
        <div className="gap-kern-space-default flex flex-wrap">
          <Link to="/verfahren/neu" className="kern-btn kern-btn--secondary">
            <span className="kern-label">Zurück</span>
          </Link>
          <button
            type="submit"
            className="kern-btn kern-btn--primary"
            disabled={isSubmitting}
          >
            <span className="kern-label">
              {isSubmitting ? "Wird hochgeladen…" : "Weiter zur Überprüfung"}
            </span>
          </button>
        </div>
      </Form>
    </div>
  );
}
