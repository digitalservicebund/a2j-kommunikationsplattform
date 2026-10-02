// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { getTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import { TranslationsProvider } from "~/services/translations/context";
import { actionInvalid } from "~/utils/actionResult";
import VerfahrenWeitereDokumentUploadForm, {
  UPLOAD_WEITERE_DOKUMENT_FORM_TYPE,
} from "../VerfahrenWeitereDokumentUploadForm";

// The form is multipart, which jsdom can't turn into a request for the route
// action — so these tests check the form's values and seed the action's result
// instead of submitting.
function renderUploadForm(actionData?: unknown) {
  const Stub = createRoutesStub([
    {
      id: "verfahren",
      path: "/",
      Component: () => (
        <TranslationsProvider value={getTestTranslations()}>
          <VerfahrenWeitereDokumentUploadForm einreichungId="e-2" />
        </TranslationsProvider>
      ),
      action: vi.fn(),
    },
  ]);

  return render(
    <Stub
      hydrationData={
        actionData ? { actionData: { verfahren: actionData } } : undefined
      }
    />,
  );
}

const typeLabel = "Dateityp";

describe("VerfahrenWeitereDokumentUploadForm", () => {
  it("submits the chosen Dateityp with the upload", async () => {
    renderUploadForm();
    const typeSelect = screen.getByLabelText(typeLabel);

    await userEvent.selectOptions(typeSelect, "ANHANG");

    expect(typeSelect.closest("form")).toHaveFormValues({
      formType: UPLOAD_WEITERE_DOKUMENT_FORM_TYPE,
      einreichungId: "e-2",
      type: "ANHANG",
    });
  });

  it("shows the Dateityp error when no Dateityp was chosen", () => {
    renderUploadForm(
      actionInvalid(
        { type: ["Invalid option"] },
        { data: { formType: UPLOAD_WEITERE_DOKUMENT_FORM_TYPE } },
      ),
    );

    expect(
      screen.getByText(
        getTestTranslations().shared.form.selectDokumentType.error,
      ),
    ).toBeInTheDocument();
  });
});
