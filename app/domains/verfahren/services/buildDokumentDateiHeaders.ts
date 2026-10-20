// Types the browser can render but that can't run scripts. SVG is deliberately
// missing: it's XML and may contain <script>, so it's always downloaded.
const INLINE_CONTENT_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "video/mp4",
  "video/webm",
]);

function isInlineContentType(contentType: string): boolean {
  const mimeType = contentType.split(";")[0].trim().toLowerCase();
  return INLINE_CONTENT_TYPES.has(mimeType);
}

/**
 * Response headers for serving a Dokument's file from the app's own origin.
 *
 * Uploaded files are user content, so anything but a PDF or a PNG/JPEG image
 * is forced to be downloaded — an XML file rendered inline could otherwise run
 * scripts with the user's session. Resource routes don't get the root route's security
 * headers, hence `nosniff` and the sandboxing CSP are set here.
 */
export default function buildDokumentDateiHeaders(
  storageHeaders: Headers,
): Headers {
  const contentType =
    storageHeaders.get("Content-Type") ?? "application/octet-stream";
  const contentDisposition =
    storageHeaders.get("Content-Disposition") ?? "attachment";
  const isInline = isInlineContentType(contentType);

  const headers = new Headers({
    "Content-Type": contentType,
    "Content-Disposition": isInline
      ? contentDisposition
      : contentDisposition.replace(/^\s*inline/i, "attachment"),
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  });

  // Downloaded types are sandboxed in case a browser renders them anyway.
  // Inline types are left out: PDF viewers don't render inside a sandboxed
  // document, and images and videos can't run scripts.
  if (!isInline) {
    headers.set("Content-Security-Policy", "default-src 'none'; sandbox");
  }

  const contentLength = storageHeaders.get("Content-Length");
  const isEncoded = storageHeaders.has("Content-Encoding");
  if (contentLength && !isEncoded) {
    headers.set("Content-Length", contentLength);
  }

  return headers;
}
