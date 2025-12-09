import { describe, expect, it } from "vitest";
import { buildSearchParams } from "~/util/buildSearchParams";

describe("buildSearchParams", () => {
  it("converts object to URLSearchParams", () => {
    const params = buildSearchParams({ optionOne: "testOne", optionTwo: 123 });
    expect(params.get("optionOne")).toBe("testOne");
    expect(params.get("optionTwo")).toBe("123");
  });

  it("excludes undefined values", () => {
    const params = buildSearchParams({
      optionOne: "testOne",
      optionTwo: undefined,
    });
    expect(params.has("optionTwo")).toBe(false);
  });

  it("excludes null values", () => {
    const params = buildSearchParams({ optionOne: "testOne", optionTwo: null });
    expect(params.has("optionTwo")).toBe(false);
  });

  it("excludes empty strings", () => {
    const params = buildSearchParams({ optionOne: "testOne", optionTwo: "" });
    expect(params.has("optionTwo")).toBe(false);
  });

  it("excludes object values", () => {
    const params = buildSearchParams({
      optionOne: "testOne",
      optionTwo: { nested: true },
    });
    expect(params.has("optionTwo")).toBe(false);
  });
});
