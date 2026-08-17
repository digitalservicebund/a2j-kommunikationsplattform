import {
  getBeteiligteByRoleCode,
  getBeteiligteDisplayName,
  getProzessbevollmaechtigteByReferenz,
} from "~/domains/verfahren/beteiligteByRole";
import {
  formatAnschrift,
  getBeteiligteAnschrift,
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "~/domains/verfahren/beteiligteContactInfo";
import type { Verfahren } from "~/domains/verfahren/loadVerfahrenEinreichungBundle.server";
import { ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE } from "~/domains/verfahren/verfahrenCodeConstants";

export type ProzessbevollmaechtigterSummaryItem = {
  name: string | null;
  aktenzeichen: string | null;
  anschrift: string | null;
  email: string | null;
};

export type BeteiligteSummaryItem = {
  id: string;
  name: string | null;
  anschrift: string | null;
  email: string | null;
  telefon: string | null;
  prozessbevollmaechtigte: ProzessbevollmaechtigterSummaryItem[];
};

type Beteiligung = NonNullable<Verfahren["beteiligungen"]>[number];

function buildSummaryItem(
  beteiligung: Beteiligung,
): Omit<BeteiligteSummaryItem, "prozessbevollmaechtigte"> {
  return {
    id: beteiligung.id,
    name: getBeteiligteDisplayName(beteiligung) ?? null,
    anschrift: formatAnschrift(getBeteiligteAnschrift(beteiligung)),
    email: getBeteiligteEmail(beteiligung) || null,
    telefon: getBeteiligteTelefon(beteiligung) || null,
  };
}

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
      ? [
          {
            name: anwalt.bezeichnung ?? null,
            aktenzeichen: null,
            anschrift: formatAnschrift(getBeteiligteAnschrift(anwalt)),
            email: getBeteiligteEmail(anwalt) || null,
          },
        ]
      : [];

  return beteiligte.map((beteiligung) => ({
    ...buildSummaryItem(beteiligung),
    prozessbevollmaechtigte,
  }));
}
