import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchDokument from "../fetchDokument";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchDokument", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates path, schema and returns document with eTag", async () => {
    const dokument = {
      id: "d-1",
      einreichung_id: "e-1",
      status: "ERSTELLT",
      name: "Klageschrift.pdf",
      size_in_bytes: 1234,
      type: "SCHRIFTSTUECK",
      viren_scan_status: "SAUBER",
      gesendet_am: null,
      eingereicht_am: null,
      erstellt_von: null,
      erstellt_am: "2026-07-22T10:00:00.000Z",
    };

    mocks.apiRequest.mockResolvedValueOnce({
      data: dokument,
      eTag: 'W/"1"',
    });

    const result = await fetchDokument(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
      id: "d-1",
    });

    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente/d-1",
        includeResponseETag: true,
      }),
    );
    expect(result).toEqual({ dokument, eTag: 'W/"1"' });
  });
});
