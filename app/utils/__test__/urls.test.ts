import { describe, expect } from "vitest";
import { isSameOriginURL, toRootRelativeURLString } from "../urls";

const baseURL = new URL("http://example.com/");

describe("isSameOriginURL", () => {
  it("returns true if the URL shares the origin with the base URL", () => {
    const url = new URL("http://example.com/foo");
    expect(isSameOriginURL(url, baseURL)).toBe(true);
  });

  it("returns false if the URL has a different origin", () => {
    const url = new URL("http://malicous-website.com/foo");
    expect(isSameOriginURL(url, baseURL)).toBe(false);
  });

  it("accepts root-relative URL strings", () => {
    const url = "/foo";
    expect(isSameOriginURL(url, baseURL)).toBe(true);
  });

  it("accepts absolute URL strings", () => {
    const url = "https://malicious-website.com/";
    expect(isSameOriginURL(url, baseURL)).toBe(false);
  });

  it("returns false for scheme-less cross-origin URL string", () => {
    const url = "//malicous-website.com/foo";
    expect(isSameOriginURL(url, baseURL)).toBe(false);
  });
});

describe("toRootRelativeURLString", () => {
  it("returns the URL path, query and fragment if it has the same origin", () => {
    const url = new URL("http://example.com/foo?a=b#c");
    expect(toRootRelativeURLString(url, baseURL)).toBe("/foo?a=b#c");
  });

  it("returns null if the URL has a different origin", () => {
    const url = new URL("https://malicious-website.com/foo?a=b#c");
    expect(toRootRelativeURLString(url, baseURL)).toBe(null);
  });

  it("returns false for scheme-less cross-origin URL string", () => {
    const url = "//malicous-website.com/foo";
    expect(toRootRelativeURLString(url, baseURL)).toBe(null);
  });
});
