import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchLatestBelegForEinreichung from "../fetchLatestBelegForEinreichung.server";
import { mockAuthData } from "./helpers";

const mocks = vi.hoisted(() => ({
  fetchBelege: vi.fn(),
  fetchBelegById: vi.fn(),
}));

vi.mock("../fetchBelege.server", () => ({ default: mocks.fetchBelege }));
vi.mock("../fetchBelegById.server", () => ({ default: mocks.fetchBelegById }));

describe("fetchLatestBelegForEinreichung", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when no Beleg exists yet", async () => {
    mocks.fetchBelege.mockResolvedValueOnce({ elemente: [] });

    const result = await fetchLatestBelegForEinreichung(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(result).toBeNull();
    expect(mocks.fetchBelegById).not.toHaveBeenCalled();
  });

  it("fetches the latest Beleg by id when one or more exist", async () => {
    mocks.fetchBelege.mockResolvedValueOnce({
      elemente: [{ id: "b-1" }, { id: "b-2" }],
    });
    const beleg = { id: "b-2", status: "ERSTELLT" };
    mocks.fetchBelegById.mockResolvedValueOnce(beleg);

    const result = await fetchLatestBelegForEinreichung(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.fetchBelege).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });
    expect(mocks.fetchBelegById).toHaveBeenCalledWith(mockAuthData, {
      verfahrenId: "v-1",
      id: "b-2",
    });
    expect(result).toEqual(beleg);
  });
});
