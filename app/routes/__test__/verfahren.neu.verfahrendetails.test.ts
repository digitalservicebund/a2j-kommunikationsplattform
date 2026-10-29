import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import {
  makeNatuerlichePersonBeteiligung,
  makeRAKanzleiBeteiligung,
} from "~tests/utils/factories/beteiligung";
import { makeDokument } from "~tests/utils/factories/dokument";
import { makeGericht } from "~tests/utils/factories/gericht";
import { makeVerfahren } from "~tests/utils/factories/verfahren";

const mocks = vi.hoisted(() => ({
  fetchVerfahrenById: vi.fn(),
  updateVerfahren: vi.fn(),
  loadVerfahrenEinreichungBundle: vi.fn(),
  fetchLatestBelegForEinreichung: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server",
  () => ({
    fetchVerfahrenById: mocks.fetchVerfahrenById,
    updateVerfahren: mocks.updateVerfahren,
  }),
);
vi.mock(
  "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server",
  () => ({ default: mocks.loadVerfahrenEinreichungBundle }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/belegRepository.server",
  () => ({
    fetchLatestBelegForEinreichung: mocks.fetchLatestBelegForEinreichung,
  }),
);
vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { action, loader } from "../verfahren.neu.verfahrendetails";

const authSession = makeAuthSession();
const context = { get: () => authSession, set: () => {} };
const BASE_URL = "http://localhost:3000/verfahren/neu/verfahrendetails";

function callLoader(search: string) {
  return loader({
    request: new Request(`${BASE_URL}${search}`),
    params: {},
    context,
  } as unknown as LoaderFunctionArgs);
}

async function catchThrown(promise: Promise<unknown>) {
  return promise.then(
    () => {
      throw new Error("expected loader to throw");
    },
    (error: unknown) => error,
  );
}

function expectRedirect(response: unknown, location: string) {
  expect(response).toBeInstanceOf(Response);
  expect((response as Response).headers.get("Location")).toBe(location);
}

function mockDraft(dokumente: ReturnType<typeof makeDokument>[]) {
  const verfahren = makeVerfahren({
    id: "11111111-1111-1111-1111-111111111111",
  });
  mocks.loadVerfahrenEinreichungBundle.mockResolvedValue({
    verfahren,
    einreichung: { id: "einreichung-1", name: "Klageeinreichung" },
    dokumente,
  });
  mocks.fetchLatestBelegForEinreichung.mockResolvedValue(undefined);
  return verfahren;
}

describe("/verfahren/neu/verfahrendetails", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("loader", () => {
    it("redirects to the court selection without a Verfahren", async () => {
      expectRedirect(
        await catchThrown(callLoader("")),
        "/verfahren/neu/gericht-auswahl",
      );
    });

    it("redirects to the Dokumente step without a Klageschrift", async () => {
      mockDraft([makeDokument({ typ: "ANHANG" })]);

      expectRedirect(
        await catchThrown(
          callLoader("?verfahren=11111111-1111-1111-1111-111111111111"),
        ),
        "/verfahren/neu/dokumente?verfahren=11111111-1111-1111-1111-111111111111",
      );
    });

    it("returns the Verfahren once a Klageschrift exists", async () => {
      const verfahren = mockDraft([makeDokument({ typ: "SCHRIFTSTUECK" })]);

      expect(
        await callLoader("?verfahren=11111111-1111-1111-1111-111111111111"),
      ).toEqual({
        verfahren,
      });
    });
  });

  describe("action", () => {
    it("saves the Verfahrensdetails with the court of the Verfahren", async () => {
      const gericht = makeGericht();
      mocks.fetchVerfahrenById.mockResolvedValue(
        makeVerfahren({
          id: "11111111-1111-1111-1111-111111111111",
          gericht,
          beteiligungen: null,
        }),
      );
      const formData = new FormData();
      formData.set("subjectMatterOfTheProceedings", "Zahlungsklage");
      formData.set("claimRubrum", "Müller ./. Weber");
      formData.set("claim-court", "manipulated");

      const response = await action({
        request: new Request(
          `${BASE_URL}?verfahren=11111111-1111-1111-1111-111111111111`,
          {
            method: "POST",
            body: formData,
          },
        ),
        params: {},
        context,
      } as unknown as ActionFunctionArgs);

      expect(mocks.updateVerfahren).toHaveBeenCalledWith(
        authSession,
        "11111111-1111-1111-1111-111111111111",
        {
          verfahrensgegenstand: "Zahlungsklage",
          kurzrubrum: "Müller ./. Weber",
          gericht_id: gericht.id,
          beteiligungen: null,
        },
      );
      expectRedirect(
        response,
        "/verfahren/neu/beteiligte?verfahren=11111111-1111-1111-1111-111111111111",
      );
    });

    it("resends the existing Beteiligungen unchanged", async () => {
      const person = makeNatuerlichePersonBeteiligung({ nachname: "Müller" });
      mocks.fetchVerfahrenById.mockResolvedValue(
        makeVerfahren({
          id: "11111111-1111-1111-1111-111111111111",
          beteiligungen: [person],
        }),
      );
      const formData = new FormData();
      formData.set("subjectMatterOfTheProceedings", "Zahlungsklage");

      await action({
        request: new Request(
          `${BASE_URL}?verfahren=11111111-1111-1111-1111-111111111111`,
          {
            method: "POST",
            body: formData,
          },
        ),
        params: {},
        context,
      } as unknown as ActionFunctionArgs);

      expect(mocks.updateVerfahren).toHaveBeenCalledWith(
        authSession,
        "11111111-1111-1111-1111-111111111111",
        expect.objectContaining({
          beteiligungen: [
            expect.objectContaining({
              beteiligtenart: "natuerlichePerson",
              nachname: "Müller",
              rollen: [
                expect.objectContaining({
                  rollenbezeichnung_id: person.rollen[0]?.rollenbezeichnung.id,
                }),
              ],
            }),
          ],
        }),
      );
    });

    it("reports stored data the update rejects as a general error", async () => {
      mocks.fetchVerfahrenById.mockResolvedValue(
        makeVerfahren({
          id: "11111111-1111-1111-1111-111111111111",
          // the update requires a Kanzlei name
          beteiligungen: [makeRAKanzleiBeteiligung({ bezeichnung: "" })],
        }),
      );
      const formData = new FormData();
      formData.set("subjectMatterOfTheProceedings", "Zahlungsklage");

      const result = await action({
        request: new Request(
          `${BASE_URL}?verfahren=11111111-1111-1111-1111-111111111111`,
          {
            method: "POST",
            body: formData,
          },
        ),
        params: {},
        context,
      } as unknown as ActionFunctionArgs);

      expect(result).toMatchObject({
        data: {
          status: "error",
          error: "Die Änderungen konnten nicht gespeichert werden.",
        },
      });
      expect(mocks.updateVerfahren).not.toHaveBeenCalled();
    });

    it("requires a Verfahrensgegenstand", async () => {
      const formData = new FormData();
      formData.set("subjectMatterOfTheProceedings", "");

      const result = await action({
        request: new Request(
          `${BASE_URL}?verfahren=11111111-1111-1111-1111-111111111111`,
          {
            method: "POST",
            body: formData,
          },
        ),
        params: {},
        context,
      } as unknown as ActionFunctionArgs);

      expect(result).toMatchObject({
        data: {
          status: "invalid",
          fieldErrors: { subjectMatterOfTheProceedings: [expect.any(String)] },
        },
      });
      expect(mocks.updateVerfahren).not.toHaveBeenCalled();
    });
  });
});
