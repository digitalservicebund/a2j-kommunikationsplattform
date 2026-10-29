export type ZovGericht = {
  code: string;
  name: string;
};

/**
 * Courts reachable via the ZOV Eingabesystem. Matched against the KomPla
 * Gerichte code list by `code` to find courts that support both systems.
 */
// TODO: replace placeholders with the real ZOV court list
export const ZOV_GERICHTE: readonly ZovGericht[] = [
  { code: "H1101", name: "Amtsgericht Bremen" },
  { code: "Z0001", name: "Amtsgericht Hamburg" },
];

// TODO: set the URL of the ZOV Eingabesystem once it is known
export const ZOV_EINGABESYSTEM_URL = "";
