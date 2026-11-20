import {
  Kanzleiform,
  KANZLEIFORM_CODE_EINZELANWALT,
} from "../entities/codelisten/kanzleiform.entity";
import {
  Rollenbezeichnung,
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "../entities/codelisten/rollenbezeichnung.entity";
import { BeteiligungInput } from "../infrastructure/schemas/requests/beteiligung.input.schema";
import generateRollennummer from "./generateRollennummer";
import resolveCodeWertId from "./resolveCodeWertId";

export const PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME = "_";

/**
 * Returns the list of placeholder Beteiligungen that should be added to newly
 * created draft Verfahren by default.
 */
export default function buildPlaceholderBeteiligungInputs({
  rollenbezeichnungen,
  kanzleiformen,
}: {
  rollenbezeichnungen: Rollenbezeichnung[];
  kanzleiformen: Kanzleiform[];
}): BeteiligungInput[] {
  return [
    // The API requires at least a "Kläger(in)" and a "Beklagte(r)". For
    // convenience, also add a "Prozessbevollmächtigte(r)" on the Klagendenseite
    // by default.
    {
      beteiligtenart: "natuerlichePerson",
      rollen: [
        {
          rollennummer: generateRollennummer(
            0,
            ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          ),
          rollenbezeichnungId: resolveCodeWertId(
            rollenbezeichnungen,
            ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          ),
          referenz: [],
        },
      ],
      nachname: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
    },
    {
      beteiligtenart: "raKanzlei",
      rollen: [
        {
          rollennummer: generateRollennummer(
            1,
            ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
          ),
          rollenbezeichnungId: resolveCodeWertId(
            rollenbezeichnungen,
            ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
          ),
          referenz: [],
        },
      ],
      bezeichnung: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
      kanzleiformId: resolveCodeWertId(
        kanzleiformen,
        KANZLEIFORM_CODE_EINZELANWALT,
      ),
    },
    {
      beteiligtenart: "natuerlichePerson",
      rollen: [
        {
          rollennummer: generateRollennummer(
            2,
            ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
          ),
          rollenbezeichnungId: resolveCodeWertId(
            rollenbezeichnungen,
            ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
          ),
          referenz: [],
        },
      ],
      nachname: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
    },
  ];
}
