// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTestTranslations } from "tests/utils/translationsUtil";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VerfahrenKanzleiformSelect, {
  buildKanzleiformOptions,
  type KanzleiformSelectItem,
} from "../VerfahrenKanzleiformSelect";

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
        { id: "einzelanwalt-id", wert: "Einzelanwalt" },
        { id: "sozietaet-id", wert: "Sozietät" },
      ]);
    },
  };
});

describe("VerfahrenKanzleiformSelect", () => {
  beforeEach(() => {
    mocks.awaitMode = "resolved";
  });

  it("renders the Suspense fallback while kanzleiformen are pending", () => {
    mocks.awaitMode = "pending";

    renderWithTestTranslations(
      <VerfahrenKanzleiformSelect
        id="kanzleiform"
        label="Kanzleiform"
        kanzleiformenPromise={Promise.resolve([])}
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
      <VerfahrenKanzleiformSelect
        id="kanzleiform"
        label="Kanzleiform"
        kanzleiformenPromise={Promise.resolve([])}
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
