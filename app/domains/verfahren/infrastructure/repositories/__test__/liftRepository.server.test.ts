import { makeVerfahren } from "tests/utils/factories/verfahren";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
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
  it("sends lift code and returns the lift with its E-Tag", async () => {
    const lift = {
      id: "l-1",
      beteiligung_id: "b-1",
      verfahren: makeVerfahren(),
    };

    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: lift,
      eTag: 'W/"1"',
    });

    const result = await validateLiftCode(mockAuthData, "code-123");

    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        path: "/api/v1/lift?lift-schluessel=123",
        headers: { "lift-schluessel": "code-123" },
        includeResponseETag: true,
      }),
    );
    expect(result).toEqual({
      lift,
      eTag: 'W/"1"',
    });
  });
});

describe("performLift", () => {
  it("posts the redemption request with the given E-Tag and payload", async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({ verfahrenId: "v-1" });

    const result = await performLift(mockAuthData, {
      code: "code-123",
      liftId: "l-1",
      liftETag: 'W/"1"',
      safeId: "safe-1",
    });

    expect(result).toEqual({ verfahrenId: "v-1" });

    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: mockAuthData,
        method: "POST",
        path: "/api/v1/lift/l-1",
        headers: { "If-Match": 'W/"1"' },
        body: {
          lift_schluessel: "code-123",
          safe_id: "safe-1",
        },
      }),
    );
  });
});
