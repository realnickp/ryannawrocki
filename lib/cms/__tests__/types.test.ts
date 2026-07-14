import { describe, it, expect } from "vitest";
import { slugify, splitHtmlAfterParagraphs, postInputSchema } from "../types";

describe("slugify", () => {
  it("lowercases, strips punctuation, hyphenates", () => {
    expect(slugify("Championing Maryland's Agriculture!")).toBe(
      "championing-marylands-agriculture",
    );
    expect(slugify("  Fire & EMS —  funding ")).toBe("fire-ems-funding");
  });
});

describe("splitHtmlAfterParagraphs", () => {
  it("splits after the nth top-level </p>", () => {
    const html = "<p>a</p><p>b</p><p>c</p>";
    expect(splitHtmlAfterParagraphs(html, 2)).toEqual(["<p>a</p><p>b</p>", "<p>c</p>"]);
  });
  it("returns everything as lead when fewer paragraphs", () => {
    expect(splitHtmlAfterParagraphs("<p>a</p>", 2)).toEqual(["<p>a</p>", ""]);
  });
});

describe("postInputSchema", () => {
  it("accepts a minimal valid post", () => {
    const r = postInputSchema.safeParse({
      title: "Hello District 7A",
      slug: "hello-district-7a",
      topic: "Updates",
      status: "draft",
      date: "2026-07-14",
      bodyHtml: "<p>hi</p>",
    });
    expect(r.success).toBe(true);
  });
  it("rejects bad slug and bad status", () => {
    expect(
      postInputSchema.safeParse({
        title: "x y z", slug: "Bad Slug!", topic: "T", status: "draft",
        date: "2026-07-14", bodyHtml: "<p>hi</p>",
      }).success,
    ).toBe(false);
    expect(
      postInputSchema.safeParse({
        title: "x y z", slug: "ok-slug", topic: "T", status: "nope",
        date: "2026-07-14", bodyHtml: "<p>hi</p>",
      }).success,
    ).toBe(false);
  });
});
