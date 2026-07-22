/**
 * Returns a random string from the provided strings
 * @param {...string} strings - Variable number of strings to choose from
 * @returns {string} A randomly selected string from the arguments
 */
export function randomString(...strings) {
  const randomIndex =
    crypto.getRandomValues(new Uint32Array(1))[0] % strings.length;
  return strings[randomIndex];
}
