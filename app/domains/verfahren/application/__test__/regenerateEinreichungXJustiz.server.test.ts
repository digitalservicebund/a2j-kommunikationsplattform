import { makeAuthSession } from "tests/utils/factories/authSession";
import { beforeEach, describe, expect, it, vi } from "vitest";
import regenerateEinreichungXJustiz from "../regenerateEinreichungXJustiz.server";

const mocks = vi.hoisted(() => ({
  createEinreichungXJustiz: vi.fn(),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server",
  () => ({
    createEinreichungXJustiz: mocks.createEinreichungXJustiz,
  }),
);

describe("regenerateEinreichungXJustiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates the XJustiz-Dokument with ersetzen: true", async () => {
    await regenerateEinreichungXJustiz(makeAuthSession(), {
      verfahrenId: "v-1",
      einreichungId: "e-1",
    });

    expect(mocks.createEinreichungXJustiz).toHaveBeenCalledWith(
      makeAuthSession(),
      {
        verfahrenId: "v-1",
        id: "e-1",
        ersetzen: true,
      },
    );
  });
});
