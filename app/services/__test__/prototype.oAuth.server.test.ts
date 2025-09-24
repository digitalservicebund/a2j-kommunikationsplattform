import { it, vi } from "vitest";
import { loginAsDeveloper } from "~/mocks/auth/mockAuth.server";
import { createUserSession } from "~/services/prototype.session.server";

vi.mock("~/services/prototype.session.server");

describe("loginAsDeveloper", () => {
  const mockRequest = {} as Request;
  const mockedCreateUserSession = vi.mocked(createUserSession);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("redirects to /prototype/verfahren with correct cookie", async () => {
    mockedCreateUserSession.mockResolvedValue("session-cookie");
    const response = await loginAsDeveloper(mockRequest);

    expect(response).toBeInstanceOf(Response);
    expect(response?.status).toBe(302);
    expect(response?.headers.get("Location")).toBe("/");
    expect(response?.headers.get("Set-Cookie")).toContain(
      "session-cookie; demoMode=false",
    );
  });

  it("returns undefined if sessionCookieHeader is falsy", async () => {
    mockedCreateUserSession.mockResolvedValue("");
    const response = await loginAsDeveloper(mockRequest);

    expect(response).toBeUndefined();
  });

  it("returns 500 response on error", async () => {
    mockedCreateUserSession.mockRejectedValue(new Error("error"));
    const response = await loginAsDeveloper(mockRequest);

    expect(response).toBeInstanceOf(Response);
    expect(response?.status).toBe(500);
    const text = await response?.text();
    expect(text).toBe("Dev login failed");
  });
});
