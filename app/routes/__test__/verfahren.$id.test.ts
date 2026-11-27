import type { ActionFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import {
  handleDokumentDelete,
  handleDokumentSichtbarkeit,
  handleDokumentUpload,
} from "~/domains/verfahren/application/einreichungDokumentActions.server";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import {
  deleteEinreichung,
  fetchEinreichungById,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { deleteVerfahren } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { ApiError } from "~/utils/apiError";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeEinreichung } from "~tests/utils/factories/einreichung";

vi.mock(
  import("~/domains/verfahren/application/einreichungDokumentActions.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server"),
);
vi.mock(
  import("~/domains/verfahren/infrastructure/repositories/einreichungRepository.server"),
);
vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { action } from "../verfahren.$id";

const authSession = makeAuthSession();

function callAction(formType: string, fields: Record<string, string> = {}) {
  const formData = new FormData();
  formData.set("formType", formType);
  for (const [name, value] of Object.entries(fields)) {
    formData.set(name, value);
  }

  return action({
    request: new Request("http://localhost:3000/verfahren/v-1", {
      method: "POST",
      body: formData,
    }),
    params: { id: "v-1" },
    context: { get: () => authSession, set: () => {} },
  } as unknown as ActionFunctionArgs);
}

describe("/verfahren/:id action", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Typed loosely so that any of the handlers can return the same result
  it.each<[string, Mock]>([
    ["upload", vi.mocked(handleDokumentUpload)],
    ["delete", vi.mocked(handleDokumentDelete)],
    ["sichtbarkeit", vi.mocked(handleDokumentSichtbarkeit)],
  ])(
    "hands %s to the shared Dokument action, staying on the page",
    async (formType, handler) => {
      const handled = new Response("handled");
      handler.mockResolvedValue(handled);

      expect(await callAction(formType)).toBe(handled);
      // Without allowSchriftstueckDeletion: the draft Klageschrift stays protected
      expect(handler).toHaveBeenCalledWith(expect.any(FormData), {
        authSession,
        verfahrenId: "v-1",
        redirectTo: "/verfahren/v-1",
      });
    },
  );

  describe("delete-verfahren", () => {
    it("deletes the Verfahren and redirects to the Verfahren overview", async () => {
      vi.mocked(deleteVerfahren).mockResolvedValue(undefined);

      const response = await callAction("delete-verfahren");

      expect(deleteVerfahren).toHaveBeenCalledWith(authSession, "v-1");
      expect(response).toBeInstanceOf(Response);
      expect((response as Response).headers.get("Location")).toBe("/");
    });

    it("returns an error result if the Verfahren can't be deleted", async () => {
      vi.mocked(deleteVerfahren).mockRejectedValue(
        new ApiError("Conflict", { status: 409 }),
      );

      const result = await callAction("delete-verfahren");

      expect(result).toMatchObject({
        init: { status: 409 },
        data: {
          status: "error",
          error: "Das Verfahren konnte nicht gelöscht werden.",
          data: { formType: "delete-verfahren" },
        },
      });
    });
  });

  describe("delete-einreichung", () => {
    function mockEinreichung(
      einreichung: Pick<Einreichung, "name" | "status"> = {
        name: "Schriftsatz",
        status: "ERSTELLT",
      },
    ) {
      vi.mocked(fetchEinreichungById).mockResolvedValue({
        einreichung: makeEinreichung({ id: "e-2", ...einreichung }),
        eTag: 'W/"2"',
      });
    }

    it("deletes the draft Weitere Einreichung and reloads the Verfahren page", async () => {
      mockEinreichung();
      vi.mocked(deleteEinreichung).mockResolvedValue(undefined);

      const response = await callAction("delete-einreichung", {
        einreichungId: "e-2",
      });

      expect(fetchEinreichungById).toHaveBeenCalledWith(authSession, {
        verfahrenId: "v-1",
        id: "e-2",
      });
      expect(deleteEinreichung).toHaveBeenCalledWith(authSession, {
        verfahrenId: "v-1",
        id: "e-2",
        eTag: 'W/"2"',
      });
      expect((response as Response).headers.get("Location")).toBe(
        "/verfahren/v-1",
      );
    });

    it.each([
      [
        "the Klageeinreichung",
        { name: "Klageeinreichung", status: "ERSTELLT" },
      ],
      ["a submitted Einreichung", { name: "Schriftsatz", status: "BEANTRAGT" }],
    ] as const)("refuses to delete %s", async (_description, einreichung) => {
      mockEinreichung(einreichung);

      const result = await callAction("delete-einreichung", {
        einreichungId: "e-2",
      });

      expect(deleteEinreichung).not.toHaveBeenCalled();
      expect(result).toMatchObject({
        init: { status: 403 },
        data: {
          status: "error",
          error: "Die Einreichung konnte nicht gelöscht werden.",
          data: { formType: "delete-einreichung" },
        },
      });
    });

    it("returns an error result if the Einreichung can't be deleted", async () => {
      mockEinreichung();
      vi.mocked(deleteEinreichung).mockRejectedValue(
        new ApiError("Conflict", { status: 409 }),
      );

      const result = await callAction("delete-einreichung", {
        einreichungId: "e-2",
      });

      expect(result).toMatchObject({
        init: { status: 409 },
        data: {
          status: "error",
          error: "Die Einreichung konnte nicht gelöscht werden.",
          data: { formType: "delete-einreichung" },
        },
      });
    });

    it("rejects a request without an Einreichung ID", async () => {
      const result = await callAction("delete-einreichung").catch(
        (error: unknown) => error,
      );

      expect(deleteEinreichung).not.toHaveBeenCalled();
      expect(result).toMatchObject({ init: { status: 400 } });
    });
  });
});
