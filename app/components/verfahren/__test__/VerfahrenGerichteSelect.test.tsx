// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VerfahrenGerichteSelect, {
  buildGerichteOptions,
  type GerichtSelectItem,
} from "../VerfahrenGerichteSelect";

const pendingPromise = new Promise<void>(() => {});

const mocks = vi.hoisted(() => ({
  awaitMode: "resolved" as "resolved" | "pending",
}));

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
    Await: ({
      children,
    }: {
      resolve: Promise<unknown>;
      children: (value: unknown) => React.ReactNode;
    }) => {
      if (mocks.awaitMode === "pending") {
        throw pendingPromise;
      }

      return children([
        { code: "AG-BE", wert: "Amtsgericht Berlin" },
        { code: "LG-HH", wert: "Landgericht Hamburg" },
      ]);
    },
  };
});

describe("VerfahrenGerichteSelect", () => {
  beforeEach(() => {
    mocks.awaitMode = "resolved";
  });

  it("renders the Suspense fallback while gerichte are pending", () => {
    mocks.awaitMode = "pending";

    renderWithTestTranslations(
      <VerfahrenGerichteSelect
        id="gericht"
        label="Gericht"
        gerichtePromise={Promise.resolve([])}
        placeholder="Bitte auswählen"
      />,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Bitte auswählen" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("renders loaded options and updates the selected value", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderWithTestTranslations(
      <VerfahrenGerichteSelect
        id="gericht"
        label="Gericht"
        gerichtePromise={Promise.resolve([])}
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

    await user.selectOptions(select, "LG-HH");

    expect(handleValueChange).toHaveBeenCalledWith("LG-HH");
    expect((select as HTMLSelectElement).value).toBe("LG-HH");
  });
});
describe("VerfahrenGerichteSelect", () => {
  describe("buildGerichteOptions", () => {
    it("maps code and wert into InputSelect options", () => {
      const gerichte: GerichtSelectItem[] = [
        { code: "AG-K", wert: "Amtsgericht Koln" },
        { code: "LG-HH", wert: "Landgericht Hamburg" },
      ];

      const options = buildGerichteOptions(gerichte);

      expect(options).toEqual([
        { value: "AG-K", label: "Amtsgericht Koln" },
        { value: "LG-HH", label: "Landgericht Hamburg" },
      ]);
    });

    it("falls back safely when values are missing", () => {
      const gerichte: GerichtSelectItem[] = [{}, { code: null, wert: null }];

      const options = buildGerichteOptions(gerichte);

      expect(options).toEqual([
        { value: "", label: "Wert fehlt" },
        { value: "", label: "Wert fehlt" },
      ]);
    });
  });
});
