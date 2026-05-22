// @vitest-environment jsdom
import { MemoryRouter } from "react-router";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/utils/translationsUtil";
import { beforeEach, it, vi } from "vitest";
import { VerfahrenLoadMoreButton } from "../VerfahrenLoadMoreButton";

describe("VerfahrenLoadMoreButton", () => {
  let onLoadMore: ReturnType<typeof vi.fn<() => void>>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    onLoadMore = vi.fn<() => void>();
    const { container } = renderWithTestTranslations(
      <MemoryRouter>
        <VerfahrenLoadMoreButton loadMore={onLoadMore} />
      </MemoryRouter>,
    );
    button = container.querySelector("button")!;
  });

  it("renders a button with correct label", () => {
    const { buttons } = getTestTranslations();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttons.LOAD_MORE_VERFAHREN);
  });

  it("calls loadMore when button is clicked", () => {
    button.click();
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
