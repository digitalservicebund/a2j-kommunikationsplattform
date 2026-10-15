export type DokumentDateiDisposition = "inline" | "attachment";

type BuildDokumentDateiHrefOptions = {
  verfahrenId: string;
  einreichungId: string;
  dokumentId: string;
  disposition: DokumentDateiDisposition;
};

/**
 * Href of the resource route that redirects to the Dokument's file — either
 * shown in the browser ("inline") or downloaded ("attachment").
 */
export default function buildDokumentDateiHref({
  verfahrenId,
  einreichungId,
  dokumentId,
  disposition,
}: BuildDokumentDateiHrefOptions): string {
  const path = [
    "verfahren",
    verfahrenId,
    "einreichungen",
    einreichungId,
    "dokumente",
    dokumentId,
    "datei",
  ]
    .map(encodeURIComponent)
    .join("/");

  return `/${path}?${new URLSearchParams({ disposition }).toString()}`;
}
