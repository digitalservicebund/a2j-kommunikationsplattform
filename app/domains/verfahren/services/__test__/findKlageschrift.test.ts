import { describe, expect, it } from "vitest";
import findKlageschrift from "../findKlageschrift";

describe("findKlageschrift", () => {
  it("finds the Schriftstück even when other Dokumente are listed first", () => {
    const klageschrift = { id: "d-2", typ: "SCHRIFTSTUECK" } as const;

    expect(
      findKlageschrift([
        { id: "d-1", typ: "XJUSTIZ" },
        klageschrift,
        { id: "d-3", typ: "ANHANG" },
      ]),
    ).toBe(klageschrift);
  });

  it("finds nothing once the Klageschrift has been deleted, even if other Dokumente remain", () => {
    expect(
      findKlageschrift([
        { id: "d-1", typ: "XJUSTIZ" },
        { id: "d-3", typ: "ANHANG" },
      ]),
    ).toBeUndefined();
  });
});
