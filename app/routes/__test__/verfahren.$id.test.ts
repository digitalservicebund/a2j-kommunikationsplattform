import type { ActionFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeAuthSession } from "~tests/utils/factories/authSession";

const mocks = vi.hoisted(() => ({
  handleDokumentUpload: vi.fn(),
  handleDokumentDelete: vi.fn(),
  handleDokumentSichtbarkeit: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/application/einreichungDokumentActions.server",
  () => mocks,
);
vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { action } from "../verfahren.$id";

const authSession = makeAuthSession();

function callAction(formType: string) {
  const formData = new FormData();
  formData.set("formType", formType);

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

  it.each([
    ["upload", mocks.handleDokumentUpload],
    ["delete", mocks.handleDokumentDelete],
    ["sichtbarkeit", mocks.handleDokumentSichtbarkeit],
  ])(
    "hands %s to the shared Dokument action, staying on the page",
    async (formType, handler) => {
      handler.mockResolvedValue("handled");

      expect(await callAction(formType)).toBe("handled");
      // Without allowSchriftstueckDeletion: the draft Klageschrift stays protected
      expect(handler).toHaveBeenCalledWith(expect.any(FormData), {
        authSession,
        verfahrenId: "v-1",
        redirectTo: "/verfahren/v-1",
      });
    },
  );
});
