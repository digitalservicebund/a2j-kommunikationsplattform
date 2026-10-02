import { CodeWert } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";

export function makeGericht(params?: Partial<CodeWert>): CodeWert {
  return {
    id: "78355359-57e9-31bb-8366-7bda03795c15",
    code: "D2601",
    wert: "Amtsgericht München",
    ...params,
  };
}
