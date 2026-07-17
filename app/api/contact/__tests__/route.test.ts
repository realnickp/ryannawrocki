import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { parseRecipients } from "@/lib/contact";

// No RESEND_API_KEY in the test env, so the route takes its dev-mode
// path (validate, log, return ok) — these tests exercise validation
// and bot flagging only.
function post(body: unknown) {
  return POST(
    new Request("http://test.local/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

// A legitimate submission as ContactForm sends it.
function humanPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "Test Person",
    email: "person@example.com",
    phone: "410-555-0100",
    subject: "Ask a question",
    interests: ["Display a yard sign"],
    message:
      "This message is comfortably longer than the twenty character minimum.\n\nWays I'd like to help: Display a yard sign",
    topic: "Ask a question",
    company: "",
    elapsedMs: 45_000,
    ...overrides,
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("contact route validation", () => {
  it("accepts the exact payload ContactForm sends (form has no ZIP field)", async () => {
    const res = await post(humanPayload());
    expect(res.status).toBe(200);
  });

  it("accepts a submission without the optional phone", async () => {
    const res = await post(
      humanPayload({ phone: undefined, interests: undefined }),
    );
    expect(res.status).toBe(200);
  });

  it("rejects an invalid email", async () => {
    const res = await post(humanPayload({ email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("rejects a too-short message", async () => {
    const res = await post(humanPayload({ message: "too short" }));
    expect(res.status).toBe(400);
  });
});

describe("parseRecipients", () => {
  it("parses a comma-separated list, trimming whitespace", () => {
    expect(
      parseRecipients("ryan@ryannawrocki.com, info@legacylinqdigital.com"),
    ).toEqual(["ryan@ryannawrocki.com", "info@legacylinqdigital.com"]);
  });

  it("parses a single address", () => {
    expect(parseRecipients("one@example.com")).toEqual(["one@example.com"]);
  });

  it("treats blank and undefined as unset", () => {
    expect(parseRecipients("")).toEqual([]);
    expect(parseRecipients("  ")).toEqual([]);
    expect(parseRecipients(undefined)).toEqual([]);
    expect(parseRecipients(",")).toEqual([]);
  });
});

describe("contact route bot flagging", () => {
  it("does not flag a normal human submission", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const res = await post(humanPayload());
    expect(res.status).toBe(200);
    expect(warn).not.toHaveBeenCalled();
  });

  it("flags a form filled too fast but fakes success", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const res = await post(humanPayload({ elapsedMs: 900 }));
    expect(res.status).toBe(200); // bot sees success, learns nothing
    expect(warn).toHaveBeenCalledOnce();
    expect(String(warn.mock.calls[0]?.[0])).toContain("flagged");
  });

  it("flags a filled honeypot field", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const res = await post(humanPayload({ company: "SpamCo LLC" }));
    expect(res.status).toBe(200);
    expect(warn).toHaveBeenCalledOnce();
  });

  it("flags a direct POST that omits the timing field", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const res = await post(humanPayload({ elapsedMs: undefined }));
    expect(res.status).toBe(200);
    expect(warn).toHaveBeenCalledOnce();
  });
});
