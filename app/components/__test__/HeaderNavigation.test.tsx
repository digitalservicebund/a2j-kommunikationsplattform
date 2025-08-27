// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { it } from "vitest";
import Navigation from "~/components/Navigation";

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    Form: ({ children, ...props }: React.ComponentProps<"form">) => (
      <form {...props}>{children}</form>
    ),
  };
});

describe("Navigation", () => {
  it("should render navigation links and a logout button", () => {
    const { getByText, getAllByRole } = render(<Navigation />);
    expect(getByText("Verfahren")).toBeInTheDocument();
    expect(getByText("Mitteilungen")).toBeInTheDocument();
    expect(getByText("Kalender")).toBeInTheDocument();
    expect(getByText("Profil")).toBeInTheDocument();
    expect(getByText("Abmelden")).toBeInTheDocument();
    expect(getAllByRole("listitem")).toHaveLength(5);
  });
});
