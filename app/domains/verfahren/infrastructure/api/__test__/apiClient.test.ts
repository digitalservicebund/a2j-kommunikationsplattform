import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import z from "zod";
import { mockAuthData } from "~/domains/verfahren/__test__/helpers";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";

const mocks = vi.hoisted(() => {
  return {
    getBearerToken: vi.fn(),
    logApiErrorAndThrow: vi.fn(),
    logParsingErrorAndThrow: vi.fn(),
    fetch: vi.fn(),
  };
});

vi.mock("~/services/auth/getBearerToken.server", () => ({
  getBearerToken: mocks.getBearerToken,
}));

vi.mock("~/utils/logApiError", () => ({
  logApiErrorAndThrow: mocks.logApiErrorAndThrow,
  logParsingErrorAndThrow: mocks.logParsingErrorAndThrow,
}));

globalThis.fetch = mocks.fetch;

describe("apiClient", () => {
  const originalEnv = process.env.KOMPLA_API_URL;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env.KOMPLA_API_URL = "http://localhost:8080";
  });

  afterEach(() => {
    process.env.KOMPLA_API_URL = originalEnv;
  });

  describe("apiRequest", () => {
    it("constructs URL with path when only path is provided", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: "123" }),
      });

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/v1/test",
        expect.any(Object),
      );
    });

    it("uses fullUrl when provided instead of path", async () => {
      mocks.getBearerToken.mockResolvedValue("test-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: "123" }),
      });

      await apiRequest({
        authData: mockAuthData,
        fullUrl: "http://custom.api/endpoint",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        "http://custom.api/endpoint",
        expect.any(Object),
      );
    });

    it("sets authorization header with bearer token", async () => {
      mocks.getBearerToken.mockResolvedValue("my-token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer my-token",
          }),
        }),
      );
    });

    it("throws error when bearer token is not available", async () => {
      mocks.getBearerToken.mockResolvedValue(null);

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
        }),
      ).rejects.toThrow("No bearer token available");
    });

    it("performs GET request by default", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "GET",
        }),
      );
    });

    it("uses custom method when provided", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        method: "POST",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
        }),
      );
    });

    it("sends JSON body with content-type header", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      const body = { name: "test", value: 42 };

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        method: "POST",
        body,
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(body),
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("handles FormData body without setting content-type", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      const formData = new FormData();
      formData.append("file", new File(["content"], "test.txt"));

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        method: "POST",
        body: formData,
      });

      const [, config] = mocks.fetch.mock.calls[0];
      expect(config?.body).toBe(formData);
      expect(config?.headers).not.toHaveProperty("Content-Type");
    });

    it("merges custom headers alongside Authorization for a FormData body", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      const formData = new FormData();
      formData.append("file", new File(["content"], "test.txt"));

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        method: "POST",
        body: formData,
        headers: { "Dokument-Typ": "ANHANG" },
      });

      const [, config] = mocks.fetch.mock.calls[0];
      expect(config?.headers).toEqual({
        Authorization: "Bearer token",
        Accept: "application/json",
        "Dokument-Typ": "ANHANG",
      });
    });

    it("calls logApiErrorAndThrow when response is not ok", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });
      mocks.logApiErrorAndThrow.mockImplementation(() => {
        throw new Error("Test error");
      });

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
          errorMessage: "Custom error message",
        }),
      ).rejects.toThrow("Test error");

      expect(mocks.logApiErrorAndThrow).toHaveBeenCalledWith(
        expect.any(Object),
        "Custom error message",
      );
    });

    it("continues when logApiErrorAndThrow does not throw on non-ok response", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ id: "123" }),
        text: async () => JSON.stringify({ id: "123" }),
      });
      mocks.logApiErrorAndThrow.mockResolvedValueOnce(undefined);

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        errorMessage: "Custom error message",
      });

      expect(mocks.logApiErrorAndThrow).toHaveBeenCalledWith(
        expect.any(Object),
        "Custom error message",
      );
      expect(result).toEqual({ id: "123" });
    });

    it("uses default error message when not provided", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 500,
      });
      mocks.logApiErrorAndThrow.mockImplementation(() => {
        throw new Error("Error");
      });

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
        }),
      ).rejects.toThrow();

      expect(mocks.logApiErrorAndThrow).toHaveBeenCalledWith(
        expect.any(Object),
        "API request failed.",
      );
    });

    it("returns handled error result when throwOnError is false", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 409,
        headers: new Headers({ etag: 'W/"1"' }),
        json: async () => ({ message: "conflict" }),
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        throwOnError: false,
      });

      expect(result).toEqual({
        ok: false,
        status: 409,
        headers: new Headers({ etag: 'W/"1"' }),
        eTag: 'W/"1"',
        errorBody: { message: "conflict" },
        problemDetails: { message: "conflict" },
      });
    });

    it("returns handled error result with undefined body when JSON parsing fails", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        headers: new Headers(),
        json: async () => {
          throw new SyntaxError("Unexpected token");
        },
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        throwOnError: false,
      });

      expect(result).toEqual({
        ok: false,
        status: 500,
        headers: new Headers(),
        eTag: null,
        errorBody: undefined,
        problemDetails: undefined,
      });
    });

    it("exposes the parsed ProblemDetails fields when throwOnError is false", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const problemDetailsBody = {
        title: "Conflict",
        status: 412,
        detail: "Die eTag stimmt nicht mit der aktuellen Ressource ueberein.",
      };
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 412,
        headers: new Headers(),
        json: async () => problemDetailsBody,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        throwOnError: false,
      });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.problemDetails?.title).toBe("Conflict");
        expect(result.problemDetails?.status).toBe(412);
        expect(result.problemDetails?.detail).toBe(
          "Die eTag stimmt nicht mit der aktuellen Ressource ueberein.",
        );
      }
    });

    it("exposes field-level validation errors from a ValidationProblemDetails body", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const validationProblemBody = {
        title: "Validation failed",
        status: 400,
        errors: {
          kurzrubrum: ["Feld darf nicht leer sein."],
        },
      };
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 400,
        headers: new Headers(),
        json: async () => validationProblemBody,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        throwOnError: false,
      });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.problemDetails?.errors).toEqual({
          kurzrubrum: ["Feld darf nicht leer sein."],
        });
      }
    });

    it("parses JSON response and returns data", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const responseData = { id: "123", name: "test" };
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => responseData,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(result).toEqual(responseData);
    });

    it("requests application/json via the Accept header", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({ Accept: "application/json" }),
        }),
      );
    });

    it("parses text response and returns raw body when responseType is text", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const xml = "<xjustiz>...</xjustiz>";
      mocks.fetch.mockResolvedValue({
        ok: true,
        text: async () => xml,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        responseType: "text",
      });

      expect(result).toBe(xml);
    });

    it("requests */* via the Accept header when responseType is text", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        text: async () => "",
      });

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        responseType: "text",
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({ Accept: "*/*" }),
        }),
      );
    });

    it("returns undefined for 204 responses without trying to read the body", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const jsonSpy = vi.fn();

      mocks.fetch.mockResolvedValue({
        ok: true,
        status: 204,
        headers: new Headers(),
        json: jsonSpy,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(result).toBeUndefined();
      expect(jsonSpy).not.toHaveBeenCalled();
    });

    it("returns undefined for content-length 0 responses", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const jsonSpy = vi.fn();

      mocks.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "content-length": "0" }),
        json: jsonSpy,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(result).toBeUndefined();
      expect(jsonSpy).not.toHaveBeenCalled();
    });

    it("calls logParsingErrorAndThrow when JSON body cannot be parsed", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const parseError = new SyntaxError("Unexpected end of JSON input");
      mocks.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => {
          throw parseError;
        },
      });
      mocks.logParsingErrorAndThrow.mockImplementation(() => {
        throw new Error("Parse error");
      });

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
          errorMessage: "Failed to parse response",
        }),
      ).rejects.toThrow("Parse error");

      expect(mocks.logParsingErrorAndThrow).toHaveBeenCalledWith(
        parseError,
        "Failed to parse response",
        "[unparsable JSON response]",
      );
    });

    it("validates response with zod schema when provided", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const schema = z.object({
        id: z.string(),
        name: z.string(),
      });
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: "123", name: "test" }),
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        schema,
      });

      expect(result).toEqual({ id: "123", name: "test" });
    });

    it("returns success result wrapper when throwOnError is false", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ etag: 'W/"9"' }),
        json: async () => ({ id: "123" }),
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        throwOnError: false,
      });

      expect(result).toEqual({
        ok: true,
        data: { id: "123" },
        status: 200,
        headers: new Headers({ etag: 'W/"9"' }),
        eTag: 'W/"9"',
      });
    });

    it("returns response meta when includeResponseMeta is enabled", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const headers = new Headers({ etag: 'W/"2"' });
      mocks.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers,
        json: async () => ({ id: "123" }),
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        includeResponseMeta: true,
      });

      expect(result).toEqual({
        data: { id: "123" },
        status: 200,
        headers,
        eTag: 'W/"2"',
      });
    });

    it("returns data plus eTag when includeResponseETag is enabled", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ etag: 'W/"3"' }),
        json: async () => ({ id: "123" }),
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        includeResponseETag: true,
      });

      expect(result).toEqual({
        data: { id: "123" },
        eTag: 'W/"3"',
      });
    });

    it("calls logParsingErrorAndThrow when schema validation fails", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const schema = z.object({
        id: z.guid(),
        name: z.string().min(5),
      });
      const invalidData = { id: "not-a-uuid", name: "x" };

      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => invalidData,
      });
      mocks.logParsingErrorAndThrow.mockImplementation(() => {
        throw new Error("Schema validation failed");
      });

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
          schema,
          errorMessage: "Invalid data",
        }),
      ).rejects.toThrow("Schema validation failed");

      expect(mocks.logParsingErrorAndThrow).toHaveBeenCalledWith(
        expect.any(Error),
        "Invalid data",
        JSON.stringify(invalidData),
      );
    });

    it("adds If-Match header when eTag is provided", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: "123" }),
      });

      await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        eTag: 'W/"7"',
      });

      expect(mocks.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "If-Match": 'W/"7"',
          }),
        }),
      );
    });

    it("returns parsed schema data when both JSON parsing and validation succeed", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const schema = z.object({
        id: z.string(),
        count: z.number(),
      });
      const data = { id: "test-id", count: 42 };

      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => data,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
        schema,
      });

      expect(result).toEqual(data);
    });

    it("handles array responses without schema", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const arrayData = [{ id: "1" }, { id: "2" }];

      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => arrayData,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/items",
      });

      expect(result).toEqual(arrayData);
    });

    it("validates array response with array schema", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const schema = z.object({ id: z.string(), name: z.string() }).array();
      const arrayData = [
        { id: "1", name: "item1" },
        { id: "2", name: "item2" },
      ];

      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => arrayData,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/items",
        schema,
      });

      expect(result).toEqual(arrayData);
    });
  });
});
