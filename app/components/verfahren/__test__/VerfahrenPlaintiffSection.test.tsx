// @vitest-environment jsdom

import userEvent from "@testing-library/user-event";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import VerfahrenPlaintiffSection from "../VerfahrenPlaintiffSection";

describe("VerfahrenPlaintiffSection", () => {
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
  };

  it("renders the plaintiff name fields and hides the lawyer sub-form by default", () => {
    const { getByText, getByLabelText, queryByLabelText } =
      renderWithTestTranslations(<VerfahrenPlaintiffSection {...baseProps} />);

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
      <VerfahrenPlaintiffSection
        {...baseProps}
        hasLawyer
        lawyerName="Kanzlei Böhm"
      />,
    );

    expect(getByText("Angaben zum Anwalt")).toBeInTheDocument();
  });

  it("calls onHasLawyerChange when the checkbox is toggled", async () => {
    const user = userEvent.setup();
    const onHasLawyerChange = vi.fn();

    const { getByLabelText } = renderWithTestTranslations(
      <VerfahrenPlaintiffSection
        {...baseProps}
        onHasLawyerChange={onHasLawyerChange}
      />,
    );

    await user.click(getByLabelText("Anwaltliche Vertretung ist vorhanden"));

    expect(onHasLawyerChange).toHaveBeenCalledWith(true);
  });
});
