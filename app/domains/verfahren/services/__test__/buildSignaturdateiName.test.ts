import { describe, expect, it } from "vitest";
import buildSignaturdateiName from "../buildSignaturdateiName";

describe("buildSignaturdateiName", () => {
  it.each([
    ["signatur.p7s", "Klageschrift.pdf.p7s"],
    ["Klageschrift.pdf.pkcs7", "Klageschrift.pdf.pkcs7"],
    ["signatur.p7", "Klageschrift.pdf.p7"],
    ["SIGNATUR.P7S", "Klageschrift.pdf.p7s"],
  ])("names %s after the Dokument", (signaturdateiName, expected) => {
    expect(buildSignaturdateiName("Klageschrift.pdf", signaturdateiName)).toBe(
      expected,
    );
  });
});
