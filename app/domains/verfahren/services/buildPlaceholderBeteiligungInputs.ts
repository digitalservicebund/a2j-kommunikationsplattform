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

/**
 * Placeholder value used for Beteiligung fields where a value is required, but
 * no sensible default can be given. `VerfahrenCreationBeteiligungenForm` makes
 * sure to not display this value to the user.
 */
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
  // The API requires at least a "Kläger(in)" and a "Beklagte(r)". For
  // convenience, also add a "Prozessbevollmächtigte(r)" on the
  // Klagendenseite by default.

  const rollenbezeichnungIds = {
    klaegerin: resolveCodeWertId(
      rollenbezeichnungen,
      ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
    ),
    beklagte: resolveCodeWertId(
      rollenbezeichnungen,
      ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    ),
    prozessbevollmaechtigte: resolveCodeWertId(
      rollenbezeichnungen,
      ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
    ),
  };

  const rollennummern = {
    klagendePartei: generateRollennummer(0, ROLLENBEZEICHNUNG_CODE_KLAEGERIN),
    klagendeParteiAnwalt: generateRollennummer(
      1,
      ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
    ),
    beklagtePartei: generateRollennummer(1, ROLLENBEZEICHNUNG_CODE_BEKLAGTE),
  };

  return [
    {
      beteiligtenart: "natuerlichePerson",
      rollen: [
        {
          rollennummer: rollennummern.klagendePartei,
          rollenbezeichnungId: rollenbezeichnungIds.klaegerin,
          referenz: [],
        },
      ],
      nachname: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
    },
    {
      beteiligtenart: "raKanzlei",
      rollen: [
        {
          rollennummer: rollennummern.klagendeParteiAnwalt,
          rollenbezeichnungId: rollenbezeichnungIds.prozessbevollmaechtigte,
          referenz: [rollennummern.klagendePartei],
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
          rollennummer: rollennummern.beklagtePartei,
          rollenbezeichnungId: rollenbezeichnungIds.beklagte,
          referenz: [],
        },
      ],
      nachname: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
    },
  ];
}
