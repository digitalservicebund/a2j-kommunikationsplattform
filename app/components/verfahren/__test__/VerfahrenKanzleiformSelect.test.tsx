// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import VerfahrenKanzleiformSelect, {
  buildKanzleiformOptions,
  type KanzleiformSelectItem,
} from "../VerfahrenKanzleiformSelect";

describe("VerfahrenKanzleiformSelect", () => {
  it("renders options and updates the selected value", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderWithTestTranslations(
      <VerfahrenKanzleiformSelect
        id="kanzleiform"
        label="Kanzleiform"
        kanzleiformen={[
          { id: "einzelanwalt-id", wert: "Einzelanwalt" },
          { id: "sozietaet-id", wert: "Sozietät" },
        ]}
        placeholder="Bitte auswählen"
        onValueChange={handleValueChange}
      />,
    );

    const select = await screen.findByRole("combobox");
    expect(
      screen.getByRole("option", { name: "Einzelanwalt" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Sozietät" }),
    ).toBeInTheDocument();

    await user.selectOptions(select, "sozietaet-id");

    expect(handleValueChange).toHaveBeenCalledWith("sozietaet-id");
    expect((select as HTMLSelectElement).value).toBe("sozietaet-id");
  });
});

describe("buildKanzleiformOptions", () => {
  it("maps id and wert into InputSelect options", () => {
    const kanzleiformen: KanzleiformSelectItem[] = [
      { id: "einzelanwalt-id", wert: "Einzelanwalt" },
      { id: "sozietaet-id", wert: "Sozietät" },
    ];

    const options = buildKanzleiformOptions(kanzleiformen);

    expect(options).toEqual([
      { value: "einzelanwalt-id", label: "Einzelanwalt" },
      { value: "sozietaet-id", label: "Sozietät" },
    ]);
  });

  it("falls back safely when values are missing", () => {
    const kanzleiformen: KanzleiformSelectItem[] = [
      {},
      { id: null, wert: null },
    ];

    const options = buildKanzleiformOptions(kanzleiformen);

    expect(options).toEqual([
      { value: "", label: "Wert fehlt" },
      { value: "", label: "Wert fehlt" },
    ]);
  });
});
