export default function formatDokumentSize(sizeInBytes: number): string {
  return `${(sizeInBytes / 1000).toFixed(2)} KB`;
}
