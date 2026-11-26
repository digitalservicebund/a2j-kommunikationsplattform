import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeVerfahren } from "~tests/utils/factories/verfahren";

const mocks = vi.hoisted(() => ({
  validateLiftCode: vi.fn(),
  performLift: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/liftRepository.server",
  () => ({
    validateLiftCode: mocks.validateLiftCode,
    performLift: mocks.performLift,
  }),
);
vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { action, loader } from "../beitreten";

const SAFE_ID = "DE.BRAK.own";
const OTHER_SAFE_ID = "DE.BRAK.other";
const authSession = makeAuthSession({
  safeId: SAFE_ID,
  authorizedForSafeIds: [SAFE_ID, OTHER_SAFE_ID],
});
const context = { get: () => authSession, set: () => {} };
const BASE_URL = "http://localhost:3000/beitreten";
const CODE = "K7M4-9PXQ-2WRT";

function callAction(entries: Record<string, string>) {
  const formData = new FormData();
  Object.entries(entries).forEach(([key, value]) => formData.set(key, value));

  return action({
    request: new Request(BASE_URL, { method: "POST", body: formData }),
    params: {},
    context,
  } as unknown as ActionFunctionArgs);
}

const liftInput = { code: CODE, liftId: "lift-1", liftETag: "etag-1" };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("loader", () => {
  it("returns the SAFE-IDs the user may join with alongside the lift", async () => {
    const lift = {
      id: "lift-1",
      beteiligung_id: "beteiligung-1",
      verfahren: makeVerfahren(),
    };
    mocks.validateLiftCode.mockResolvedValue({ lift, eTag: "etag-1" });

    const url = new URL(`${BASE_URL}?code=${CODE}`);
    const result = await loader({
      url,
      request: new Request(url),
      params: {},
      context,
    } as unknown as LoaderFunctionArgs);

    expect(result?.data).toMatchObject({
      status: "success",
      data: {
        lift,
        eTag: "etag-1",
        safeId: SAFE_ID,
        authorizedForSafeIds: [SAFE_ID, OTHER_SAFE_ID],
      },
    });
  });
});

describe("action", () => {
  it("joins the Verfahren with the selected SAFE-ID", async () => {
    mocks.performLift.mockResolvedValue({ verfahrenId: "verfahren-1" });

    const response = await callAction({ ...liftInput, safeId: OTHER_SAFE_ID });

    expect(mocks.performLift).toHaveBeenCalledWith(authSession, {
      ...liftInput,
      safeId: OTHER_SAFE_ID,
    });
    expect(response).toBeInstanceOf(Response);
    expect((response as Response).headers.get("Location")).toBe(
      "/verfahren/verfahren-1",
    );
  });

  it.each([
    ["isn't authorized", { safeId: "DE.BRAK.unauthorized" }],
    ["is missing", {}],
  ])("rejects a SAFE-ID that %s", async (_, safeIdInput) => {
    const thrown = await callAction({ ...liftInput, ...safeIdInput }).then(
      () => {
        throw new Error("expected action to throw");
      },
      (error: unknown) => error,
    );

    expect(thrown).toMatchObject({ init: { status: 400 } });
    expect(mocks.performLift).not.toHaveBeenCalled();
  });
});
