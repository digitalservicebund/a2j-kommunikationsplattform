// @vitest-environment jsdom

import { fireEvent, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { makeDokument } from "~tests/utils/factories/dokument";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import VerfahrenDokumentSichtbarkeitForm from "../VerfahrenDokumentSichtbarkeitForm";

const verfahrenId = "11111111-1111-1111-1111-111111111111";

function renderForm({
  disabled = false,
  actionResult = { status: "success", data: { formType: "sichtbarkeit" } },
}: { disabled?: boolean; actionResult?: unknown } = {}) {
  const submissions: Record<string, FormDataEntryValue>[] = [];
  const Stub = createRoutesStub([
    {
      path: "/verfahren/neu/dokumente",
      Component: () => (
        <VerfahrenDokumentSichtbarkeitForm
          dokument={makeDokument({
            id: "dok-1",
            anzeigename: "a.pdf",
            sichtbarkeitAlle: true,
          })}
          verfahrenId={verfahrenId}
          einreichungId="einreichung-1"
          disabled={disabled}
        />
      ),
      action: vi.fn(async ({ request }: { request: Request }) => {
        submissions.push(Object.fromEntries(await request.formData()));
        return actionResult;
      }),
    },
  ]);

  return {
    ...renderWithTestTranslations(
      <Stub
        initialEntries={[`/verfahren/neu/dokumente?verfahren=${verfahrenId}`]}
      />,
    ),
    submissions,
  };
}

describe("VerfahrenDokumentSichtbarkeitForm", () => {
  it("shows the Dokument's current Sichtbarkeit", async () => {
    const { findByLabelText } = renderForm();

    expect(await findByLabelText("Sichtbarkeit von a.pdf")).toHaveValue("true");
  });

  it("saves a changed Sichtbarkeit right away", async () => {
    const { findByLabelText, submissions } = renderForm();

    fireEvent.change(await findByLabelText("Sichtbarkeit von a.pdf"), {
      target: { value: "false" },
    });

    await waitFor(() =>
      expect(submissions).toEqual([
        {
          formType: "sichtbarkeit",
          einreichungId: "einreichung-1",
          dokumentId: "dok-1",
          sichtbarkeitAlle: "false",
        },
      ]),
    );
  });

  it("shows the error of a failed change", async () => {
    const { findByLabelText, findByText } = renderForm({
      actionResult: {
        status: "error",
        error: "Die Sichtbarkeit konnte nicht geändert werden.",
      },
    });

    fireEvent.change(await findByLabelText("Sichtbarkeit von a.pdf"), {
      target: { value: "false" },
    });

    expect(
      await findByText("Die Sichtbarkeit konnte nicht geändert werden."),
    ).toBeInTheDocument();
  });

  it("ignores changes while disabled", async () => {
    const { findByLabelText, submissions } = renderForm({ disabled: true });

    const select = await findByLabelText("Sichtbarkeit von a.pdf");
    expect(select).toHaveAttribute("aria-disabled", "true");

    fireEvent.change(select, { target: { value: "false" } });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(submissions).toEqual([]);
  });
});
