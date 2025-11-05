// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";
import { dictionaries } from "~/services/translations";
import ErrorBox from "../ErrorBox";

const { errorMessages } = dictionaries["de"];
type Props = ComponentProps<typeof ErrorBox>;

describe("ErrorBox", () => {
  it("renders label, heading, body and redirect link", () => {
    const props = {
      label: "Fehler",
      heading: "Etwas ist schiefgelaufen",
      body: "Ein detaillierter Fehlertext.",
      redirectText: "Zur Startseite",
      redirectUrl: "/",
    };

    render(<ErrorBox {...props} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: props.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(props.body)).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: props.redirectText,
    }) as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe(props.redirectUrl);
  });

  it("does not render link when redirect props are missing", () => {
    const props = {
      label: "Fehler",
      heading: "Etwas ist schiefgelaufen",
      body: "Ein detaillierter Fehlertext.",
    };

    render(<ErrorBox {...props} />);

    expect(screen.queryByRole("link")).toBeNull();
  });

  it("does not render link when redirect props are empty strings", () => {
    const props = {
      label: "Fehler",
      heading: "Etwas ist schiefgelaufen",
      body: "Ein detaillierter Fehlertext.",
      redirectText: "",
      redirectUrl: "",
    };

    render(<ErrorBox {...props} />);

    expect(screen.queryByRole("link")).toBeNull();
  });

  it("does not render link if only one redirect prop is provided", () => {
    const propsA = {
      label: "Fehler",
      heading: "Etwas ist schiefgelaufen",
      body: "Ein detaillierter Fehlertext.",
      redirectText: "Zur Startseite",
    };
    const propsB = {
      label: "Fehler",
      heading: "Etwas ist schiefgelaufen",
      body: "Ein detaillierter Fehlertext.",
      redirectUrl: "/",
    };

    const { rerender } = render(<ErrorBox {...propsA} />);
    expect(screen.queryByRole("link")).toBeNull();

    rerender(<ErrorBox {...propsB} />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders default texts from dictionaries when props are missing", () => {
    // render without providing props (avoid `any` by using `unknown` cast)
    render(<ErrorBox {...({} as unknown as Props)} />);

    expect(
      screen.getByText(errorMessages.GENERIC_ERROR_LABEL),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: errorMessages.GENERIC_ERROR_HEADING,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(errorMessages.GENERIC_ERROR_BODY),
    ).toBeInTheDocument();
  });
});
