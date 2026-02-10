// @vitest-environment jsdom
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/util/translationsUtil";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTopButton from "../ScrollToTopButton";

describe("ScrollToTopButton", () => {
  const { buttons } = getTestTranslations();

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
  });

  it("does not render when scroll position is less than 300px", () => {
    window.scrollY = 100;
    renderWithTestTranslations(<ScrollToTopButton />);

    const button = screen.queryByRole("button", {
      name: buttons.SCROLL_TO_TOP_BUTTON,
    });
    expect(button).not.toBeInTheDocument();
  });

  it("renders when scroll position is greater than 300px", () => {
    window.scrollY = 400;
    renderWithTestTranslations(<ScrollToTopButton />);

    fireEvent.scroll(window);

    const button = screen.queryByRole("button", {
      name: buttons.SCROLL_TO_TOP_BUTTON,
    });
    expect(button).toBeInTheDocument();
  });

  it("shows button when scrolling down past 300px", () => {
    renderWithTestTranslations(<ScrollToTopButton />);

    expect(
      screen.queryByRole("button", { name: buttons.SCROLL_TO_TOP_BUTTON }),
    ).not.toBeInTheDocument();

    window.scrollY = 400;
    fireEvent.scroll(window);

    expect(
      screen.getByRole("button", { name: buttons.SCROLL_TO_TOP_BUTTON }),
    ).toBeInTheDocument();
  });

  it("hides button when scrolling back up to less than 300px", () => {
    window.scrollY = 400;
    renderWithTestTranslations(<ScrollToTopButton />);

    fireEvent.scroll(window);
    expect(
      screen.getByRole("button", { name: buttons.SCROLL_TO_TOP_BUTTON }),
    ).toBeInTheDocument();

    window.scrollY = 100;
    fireEvent.scroll(window);

    expect(
      screen.queryByRole("button", { name: buttons.SCROLL_TO_TOP_BUTTON }),
    ).not.toBeInTheDocument();
  });

  it("scrolls to top with smooth behavior when clicked", async () => {
    const user = userEvent.setup();
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    window.scrollY = 500;

    renderWithTestTranslations(<ScrollToTopButton />);
    fireEvent.scroll(window);

    const button = screen.getByRole("button", {
      name: buttons.SCROLL_TO_TOP_BUTTON,
    });
    await user.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("has proper accessibility attributes", () => {
    window.scrollY = 400;
    renderWithTestTranslations(<ScrollToTopButton />);
    fireEvent.scroll(window);

    const button = screen.getByRole("button", {
      name: buttons.SCROLL_TO_TOP_BUTTON,
    });
    expect(button).toHaveAttribute("aria-label", buttons.SCROLL_TO_TOP_BUTTON);
    expect(button).toHaveAttribute("title", buttons.SCROLL_TO_TOP_BUTTON);
  });
});
