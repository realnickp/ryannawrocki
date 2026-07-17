import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";

// No RESEND_API_KEY in the test env, so the route takes its dev-mode
// path (validate, log, return ok) — these tests exercise validation only.
function post(body: unknown) {
  return POST(
    new Request("http://test.local/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

describe("contact route validation", () => {
  it("accepts the exact payload ContactForm sends (form has no ZIP field)", async () => {
    const res = await post({
      name: "Test Person",
      email: "person@example.com",
      phone: "410-555-0100",
      subject: "Ask a question",
      interests: ["Display a yard sign"],
      message:
        "This message is comfortably longer than the twenty character minimum.\n\nWays I'd like to help: Display a yard sign",
      zip: "",
      topic: "Ask a question",
    });
    expect(res.status).toBe(200);
  });

  it("accepts a submission without the optional phone", async () => {
    const res = await post({
      name: "Test Person",
      email: "person@example.com",
      topic: "Other",
      message: "Another message that is longer than twenty characters.",
    });
    expect(res.status).toBe(200);
  });

  it("rejects an invalid email", async () => {
    const res = await post({
      name: "Test Person",
      email: "not-an-email",
      topic: "Other",
      message: "A message that is longer than twenty characters, yes.",
    });
    expect(res.status).toBe(400);
  });

  it("rejects a too-short message", async () => {
    const res = await post({
      name: "Test Person",
      email: "person@example.com",
      topic: "Other",
      message: "too short",
    });
    expect(res.status).toBe(400);
  });
});
