import { describe, expect, test } from "vitest";
import formatDokumentSize from "../formatDokumentSize";

describe("formatDokumentSize", () => {
  test("formats bytes as KB with two decimals", () => {
    expect(formatDokumentSize(1200)).toBe("1.20 KB");
  });

  test("formats zero bytes", () => {
    expect(formatDokumentSize(0)).toBe("0.00 KB");
  });
});
