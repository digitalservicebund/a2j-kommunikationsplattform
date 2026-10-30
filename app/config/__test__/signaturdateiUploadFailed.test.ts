import { describe, expect, it } from "vitest";
import { buildSignaturdateiUploadFailedPath } from "../signaturdateiUploadFailed";

describe("buildSignaturdateiUploadFailedPath", () => {
  it.each([
    ["/verfahren/v-1", "/verfahren/v-1?signaturdateiFehlgeschlagen=e-1"],
    [
      "/verfahren/neu/dokumente?verfahren=v-1",
      "/verfahren/neu/dokumente?verfahren=v-1&signaturdateiFehlgeschlagen=e-1",
    ],
  ])("marks the Einreichung on %s", (path, expected) => {
    expect(buildSignaturdateiUploadFailedPath(path, "e-1")).toBe(expected);
  });
});
