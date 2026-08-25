// @vitest-environment jsdom

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import de from "~/services/translations/de";
import VerfahrenBelegStatusAlert from "../VerfahrenBelegStatusAlert";

const { pending, ready } = de.routes.verfahrenNeu.step3.belegStatus;

function renderAlert(
  beleg: Parameters<typeof VerfahrenBelegStatusAlert>[0]["beleg"],
  action = vi.fn(),
) {
  const Stub = createRoutesStub([
    {
      path: "/verfahren/:id/details",
      Component: () => <VerfahrenBelegStatusAlert beleg={beleg} />,
      action,
    },
    {
      path: "/verfahren/:id",
      Component: () => <div>Verfahrensübersicht-Seite</div>,
    },
  ]);

  return render(<Stub initialEntries={["/verfahren/v-1/details"]} />);
}

describe("VerfahrenBelegStatusAlert", () => {
  it("shows the pending state without any action buttons", () => {
    renderAlert({
      id: "b-1",
      status: "IN_BEARBEITUNG",
      erstellt_am: "2026-08-24T15:18:20.000Z",
      typ: null,
      dateiname: null,
      content_type: null,
    });

    expect(screen.getByText(pending.headline)).toBeInTheDocument();
    expect(screen.getByText(pending.copy)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows the ready state with download and overview buttons", () => {
    renderAlert({
      id: "b-1",
      status: "ERSTELLT",
      erstellt_am: "2026-08-24T15:18:20.000Z",
      typ: "NACHWEIS",
      dateiname: "beleg.pdf",
      content_type: "application/pdf",
    });

    expect(screen.getByText(ready.headline)).toBeInTheDocument();
    expect(screen.getByText(ready.copy)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: ready.buttonLabelDownloadConfirmation,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: ready.buttonLabelToVerfahrenOverview,
      }),
    ).toBeInTheDocument();
  });

  describe("downloading the Einreichungsbestätigung", () => {
    const beleg = {
      id: "b-1",
      status: "ERSTELLT" as const,
      erstellt_am: "2026-08-24T15:18:20.000Z",
      typ: "NACHWEIS" as const,
      dateiname: "beleg.pdf",
      content_type: "application/pdf",
    };

    beforeEach(() => {
      vi.stubGlobal("location", { href: "" });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("submits belegId to the route action and navigates to the returned downloadUrl", async () => {
      const downloadUrl = "https://s3.example.com/beleg.pdf";
      const action = vi.fn(async ({ request }: { request: Request }) => {
        const formData = await request.formData();

        expect(formData.get("formType")).toBe("download-beleg");
        expect(formData.get("belegId")).toBe("b-1");

        return { downloadUrl };
      });

      renderAlert(beleg, action);

      await userEvent.click(
        screen.getByRole("button", {
          name: ready.buttonLabelDownloadConfirmation,
        }),
      );

      await waitFor(() => {
        expect(globalThis.location.href).toBe(downloadUrl);
      });
      expect(action).toHaveBeenCalledTimes(1);
    });
  });

  it("navigates to the Verfahren overview page when clicking the second button", async () => {
    renderAlert({
      id: "b-1",
      status: "ERSTELLT",
      erstellt_am: "2026-08-24T15:18:20.000Z",
      typ: "NACHWEIS",
      dateiname: "beleg.pdf",
      content_type: "application/pdf",
    });

    await userEvent.click(
      screen.getByRole("button", {
        name: ready.buttonLabelToVerfahrenOverview,
      }),
    );

    expect(
      await screen.findByText("Verfahrensübersicht-Seite"),
    ).toBeInTheDocument();
  });
});
