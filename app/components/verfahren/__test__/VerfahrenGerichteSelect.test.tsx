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
        { id: "ag-be-id", wert: "Amtsgericht Berlin" },
        { id: "lg-hh-id", wert: "Landgericht Hamburg" },
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

    await user.selectOptions(select, "lg-hh-id");

    expect(handleValueChange).toHaveBeenCalledWith("lg-hh-id");
    expect((select as HTMLSelectElement).value).toBe("lg-hh-id");
  });
});
describe("VerfahrenGerichteSelect", () => {
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
});
