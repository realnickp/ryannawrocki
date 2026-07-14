import { describe, it, expect } from "vitest";
import { createSessionToken, verifySessionToken } from "../session";

describe("session", () => {
  it("round-trips a valid token", async () => {
    const token = await createSessionToken({ sub: "user-1", email: "a@b.co" });
    const s = await verifySessionToken(token);
    expect(s).toEqual({ sub: "user-1", email: "a@b.co" });
  });
  it("rejects a tampered token", async () => {
    const token = await createSessionToken({ sub: "user-1", email: "a@b.co" });
    expect(await verifySessionToken(token.slice(0, -2) + "xx")).toBeNull();
    expect(await verifySessionToken("garbage")).toBeNull();
  });
});
