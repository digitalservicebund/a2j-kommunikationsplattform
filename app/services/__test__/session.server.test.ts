import { ServicesContext } from "~/services/servicesContext.server";
import { requireUserSession } from "~/services/session.server";

describe("requireUserSession", () => {
  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request("http://localhost", {
      headers: { cookie: "" },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a mock session when useMock is true and demo mode is allowed", async () => {
    vi.spyOn(ServicesContext, "isDemoModeAllowed").mockReturnValue(true);
    mockRequest.headers.set("cookie", "demoMode=true");

    const session = await requireUserSession(mockRequest);

    expect(session).toEqual({
      accessToken: "mockAccessToken",
      expiresAt: expect.any(Number),
      demoMode: true,
    });
  });

  it("throws redirect when demoMode is true but demo mode is not allowed", async () => {
    vi.spyOn(ServicesContext, "isDemoModeAllowed").mockReturnValue(false);
    mockRequest.headers.set("cookie", "demoMode=true");

    try {
      await requireUserSession(mockRequest);
      expect(false).toBe(true); // This line should not be reached
    } catch (response) {
      const res = response as Response;
      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toBe("/login");
    }
  });
});
