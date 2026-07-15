import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ryan Nawrocki — Maryland State Delegate, District 7A";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card — matches the current navy/gold/maroon brand. */
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#07193f",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Maryland-flag accent bar */}
        <div style={{ display: "flex", height: 10 }}>
          <div style={{ flex: 1, background: "#d9a441" }} />
          <div style={{ flex: 1, background: "#8a1020" }} />
          <div style={{ flex: 1, background: "#d9a441" }} />
        </div>

        <div
          style={{
            padding: "76px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#d9a441",
                marginBottom: 28,
                fontWeight: 700,
              }}
            >
              Maryland House of Delegates · District 7A
            </div>
            <div
              style={{
                fontSize: 104,
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: -3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Ryan Nawrocki</span>
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 40,
                fontWeight: 700,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Fighting for Baltimore County.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: 26,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <div style={{ width: 64, height: 3, background: "#d9a441" }} />
            <span>Husband · Father of Six · Small-Business Owner</span>
            <span style={{ color: "#d9a441", fontWeight: 700 }}>
              ryannawrocki.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
