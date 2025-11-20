// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe } from "vitest";
import { VerfahrenList } from "~/components/verfahren/VerfahrenList";
import { Verfahren } from "~/routes/verfahren/_index";

const mockVerfahren: Verfahren[] = [
  {
    id: "1",
    aktenzeichen: "AZ-123",
    status: "Erstellt",
    status_changed: "",
    eingereicht_am: "",
    gericht_name: null,
  },
  {
    id: "2",
    aktenzeichen: "AZ-456",
    status: "Eingereicht",
    status_changed: "",
    eingereicht_am: "",
    gericht_name: null,
  },
];

describe("VerfahrenList", () => {
  it("renders correctly with given verfahren items", () => {
    const { getByText } = render(
      <MemoryRouter>
        <VerfahrenList verfahrenItems={mockVerfahren} isLoading={false} />
      </MemoryRouter>,
    );

    expect(getByText("AZ-123")).toBeInTheDocument();
    expect(getByText("AZ-456")).toBeInTheDocument();
  });

  it("renders loading skeletons when isLoading is true", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <VerfahrenList verfahrenItems={[]} isLoading={true} />
      </MemoryRouter>,
    );

    expect(getAllByTestId("verfahren-tile-skeleton")).toHaveLength(4);
  });
});
