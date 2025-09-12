import { describe, expect, it } from "vitest";
import { loader } from "~/routes/link.$";

describe("link loader", () => {
  it('should redirect to "anmeldung-teilnahme-kommunikationsplattform" to the correct path', () => {
    const mockArgs = {
      params: { "*": "anmeldung-teilnahme-kommunikationsplattform" },
      request: new Request(
        "https://test.com/anmeldung-teilnahme-kommunikationsplattform",
      ),
      context: {},
    };

    const response = loader(mockArgs);
    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe(
      "https://app.formbricks.com/s/cmf2nqcww661jtl01u8a5uo4n",
    );
  });

  it("should throw a 404 response when no params are provided", () => {
    const mockArgs = {
      params: {},
      request: new Request("https://test.com"),
      context: {},
    };
    expect(() => loader(mockArgs)).toThrowError();

    try {
      loader(mockArgs);
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
    }
  });
  it("should throw a 404 response for an unknown site", () => {
    const mockArgs = {
      params: { "*": "unknown-site" },
      request: new Request("https://test.com/unknown-site"),
      context: {},
    };
    expect(() => loader(mockArgs)).toThrowError();

    try {
      loader(mockArgs);
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
    }
  });
});
