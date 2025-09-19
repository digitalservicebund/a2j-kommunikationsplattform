import { it, vi } from "vitest";
import { fetchFromApi } from "../fetchFromApi.server";

describe("fetchFromApi", () => {
  it("returns fetched payload", async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ payload: true }),
        }) as Promise<Response>,
    );
    const result = await fetchFromApi({ url: "/url", errorMessage: "msg" });

    expect(result).toEqual({ payload: true });
  });

  it("throws error on non-200 response from server", async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: "Internal server error",
        }) as Promise<Response>,
    );
    expect(() =>
      fetchFromApi({ url: "/url", errorMessage: "msg" }),
    ).rejects.toThrowError("msg");
  });

  it("throws error on malformed json payload", async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          // json() missing to trigger error
        }) as Promise<Response>,
    );
    expect(() =>
      fetchFromApi({ url: "/url", errorMessage: "msg" }),
    ).rejects.toThrowError("msg");
  });
});
