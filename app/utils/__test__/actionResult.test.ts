import { describe, expect, it } from "vitest";
import { actionErrorResponse } from "../actionResult";

describe("actionErrorResponse", () => {
  it("wraps the error and its data in a response with the given status", () => {
    const response = actionErrorResponse("Löschen fehlgeschlagen.", {
      data: { formType: "delete", dokumentId: "d-1" },
      status: 403,
    });

    expect(response).toMatchObject({
      data: {
        status: "error",
        error: "Löschen fehlgeschlagen.",
        data: { formType: "delete", dokumentId: "d-1" },
      },
      init: { status: 403 },
    });
  });
});
