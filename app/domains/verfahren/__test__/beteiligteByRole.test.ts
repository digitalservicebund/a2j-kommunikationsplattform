import { describe, expect, test } from "vitest";
import {
  getBeteiligteByRoleCode,
  getBeteiligteNamesByRoleCode,
  getBeteiligungByRoleCode,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "../beteiligteByRole";

describe("beteiligteByRole", () => {
  const beteiligte = [
    {
      id: "b-1",
      name: "Klaegerin GmbH",
      rollen: [{ code: ROLE_CODE_KLAEGERIN }],
    },
    {
      id: "b-2",
      name: "Beklagte AG",
      rollen: [{ code: ROLE_CODE_BEKLAGTE }],
    },
    {
      id: "b-3",
      name: null,
      rollen: [{ code: ROLE_CODE_KLAEGERIN }],
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
