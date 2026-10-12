// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import VerfahrenEinreichungStatusBadge from "../VerfahrenEinreichungStatusBadge";

const belegBadgeLabels = { pending: "Wird geprüft", ready: "Eingegangen" };

describe("VerfahrenEinreichungStatusBadge", () => {
  it("renders nothing while validation issues are already shown via the outcome Alert", () => {
    const { container } = render(
      <VerfahrenEinreichungStatusBadge
        beleg={null}
        readinessPresentation={{
          label: "Es liegt ein Problem vor",
          state: "failed",
          loading: false,
        }}
        hasValidationIssues
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the readiness presentation when there is no Beleg yet", () => {
    render(
      <VerfahrenEinreichungStatusBadge
        beleg={null}
        readinessPresentation={{
          label: "Bereit zur Abgabe",
          state: "done",
          loading: false,
        }}
        hasValidationIssues={false}
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(screen.getByText("Bereit zur Abgabe")).toBeInTheDocument();
  });

  it("prefers the Beleg presentation once a Beleg exists", () => {
    render(
      <VerfahrenEinreichungStatusBadge
        beleg={{ id: "b-1", status: "ERSTELLT" } as never}
        readinessPresentation={{
          label: "Es liegt ein Problem vor",
          state: "failed",
          loading: false,
        }}
        hasValidationIssues
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(screen.getByText(belegBadgeLabels.ready)).toBeInTheDocument();
    expect(
      screen.queryByText("Es liegt ein Problem vor"),
    ).not.toBeInTheDocument();
  });

  it("shows a loader while the Validierungslauf is still running", () => {
    const { container } = render(
      <VerfahrenEinreichungStatusBadge
        beleg={null}
        readinessPresentation={{
          label: "Wird geprüft",
          state: "pending",
          loading: true,
        }}
        hasValidationIssues={false}
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(container.querySelector(".kern-loader")).toBeInTheDocument();
  });

  it("shows no loader for a state that isn't in progress", () => {
    const { container } = render(
      <VerfahrenEinreichungStatusBadge
        beleg={null}
        readinessPresentation={{
          label: "Noch wenige Schritte zur Abgabe",
          state: "attention",
          loading: false,
        }}
        hasValidationIssues={false}
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(container.querySelector(".kern-loader")).not.toBeInTheDocument();
  });

  it("shows a loader while the Beleg is pending, and none once it's ready", () => {
    const { container, rerender } = render(
      <VerfahrenEinreichungStatusBadge
        beleg={{ id: "b-1", status: "AUSSTEHEND" } as never}
        readinessPresentation={null}
        hasValidationIssues={false}
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(screen.getByText(belegBadgeLabels.pending)).toBeInTheDocument();
    expect(container.querySelector(".kern-loader")).toBeInTheDocument();

    rerender(
      <VerfahrenEinreichungStatusBadge
        beleg={{ id: "b-1", status: "ERSTELLT" } as never}
        readinessPresentation={null}
        hasValidationIssues={false}
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(container.querySelector(".kern-loader")).not.toBeInTheDocument();
  });

  it("renders nothing when neither a Beleg nor a readiness presentation is available", () => {
    const { container } = render(
      <VerfahrenEinreichungStatusBadge
        beleg={null}
        readinessPresentation={null}
        hasValidationIssues={false}
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
