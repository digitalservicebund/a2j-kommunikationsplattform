// Not ".p7m" or "application/pkcs7-mime": they usually enclose the Dokument
// itself, which the ERVV doesn't allow
export const SIGNATURDATEI_MIME_TYPES = [
  "application/pkcs7-signature",
  "application/x-pkcs7-signature",
] as const;

export const SIGNATURDATEI_EXTENSIONS = [".p7s", ".pkcs7", ".p7"] as const;

const ACCEPTED_MIME_TYPES = new Set<string>([
  ...SIGNATURDATEI_MIME_TYPES,
  "",
  "application/octet-stream",
]);

export default function isSignaturdatei({
  name,
  type,
}: Pick<File, "name" | "type">): boolean {
  if (!ACCEPTED_MIME_TYPES.has(type)) {
    return false;
  }

  const lowerCaseName = name.toLowerCase();
  return SIGNATURDATEI_EXTENSIONS.some((extension) =>
    lowerCaseName.endsWith(extension),
  );
}
