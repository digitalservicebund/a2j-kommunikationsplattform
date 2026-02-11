// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RefObject } from "react";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/util/translationsUtil";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTopButton from "../ScrollToTopButton";

vi.mock("~/components/hooks/useScrolledPastThreshold", () => ({
  useScrolledPastThreshold: vi.fn(),
}));

import { useScrolledPastThreshold } from "~/components/hooks/useScrolledPastThreshold";

const mockUseScrolledPastThreshold = useScrolledPastThreshold as ReturnType<
  typeof vi.fn
>;

describe("ScrollToTopButton", () => {
  const { buttons } = getTestTranslations();
  let mockRef: RefObject<HTMLHeadingElement>;

  beforeEach(() => {
    mockRef = {
      current: document.createElement("h1"),
    };

    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  it("should not render when not scrolled past threshold", () => {
    mockUseScrolledPastThreshold.mockReturnValue(false);

    const { container } = renderWithTestTranslations(
      <ScrollToTopButton refElement={mockRef} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render when scrolled past threshold", () => {
    mockUseScrolledPastThreshold.mockReturnValue(true);

    renderWithTestTranslations(<ScrollToTopButton refElement={mockRef} />);

    expect(
      screen.getByRole("button", { name: buttons.SCROLL_TO_TOP_BUTTON }),
    ).toBeInTheDocument();
  });

  it("should scroll to top when clicked", async () => {
    const user = userEvent.setup();
    mockUseScrolledPastThreshold.mockReturnValue(true);

    renderWithTestTranslations(<ScrollToTopButton refElement={mockRef} />);

    const button = screen.getByRole("button", {
      name: buttons.SCROLL_TO_TOP_BUTTON,
    });

    await user.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should have correct accessibility attributes", () => {
    mockUseScrolledPastThreshold.mockReturnValue(true);

    renderWithTestTranslations(<ScrollToTopButton refElement={mockRef} />);

    const button = screen.getByRole("button", {
      name: buttons.SCROLL_TO_TOP_BUTTON,
    });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-label", buttons.SCROLL_TO_TOP_BUTTON);
    expect(button).toHaveAttribute("title", buttons.SCROLL_TO_TOP_BUTTON);
  });

  it("should render arrow-up icon", () => {
    mockUseScrolledPastThreshold.mockReturnValue(true);

    const { container } = renderWithTestTranslations(
      <ScrollToTopButton refElement={mockRef} />,
    );

    const icon = container.querySelector(".kern-icon--arrow-up");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("should call useScrolledPastThreshold with refElement", () => {
    mockUseScrolledPastThreshold.mockReturnValue(false);

    renderWithTestTranslations(<ScrollToTopButton refElement={mockRef} />);

    expect(mockUseScrolledPastThreshold).toHaveBeenCalledWith(mockRef);
  });
});
