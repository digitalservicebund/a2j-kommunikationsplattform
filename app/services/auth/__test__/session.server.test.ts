import { describe, expect, it } from "vitest";

import {
  commitSession,
  destroySession,
  getSession,
  getUserSession,
  requireUserSession,
} from "../session.server";

describe("session.server", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  beforeEach(async () => {
    // remove all session data before each test
    const session = await getSession();
    await destroySession(session);
  });

  describe("createUserSession", () => {
    it("should create a session with accessToken and expiresAt", async () => {
      const session = await getSession();
      session.set("accessToken", "test-token");
      session.set("expiresAt", Date.now() + 100000); // expires in the future
      console.log("Session Data:", session.data);

      const cookieHeader = await commitSession(session);
      console.log("Cookie Header:", cookieHeader);
      const encoded = cookieHeader.split("=")[1].split(";")[0];
      const decoded = Buffer.from(
        decodeURIComponent(encoded),
        "base64",
      ).toString();

      expect(decoded).toContain('"accessToken":"test-token"');
      expect(decoded).toMatch(/"expiresAt":\d+/);
    });
  });
  describe("getUserSession", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it("should return accessToken and expiresAt if the user is authenticated", async () => {
      const session = await getSession();
      session.set("accessToken", "valid-token");
      session.set("expiresAt", Date.now() + 100000); // expires in the future

      const request = new Request("http://localhost", {
        headers: {
          Cookie: await commitSession(session),
        },
      });
      const userSession = await getUserSession(request);
      expect(userSession).not.toBeNull();
      expect(userSession).toHaveProperty("accessToken", "valid-token");
      expect(userSession).toHaveProperty("expiresAt");
    });
    it("should return null if the accessToken is missing", async () => {
      const session = await getSession();
      session.set("expiresAt", Date.now() + 100000); // expires in the future

      const request = new Request("http://localhost", {
        headers: {
          Cookie: await commitSession(session),
        },
      });
      const userSession = await getUserSession(request);
      expect(userSession).toBeNull();
    });

    it("should return null if the expiresAt is missing", async () => {
      const session = await getSession();
      session.set("accessToken", "valid-token");

      const request = new Request("http://localhost", {
        headers: {
          Cookie: await commitSession(session),
        },
      });
      const userSession = await getUserSession(request);
      expect(userSession).toBeNull();
    });

    it("should return null if the session has expired", async () => {
      const session = await getSession();
      session.set("accessToken", "valid-token");
      session.set("expiresAt", Date.now() - 100000);

      const request = new Request("http://localhost", {
        headers: {
          Cookie: await commitSession(session),
        },
      });
      const userSession = await getUserSession(request);
      expect(userSession).toBeNull();
    });
  });
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
    it("should return the user session if it exists", async () => {
      const session = await getSession(mockRequest.headers.get("Cookie"));
      session.set("accessToken", "valid-token");
      session.set("expiresAt", Date.now() + 100000); // expires in the future

      const request = new Request("http://localhost", {
        headers: {
          Cookie: await commitSession(session),
        },
      });

      const userSession = await requireUserSession(request);
      expect(userSession).toHaveProperty("accessToken", "valid-token");
    });

    it("should throw a redirect if the user session does not exist", async () => {
      await expect(requireUserSession(mockRequest)).rejects.toMatchObject({
        status: 302,
      });
      await expect(requireUserSession(mockRequest)).rejects.toHaveProperty(
        "headers",
      );
      await requireUserSession(mockRequest).catch((err: Response) => {
        expect(err.headers.get("Location")).toBe("/login");
      });
    });
  });
});
