import { makeAuthSession } from "tests/utils/factories/authSession";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createVerfahren,
  updateVerfahren,
} from "../verfahrenRepository.server";

const mocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("~/domains/verfahren/infrastructure/api/apiClient", () => ({
  apiRequest: mocks.apiRequest,
}));

const verfahrenPayload = {
  verfahrensgegenstand: "Zahlungsklage",
  kurzrubrum: null,
  gericht_id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
  beteiligungen: null,
};

describe("createVerfahren", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws when safeId is missing", async () => {
    const authWithoutSafeId = makeAuthSession({
      safeId: null,
      authorizedForSafeIds: [],
    });

    await expect(
      createVerfahren(authWithoutSafeId, verfahrenPayload),
    ).rejects.toThrow("No safeId is available");
    expect(mocks.apiRequest).not.toHaveBeenCalled();
  });

  it("returns the created Verfahren from apiRequest", async () => {
    const verfahren = {
      id: "2ab3cbc7-d00a-48bf-95a1-4d6f07406196",
      aktenzeichenGericht: null,
      verfahrensgegenstand: "Zahlungsklage",
      kurzrubrum: null,
      status: "ERSTELLT",
      statusGeaendertAm: "2026-03-08T05:00:29.659Z",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-03-08T05:00:29.659Z",
      eingereichtAm: null,
      gericht: {
        id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
        wert: "Landgericht Frankfurt",
        code: "LG_FFM",
      },
      beteiligungen: null,
    };
    mocks.apiRequest.mockResolvedValueOnce(verfahren);

    const result = await createVerfahren(makeAuthSession(), verfahrenPayload);

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren",
      method: "POST",
      body: {
        safe_id: makeAuthSession().safeId,
        verfahren: verfahrenPayload,
      },
      schema: expect.anything(),
      errorMessage: "Verfahren could not be created.",
    });
    expect(result).toEqual(verfahren);
  });

  it("omits verfahren from the request body when not provided", async () => {
    mocks.apiRequest.mockResolvedValueOnce({});

    await createVerfahren(makeAuthSession());

    expect(mocks.apiRequest).toHaveBeenCalledWith({
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren",
      method: "POST",
      body: {
        safe_id: makeAuthSession().safeId,
        verfahren: undefined,
      },
      schema: expect.anything(),
      errorMessage: "Verfahren could not be created.",
    });
  });
});

describe("updateVerfahren", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads the current eTag before sending the PUT with If-Match", async () => {
    const updatedVerfahren = { id: "v-1", ...verfahrenPayload };
    mocks.apiRequest
      .mockResolvedValueOnce({ data: updatedVerfahren, eTag: 'W/"1"' })
      .mockResolvedValueOnce(updatedVerfahren);

    const result = await updateVerfahren(
      makeAuthSession(),
      "v-1",
      verfahrenPayload,
    );

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(1, {
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren/v-1",
      schema: expect.anything(),
      includeResponseETag: true,
      errorMessage: "Fehler beim Bearbeiten des Verfahrens.",
    });
    expect(mocks.apiRequest).toHaveBeenNthCalledWith(2, {
      authSession: makeAuthSession(),
      path: "/api/v1/verfahren/v-1",
      method: "PUT",
      body: verfahrenPayload,
      schema: expect.anything(),
      eTag: 'W/"1"',
      errorMessage: "Fehler beim Bearbeiten des Verfahrens.",
    });
    expect(result).toEqual(updatedVerfahren);
  });

  it("sends undefined eTag when none is returned", async () => {
    const updatedVerfahren = { id: "v-1", ...verfahrenPayload };
    mocks.apiRequest
      .mockResolvedValueOnce({ data: updatedVerfahren, eTag: null })
      .mockResolvedValueOnce(updatedVerfahren);

    await updateVerfahren(makeAuthSession(), "v-1", verfahrenPayload);

    expect(mocks.apiRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ eTag: undefined }),
    );
  });
});
