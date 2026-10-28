import { Locator, Page } from "@playwright/test";

/**
 * Locates the element with role "definition" (usually a `<dd>`) associated
 * with the "term" element (usually a `<dt>`) with the given label.
 *
 * For example, given the following markup:
 *
 * ```html
 * <dl>
 *   <dt>Color</dt>
 *   <dd>Red</dd>
 *   <dt>Shape</dt>
 *   <dd>Round</dd>
 * </dl>
 * ```
 *
 * The following assertions would pass:
 *
 * ```ts
 * await expect(getDefinitionByTermLabel("Color")).toHaveText("Red");
 * await expect(getDefinitionByTermLabel("Shape")).toHaveText("Round");
 * ```
 */
export function getDefinitionByTermLabel(
  locator: Locator | Page,
  label: string,
): Locator {
  return locator
    .getByRole("term")
    .and(locator.getByText(label))
    .locator("xpath=following-sibling::*")
    .and(locator.getByRole("definition"))
    .first();
}
