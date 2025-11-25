// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe } from "vitest";
import { VerfahrenList } from "~/components/verfahren/VerfahrenList";
import { Verfahren } from "~/routes/verfahren/_index";

const mockVerfahren: Verfahren[] = [
  {
    id: "1",
    aktenzeichen_gericht: "AZ-123",
    status: "Erstellt",
    status_changed: "2025-03-08T05:00:29.659Z",
    eingereicht_am: "2024-12-29T22:46:29.329Z",
    gericht: {
      id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
      wert: "Landgericht Frankfurt",
      code: "LG_FFM",
    },
    beteiligungen: [],
  },
  {
    id: "2",
    aktenzeichen_gericht: "AZ-456",
    status: "Eingereicht",
    status_changed: "2025-03-08T06:00:29.659Z",
    eingereicht_am: "2024-12-30T22:46:29.329Z",
    gericht: {
      id: "c727131c-0c32-91ba-3eaa-f44405967b6d",
      wert: "Amtsgericht Berlin",
      code: "AG_BER",
    },
    beteiligungen: [],
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
