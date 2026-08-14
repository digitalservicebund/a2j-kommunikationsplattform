import {
  getBeteiligteByRoleCode,
  getBeteiligteDisplayName,
  getProzessbevollmaechtigteByReferenz,
} from "~/domains/verfahren/beteiligteByRole";
import {
  formatAnschrift,
  formatKontakt,
  getBeteiligteAnschrift,
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "~/domains/verfahren/beteiligteContactInfo";
import type { Verfahren } from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import { ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE } from "~/domains/verfahren/verfahrenCodeConstants";

export type BeteiligteSummaryItem = {
  id: string;
  name: string | null;
  anschrift: string | null;
  kontakt: string | null;
  prozessbevollmaechtigte: {
    name: string | null;
    aktenzeichen: string | null;
  }[];
};

export function buildBeteiligteSummaryItems(
  beteiligungen: Verfahren["beteiligungen"],
  roleCode: string,
): BeteiligteSummaryItem[] {
  const beteiligte = getBeteiligteByRoleCode(beteiligungen, roleCode);

  const anwalt = getProzessbevollmaechtigteByReferenz(
    beteiligungen,
    ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
    roleCode,
  );
  const prozessbevollmaechtigte =
    anwalt && "bezeichnung" in anwalt
      ? [{ name: anwalt.bezeichnung ?? null, aktenzeichen: null }]
      : [];

  return beteiligte.map((beteiligung) => ({
    id: beteiligung.id,
    name: getBeteiligteDisplayName(beteiligung) ?? null,
    anschrift: formatAnschrift(getBeteiligteAnschrift(beteiligung)),
    kontakt: formatKontakt(
      getBeteiligteEmail(beteiligung),
      getBeteiligteTelefon(beteiligung),
    ),
    prozessbevollmaechtigte,
  }));
}
