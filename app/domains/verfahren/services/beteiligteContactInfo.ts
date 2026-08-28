import {
  TELEKOMMUNIKATIONSART_CODE_EMAIL,
  TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
} from "~/domains/verfahren/services/verfahrenCodeConstants";

type Anschrift = {
  strasse?: string | null;
  hausnummer?: string | null;
  postleitzahl?: string | null;
  ort?: string | null;
};

type Telekommunikation = {
  telekommunikationsart?: { code?: string | null } | null;
  verbindung?: string | null;
};

type BeteiligteContactInfo = {
  anschriften?: Anschrift[] | null;
  telekommunikation?: Telekommunikation[] | null;
};

export function getBeteiligteAnschrift(
  beteiligung: BeteiligteContactInfo | null | undefined,
): Anschrift | undefined {
  return beteiligung?.anschriften?.[0];
}

function getBeteiligteVerbindungByCode(
  beteiligung: BeteiligteContactInfo | null | undefined,
  telekommunikationsartCode: string,
): string {
  return (
    beteiligung?.telekommunikation?.find(
      (eintrag) =>
        eintrag.telekommunikationsart?.code === telekommunikationsartCode,
    )?.verbindung ?? ""
  );
}

export function getBeteiligteEmail(
  beteiligung: BeteiligteContactInfo | null | undefined,
): string {
  return getBeteiligteVerbindungByCode(
    beteiligung,
    TELEKOMMUNIKATIONSART_CODE_EMAIL,
  );
}

export function getBeteiligteTelefon(
  beteiligung: BeteiligteContactInfo | null | undefined,
): string {
  return getBeteiligteVerbindungByCode(
    beteiligung,
    TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
  );
}
