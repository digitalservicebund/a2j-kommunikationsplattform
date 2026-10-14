// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import VerfahrenGerichteSelect, {
  buildGerichteOptions,
  type GerichtSelectItem,
} from "../VerfahrenGerichteSelect";

describe("VerfahrenGerichteSelect", () => {
  it("renders options and updates the selected value", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderWithTestTranslations(
      <VerfahrenGerichteSelect
        id="gericht"
        label="Gericht"
        gerichte={[
          { id: "ag-be-id", wert: "Amtsgericht Berlin" },
          { id: "lg-hh-id", wert: "Landgericht Hamburg" },
        ]}
        placeholder="Bitte auswählen"
        onValueChange={handleValueChange}
      />,
    );

    const select = await screen.findByRole("combobox");
    expect(
      screen.getByRole("option", { name: "Amtsgericht Berlin" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Landgericht Hamburg" }),
    ).toBeInTheDocument();

    await user.selectOptions(select, "lg-hh-id");

    expect(handleValueChange).toHaveBeenCalledWith("lg-hh-id");
    expect((select as HTMLSelectElement).value).toBe("lg-hh-id");
  });
});

describe("buildGerichteOptions", () => {
  it("maps id and wert into InputSelect options", () => {
    const gerichte: GerichtSelectItem[] = [
      { id: "ag-k-id", wert: "Amtsgericht Koln" },
      { id: "lg-hh-id", wert: "Landgericht Hamburg" },
    ];

    const options = buildGerichteOptions(gerichte);

    expect(options).toEqual([
      { value: "ag-k-id", label: "Amtsgericht Koln" },
      { value: "lg-hh-id", label: "Landgericht Hamburg" },
    ]);
  });

  it("falls back safely when values are missing", () => {
    const gerichte: GerichtSelectItem[] = [{}, { id: null, wert: null }];

    const options = buildGerichteOptions(gerichte);

    expect(options).toEqual([
      { value: "", label: "Wert fehlt" },
      { value: "", label: "Wert fehlt" },
    ]);
  });
});
