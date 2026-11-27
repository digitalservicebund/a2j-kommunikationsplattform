import { NOT_AVAILABLE_LABEL } from "~/components/verfahren/presentation/placeholders";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { getBeteiligteNamesByRoleCode } from "~/domains/verfahren/services/beteiligteByRole";

/**
 * Returns a short name for a Verfahren that can be used as a display title.
 * The Verfahren's `kurzrubrum` is used if set.
 */
export function getVerfahrenDisplayName({
  kurzrubrum,
  beteiligungen,
}: Pick<Verfahren, "kurzrubrum" | "beteiligungen">): string {
  if (kurzrubrum) {
    return kurzrubrum;
  }

  // If the Verfahren has no Kurzrubrum for quick identification, fall back
  // to displaying the Kläger:innen and Beklagte instead.

  const klaegerinnenNamen = getBeteiligteNamesByRoleCode(
    beteiligungen,
    ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
    NOT_AVAILABLE_LABEL,
  );

  const beklagteNamen = getBeteiligteNamesByRoleCode(
    beteiligungen,
    ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    NOT_AVAILABLE_LABEL,
  );

  return `${klaegerinnenNamen} ./. ${beklagteNamen}`;
}
