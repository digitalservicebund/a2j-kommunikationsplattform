import { it, vi } from "vitest";
import { fetchFromApi } from "../api/fetchFromApi.server";
import fetchVerfahren from "../verfahren/fetchVerfahren.server";

const mocks = vi.hoisted(() => {
  return {
    fetchFromApi: vi.fn(),
  };
});

vi.mock("../api/fetchFromApi.server", () => ({
  fetchFromApi: mocks.fetchFromApi,
}));

describe("fetchVerfahren", () => {
  it("calls fetchFromApi with correct arguments", async () => {
    mocks.fetchFromApi.mockReturnValue({ verfahren: [] });
    const result = await fetchVerfahren({ limit: 99, offset: 123 });

    expect(fetchFromApi).toHaveBeenCalledWith({
      url: "/verfahren?limit=99&offset=123",
      errorMessage: "Die Verfahren konnten nicht abgerufen werden.",
    });

    expect(result).toEqual([]);
  });

  it("throws error on invalid schema", async () => {
    mocks.fetchFromApi.mockReturnValue({ verfahren: [{ invalid: true }] });
    expect(fetchVerfahren).rejects.toThrowError(
      "Die Verfahren konnten nicht abgerufen werden.",
    );
  });
});
