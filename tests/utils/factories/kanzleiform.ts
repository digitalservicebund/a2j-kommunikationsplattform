import {
  Kanzleiform,
  KANZLEIFORM_CODE_EINZELANWALT,
} from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";

export function makeEinzelanwaltKanzleiform(
  params?: Omit<Partial<Kanzleiform>, "code">,
): Kanzleiform {
  return {
    id: "fec5a44f-bdba-4815-85a6-9e613e041358",
    wert: "Einzelanwalt",
    code: KANZLEIFORM_CODE_EINZELANWALT,
    ...params,
  };
}
