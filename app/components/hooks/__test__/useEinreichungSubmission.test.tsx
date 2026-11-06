// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { useRevalidator } from "react-router";
import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useEinreichungSubmission } from "~/components/hooks/useEinreichungSubmission";

vi.mock("react-router", () => ({
  useRevalidator: vi.fn(),
}));

const mockUseRevalidator = useRevalidator as unknown as Mock;

describe("useEinreichungSubmission", () => {
  const revalidate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockUseRevalidator.mockReturnValue({ state: "idle", revalidate });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("polls revalidate every 5s while isValidating", () => {
    renderHook(() =>
      useEinreichungSubmission({
        isValidating: true,
        isBelegPending: false,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(5_000);
    });

    expect(revalidate).toHaveBeenCalledTimes(1);
  });

  it("polls revalidate while isBelegPending", () => {
    renderHook(() =>
      useEinreichungSubmission({
        isValidating: false,
        isBelegPending: true,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(revalidate).toHaveBeenCalledTimes(2);
  });

  it("does not poll when neither condition holds", () => {
    renderHook(() =>
      useEinreichungSubmission({
        isValidating: false,
        isBelegPending: false,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(15_000);
    });

    expect(revalidate).not.toHaveBeenCalled();
  });

  it("skips revalidate while a previous one is still in flight", () => {
    mockUseRevalidator.mockReturnValue({ state: "loading", revalidate });

    renderHook(() =>
      useEinreichungSubmission({
        isValidating: true,
        isBelegPending: false,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(5_000);
    });

    expect(revalidate).not.toHaveBeenCalled();
  });

  describe("handleSubmit", () => {
    function setUpForm(result: {
      formRef: { current: HTMLFormElement | null };
    }) {
      const form = document.createElement("form");
      const input = document.createElement("input");
      input.name = "formType";
      input.value = "einreichen";
      form.appendChild(input);
      result.formRef.current = form;

      return {
        form,
        submitSpy: vi.spyOn(form, "submit").mockImplementation(() => {}),
      };
    }

    const submitEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.SyntheticEvent<HTMLFormElement>;

    it("submits the form natively once the fetch check succeeds", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });

      const { result } = renderHook(() =>
        useEinreichungSubmission({
          isValidating: false,
          isBelegPending: false,
        }),
      );
      const { submitSpy } = setUpForm(result.current);

      await act(async () => {
        await result.current.handleSubmit(submitEvent);
      });

      expect(submitSpy).toHaveBeenCalledTimes(1);
      expect(result.current.error).toBe(false);
    });

    it("sets error and stops submitting when the fetch check fails", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({ ok: false });

      const { result } = renderHook(() =>
        useEinreichungSubmission({
          isValidating: false,
          isBelegPending: false,
        }),
      );
      const { submitSpy } = setUpForm(result.current);

      await act(async () => {
        await result.current.handleSubmit(submitEvent);
      });

      expect(submitSpy).not.toHaveBeenCalled();
      expect(result.current.error).toBe(true);
      expect(result.current.isSubmitting).toBe("idle");
    });

    it("sets error when the fetch call throws", async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error("network down"));
      vi.spyOn(console, "error").mockImplementation(() => {});

      const { result } = renderHook(() =>
        useEinreichungSubmission({
          isValidating: false,
          isBelegPending: false,
        }),
      );
      const { submitSpy } = setUpForm(result.current);

      await act(async () => {
        await result.current.handleSubmit(submitEvent);
      });

      expect(submitSpy).not.toHaveBeenCalled();
      expect(result.current.error).toBe(true);
      expect(result.current.isSubmitting).toBe("idle");
    });
  });
});
