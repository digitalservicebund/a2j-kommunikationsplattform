import type { LoaderFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "~/utils/apiError";
import { makeAuthSession } from "~tests/utils/factories/authSession";

const mocks = vi.hoisted(() => ({
  fetchDokumentDatei: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server",
  () => ({ fetchDokumentDatei: mocks.fetchDokumentDatei }),
);

vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { loader } from "../verfahren.$id.einreichungen.$einreichungId.dokumente.$dokumentId.datei";

const params = {
  id: "11111111-1111-1111-1111-111111111111",
  einreichungId: "22222222-2222-2222-2222-222222222222",
  dokumentId: "33333333-3333-3333-3333-333333333333",
};

const authSession = makeAuthSession();

function callLoader(
  search: string,
  routeParams: Record<string, string> = params,
) {
  return loader({
    request: new Request(`http://localhost:3000/datei${search}`),
    params: routeParams,
    context: { get: () => authSession, set: () => {} },
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

describe("Dokument Datei resource route", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.fetchDokumentDatei.mockResolvedValue(
      new Response("%PDF-1.7", {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="testfile.pdf"',
        },
      }),
    );
  });

  it("streams the file with an ATTACHMENT disposition for disposition=attachment", async () => {
    const response = await callLoader("?disposition=attachment");

    expect(mocks.fetchDokumentDatei).toHaveBeenCalledWith(authSession, {
      verfahrenId: params.id,
      einreichungId: params.einreichungId,
      id: params.dokumentId,
      dispositionType: "ATTACHMENT",
      signal: expect.any(AbortSignal),
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Disposition")).toBe(
      'attachment; filename="testfile.pdf"',
    );
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    await expect(response.text()).resolves.toBe("%PDF-1.7");
  });

  it.each(["?disposition=inline", "", "?disposition=unknown"])(
    "falls back to an INLINE disposition for %j",
    async (search) => {
      await callLoader(search);

      expect(mocks.fetchDokumentDatei).toHaveBeenCalledWith(
        authSession,
        expect.objectContaining({ dispositionType: "INLINE" }),
      );
    },
  );

  it("responds with 404 without calling the API for non-GUID ids", async () => {
    const error = await catchThrown(
      callLoader("", { ...params, dokumentId: "../../belege" }),
    );

    expect(error).toMatchObject({ init: { status: 404 } });
    expect(mocks.fetchDokumentDatei).not.toHaveBeenCalled();
  });

  it("responds with 404 when the API doesn't know the Dokument", async () => {
    mocks.fetchDokumentDatei.mockRejectedValue(
      new ApiError("not found", { status: 404 }),
    );

    const error = await catchThrown(callLoader(""));

    expect(error).toMatchObject({ init: { status: 404 } });
  });
});
