/**
 * Returns a Rollennummer derived from the Rollenbezeichnung code and a number
 * uniquely identifying the Beteiligung within the parent Verfahren.
 */
export default function generateRollennummer(
  beteiligungNumber: number,
  rollenbezeichnungCode: string,
): string {
  const paddedBeteiligungNumber = String(beteiligungNumber).padStart(3, "0");
  return `${paddedBeteiligungNumber}:${rollenbezeichnungCode}`;
}
