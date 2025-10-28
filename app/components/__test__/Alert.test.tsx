// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Alert from "../Alert";

describe("Alert component", () => {
  it("renders the title and has role alert", () => {
    render(
      <MemoryRouter>
        <Alert type="info" title="Heads up" />
      </MemoryRouter>,
    );

    const container = screen.getByRole("alert");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("applies correct type and icon classes for success", () => {
    render(
      <MemoryRouter>
        <Alert type="success" title="Yay" />
      </MemoryRouter>,
    );

    const outer = screen.getByRole("alert");
    expect(outer.className).toMatch(/kern-alert--success/);

    const icon = outer.querySelector(".kern-icon");
    expect(icon).toBeInTheDocument();
    expect(icon?.className).toMatch(/kern-icon--success/);
  });

  it("renders message when provided", () => {
    render(
      <MemoryRouter>
        <Alert type="error" title="Oops" message="Something went wrong" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders redirect link when only redirectUrl and redirectText are provided (no message)", () => {
    const redirectUrl = "/home";
    const redirectText = "Go home";

    render(
      <MemoryRouter>
        <Alert
          type="info"
          title="Note"
          redirectUrl={redirectUrl}
          redirectText={redirectText}
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: redirectText });
    expect(link).toBeInTheDocument();
    expect((link as HTMLAnchorElement).href).toMatch(
      new RegExp(`${redirectUrl}$`),
    );
    const message = document.querySelector(".kern-body");
    expect(message).not.toBeInTheDocument();
  });

  it("renders both message and redirect link when both provided", () => {
    const redirectUrl = "/next";
    const redirectText = "Continue";

    render(
      <MemoryRouter>
        <Alert
          type="warning"
          title="Attention"
          message="Please note"
          redirectUrl={redirectUrl}
          redirectText={redirectText}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Please note")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: redirectText }),
    ).toBeInTheDocument();
  });

  it("does not render body when neither message nor redirect props are provided", () => {
    render(
      <MemoryRouter>
        <Alert type="info" title="Empty" />
      </MemoryRouter>,
    );

    const body = document.querySelector(".kern-alert__body");
    expect(body).toBeNull();
  });
});
