// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE } from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import BeteiligungFieldset, {
  BeteiligungFieldValues,
} from "../BeteiligungFieldset";

function renderFieldset(
  defaultValues: Omit<
    BeteiligungFieldValues,
    "kanzleiformCode" | "rechtsformCode"
  >,
  vertretungReferenzOptions?: string[],
) {
  const { container } = renderWithTestTranslations(
    <form>
      <BeteiligungFieldset
        title="Beteiligung"
        beteiligungKey={3}
        defaultValues={{
          kanzleiformCode: null,
          rechtsformCode: null,
          ...defaultValues,
        }}
        kanzleiformen={[]}
        rechtsformen={[]}
        vertretungReferenzOptions={vertretungReferenzOptions}
      />
    </form>,
  );
  return new FormData(container.querySelector("form")!);
}

describe(BeteiligungFieldset, () => {
  it("submits the ID of an existing Beteiligung", () => {
    const formData = renderFieldset({
      id: "beteiligung-1",
      beteiligtenart: "natuerlichePerson",
      rollen: [],
    });

    expect(formData.get("beteiligungen[3][id]")).toBe("beteiligung-1");
  });

  it("does not submit an ID for a new Beteiligung", () => {
    const formData = renderFieldset({
      beteiligtenart: "natuerlichePerson",
      rollen: [],
    });

    expect(formData.has("beteiligungen[3][id]")).toBe(false);
  });

  it("keeps Vertretung Referenzen without a checkbox", () => {
    const formData = renderFieldset(
      {
        beteiligtenart: "raKanzlei",
        rollen: [
          {
            rollennummer: "r2",
            rollenbezeichnungCode:
              ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
            referenz: ["r0", "r1"],
          },
        ],
      },
      ["r0"],
    );

    expect(formData.getAll("beteiligungen[3][rollen][0][referenz][]")).toEqual([
      "r0",
      "r1",
    ]);
  });
});
