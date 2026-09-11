import { describe, expect, it, vi } from "vitest";
import { dispatchFormAction } from "../dispatchFormAction";

function formDataWith(entries: Record<string, string>) {
  const formData = new FormData();
  Object.entries(entries).forEach(([key, value]) =>
    formData.append(key, value),
  );
  return formData;
}

describe("dispatchFormAction", () => {
  it("invokes the handler registered for the submitted formType", async () => {
    const handleDelete = vi.fn().mockResolvedValue("deleted");
    const handleSubmit = vi.fn().mockResolvedValue("submitted");
    const formData = formDataWith({ formType: "delete" });
    const context = { verfahrenId: "v-1" };

    const result = await dispatchFormAction(
      formData,
      { delete: handleDelete, submit: handleSubmit },
      context,
      () => "unmatched",
    );

    expect(result).toBe("deleted");
    expect(handleDelete).toHaveBeenCalledWith(formData, context);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onUnmatchedHandlerKey when formType does not match any handler", () => {
    const handleDelete = vi.fn();
    const onUnmatchedHandlerKey = vi.fn().mockReturnValue("fallback");
    const formData = formDataWith({ formType: "unknown-type" });

    const result = dispatchFormAction(
      formData,
      { delete: handleDelete },
      {},
      onUnmatchedHandlerKey,
    );

    expect(result).toBe("fallback");
    expect(handleDelete).not.toHaveBeenCalled();
    expect(onUnmatchedHandlerKey).toHaveBeenCalledOnce();
  });

  it("calls onUnmatchedHandlerKey when formType is missing", () => {
    const handleDelete = vi.fn();
    const onUnmatchedHandlerKey = vi.fn().mockReturnValue("fallback");
    const formData = new FormData();

    const result = dispatchFormAction(
      formData,
      { delete: handleDelete },
      {},
      onUnmatchedHandlerKey,
    );

    expect(result).toBe("fallback");
    expect(onUnmatchedHandlerKey).toHaveBeenCalledOnce();
  });

  it("calls onUnmatchedHandlerKey when formType is not a string value", () => {
    const handleDelete = vi.fn();
    const onUnmatchedHandlerKey = vi.fn().mockReturnValue("fallback");
    const formData = new FormData();
    formData.append("formType", new File(["content"], "formType.txt"));

    const result = dispatchFormAction(
      formData,
      { delete: handleDelete },
      {},
      onUnmatchedHandlerKey,
    );

    expect(result).toBe("fallback");
    expect(onUnmatchedHandlerKey).toHaveBeenCalledOnce();
  });
});
