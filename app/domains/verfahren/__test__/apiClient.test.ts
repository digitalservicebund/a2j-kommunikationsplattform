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

global.fetch = mocks.fetch;

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
        path: "/api/v1/unused",
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

    it("calls logParsingErrorAndThrow when schema validation fails", async () => {
      mocks.getBearerToken.mockResolvedValue("token");
      const schema = z.object({
        id: z.string().uuid(),
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
