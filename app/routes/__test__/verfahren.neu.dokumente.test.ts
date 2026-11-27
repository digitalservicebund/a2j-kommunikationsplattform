import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import {
  handleDokumentDelete,
  handleDokumentSichtbarkeit,
  handleDokumentUpload,
} from "~/domains/verfahren/application/einreichungDokumentActions.server";
import loadVerfahrenEinreichungBundle from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { fetchLatestBelegForEinreichung } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import {
  fetchDokumentValidierungsstatus,
  uploadDokumentWithSignaturdatei,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { createEinreichung } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import {
  fetchGerichte,
  fetchKanzleiformen,
  fetchRollenbezeichnungen,
} from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import { createVerfahren } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import resolveCodeWertId from "~/domains/verfahren/services/resolveCodeWertId";
import { ApiError } from "~/utils/apiError";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeBeleg } from "~tests/utils/factories/beleg";
import { makeDokument } from "~tests/utils/factories/dokument";
import {
  makeEinreichung,
  makeEinreichungWithValidierungsstatusDetails,
} from "~tests/utils/factories/einreichung";
import { makeGericht } from "~tests/utils/factories/gericht";
import { makeEinzelanwaltKanzleiform } from "~tests/utils/factories/kanzleiform";
import {
  makeBeklagteRollenbezeichnung,
  makeKlaegerinRollenbezeichnung,
  makeProzessbevollmaechtigteRollenbezeichnung,
} from "~tests/utils/factories/rolle";
import { makeValidierungsstatus } from "~tests/utils/factories/validierungsstatus";
import { makeVerfahren } from "~tests/utils/factories/verfahren";
import { action, loader } from "../verfahren.neu.dokumente";

vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/einreichungRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/dokumentRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/belegRepository.server"),
);
// The Dokumente of an existing Einreichung are handled by the shared actions
// (tested on their own); only the delegation is tested here. The rest of the
// module (e.g. its input schemas) is kept, as automocking would break it.
vi.mock(
  import("~/domains/verfahren/application/einreichungDokumentActions.server"),
  async (importOriginal) => ({
    ...(await importOriginal()),
    handleDokumentUpload: vi.fn(),
    handleDokumentDelete: vi.fn(),
    handleDokumentSichtbarkeit: vi.fn(),
  }),
);
vi.mock(import("~/middleware/auth.server"), () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

const gericht = makeGericht();
const rollenbezeichnungen = [
  makeKlaegerinRollenbezeichnung(),
  makeBeklagteRollenbezeichnung(),
  makeProzessbevollmaechtigteRollenbezeichnung(),
];
const kanzleiformen = [makeEinzelanwaltKanzleiform()];

const authSession = makeAuthSession();
const context = { get: () => authSession, set: () => {} };
const BASE_URL = "http://localhost:3000/verfahren/neu/dokumente";
const VERFAHREN_ID = "11111111-1111-1111-1111-111111111111";
const DOKUMENTE_PATH = `/verfahren/neu/dokumente?verfahren=${VERFAHREN_ID}`;
const SAFE_ID = authSession.authorizedForSafeIds[0];
const NEW_VERFAHREN_SEARCH = `?${new URLSearchParams({ gericht: gericht.id, safeId: SAFE_ID })}`;

const validierungsstatus = makeValidierungsstatus();

function callLoader(search: string) {
  return loader({
    request: new Request(`${BASE_URL}${search}`),
    params: {},
    context,
  } as unknown as LoaderFunctionArgs);
}

function callAction(search: string, entries: Record<string, string | File>) {
  const formData = new FormData();
  Object.entries(entries).forEach(([key, value]) => formData.set(key, value));

  return action({
    request: new Request(`${BASE_URL}${search}`, {
      method: "POST",
      body: formData,
    }),
    params: {},
    context,
  } as unknown as ActionFunctionArgs);
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
  expect((response as Response).status).toBe(302);
  expect((response as Response).headers.get("Location")).toBe(location);
}

function mockDraft(dokumente: ReturnType<typeof makeDokument>[] = []) {
  vi.mocked(loadVerfahrenEinreichungBundle).mockResolvedValue({
    verfahren: makeVerfahren({ id: VERFAHREN_ID }),
    einreichung: makeEinreichungWithValidierungsstatusDetails({
      id: "einreichung-1",
      name: "Klageeinreichung",
      status: "ERSTELLT",
    }),
    dokumente,
    einreichungId: "einreichung-1",
  });
  vi.mocked(fetchLatestBelegForEinreichung).mockResolvedValue(null);
}

const pdfFile = new File(["%PDF-1.7"], "anlage.pdf", {
  type: "application/pdf",
});

describe("/verfahren/neu/dokumente", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(fetchGerichte).mockResolvedValue({
      listeVersion: "1",
      elemente: [gericht],
    });
    vi.mocked(fetchRollenbezeichnungen).mockResolvedValue({
      listeVersion: "1",
      elemente: rollenbezeichnungen,
    });
    vi.mocked(fetchKanzleiformen).mockResolvedValue({
      listeVersion: "1",
      elemente: kanzleiformen,
    });
    vi.mocked(fetchDokumentValidierungsstatus).mockResolvedValue(
      validierungsstatus,
    );
  });

  describe("loader", () => {
    it("redirects to the court selection without params", async () => {
      expectRedirect(await catchThrown(callLoader("")), "/verfahren/neu");
    });

    it("redirects to the court selection for an unknown court", async () => {
      expectRedirect(
        await catchThrown(callLoader("?gericht=unknown")),
        "/verfahren/neu",
      );
    });

    it.each([
      ["without a SAFE-ID", `?gericht=${gericht.id}`],
      [
        "for a SAFE-ID the user isn't authorized for",
        `?${new URLSearchParams({ gericht: gericht.id, safeId: "DE.BRAK.other" })}`,
      ],
    ])("redirects to the court selection %s", async (_, search) => {
      expectRedirect(await catchThrown(callLoader(search)), "/verfahren/neu");
    });

    it("starts without Dokumente for a known court and SAFE-ID", async () => {
      expect(await callLoader(NEW_VERFAHREN_SEARCH)).toEqual({
        verfahrenId: undefined,
        einreichung: undefined,
        dokumente: [],
        uploadFailed: false,
      });
    });

    it.each(["", "../codelisten/gerichte", "abc/einreichungen"])(
      "redirects to the court selection for the malformed Verfahren id %j",
      async (verfahrenId) => {
        expectRedirect(
          await catchThrown(
            callLoader(`?${new URLSearchParams({ verfahren: verfahrenId })}`),
          ),
          "/verfahren/neu",
        );
        expect(loadVerfahrenEinreichungBundle).not.toHaveBeenCalled();
      },
    );

    it("redirects to the court selection for an unknown Verfahren", async () => {
      vi.mocked(loadVerfahrenEinreichungBundle).mockRejectedValue(
        new ApiError("not found", { status: 404 }),
      );

      expectRedirect(
        await catchThrown(
          callLoader("?verfahren=99999999-9999-9999-9999-999999999999"),
        ),
        "/verfahren/neu",
      );
    });

    it("redirects to the Verfahren once it has been submitted", async () => {
      mockDraft();
      vi.mocked(fetchLatestBelegForEinreichung).mockResolvedValue(
        makeBeleg({ id: "beleg" }),
      );

      expectRedirect(
        await catchThrown(callLoader(`?verfahren=${VERFAHREN_ID}`)),
        `/verfahren/${VERFAHREN_ID}`,
      );
    });

    it("returns the uploaded Dokumente with their Validierungsstatus, without the XJustiz", async () => {
      const klageschrift = makeDokument({ id: "klage", typ: "SCHRIFTSTUECK" });
      const signatur = makeDokument({ id: "sig", typ: "SIGNATURDATEI" });
      mockDraft([
        klageschrift,
        makeDokument({ id: "xjustiz", typ: "XJUSTIZ" }),
        signatur,
      ]);

      expect(await callLoader(`?verfahren=${VERFAHREN_ID}`)).toEqual({
        verfahrenId: VERFAHREN_ID,
        einreichung: { id: "einreichung-1", name: "Klageeinreichung" },
        dokumente: [
          { ...klageschrift, validierungsstatus },
          { ...signatur, validierungsstatus },
        ],
        uploadFailed: false,
      });
      // Not fetched for the XJustiz-Dokument, which isn't shown
      expect(fetchDokumentValidierungsstatus).toHaveBeenCalledTimes(2);
    });

    it("flags a failed first upload", async () => {
      mockDraft();

      expect(
        await callLoader(`?verfahren=${VERFAHREN_ID}&uploadFehlgeschlagen`),
      ).toMatchObject({ uploadFailed: true });
    });
  });

  describe("action: first upload", () => {
    it.each(["SCHRIFTSTUECK", "ANHANG"])(
      "creates Verfahren, Einreichung and Dokument on the first %s upload",
      async (typ) => {
        vi.mocked(createVerfahren).mockResolvedValue(
          makeVerfahren({ id: VERFAHREN_ID }),
        );
        vi.mocked(createEinreichung).mockResolvedValue(
          makeEinreichung({ id: "einreichung-1" }),
        );

        const response = await callAction(NEW_VERFAHREN_SEARCH, {
          formType: "upload",
          typ,
          file: pdfFile,
        });

        const expectBeteiligungWithRollenbezeichnung = (
          rollenbezeichnungCode: string,
        ) =>
          expect.objectContaining({
            rollen: expect.arrayContaining([
              expect.objectContaining({
                rollenbezeichnung_id: resolveCodeWertId(
                  rollenbezeichnungen,
                  rollenbezeichnungCode,
                ),
              }),
            ]),
          });

        expect(createVerfahren).toHaveBeenCalledWith(authSession, SAFE_ID, {
          verfahrensgegenstand: "Zahlungsklage",
          kurzrubrum: null,
          gericht_id: gericht.id,
          beteiligungen: expect.arrayContaining([
            expectBeteiligungWithRollenbezeichnung(
              ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
            ),
            expectBeteiligungWithRollenbezeichnung(
              ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
            ),
            expectBeteiligungWithRollenbezeichnung(
              ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
            ),
          ]),
        });

        expect(createEinreichung).toHaveBeenCalledWith(
          authSession,
          VERFAHREN_ID,
          "Klageeinreichung",
        );

        expect(uploadDokumentWithSignaturdatei).toHaveBeenCalledWith(
          authSession,
          {
            verfahrenId: VERFAHREN_ID,
            einreichungId: "einreichung-1",
            file: expect.any(File),
            typ,
            signaturdatei: undefined,
          },
        );
        expectRedirect(response, DOKUMENTE_PATH);
      },
    );

    it("uploads the Signaturdatei along with the first Dokument", async () => {
      vi.mocked(createVerfahren).mockResolvedValue(
        makeVerfahren({ id: VERFAHREN_ID }),
      );
      vi.mocked(createEinreichung).mockResolvedValue(
        makeEinreichung({ id: "einreichung-1" }),
      );

      const response = await callAction(NEW_VERFAHREN_SEARCH, {
        formType: "upload",
        typ: "SCHRIFTSTUECK",
        file: pdfFile,
        signaturdatei: new File(["signature"], "signatur.p7s"),
      });

      expect(uploadDokumentWithSignaturdatei).toHaveBeenCalledWith(
        authSession,
        expect.objectContaining({
          signaturdatei: expect.objectContaining({ name: "signatur.p7s" }),
        }),
      );
      expectRedirect(response, DOKUMENTE_PATH);
    });

    it("continues with the created Verfahren when the first upload fails", async () => {
      vi.mocked(createVerfahren).mockResolvedValue(
        makeVerfahren({ id: VERFAHREN_ID }),
      );
      vi.mocked(createEinreichung).mockResolvedValue(
        makeEinreichung({ id: "einreichung-1" }),
      );
      vi.mocked(uploadDokumentWithSignaturdatei).mockRejectedValue(
        new ApiError("rejected", { status: 422 }),
      );

      const response = await callAction(NEW_VERFAHREN_SEARCH, {
        formType: "upload",
        typ: "ANHANG",
        file: pdfFile,
      });

      expectRedirect(response, `${DOKUMENTE_PATH}&uploadFehlgeschlagen`);
    });

    it("creates nothing more when creating the Verfahren fails", async () => {
      vi.mocked(createVerfahren).mockRejectedValue(
        new ApiError("failed", { status: 500 }),
      );

      const result = await callAction(NEW_VERFAHREN_SEARCH, {
        formType: "upload",
        typ: "ANHANG",
        file: pdfFile,
      });

      expect(result).toMatchObject({ data: { status: "error" } });
      expect(createEinreichung).not.toHaveBeenCalled();
      expect(uploadDokumentWithSignaturdatei).not.toHaveBeenCalled();
    });

    it("reports a missing file for the uploaded type", async () => {
      const result = await callAction(NEW_VERFAHREN_SEARCH, {
        formType: "upload",
        typ: "ANHANG",
        file: new File([], ""),
      });

      expect(result).toMatchObject({
        data: {
          status: "invalid",
          fieldErrors: { file: [expect.any(String)] },
          data: { formType: "upload", typ: "ANHANG" },
        },
      });
      expect(createVerfahren).not.toHaveBeenCalled();
    });

    it.each([
      ["without a SAFE-ID", `?gericht=${gericht.id}`],
      [
        "for a SAFE-ID the user isn't authorized for",
        `?${new URLSearchParams({ gericht: gericht.id, safeId: "DE.BRAK.other" })}`,
      ],
    ])("rejects the first upload %s", async (_, search) => {
      const result = await callAction(search, {
        formType: "upload",
        typ: "ANHANG",
        file: pdfFile,
      });

      expect(result).toMatchObject({ init: { status: 400 } });
      expect(createVerfahren).not.toHaveBeenCalled();
    });

    it("rejects the XJustiz type", async () => {
      const result = await callAction(NEW_VERFAHREN_SEARCH, {
        formType: "upload",
        typ: "XJUSTIZ",
        file: pdfFile,
      });

      expect(result).toMatchObject({ data: { status: "invalid" } });
      expect(createVerfahren).not.toHaveBeenCalled();
    });
  });

  describe("action: existing Verfahren", () => {
    const expectedContext = {
      authSession,
      verfahrenId: VERFAHREN_ID,
      redirectTo: DOKUMENTE_PATH,
      // This step is where the Klageschrift is replaced
      allowSchriftstueckDeletion: true,
    };

    // Typed loosely so that any of the handlers can return the same result
    it.each<[string, Mock]>([
      ["upload", vi.mocked(handleDokumentUpload)],
      ["delete", vi.mocked(handleDokumentDelete)],
      ["sichtbarkeit", vi.mocked(handleDokumentSichtbarkeit)],
    ])("hands %s to the shared Dokument action", async (formType, handler) => {
      const handled = new Response("handled");
      handler.mockResolvedValue(handled);

      const result = await callAction(`?verfahren=${VERFAHREN_ID}`, {
        formType,
      });

      expect(result).toBe(handled);
      expect(handler).toHaveBeenCalledWith(
        expect.any(FormData),
        expectedContext,
      );
      expect(createVerfahren).not.toHaveBeenCalled();
    });

    it("rejects a malformed Verfahren id before calling the API", async () => {
      const response = await catchThrown(
        callAction("?verfahren=..%2Fcodelisten", {
          formType: "upload",
          typ: "ANHANG",
          einreichungId: "einreichung-1",
          file: pdfFile,
        }),
      );

      expectRedirect(response, "/verfahren/neu");
      expect(handleDokumentUpload).not.toHaveBeenCalled();
    });

    it.each(["delete", "sichtbarkeit"])(
      "rejects %s without a Verfahren",
      async (formType) => {
        const result = await callAction(NEW_VERFAHREN_SEARCH, {
          formType,
        });

        expect(result).toMatchObject({ init: { status: 400 } });
        expect(handleDokumentDelete).not.toHaveBeenCalled();
        expect(handleDokumentSichtbarkeit).not.toHaveBeenCalled();
      },
    );
  });
});
