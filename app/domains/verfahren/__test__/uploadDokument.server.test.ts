import { beforeEach, describe, expect, it, vi } from "vitest";
import uploadDokument from "../uploadDokument.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("uploadDokument", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("posts FormData and parses array response first element", async () => {
    const rawDokument = {
      id: "d-1",
      einreichung_id: "e-1",
      status: "ERSTELLT",
      name: null,
      size_in_bytes: 123,
      type: "ANHANG",
      viren_scan_status: "SAUBER",
      gesendet_am: null,
      eingereicht_am: null,
      erstellt_von: null,
      erstellt_am: "2026-03-08T05:00:29.659Z",
    };
    mocks.apiRequest.mockResolvedValueOnce([rawDokument]);
    const file = new File(["abc"], "test.txt", { type: "text/plain" });

    const result = await uploadDokument(
      mockAuthData,
      "v-1",
      "e-1",
      file,
      "ANHANG",
    );

    const firstCallArgs = mocks.apiRequest.mock.calls[0][0];
    expect(firstCallArgs.path).toBe(
      "/api/v1/verfahren/v-1/einreichungen/e-1/dokumente",
    );
    expect(firstCallArgs.method).toBe("POST");
    expect(firstCallArgs.errorMessage).toBe(
      "Dokument upload for Einreichung with id e-1 of Verfahren with v-1 could not be uploaded.",
    );
    expect(firstCallArgs.body).toBeInstanceOf(FormData);
    expect(result).toEqual(rawDokument);
  });
});
