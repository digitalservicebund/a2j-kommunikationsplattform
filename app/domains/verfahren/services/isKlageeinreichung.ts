import {
  type Einreichung,
  KLAGEEINREICHUNG_NAME,
} from "~/domains/verfahren/entities/einreichung/einreichung.entity";

export default function isKlageeinreichung(
  einreichung: Pick<Einreichung, "name">,
): boolean {
  return einreichung.name === KLAGEEINREICHUNG_NAME;
}
