export const SCHRIFTSTUECK_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const SCHRIFTSTUECK_EXTENSIONS = [".pdf", ".docx"] as const;

const ACCEPTED_MIME_TYPES = new Set<string>([
  ...SCHRIFTSTUECK_MIME_TYPES,
  "",
  "application/octet-stream",
]);

// Whether a file can be uploaded as Schriftstück. Same rule as
// isSignaturdatei: a known other MIME type is refused, otherwise the extension
// decides.
export default function isSchriftstueckDatei({
  name,
  type,
}: Pick<File, "name" | "type">): boolean {
  if (!ACCEPTED_MIME_TYPES.has(type)) {
    return false;
  }

  const lowerCaseName = name.toLowerCase();
  return SCHRIFTSTUECK_EXTENSIONS.some((extension) =>
    lowerCaseName.endsWith(extension),
  );
}
