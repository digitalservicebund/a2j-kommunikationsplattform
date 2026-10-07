/**
 * Returns true is `url` is a valid URL that has the same origin as `baseURL`.
 */
export function isSameOriginURL(url: URL | string, baseURL: URL) {
  const parsedURL = URL.parse(url, baseURL);
  return parsedURL?.origin === baseURL.origin;
}

/**
 * If `url` is a valid URL with the same origin as `baseURL`, return a string
 * with only the path, query and fragment parts of `url`, effectively stripping
 * away the origin.
 *
 * If `url` is invalid or points to a different origin, null is returned
 * instead.
 *
 * @example
 *
 * ```ts
 * const baseURL = "http://example.com";
 *
 * toRootRelativeURL("/foo", baseURL) === "/foo"
 * toRootRelativeURL("http://example.com/foo?a=b#c", baseURL) === "/foo?a=b#c"
 * toRootRelativeURL("http://malicious.com/foo", baseURL) === null
 * ````
 */
export function toRootRelativeURLString(
  url: URL | string,
  baseURL: URL,
): string | null {
  const parsedURL = URL.parse(url, baseURL);
  return parsedURL && isSameOriginURL(url, baseURL)
    ? parsedURL.pathname + parsedURL.search + parsedURL.hash
    : null;
}
