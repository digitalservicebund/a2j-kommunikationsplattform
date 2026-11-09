// @vitest-environment jsdom

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { TranslationsProvider } from "~/services/translations/context";
import { actionError } from "~/utils/actionResult";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

const t = getTestTranslations();

// jsdom doesn't implement the modal methods of <dialog>
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
  };
});

function renderDialog(action: (formData: FormData) => unknown) {
  const router = createMemoryRouter([
    {
      path: "/",
      action: async ({ request }) => action(await request.formData()),
      element: (
        <TranslationsProvider value={t}>
          <ConfirmDeleteDialog
            formType="delete-thing"
            fields={{ thingId: "t-1" }}
            title="Ding löschen?"
            message="Das Ding wird endgültig gelöscht."
          />
        </TranslationsProvider>
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
}

function getDialog() {
  return screen.getByRole("dialog", { hidden: true });
}

describe("ConfirmDeleteDialog", () => {
  it("opens a dialog asking for confirmation", async () => {
    renderDialog(vi.fn());

    expect(getDialog()).not.toHaveAttribute("open");

    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.open }),
    );

    const dialog = screen.getByRole("dialog", { name: "Ding löschen?" });
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveTextContent("Das Ding wird endgültig gelöscht.");
  });

  it("closes the dialog without submitting when cancelled", async () => {
    const action = vi.fn();
    renderDialog(action);

    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.open }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: t.shared.cancel }),
    );

    expect(getDialog()).not.toHaveAttribute("open");
    expect(action).not.toHaveBeenCalled();
  });

  it("submits the formType and fields once confirmed", async () => {
    const action = vi.fn().mockReturnValue(null);
    renderDialog(action);

    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.open }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.confirm }),
    );

    await waitFor(() => expect(action).toHaveBeenCalled());
    const formData: FormData = action.mock.calls[0][0];
    expect(formData.get("formType")).toBe("delete-thing");
    expect(formData.get("thingId")).toBe("t-1");
  });

  it("shows the action's error for its formType", async () => {
    renderDialog(() =>
      actionError("Löschen fehlgeschlagen.", {
        data: { formType: "delete-thing" },
      }),
    );

    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.open }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.confirm }),
    );

    expect(
      await screen.findByText("Löschen fehlgeschlagen."),
    ).toBeInTheDocument();
  });

  it("ignores errors of other forms", async () => {
    renderDialog(() =>
      actionError("Anderer Fehler.", { data: { formType: "upload" } }),
    );

    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.open }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: t.shared.form.confirmDelete.confirm }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: t.shared.form.confirmDelete.confirm,
        }),
      ).toBeEnabled(),
    );
    expect(screen.queryByText("Anderer Fehler.")).not.toBeInTheDocument();
  });
});
