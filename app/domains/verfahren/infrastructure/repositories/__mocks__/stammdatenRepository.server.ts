import {
  Anschriftstyp,
  ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT,
  ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
} from "~/domains/verfahren/entities/codelisten/anschriftstyp.entity";
import { Codeliste } from "~/domains/verfahren/entities/codelisten/codeliste.entity";
import { Gericht } from "~/domains/verfahren/entities/codelisten/gericht.entity";
import {
  Kanzleiform,
  KANZLEIFORM_CODE_EINZELANWALT,
  KANZLEIFORM_CODE_SOZIETAET,
} from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import {
  Rollenbezeichnung,
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import {
  Staat,
  STAAT_CODE_DEUTSCHLAND,
} from "~/domains/verfahren/entities/codelisten/staat.entity";
import {
  Telekommunikationsart,
  TELEKOMMUNIKATIONSART_CODE_EMAIL,
  TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
} from "~/domains/verfahren/entities/codelisten/telekommunikationsart";

// The default mock implementation of `stammdatenRepository.server.ts`.
// Used automatically when you `vi.mock()` the original module without
// specifying an implementation.

function generateId(code: string) {
  return `id-${code}`;
}

function codeliste<T>(elemente: T[]): Codeliste<T> {
  return {
    listeVersion: "1",
    elemente,
  };
}

export async function fetchAnschriftstypen(): Promise<
  Codeliste<Anschriftstyp>
> {
  return codeliste([
    {
      id: generateId(ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT),
      wert: "Dienst-/Geschäftsanschrift",
      code: ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
    },
    {
      id: generateId(ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT),
      wert: "Dienst-/Geschäftsanschrift",
      code: ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT,
    },
  ]);
}

export async function fetchGerichte(): Promise<Codeliste<Gericht>> {
  return codeliste([
    {
      id: generateId("H1101"),
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
  ]);
}

export async function fetchKanzleiformen(): Promise<Codeliste<Kanzleiform>> {
  return codeliste([
    {
      id: generateId(KANZLEIFORM_CODE_EINZELANWALT),
      wert: "Einzelanwalt",
      code: KANZLEIFORM_CODE_EINZELANWALT,
    },
    {
      id: generateId(KANZLEIFORM_CODE_SOZIETAET),
      wert: "Sozietät",
      code: KANZLEIFORM_CODE_SOZIETAET,
    },
  ]);
}

export async function fetchRechtsformen(): Promise<Codeliste<Rechtsform>> {
  return codeliste([
    {
      id: generateId("GmbH"),
      wert: "GmbH",
      code: "GmbH",
    },
  ]);
}

export async function fetchRollenbezeichnungen(): Promise<
  Codeliste<Rollenbezeichnung>
> {
  return codeliste([
    {
      id: generateId(ROLLENBEZEICHNUNG_CODE_KLAEGERIN),
      wert: "Klägerin",
      code: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
    },
    {
      id: generateId(ROLLENBEZEICHNUNG_CODE_BEKLAGTE),
      wert: "Beklagte",
      code: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    },
    {
      id: generateId(ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE),
      wert: "Prozessbevollmächtigte",
      code: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
    },
  ]);
}

export async function fetchStaaten(): Promise<Codeliste<Staat>> {
  return codeliste([
    {
      id: generateId(STAAT_CODE_DEUTSCHLAND),
      wert: "Deutschland",
      code: STAAT_CODE_DEUTSCHLAND,
    },
  ]);
}

export async function fetchTelekommunikationsarten(): Promise<
  Codeliste<Telekommunikationsart>
> {
  return codeliste([
    {
      id: generateId(TELEKOMMUNIKATIONSART_CODE_EMAIL),
      wert: "E-Mail",
      code: TELEKOMMUNIKATIONSART_CODE_EMAIL,
      beschreibung: "",
    },
    {
      id: generateId(TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON),
      wert: "Mobiltelefon",
      code: TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON,
      beschreibung: "",
    },
  ]);
}
