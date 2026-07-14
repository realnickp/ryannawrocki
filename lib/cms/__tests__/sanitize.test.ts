import { describe, it, expect } from "vitest";
import { sanitizeBodyHtml } from "../sanitize";

const MEDIA = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/posts/x.webp`;

describe("sanitizeBodyHtml", () => {
  it("keeps allowed formatting", () => {
    const html = `<h2>Title</h2><p><strong>b</strong> <em>i</em> <u>u</u></p><ul><li>x</li></ul><blockquote><p>q</p></blockquote>`;
    const out = sanitizeBodyHtml(html);
    expect(out).toContain("<h2>Title</h2>");
    expect(out).toContain("<strong>b</strong>");
    expect(out).toContain("<em>i</em>");
    expect(out).toContain("<u>u</u>");
    expect(out).toContain("<ul><li>x</li></ul>");
    expect(out).toContain("<blockquote><p>q</p></blockquote>");
  });
  it("strips scripts and event handlers", () => {
    const out = sanitizeBodyHtml(`<p onclick="x()">hi</p><script>evil()</script>`);
    expect(out).toBe("<p>hi</p>");
  });
  it("allows youtube-nocookie iframes, drops others", () => {
    const yt = `<iframe src="https://www.youtube-nocookie.com/embed/abc123"></iframe>`;
    expect(sanitizeBodyHtml(yt)).toContain("youtube-nocookie.com/embed/abc123");
    expect(sanitizeBodyHtml(`<iframe src="https://evil.com/x"></iframe>`)).not.toContain("iframe");
  });
  it("allows vimeo player iframes", () => {
    const v = `<iframe src="https://player.vimeo.com/video/123"></iframe>`;
    expect(sanitizeBodyHtml(v)).toContain("player.vimeo.com/video/123");
  });
  it("keeps our media-bucket and site-local images, drops external images", () => {
    expect(sanitizeBodyHtml(`<img src="${MEDIA}" alt="x" />`)).toContain("img");
    expect(sanitizeBodyHtml(`<img src="/images/foo.jpg" alt="x" />`)).toContain("img");
    expect(sanitizeBodyHtml(`<img src="https://evil.com/x.jpg" />`)).not.toContain("img");
  });
  it("forces safe rel on links", () => {
    const out = sanitizeBodyHtml(`<a href="https://example.com">x</a>`);
    expect(out).toContain(`rel="noopener noreferrer"`);
  });
  it("strips javascript: urls", () => {
    expect(sanitizeBodyHtml(`<a href="javascript:alert(1)">x</a>`)).not.toContain("javascript:");
  });
});
