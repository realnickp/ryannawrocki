import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, DUMMY_HASH } from "../password";

describe("password", () => {
  it("hashes and verifies a password", async () => {
    const hash = await hashPassword("District7a!");
    expect(hash).not.toContain("District7a!");
    expect(await verifyPassword("District7a!", hash)).toBe(true);
    expect(await verifyPassword("wrong", hash)).toBe(false);
  });
  it("DUMMY_HASH is a valid bcrypt hash that matches nothing", async () => {
    expect(DUMMY_HASH.startsWith("$2")).toBe(true);
    expect(await verifyPassword("anything", DUMMY_HASH)).toBe(false);
  });
});
