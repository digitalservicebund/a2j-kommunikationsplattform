// @vitest-environment jsdom

import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { makeEinzelanwaltKanzleiform } from "~tests/utils/factories/kanzleiform";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil";
import { BeteiligungFieldValuesSchema } from "../BeteiligungFieldset";
import VerfahrenCreationBeteiligungSeiteFieldset, {
  BeteiligungFieldsetItem,
  VerfahrenCreationBeteiligungSeiteFieldsetProps,
} from "../VerfahrenCreationBeteiligungSeiteFieldset";

const t = getTestTranslations().routes.verfahrenNeu.beteiligte.form;

function makeParteiItem(
  key: number,
  rollenbezeichnungCode: string,
  rollennummer: string | null = `00${key}:${rollenbezeichnungCode}`,
): BeteiligungFieldsetItem {
  return {
    key,
    defaultValues: BeteiligungFieldValuesSchema.parse({
      beteiligtenart: "natuerlichePerson",
      rollen: [{ rollennummer, rollenbezeichnungCode }],
    }),
  };
}

function makeProzessbevollmaechtigteItem(
  key: number,
  referenz: string[] = [],
): BeteiligungFieldsetItem {
  return {
    key,
    defaultValues: BeteiligungFieldValuesSchema.parse({
      beteiligtenart: "raKanzlei",
      rollen: [
        {
          rollennummer: `00${key}:${ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE}`,
          rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
          referenz,
        },
      ],
    }),
  };
}

function renderSeite(
  props: Partial<VerfahrenCreationBeteiligungSeiteFieldsetProps> = {},
) {
  const { container } = renderWithTestTranslations(
    <form>
      <VerfahrenCreationBeteiligungSeiteFieldset
        title="Seite"
        items={[]}
        parteiRollenbezeichnungCode={ROLLENBEZEICHNUNG_CODE_KLAEGERIN}
        kanzleiformen={[makeEinzelanwaltKanzleiform()]}
        rechtsformen={[]}
        onAddPartei={vi.fn()}
        onAddProzessbevollmaechtigte={vi.fn()}
        {...props}
      />
    </form>,
  );
  const form = container.querySelector("form")!;
  return { getFormData: () => new FormData(form) };
}

function getItemTitles() {
  return screen
    .queryAllByRole("heading", { level: 4 })
    .map((heading) => heading.textContent);
}

describe(VerfahrenCreationBeteiligungSeiteFieldset, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the title as the label of the Seite", () => {
    renderSeite({ title: "Klagendenseite" });

    expect(
      screen.getByRole("group", { name: "Klagendenseite" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Klagendenseite" }),
    ).toBeInTheDocument();
  });

  it("renders no Beteiligungen if there are no items", () => {
    renderSeite();

    expect(getItemTitles()).toEqual([]);
  });

  it("numbers Parteien and Prozessbevollmächtigte separately in item order", () => {
    renderSeite({
      items: [
        makeParteiItem(0, ROLLENBEZEICHNUNG_CODE_KLAEGERIN),
        makeProzessbevollmaechtigteItem(1),
        makeParteiItem(2, ROLLENBEZEICHNUNG_CODE_KLAEGERIN),
        makeProzessbevollmaechtigteItem(3),
      ],
    });

    expect(getItemTitles()).toEqual([
      t.klagendePartei.title.replace("{{number}}", "1"),
      t.prozessbevollmaechtigte.title.replace("{{number}}", "1"),
      t.klagendePartei.title.replace("{{number}}", "2"),
      t.prozessbevollmaechtigte.title.replace("{{number}}", "2"),
    ]);
  });

  it("titles Parteien as Beklagte on the Beklagtenseite", () => {
    renderSeite({
      parteiRollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
      items: [makeParteiItem(0, ROLLENBEZEICHNUNG_CODE_BEKLAGTE)],
    });

    expect(getItemTitles()).toEqual([
      t.beklagtePartei.title.replace("{{number}}", "1"),
    ]);
  });

  it("throws if an item has neither the Partei Rolle nor a Prozessbevollmächtigte Rolle", () => {
    // React logs errors thrown during rendering to the console.
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      renderSeite({
        parteiRollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        items: [makeParteiItem(0, ROLLENBEZEICHNUNG_CODE_BEKLAGTE)],
      }),
    ).toThrow("Beteiligung has none of the expected Rollen");
  });

  it("renders each item's fields under the item's key", () => {
    const { getFormData } = renderSeite({
      items: [makeParteiItem(7, ROLLENBEZEICHNUNG_CODE_KLAEGERIN)],
    });

    expect(getFormData().get("beteiligungen[7][rollen][0][rollennummer]")).toBe(
      "007:101",
    );
  });

  it("offers the Parteien of the Seite with a Rollennummer for representation", () => {
    const { getFormData } = renderSeite({
      items: [
        makeParteiItem(0, ROLLENBEZEICHNUNG_CODE_KLAEGERIN),
        makeParteiItem(1, ROLLENBEZEICHNUNG_CODE_KLAEGERIN),
        makeParteiItem(2, ROLLENBEZEICHNUNG_CODE_KLAEGERIN, null),
        makeProzessbevollmaechtigteItem(3, ["001:101"]),
      ],
    });

    const vertretung = screen.getByRole("group", {
      name: t.prozessbevollmaechtigte.title.replace("{{number}}", "1"),
    });
    const checkboxes = within(vertretung).getAllByRole("checkbox");

    expect(
      checkboxes.map((checkbox) => checkbox.getAttribute("value")),
    ).toEqual(["000:101", "001:101"]);
    expect(
      getFormData().getAll("beteiligungen[3][rollen][0][referenz][]"),
    ).toEqual(["001:101"]);
  });

  it("calls onAddPartei with the Partei Rollenbezeichnung of the Seite", async () => {
    const user = userEvent.setup();
    const onAddPartei = vi.fn();
    renderSeite({
      parteiRollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
      onAddPartei,
    });

    await user.click(screen.getByRole("button", { name: t.addPartei }));

    expect(onAddPartei).toHaveBeenCalledExactlyOnceWith(
      ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    );
  });

  it("calls onAddProzessbevollmaechtigte with the Partei Rollenbezeichnung of the Seite", async () => {
    const user = userEvent.setup();
    const onAddProzessbevollmaechtigte = vi.fn();
    renderSeite({
      parteiRollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
      onAddProzessbevollmaechtigte,
    });

    await user.click(
      screen.getByRole("button", { name: t.addProzessbevollmaechtigte }),
    );

    expect(onAddProzessbevollmaechtigte).toHaveBeenCalledExactlyOnceWith(
      ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    );
  });
});
