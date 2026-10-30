/**
 * Names a Signaturdatei after the Dokument it signs, keeping its own extension, e.g. "Klageschrift.pdf.p7s".
 * The same file convention is used by beA when exporting signature files,
 * see: https://onlinehilfe.bnotk.de/einrichtungen/zertifizierungsstelle/bea/erzeugung-sgnaturdatei-mit-bea.html
 */
export default function buildSignaturdateiName(
  dokumentName: string,
  signaturdateiName: string,
): string {
  const extension = /\.[^.]+$/.exec(signaturdateiName)?.[0] ?? "";
  return `${dokumentName}${extension.toLowerCase()}`;
}
