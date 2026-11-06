import { describe, expect, it } from "vitest";
import isSchriftstueckDatei from "../isSchriftstueckDatei";

const DOCX_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

describe("isSchriftstueckDatei", () => {
  it.each([
    ["application/pdf", "klageschrift.pdf"],
    [DOCX_MIME_TYPE, "klageschrift.docx"],
    ["", "KLAGESCHRIFT.PDF"],
    ["application/octet-stream", "anlage.docx"],
  ])("accepts a file of type %j named %s", (type, name) => {
    expect(isSchriftstueckDatei({ name, type })).toBe(true);
  });

  it.each([
    ["application/pkcs7-signature", "signatur.p7s"],
    ["image/png", "anlage.pdf"],
    ["application/pdf", "anlage.png"],
    ["application/zip", "anlage.zip"],
    ["", "klageschrift.doc"],
    ["application/octet-stream", "klageschrift"],
  ])("rejects a file of type %j named %s", (type, name) => {
    expect(isSchriftstueckDatei({ name, type })).toBe(false);
  });
});
