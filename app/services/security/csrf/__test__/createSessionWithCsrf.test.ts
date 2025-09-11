import { randomBytes } from "node:crypto";
import { createSession } from "react-router";
import { getSession } from "~/services/prototype.session.server";
import { createSessionWithCsrf } from "../createSessionWithCsrf.server";
import { csrfCountMax, CSRFKey } from "../csrfKey";
import { getCSRFFromSession } from "../getCSRFFromSession.server";

vi.mock("~/services/prototype.session.server");
vi.mock("../getCSRFFromSession.server");
vi.mock("node:crypto");

const mockCookieHeader = "mockCookie";

describe("createSessionWithCsrf", () => {
  it("should create a CSRF token and attach it to the session", async () => {
    const mockCsrfToken = "mockCsrfToken";
    const mockSession = createSession();

    vi.mocked(randomBytes).mockImplementation(() => mockCsrfToken);
    vi.mocked(getSession).mockResolvedValue(mockSession);
    vi.mocked(getCSRFFromSession).mockReturnValue([]);

    const { session, csrf } = await createSessionWithCsrf(mockCookieHeader);

    expect(csrf).toBe(mockCsrfToken);
    expect(getSession).toHaveBeenCalledWith(mockCookieHeader);
    expect(session.get(CSRFKey)).toContain(mockCsrfToken);
  });

  it("should limit the CSRF token count to csrfCountMax", async () => {
    const newCsrfToken = "newCsrfToken";
    const mockSession = createSession();

    vi.mocked(randomBytes).mockImplementation(() => newCsrfToken);
    vi.mocked(getSession).mockResolvedValue(mockSession);
    const mockExistingCSRFs = Array(csrfCountMax).fill("oldToken");
    vi.mocked(getCSRFFromSession).mockReturnValue(mockExistingCSRFs);

    const { session, csrf } = await createSessionWithCsrf(mockCookieHeader);
    expect(csrf).toBe(newCsrfToken);
    expect(session.get(CSRFKey)).toContain(newCsrfToken);
  });
});
