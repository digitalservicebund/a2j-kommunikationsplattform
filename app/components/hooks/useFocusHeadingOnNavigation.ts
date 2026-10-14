import { RefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router";

const findFocusTarget = (container: HTMLElement): HTMLElement =>
  container.querySelector("h1") ?? container;

const focusElement = (element: HTMLElement) => {
  // Make the element programmatically focusable without adding it to the tab
  // order. Elements that already define a tabindex keep their value.
  if (!element.hasAttribute("tabindex")) {
    element.setAttribute("tabindex", "-1");
  }
  // <ScrollRestoration> owns the scroll position (top on PUSH, restored on
  // POP), so focusing must not scroll.
  element.focus({ preventScroll: true });
};

/**
 * Moves focus to the first <h1> inside the container (or the container itself
 * if there is none) after each client-side navigation, so screen readers
 * announce the new page.
 *
 * Only pathname changes count as navigations: search param updates and
 * same-URL form submissions keep the focus where the user is. The initial
 * (server-rendered) page load is skipped.
 */
export function useFocusHeadingOnNavigation(
  containerRef: RefObject<HTMLElement | null>,
) {
  const { pathname } = useLocation();
  // Comparing against the previous pathname (instead of tracking the first
  // render) skips hydration and keeps the effect idempotent under StrictMode.
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const container = containerRef.current;
    if (!container) return;
    focusElement(findFocusTarget(container));
  }, [pathname, containerRef]);
}
