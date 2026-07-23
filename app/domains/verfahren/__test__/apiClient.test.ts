import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import z from "zod";
import { apiRequest } from "../apiClient";
import { mockAuthData } from "./helpers";

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
    vi.clearAllMocks();
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
        text: async () => JSON.stringify({ message: "conflict" }),
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
      });
    });

    it("returns handled error result with plain text body when JSON parsing fails", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        headers: new Headers(),
        text: async () => "plain text failure",
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
        errorBody: "plain text failure",
      });
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

    it("returns undefined for empty text body", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        text: async () => "",
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(result).toBeUndefined();
    });

    it("calls logParsingErrorAndThrow when text body is invalid JSON", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const parseError = new Error("Invalid JSON string");
      mocks.fetch.mockResolvedValue({
        ok: true,
        text: async () => "not-json",
      });
      mocks.logParsingErrorAndThrow.mockImplementation(() => {
        throw new Error("Parse error from text");
      });

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
          errorMessage: "Failed to parse text body",
        }),
      ).rejects.toThrow("Parse error from text");

      expect(mocks.logParsingErrorAndThrow).toHaveBeenCalledWith(
        expect.any(Error),
        "Failed to parse text body",
        "not-json",
      );
      expect(parseError).toBeInstanceOf(Error);
    });

    it("reads body from clone when json is unavailable", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        clone: () => ({
          text: async () => JSON.stringify({ id: "from-clone" }),
        }),
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(result).toEqual({ id: "from-clone" });
    });

    it("returns undefined when response has no readable body", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(result).toBeUndefined();
    });

    it("throws original parse error when json fails without clone fallback", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const parseError = new Error("Invalid JSON");
      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => {
          throw parseError;
        },
      });

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
        }),
      ).rejects.toThrow("Invalid JSON");
    });

    it("returns undefined when json parsing fails for an empty body", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      mocks.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => {
          throw new SyntaxError("Unexpected end of JSON input");
        },
        clone: () => ({
          text: async () => "",
        }),
      });

      const result = await apiRequest({
        authData: mockAuthData,
        path: "/api/v1/test",
      });

      expect(result).toBeUndefined();
      expect(mocks.logParsingErrorAndThrow).not.toHaveBeenCalled();
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

    it("calls logParsingErrorAndThrow when JSON parsing fails", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const parseError = new Error("Invalid JSON");

      mocks.fetch.mockResolvedValue({
        ok: true,
        json: async () => {
          throw parseError;
        },
        clone: () => ({
          text: async () => "invalid json content",
        }),
      });

      mocks.logParsingErrorAndThrow.mockImplementation(() => {
        throw new Error("Parse error");
      });

      await expect(
        apiRequest({
          authData: mockAuthData,
          path: "/api/v1/test",
          errorMessage: "Failed to parse",
        }),
      ).rejects.toThrow("Parse error");

      expect(mocks.logParsingErrorAndThrow).toHaveBeenCalledWith(
        parseError,
        "Failed to parse",
        "invalid json content",
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
