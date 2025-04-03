/**
 * @jest-environment node
 */
import { requireUserSession } from "~/services/session.server";
import { ServicesContext } from "~/services/servicesContext.server";
import { jest } from "@jest/globals";
import * as sessionServer from "~/services/session.server";
describe("requireUserSession", () => {
  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request("http://localhost", {
      headers: { cookie: "" },
    });
    jest.spyOn(console, "log").mockImplementation(() => {}); // Suppress console logs
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns a mock session when useMock is true and demo mode is allowed", async () => {
    jest.spyOn(ServicesContext, "isDemoModeAllowed").mockReturnValue(true);
    mockRequest.headers.set("cookie", "demoMode=true");

    const session = await requireUserSession(mockRequest);

    expect(session).toEqual({
      accessToken: "mockAccessToken",
      expiresAt: expect.any(Number),
      demoMode: true,
    });
  });

  it("throws redirect when demoMode is true but demo mode is not allowed", async () => {
    jest.spyOn(ServicesContext, "isDemoModeAllowed").mockReturnValue(false);
    mockRequest.headers.set("cookie", "demoMode=true");

    try {
      await requireUserSession(mockRequest);
      expect(false).toBe(true); // This line should not be reached
    } catch (response) {
      const res = response as Response;
      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toBe("/login"); // Assert the redirect location
    }
  });

  it("returns a real session when demoMode is not allowed and session exists", async () => {
    jest.spyOn(ServicesContext, "isDemoModeAllowed").mockReturnValue(false);
    mockRequest.headers.set("cookie", "demoMode=true");
    jest.spyOn(Date, "now").mockReturnValue(0);
    const now = Date.now() + 60 * 60;

    jest.spyOn(sessionServer, "getUserSession").mockResolvedValue({
      accessToken: "mockAccessToken",
      expiresAt: now,
      demoMode: false,
    });

    const session = await requireUserSession(mockRequest);
    expect(session).toEqual({
      accessToken: "mockAccessToken",
      expiresAt: now,
      demoMode: false,
    });
  });
});
