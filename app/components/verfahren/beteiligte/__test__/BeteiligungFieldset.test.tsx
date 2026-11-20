// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import BeteiligungFieldset, {
  BeteiligungFieldValues,
  ReferenceableParteiRolle,
} from "../BeteiligungFieldset";

function renderFieldset(
  defaultValues: Omit<
    BeteiligungFieldValues,
    "kanzleiformCode" | "rechtsformCode"
  >,
  referenceableParteiRollen: ReferenceableParteiRolle[] = [],
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
        referenceableParteiRollen={referenceableParteiRollen}
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
});
