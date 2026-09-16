import { CodeWert } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import { Rolle } from "~/domains/verfahren/entities/beteiligung/rollen.entity";
import {
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/services/beteiligteByRole";

export function makeRolle(params?: Partial<Rolle>): Rolle {
  return {
    id: "c53dd226-7bd9-4da5-19da-5302595a9469",
    rollennummer: "75ea4dbc-4073-40bb-b529-955d414396c7",
    rollenbezeichnung: {
      id: "81b65e37-7790-44c6-92b8-858a842dacbc",
      wert: "Kläger(in)",
      code: ROLE_CODE_KLAEGERIN,
    },
    geschaeftszeichen: null,
    referenz: null,
    ...params,
  };
}

export function makeKlaegerinRolle(
  params?: Omit<Partial<Rolle>, "rollenbezeichnung">,
) {
  return makeRolle({
    ...params,
    rollenbezeichnung: makeKlaegerinRollenbeschreibung(),
  });
}

export function makeBeklagteRolle(
  params?: Omit<Partial<Rolle>, "rollenbezeichnung">,
) {
  return makeRolle({
    ...params,
    rollenbezeichnung: makeBeklagteRollenbeschreibung(),
  });
}

export function makeKlaegerinRollenbeschreibung(
  params?: Omit<Partial<CodeWert>, "code">,
): CodeWert {
  return {
    id: "81b65e37-7790-44c6-92b8-858a842dacbc",
    wert: "Kläger(in)",
    code: ROLE_CODE_KLAEGERIN,
    ...params,
  };
}

export function makeBeklagteRollenbeschreibung(
  params?: Omit<Partial<CodeWert>, "code">,
): CodeWert {
  return {
    id: "8b764709-aa24-46d2-9d90-f4de86cb3280",
    wert: "Beklagte(r)",
    code: ROLE_CODE_BEKLAGTE,
    ...params,
  };
}
