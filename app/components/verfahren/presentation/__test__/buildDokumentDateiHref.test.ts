import { describe, expect, it } from "vitest";
import buildDokumentDateiHref from "../buildDokumentDateiHref";

describe("buildDokumentDateiHref", () => {
  it("builds the resource route href for the given disposition", () => {
    expect(
      buildDokumentDateiHref({
        verfahrenId: "v-1",
        einreichungId: "e-1",
        dokumentId: "d-1",
        disposition: "attachment",
      }),
    ).toBe(
      "/verfahren/v-1/einreichungen/e-1/dokumente/d-1/datei?disposition=attachment",
    );
  });

  it("encodes the ids as path segments", () => {
    expect(
      buildDokumentDateiHref({
        verfahrenId: "../v",
        einreichungId: "e/1",
        dokumentId: "d?1",
        disposition: "inline",
      }),
    ).toBe(
      "/verfahren/..%2Fv/einreichungen/e%2F1/dokumente/d%3F1/datei?disposition=inline",
    );
  });
});
