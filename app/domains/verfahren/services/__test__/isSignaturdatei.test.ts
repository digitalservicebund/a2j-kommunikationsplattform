import { describe, expect, it } from "vitest";
import isSignaturdatei from "../isSignaturdatei";

describe("isSignaturdatei", () => {
  it.each([
    ["application/pkcs7-signature", "signatur.p7s"],
    ["application/x-pkcs7-signature", "signatur.p7s"],
    ["", "signatur.p7"],
    ["application/octet-stream", "SIGNATUR.PKCS7"],
  ])("accepts a file of type %j named %s", (type, name) => {
    expect(isSignaturdatei({ name, type })).toBe(true);
  });

  it.each([
    ["application/pdf", "signatur.p7s"],
    ["application/pkcs7-mime", "Klageschrift.pdf.p7m"],
    ["application/pkcs7-signature", "signatur.bin"],
    ["", "Klageschrift.pdf.p7m"],
    ["application/octet-stream", "signatur"],
  ])("rejects a file of type %j named %s", (type, name) => {
    expect(isSignaturdatei({ name, type })).toBe(false);
  });
});
