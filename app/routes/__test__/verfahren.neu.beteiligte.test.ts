import type { ActionFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeGericht } from "~tests/utils/factories/gericht";
import { makeVerfahren } from "~tests/utils/factories/verfahren";

const mocks = vi.hoisted(() => ({
  fetchVerfahrenById: vi.fn(),
  updateVerfahren: vi.fn(),
  regenerateEinreichungXJustiz: vi.fn(),
}));

const { codeListFetcher } = vi.hoisted(() => ({
  codeListFetcher: (code: string) => async () => ({
    elemente: [{ id: `id-${code}`, wert: code, code }],
  }),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server",
  () => ({
    fetchKanzleiformen: vi.fn(),
    fetchStaaten: codeListFetcher("000"),
    fetchAnschriftstypen: codeListFetcher("017"),
    fetchTelekommunikationsarten: async () => ({
      elemente: [
        { id: "id-001", wert: "E-Mail", code: "001" },
        { id: "id-004", wert: "Mobil", code: "004" },
      ],
    }),
    fetchRollenbezeichnungen: async () => ({
      elemente: [
        { id: "id-101", wert: "Klägerin", code: "101" },
        { id: "id-028", wert: "Beklagte", code: "028" },
        { id: "id-132", wert: "Prozessbevollmächtigte", code: "132" },
      ],
    }),
  }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server",
  () => ({
    fetchVerfahrenById: mocks.fetchVerfahrenById,
    updateVerfahren: mocks.updateVerfahren,
  }),
);
vi.mock(
  "~/domains/verfahren/application/regenerateEinreichungXJustiz.server",
  () => ({ default: mocks.regenerateEinreichungXJustiz }),
);
vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { action } from "../verfahren.neu.beteiligte";

const authSession = makeAuthSession();

describe("/verfahren/neu/beteiligte action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the Verfahrensdetails saved in the previous step", async () => {
    const gericht = makeGericht();
    mocks.fetchVerfahrenById.mockResolvedValue(
      makeVerfahren({
        id: "verfahren-1",
        gericht,
        kurzrubrum: "Müller ./. Weber",
        verfahrensgegenstand: "Zahlungsklage",
      }),
    );

    const formData = new FormData();
    formData.set("formType", "submit");
    formData.set("einreichungId", "einreichung-1");
    formData.set("klagendeParteiNachname", "Müller");
    formData.set("beklagteParteiNachname", "Weber");

    const response = await action({
      request: new Request("http://localhost:3000/?verfahren=verfahren-1", {
        method: "POST",
        body: formData,
      }),
      params: {},
      context: { get: () => authSession, set: () => {} },
    } as unknown as ActionFunctionArgs);

    expect(mocks.updateVerfahren).toHaveBeenCalledWith(
      authSession,
      "verfahren-1",
      expect.objectContaining({
        verfahrensgegenstand: "Zahlungsklage",
        kurzrubrum: "Müller ./. Weber",
        gericht_id: gericht.id,
        beteiligungen: expect.any(Array),
      }),
    );
    expect(response).toBeInstanceOf(Response);
    expect((response as Response).headers.get("Location")).toBe(
      "/verfahren/verfahren-1",
    );
  });
});
