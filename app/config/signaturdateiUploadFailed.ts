// Marks the Einreichung whose Dokument was uploaded, but not its
// Signaturdatei, e.g. "?signaturdateiFehlgeschlagen={einreichungId}"
export const SIGNATURDATEI_UPLOAD_FAILED_PARAM = "signaturdateiFehlgeschlagen";

export function buildSignaturdateiUploadFailedPath(
  path: string,
  einreichungId: string,
): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${SIGNATURDATEI_UPLOAD_FAILED_PARAM}=${encodeURIComponent(einreichungId)}`;
}
