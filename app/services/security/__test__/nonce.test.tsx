// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { it } from "vitest";
import { NonceContext, useNonce } from "../nonce";

function TestComponent() {
  const nonce = useNonce();
  return <span data-testid="nonce">{nonce}</span>;
}

describe("NonceContext and useNonce", () => {
  it("returns the provided nonce value", () => {
    const { getByTestId } = render(
      <NonceContext.Provider value="test-nonce">
        <TestComponent />
      </NonceContext.Provider>,
    );
    expect(getByTestId("nonce").textContent).toBe("test-nonce");
  });

  it("returns empty string when no value is provided", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("nonce").textContent).toBe("");
  });
});
