// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import VerfahrenTimelineStepCard from "../VerfahrenTimelineStepCard";

describe("VerfahrenTimelineStepCard", () => {
  it("renders timeline label, title, body and edit link", () => {
    render(
      <MemoryRouter>
        <VerfahrenTimelineStepCard
          timelineLabel="01.01.2026"
          title="Dokumente"
          body="2 Dateien hinzugefügt"
          editTo="/verfahren/neu/123/bearbeiten"
          editLabel="Bearbeiten"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("01.01.2026")).toBeInTheDocument();
    expect(screen.getByText("Dokumente")).toBeInTheDocument();
    expect(screen.getByText("2 Dateien hinzugefügt")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Bearbeiten",
      }),
    ).toHaveAttribute("href", "/verfahren/neu/123/bearbeiten");
    expect(screen.getByTestId("timeline-step-connector")).toBeInTheDocument();
  });

  it("does not render connector when showConnector is false", () => {
    render(
      <MemoryRouter>
        <VerfahrenTimelineStepCard
          timelineLabel="01.01.2026"
          title="Klage"
          body="Klage.pdf"
          editTo="/verfahren/neu?verfahrenId=123&einreichungId=456"
          editLabel="Bearbeiten"
          showConnector={false}
        />
      </MemoryRouter>,
    );

    expect(
      screen.queryByTestId("timeline-step-connector"),
    ).not.toBeInTheDocument();
  });

  it("renders custom icon class and ReactNode body", () => {
    const { container } = render(
      <MemoryRouter>
        <VerfahrenTimelineStepCard
          timelineLabel="02.01.2026"
          title="Details"
          body={<span>Dynamischer Inhalt</span>}
          editTo="/verfahren/neu/123/bearbeiten"
          editLabel="Bearbeiten"
          iconClassName="kern-icon--edit"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Dynamischer Inhalt")).toBeInTheDocument();
    expect(container.querySelector(".kern-icon--edit")).toBeInTheDocument();
  });
});
