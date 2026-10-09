import { makeAuthSession } from "tests/utils/factories/authSession";
import { makeGerichtInformation } from "tests/utils/factories/gerichtInformation";
import { describe, vi } from "vitest";
import { apiRequest } from "../../api/apiClient";
import { fetchGerichtInformation } from "../gerichtInformationRepository.server";

vi.mock("~/domains/verfahren/infrastructure/api/apiClient", () => ({
  apiRequest: vi.fn(),
}));

describe("fetchGerichtInformation", () => {
  it("fetches a GerichtInformation by ID", async () => {
    const authSession = makeAuthSession();
    const gerichtInformation = makeGerichtInformation();

    vi.mocked(apiRequest).mockResolvedValueOnce(gerichtInformation);

    const result = await fetchGerichtInformation(
      makeAuthSession(),
      "gericht-id",
    );

    expect(result).toEqual(gerichtInformation);
    expect(apiRequest).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        authSession,
        path: "/api/v1/informationen/gerichte/gericht-id",
      }),
    );
  });
});
