import { describe, expect, it } from "vitest";
import buildDokumentDateiHeaders from "../buildDokumentDateiHeaders";

describe("buildDokumentDateiHeaders", () => {
  it("keeps an inline disposition for PDFs, without sandboxing them", () => {
    const headers = buildDokumentDateiHeaders(
      new Headers({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="testfile.pdf"',
        "Content-Length": "1234",
      }),
    );

    expect(Object.fromEntries(headers)).toEqual({
      "content-type": "application/pdf",
      "content-disposition": 'inline; filename="testfile.pdf"',
      "content-length": "1234",
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
    });
  });

  it.each(["image/png", "image/jpeg", "video/mp4", "video/webm"])(
    "keeps an inline disposition for %s",
    (contentType) => {
      const headers = buildDokumentDateiHeaders(
        new Headers({
          "Content-Type": contentType,
          "Content-Disposition": 'inline; filename="foto"',
        }),
      );

      expect(headers.get("Content-Disposition")).toBe(
        'inline; filename="foto"',
      );
      expect(headers.has("Content-Security-Policy")).toBe(false);
    },
  );

  it.each(["application/xml", "text/html; charset=utf-8", "image/svg+xml"])(
    "forces %s to be downloaded and sandboxes it",
    (contentType) => {
      const headers = buildDokumentDateiHeaders(
        new Headers({
          "Content-Type": contentType,
          "Content-Disposition": 'inline; filename="xjustiz.xml"',
        }),
      );

      expect(headers.get("Content-Disposition")).toBe(
        'attachment; filename="xjustiz.xml"',
      );
      expect(headers.get("Content-Security-Policy")).toBe(
        "default-src 'none'; sandbox",
      );
      expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    },
  );

  it("drops Content-Length of an encoded body, which fetch decodes", () => {
    const headers = buildDokumentDateiHeaders(
      new Headers({
        "Content-Type": "application/pdf",
        "Content-Encoding": "gzip",
        "Content-Length": "1234",
      }),
    );

    expect(headers.has("Content-Length")).toBe(false);
    expect(headers.has("Content-Encoding")).toBe(false);
  });

  it("falls back to a download of octet-stream without storage headers", () => {
    const headers = buildDokumentDateiHeaders(new Headers());

    expect(headers.get("Content-Type")).toBe("application/octet-stream");
    expect(headers.get("Content-Disposition")).toBe("attachment");
    expect(headers.has("Content-Length")).toBe(false);
  });
});
