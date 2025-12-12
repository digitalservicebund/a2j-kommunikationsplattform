// @vitest-environment jsdom
import { MemoryRouter } from "react-router";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/util/translationsUtil";
import { beforeEach, it, vi } from "vitest";
import { VerfahrenLoadMoreButton } from "~/components/verfahren/VerfahrenLoadMoreButton";

describe("VerfahrenLoadMoreButton", () => {
  let onLoadMore: ReturnType<typeof vi.fn>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    onLoadMore = vi.fn();
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
