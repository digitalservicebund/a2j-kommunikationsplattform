import { makeAuthSession } from "tests/utils/factories/authSession";
import { makeVerfahren } from "tests/utils/factories/verfahren";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  performLift,
  validateLiftCode,
} from "~/domains/verfahren/infrastructure/repositories/liftRepository.server";
import { apiRequest } from "../../api/apiClient";

vi.mock("~/domains/verfahren/infrastructure/api/apiClient", () => ({
  apiRequest: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("validateLiftCode", () => {
  const lift = {
    id: "l-1",
    beteiligung_id: "b-1",
    verfahren: makeVerfahren(),
  };

  it("sends lift code and returns the lift with its E-Tag", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: lift,
      eTag: 'W/"1"',
    });

    const result = await validateLiftCode(makeAuthSession(), "K7M49PXQ2WRT");

    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        path: "/api/v1/lift",
        headers: { "lift-schluessel": "K7M49PXQ2WRT" },
        includeResponseETag: true,
      }),
    );
    expect(result).toEqual({
      lift,
      eTag: 'W/"1"',
    });
  });

  it.each(["K7M4-9PXQ-2WRT", "k7m4-9pxq-2wrt", "K7M4 9PXQ 2WRT"])(
    "normalizes lift code '%s' before sending",
    async (code) => {
      vi.mocked(apiRequest).mockResolvedValueOnce({
        data: lift,
        eTag: 'W/"1"',
      });

      await validateLiftCode(makeAuthSession(), code);

      expect(vi.mocked(apiRequest)).toHaveBeenCalled();
      const { headers } = vi.mocked(apiRequest).mock.lastCall![0];
      expect(headers!["lift-schluessel"]).toBe("K7M49PXQ2WRT");
    },
  );
});

describe("performLift", () => {
  it("posts the redemption request with the given E-Tag and payload", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ verfahrenId: "v-1" });

    const result = await performLift(makeAuthSession(), {
      code: "K7M49PXQ2WRT",
      liftId: "l-1",
      liftETag: 'W/"1"',
      safeId: "safe-1",
    });

    expect(result).toEqual({ verfahrenId: "v-1" });

    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith(
      expect.objectContaining({
        authSession: makeAuthSession(),
        method: "POST",
        path: "/api/v1/lift/l-1",
        headers: { "If-Match": 'W/"1"' },
        body: {
          lift_schluessel: "K7M49PXQ2WRT",
          safe_id: "safe-1",
        },
      }),
    );
  });
});
