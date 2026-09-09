// @vitest-environment jsdom

import userEvent from "@testing-library/user-event";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import VerfahrenKlaegerSection from "../VerfahrenKlaegerSection";

describe("VerfahrenKlaegerSection", () => {
  const baseProps = {
    firstName: "Emilia",
    lastName: "Kühn",
    anschrift: undefined,
    email: "",
    telefon: "",
    hasLawyer: false,
    onHasLawyerChange: vi.fn(),
    lawyerName: "",
    lawyerAnschrift: undefined,
    lawyerEmail: "",
    lawyerTelefon: "",
    lawyerKanzleiformId: "",
    kanzleiformenPromise: Promise.resolve([]),
    errors: {},
  };

  it("renders the plaintiff name fields and hides the lawyer sub-form by default", () => {
    const { getByText, getByLabelText, queryByLabelText } =
      renderWithTestTranslations(<VerfahrenKlaegerSection {...baseProps} />);

    expect(getByText("Klagende Partei")).toBeInTheDocument();
    expect((getByLabelText("Vorname") as HTMLInputElement).value).toBe(
      "Emilia",
    );
    expect((getByLabelText("Nachname") as HTMLInputElement).value).toBe("Kühn");
    expect(
      queryByLabelText("Art der anwaltlichen Vertretung"),
    ).not.toBeInTheDocument();
  });

  it("shows the lawyer sub-form when hasLawyer is true", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenKlaegerSection
        {...baseProps}
        hasLawyer
        lawyerName="Kanzlei Böhm"
      />,
    );

    expect(getByText("Angaben zum Anwalt")).toBeInTheDocument();
  });

  it("shows a validation error on the lawyer name field", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenKlaegerSection
        {...baseProps}
        hasLawyer
        errors={{
          lawyerName: ["Bitte geben Sie den Namen der Kanzlei an."],
        }}
      />,
    );

    expect(
      getByText("Bitte geben Sie den Namen der Kanzlei an."),
    ).toBeInTheDocument();
  });

  it("shows a validation error on the Kanzleiform select", () => {
    const { getByText } = renderWithTestTranslations(
      <VerfahrenKlaegerSection
        {...baseProps}
        hasLawyer
        lawyerName="Kanzlei Böhm"
        errors={{
          lawyerKanzleiformId: ["Bitte wählen Sie die Kanzleiform aus."],
        }}
      />,
    );

    expect(
      getByText("Bitte wählen Sie die Kanzleiform aus."),
    ).toBeInTheDocument();
  });

  it("calls onHasLawyerChange when the checkbox is toggled", async () => {
    const user = userEvent.setup();
    const onHasLawyerChange = vi.fn();

    const { getByLabelText } = renderWithTestTranslations(
      <VerfahrenKlaegerSection
        {...baseProps}
        onHasLawyerChange={onHasLawyerChange}
      />,
    );

    await user.click(getByLabelText("Anwaltliche Vertretung ist vorhanden"));

    expect(onHasLawyerChange).toHaveBeenCalledWith(true);
  });
});
