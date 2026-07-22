import { beforeEach, describe, expect, it, vi } from "vitest";
import deleteDokument from "../deleteDokument.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("deleteDokument", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls DELETE endpoint and returns success result", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ ok: true });

    const result = await deleteDokument(mockAuthData, {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: true });

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authData: mockAuthData,
      path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
      method: "DELETE",
      eTag: 'W/"0"',
      throwOnError: false,
      errorMessage: "Dokument with id d-1 could not be created.",
    });
  });

  it("returns error on 412", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ ok: false, status: 412 });

    const result = await deleteDokument(mockAuthData, {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: false });
  });

  it("returns error for other non-success responses", async () => {
    mocks.apiRequest.mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await deleteDokument(mockAuthData, {
      id: "d-1",
      verfahrenId: "v-1",
      einreichungId: "e-1",
      eTag: 'W/"0"',
    });

    expect(result).toEqual({ success: false });
  });
});
