import { Beteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE } from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import {
  getBeteiligteByRoleCode,
  getBeteiligteDisplayName,
  getGeschaeftszeichenByRoleCode,
  getProzessbevollmaechtigteByReferenz,
} from "~/domains/verfahren/services/beteiligteByRole";
import {
  getBeteiligteAnschrift,
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "~/domains/verfahren/services/beteiligteContactInfo";

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

type Anschrift = {
  strasse?: string | null;
  hausnummer?: string | null;
  postleitzahl?: string | null;
  ort?: string | null;
};

export function formatAnschrift(
  anschrift: Anschrift | null | undefined,
): string | null {
  if (!anschrift) {
    return null;
  }

  const strassenzeile = [anschrift.strasse, anschrift.hausnummer]
    .filter(Boolean)
    .join(" ");
  const ortszeile = [anschrift.postleitzahl, anschrift.ort]
    .filter(Boolean)
    .join(" ");

  return [strassenzeile, ortszeile].filter(Boolean).join(", ") || null;
}

function buildProzessbevollmaechtigteSummaryItems(
  prozessbevollmaechtigte: Beteiligung[],
): ProzessbevollmaechtigterSummaryItem[] {
  return prozessbevollmaechtigte.map((p) => ({
    name: getBeteiligteDisplayName(p) ?? null,
    aktenzeichen:
      getGeschaeftszeichenByRoleCode(
        p,
        ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
      ) ?? null,
    anschrift: formatAnschrift(getBeteiligteAnschrift(p)),
    email: getBeteiligteEmail(p) || null,
  }));
}

function buildBeteiligteSummaryItem(
  beteiligung: Beteiligung,
  prozessbevollmaechtigte: Beteiligung[],
): BeteiligteSummaryItem {
  return {
    id: beteiligung.id,
    name: getBeteiligteDisplayName(beteiligung) ?? null,
    anschrift: formatAnschrift(getBeteiligteAnschrift(beteiligung)),
    email: getBeteiligteEmail(beteiligung) || null,
    telefon: getBeteiligteTelefon(beteiligung) || null,
    prozessbevollmaechtigte: buildProzessbevollmaechtigteSummaryItems(
      prozessbevollmaechtigte,
    ),
  };
}

export function buildBeteiligteSummaryItems(
  beteiligungen: Beteiligung[],
  rollenbezeichnungCode: string,
): BeteiligteSummaryItem[] {
  const beteiligte = getBeteiligteByRoleCode(
    beteiligungen,
    rollenbezeichnungCode,
  );

  return beteiligte.map((beteiligung) => {
    const rolle = beteiligung.rollen.find(
      (r) => r.rollenbezeichnung.code === rollenbezeichnungCode,
    )!;

    const prozessbevollmaechtigte = rolle.rollennummer
      ? getProzessbevollmaechtigteByReferenz(beteiligungen, rolle.rollennummer)
      : [];

    return buildBeteiligteSummaryItem(beteiligung, prozessbevollmaechtigte);
  });
}
