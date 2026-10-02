// @vitest-environment jsdom

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub, type ActionFunctionArgs } from "react-router";
import { getTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it, vi } from "vitest";
import { TranslationsProvider } from "~/services/translations/context";
import { actionError } from "~/utils/actionResult";
import type { EinreichungDetails } from "../VerfahrenDraftKlageeinreichungSection";
import VerfahrenWeitereEinreichungArtStep, {
  CREATE_EINREICHUNG_FORM_TYPE,
} from "../VerfahrenWeitereEinreichungArtStep";

// Only the name is read by the Art step.
const draftWeitereEinreichung = {
  einreichung: { id: "e-2", name: "Schriftsatz", status: "ERSTELLT" },
  dokumente: [],
  beleg: null,
} as unknown as EinreichungDetails;

const createFailedMessage = "Die Einreichung konnte nicht erstellt werden.";

function renderArtStep(
  draft: EinreichungDetails | null,
  respond: () => unknown = () => null,
) {
  const submittedForms: FormData[] = [];
  const action = vi.fn(async ({ request }: ActionFunctionArgs) => {
    submittedForms.push(await request.formData());
    return respond();
  });

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <TranslationsProvider value={getTestTranslations()}>
          <VerfahrenWeitereEinreichungArtStep draftWeitereEinreichung={draft} />
        </TranslationsProvider>
      ),
      action,
    },
  ]);

  render(<Stub />);

  return { action, submittedForms };
}

const artLabel = "Art der Einreichung";

describe("VerfahrenWeitereEinreichungArtStep", () => {
  it("creates the Einreichung as soon as an Art is picked", async () => {
    const { submittedForms } = renderArtStep(null);

    await userEvent.selectOptions(screen.getByLabelText(artLabel), "Replik");

    await waitFor(() => expect(submittedForms).toHaveLength(1));
    expect(submittedForms[0].get("formType")).toBe(
      CREATE_EINREICHUNG_FORM_TYPE,
    );
    expect(submittedForms[0].get("art")).toBe("Replik");
  });

  it("fixes the Art once the draft exists", async () => {
    const { action } = renderArtStep(draftWeitereEinreichung);

    const artSelect = screen.getByLabelText(artLabel);
    expect(artSelect).toHaveAttribute("aria-disabled", "true");
    expect(artSelect).toHaveValue("Schriftsatz");

    // aria-disabled keeps the select interactive, so the change handler is
    // what has to stop a second Einreichung from being created.
    await userEvent.selectOptions(artSelect, "Replik");

    expect(artSelect).toHaveValue("Schriftsatz");
    expect(action).not.toHaveBeenCalled();
  });

  it("locks the picked Art while the Einreichung is being created", async () => {
    // Never settles, so the submission stays in flight.
    const { action } = renderArtStep(null, () => new Promise(() => {}));
    const artSelect = screen.getByLabelText(artLabel);

    await userEvent.selectOptions(artSelect, "Replik");

    await waitFor(() =>
      expect(artSelect).toHaveAttribute("aria-disabled", "true"),
    );
    expect(artSelect).toHaveValue("Replik");

    await userEvent.selectOptions(artSelect, "Duplik");

    expect(artSelect).toHaveValue("Replik");
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("shows the error and lets the same Art be picked again when creating fails", async () => {
    const { submittedForms } = renderArtStep(null, () =>
      actionError(createFailedMessage, {
        data: { formType: CREATE_EINREICHUNG_FORM_TYPE },
      }),
    );
    const artSelect = screen.getByLabelText(artLabel);

    await userEvent.selectOptions(artSelect, "Replik");

    expect(await screen.findByText(createFailedMessage)).toBeInTheDocument();
    expect(artSelect).toHaveValue("");
    expect(artSelect).not.toHaveAttribute("aria-disabled", "true");

    await userEvent.selectOptions(artSelect, "Replik");

    await waitFor(() => expect(submittedForms).toHaveLength(2));
    expect(submittedForms[1].get("art")).toBe("Replik");
  });
});
