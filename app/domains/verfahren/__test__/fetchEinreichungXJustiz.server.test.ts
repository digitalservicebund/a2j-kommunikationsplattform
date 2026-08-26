import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchEinreichungXJustiz from "../fetchEinreichungXJustiz.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("../apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

describe("fetchEinreichungXJustiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests the xjustiz endpoint as text and returns the raw XML", async () => {
    const xml = "<xjustiz>...</xjustiz>";
    mocks.apiRequest.mockResolvedValueOnce(xml);

    const result = await fetchEinreichungXJustiz(mockAuthData, {
      verfahrenId: "v-1",
      id: "e-1",
    });

    expect(result).toBe(xml);
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/verfahren/v-1/einreichungen/e-1/xjustiz",
        responseType: "text",
        errorMessage:
          "XJustiz-Nachricht for Einreichung with id e-1 of Verfahren with id v-1 could not be fetched.",
      }),
    );
  });
});
