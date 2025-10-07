// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import React, { useState } from "react";
import { dictionaries } from "~/services/translations";
import { TranslationsProvider, useTranslations } from "../context";

describe("useTranslations", () => {
  it("returns default DE translations when no value is provided", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TranslationsProvider value={undefined}>{children}</TranslationsProvider>
    );
    const { result } = renderHook(() => useTranslations(), { wrapper });
    expect(result.current).toEqual(dictionaries.de);
  });

  it("returns EN translations when provided", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TranslationsProvider value={dictionaries.en}>
        {children}
      </TranslationsProvider>
    );
    const { result } = renderHook(() => useTranslations(), { wrapper });
    expect(result.current).toEqual(dictionaries.en);
  });

  it("updates when provider value changes", () => {
    const custom1 = {
      ...dictionaries.de,
      labels: { ...dictionaries.de.labels, A: "A1" },
    };
    const custom2 = {
      ...dictionaries.de,
      labels: { ...dictionaries.de.labels, A: "A2" },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const setValueRef = { current: (_: typeof custom1) => {} };

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      const [value, setValue] = useState(custom1);
      setValueRef.current = setValue;
      return (
        <TranslationsProvider value={value}>{children}</TranslationsProvider>
      );
    };

    const { result, rerender } = renderHook(() => useTranslations(), {
      wrapper,
    });
    expect(result.current).toEqual(custom1);

    act(() => {
      setValueRef.current(custom2);
    });
    rerender();
    expect(result.current).toEqual(custom2);
  });

  it("returns default value when used without provider", () => {
    const { result } = renderHook(() => useTranslations());
    expect(result.current).toEqual(dictionaries.de);
  });
});
