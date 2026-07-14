import sanitizeHtml from "sanitize-html";

const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "rumble.com",
];

function mediaPrefix(): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/`;
}

/** Strict allowlist sanitizer — run on SAVE and again defensively on render. */
export function sanitizeBodyHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
      "a", "ul", "ol", "li", "blockquote", "img", "figure", "figcaption",
      "iframe", "br", "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    allowedIframeHostnames: ALLOWED_IFRAME_HOSTS,
    exclusiveFilter: (frame) => {
      if (frame.tag === "img") {
        const src = frame.attribs.src ?? "";
        return !(src.startsWith(mediaPrefix()) || src.startsWith("/images/"));
      }
      // A disallowed iframe host has its src stripped by the hostname
      // allowlist above — drop the now-empty iframe shell entirely.
      if (frame.tag === "iframe") return !frame.attribs.src;
      return false;
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform(
        "a",
        { rel: "noopener noreferrer", target: "_blank" },
        true,
      ),
    },
  });
}
