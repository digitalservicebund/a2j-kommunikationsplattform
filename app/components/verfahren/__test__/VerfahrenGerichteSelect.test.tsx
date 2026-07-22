import { describe, expect, it } from "vitest";
import {
  buildGerichteOptions,
  type GerichtSelectItem,
} from "../VerfahrenGerichteSelect";

describe("VerfahrenGerichteSelect", () => {
  describe("buildGerichteOptions", () => {
    it("maps code and wert into InputSelect options", () => {
      const gerichte: GerichtSelectItem[] = [
        { code: "AG-K", wert: "Amtsgericht Koln" },
        { code: "LG-HH", wert: "Landgericht Hamburg" },
      ];

      const options = buildGerichteOptions(gerichte);

      expect(options).toEqual([
        { value: "AG-K", label: "Amtsgericht Koln" },
        { value: "LG-HH", label: "Landgericht Hamburg" },
      ]);
    });

    it("falls back safely when values are missing", () => {
      const gerichte: GerichtSelectItem[] = [{}, { code: null, wert: null }];

      const options = buildGerichteOptions(gerichte);

      expect(options).toEqual([
        { value: "", label: "Wert fehlt" },
        { value: "", label: "Wert fehlt" },
      ]);
    });
  });
});
