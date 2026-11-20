import { Rolle } from "~/domains/verfahren/entities/beteiligung/rollen.entity";
import {
  Rollenbezeichnung,
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";

export function makeRolle(params?: Partial<Rolle>): Rolle {
  return {
    id: "c53dd226-7bd9-4da5-19da-5302595a9469",
    rollennummer: "75ea4dbc-4073-40bb-b529-955d414396c7",
    rollenbezeichnung: makeKlaegerinRollenbezeichnung(),
    geschaeftszeichen: null,
    referenz: [],
    ...params,
  };
}

export function makeKlaegerinRolle(
  params?: Omit<Partial<Rolle>, "rollenbezeichnung">,
) {
  return makeRolle({
    ...params,
    rollenbezeichnung: makeKlaegerinRollenbezeichnung(),
  });
}

export function makeBeklagteRolle(
  params?: Omit<Partial<Rolle>, "rollenbezeichnung">,
) {
  return makeRolle({
    ...params,
    rollenbezeichnung: makeBeklagteRollenbezeichnung(),
  });
}

export function makeProzessbevollmeachtigteRolle(
  params?: Omit<Partial<Rolle>, "rollenbezeichnung">,
) {
  return makeRolle({
    ...params,
    rollenbezeichnung: makeProzessbevollmaechtigteRollenbezeichnung(),
  });
}

export function makeKlaegerinRollenbezeichnung(
  params?: Omit<Partial<Rollenbezeichnung>, "code">,
): Rollenbezeichnung {
  return {
    id: "81b65e37-7790-44c6-92b8-858a842dacbc",
    wert: "Kläger(in)",
    code: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
    ...params,
  };
}

export function makeBeklagteRollenbezeichnung(
  params?: Omit<Partial<Rollenbezeichnung>, "code">,
): Rollenbezeichnung {
  return {
    id: "8b764709-aa24-46d2-9d90-f4de86cb3280",
    wert: "Beklagte(r)",
    code: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    ...params,
  };
}

export function makeProzessbevollmaechtigteRollenbezeichnung(
  params?: Omit<Partial<Rollenbezeichnung>, "code">,
): Rollenbezeichnung {
  return {
    id: "8b764709-aa24-46d2-9d90-f4de86cb3280",
    wert: "Prozessbevollmächtigte(r)",
    code: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
    ...params,
  };
}
