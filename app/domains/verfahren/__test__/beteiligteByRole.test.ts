import { describe, expect, test } from "vitest";
import {
  getBeteiligteByRoleCode,
  getBeteiligteNamesByRoleCode,
  getBeteiligungByRoleCode,
  getProzessbevollmaechtigteByReferenz,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "../beteiligteByRole";

describe("beteiligteByRole", () => {
  const beteiligte = [
    {
      id: "b-1",
      bezeichnung: "Klaegerin GmbH",
      rollen: [{ rollenbezeichnung: { code: ROLE_CODE_KLAEGERIN } }],
    },
    {
      id: "b-2",
      bezeichnung: "Beklagte AG",
      rollen: [{ rollenbezeichnung: { code: ROLE_CODE_BEKLAGTE } }],
    },
    {
      id: "b-3",
      bezeichnung: null,
      rollen: [{ rollenbezeichnung: { code: ROLE_CODE_KLAEGERIN } }],
    },
  ];

  test("filters beteiligte by role code", () => {
    const result = getBeteiligteByRoleCode(beteiligte, ROLE_CODE_KLAEGERIN);

    expect(result).toHaveLength(2);
    expect(result[0]?.id).toBe("b-1");
  });

  test("returns first beteiligung for role code", () => {
    const result = getBeteiligungByRoleCode(beteiligte, ROLE_CODE_BEKLAGTE);

    expect(result?.id).toBe("b-2");
  });

  test("returns joined names or fallback", () => {
    expect(
      getBeteiligteNamesByRoleCode(
        beteiligte,
        ROLE_CODE_KLAEGERIN,
        "Unbekannt",
      ),
    ).toBe("Klaegerin GmbH");

    expect(
      getBeteiligteNamesByRoleCode(beteiligte, "not-existing", "Unbekannt"),
    ).toBe("Unbekannt");
  });
});

describe("getProzessbevollmaechtigteByReferenz", () => {
  const beteiligteMitAnwalt = [
    {
      id: "b-1",
      beteiligtenart: "natuerlichePerson",
      bezeichnung: null,
      rollen: [
        {
          rollenbezeichnung: { code: ROLE_CODE_KLAEGERIN },
          referenz: null,
        },
      ],
    },
    {
      id: "b-2",
      beteiligtenart: "raKanzlei",
      bezeichnung: "Kanzlei Böhm",
      rollen: [
        {
          rollenbezeichnung: { code: "132" },
          referenz: ROLE_CODE_KLAEGERIN,
        },
      ],
    },
  ];

  test("finds the raKanzlei whose role references the given rollennummer", () => {
    const result = getProzessbevollmaechtigteByReferenz(
      beteiligteMitAnwalt,
      "132",
      ROLE_CODE_KLAEGERIN,
    );

    expect(result?.id).toBe("b-2");
  });

  test("returns undefined when no matching raKanzlei exists", () => {
    const result = getProzessbevollmaechtigteByReferenz(
      beteiligteMitAnwalt,
      "132",
      ROLE_CODE_BEKLAGTE,
    );

    expect(result).toBeUndefined();
  });

  test("returns undefined for a matching role on a non-raKanzlei beteiligung", () => {
    const beteiligteOhneRaKanzlei = [
      {
        id: "b-3",
        beteiligtenart: "natuerlichePerson",
        bezeichnung: null,
        rollen: [
          { rollenbezeichnung: { code: "132" }, referenz: ROLE_CODE_KLAEGERIN },
        ],
      },
    ];

    const result = getProzessbevollmaechtigteByReferenz(
      beteiligteOhneRaKanzlei,
      "132",
      ROLE_CODE_KLAEGERIN,
    );

    expect(result).toBeUndefined();
  });
});
