import { generateNonce } from "../nonce.server";

describe("generateNonce", () => {
  it("should generate a 32-character hex string", () => {
    const nonce = generateNonce();
    expect(typeof nonce).toBe("string");
    expect(nonce).toMatch(/^[a-f0-9]{32}$/);
  });

  it("should generate unique nonces", () => {
    const nonce1 = generateNonce();
    const nonce2 = generateNonce();
    expect(nonce1).not.toBe(nonce2);
  });
});
