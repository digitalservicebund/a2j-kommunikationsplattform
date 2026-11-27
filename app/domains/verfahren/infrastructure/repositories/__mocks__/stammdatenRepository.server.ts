import { vi } from "vitest";
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
//
// The functions are spies returning sample Codelisten by default, which
// tests can override (e.g., with `mockResolvedValue`).

function generateId(code: string) {
  return `id-${code}`;
}

function codeliste<T>(elemente: T[]): Promise<Codeliste<T>> {
  return Promise.resolve({
    listeVersion: "1",
    elemente,
  });
}

export const fetchAnschriftstypen = vi.fn(() =>
  codeliste<Anschriftstyp>([
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
  ]),
);

export const fetchGerichte = vi.fn(() =>
  codeliste<Gericht>([
    {
      id: generateId("H1101"),
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
  ]),
);

export const fetchKanzleiformen = vi.fn(() =>
  codeliste<Kanzleiform>([
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
  ]),
);

export const fetchRechtsformen = vi.fn(() =>
  codeliste<Rechtsform>([
    {
      id: generateId("GmbH"),
      wert: "GmbH",
      code: "GmbH",
    },
  ]),
);

export const fetchRollenbezeichnungen = vi.fn(() =>
  codeliste<Rollenbezeichnung>([
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
  ]),
);

export const fetchStaaten = vi.fn(() =>
  codeliste<Staat>([
    {
      id: generateId(STAAT_CODE_DEUTSCHLAND),
      wert: "Deutschland",
      code: STAAT_CODE_DEUTSCHLAND,
    },
  ]),
);

export const fetchTelekommunikationsarten = vi.fn(() =>
  codeliste<Telekommunikationsart>([
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
  ]),
);
