import { describe, expect, it } from "vitest";
import buildGerichtAuswahlOptions from "../buildGerichtAuswahlOptions";

describe("buildGerichtAuswahlOptions", () => {
  it("marks a KomPla court without ZOV counterpart as KomPla only", () => {
    expect(
      buildGerichtAuswahlOptions(
        [{ id: "id-1", wert: "Amtsgericht Erding", code: "D2411" }],
        [],
      ),
    ).toEqual([
      {
        value: "id-1",
        label: "Amtsgericht Erding",
        komplaGerichtId: "id-1",
        isZov: false,
      },
    ]);
  });

  it("adds ZOV courts unknown to KomPla as ZOV only", () => {
    expect(
      buildGerichtAuswahlOptions(
        [],
        [{ code: "Z0001", name: "Amtsgericht Hamburg" }],
      ),
    ).toEqual([
      { value: "zov:Z0001", label: "Amtsgericht Hamburg", isZov: true },
    ]);
  });

  it("merges courts known to both systems into one option", () => {
    expect(
      buildGerichtAuswahlOptions(
        [{ id: "id-1", wert: "Amtsgericht Bremen", code: "H1101" }],
        [{ code: "H1101", name: "AG Bremen" }],
      ),
    ).toEqual([
      {
        value: "id-1",
        label: "Amtsgericht Bremen",
        komplaGerichtId: "id-1",
        isZov: true,
      },
    ]);
  });

  it("treats KomPla courts without code as KomPla only", () => {
    const [option] = buildGerichtAuswahlOptions(
      [{ id: "id-1", wert: null, code: null }],
      [{ code: "H1101", name: "Amtsgericht Bremen" }],
    ).filter(({ komplaGerichtId }) => komplaGerichtId === "id-1");

    expect(option).toEqual({
      value: "id-1",
      label: "Wert fehlt",
      komplaGerichtId: "id-1",
      isZov: false,
    });
  });

  it("sorts the options by label", () => {
    const options = buildGerichtAuswahlOptions(
      [{ id: "id-1", wert: "Amtsgericht München", code: "M1" }],
      [{ code: "Z0001", name: "Amtsgericht Hamburg" }],
    );

    expect(options.map(({ label }) => label)).toEqual([
      "Amtsgericht Hamburg",
      "Amtsgericht München",
    ]);
  });
});
