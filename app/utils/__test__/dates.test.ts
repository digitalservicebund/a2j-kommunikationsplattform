import { describe, it } from "vitest";
import { formatDate } from "../dates";

describe("formatDate", () => {
  it("formats a Date using the German short date format", () => {
    const input = new Date("2026-09-14T12:34:56.789Z");
    expect(formatDate(input)).toBe("14.09.2026");
  });

  it("accepts ISO date strings directly", () => {
    const input = "2026-09-14T12:34:56.789Z";
    expect(formatDate(input)).toBe("14.09.2026");
  });
});
