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
          readinessLabel: "Es liegt ein Problem vor",
          readinessBadgeClass: "danger",
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
          readinessLabel: "Bereit zur Abgabe",
          readinessBadgeClass: "success",
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
          readinessLabel: "Es liegt ein Problem vor",
          readinessBadgeClass: "danger",
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
          readinessLabel: "Wird geprüft",
          readinessBadgeClass: "info",
        }}
        hasValidationIssues={false}
        belegBadgeLabels={belegBadgeLabels}
      />,
    );

    expect(container.querySelector(".kern-loader")).toBeInTheDocument();
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
