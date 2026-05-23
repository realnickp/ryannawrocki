import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Delegate Ryan Nawrocki — District 7A";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f7f3e8",
          fontFamily: "Georgia, serif",
          color: "#1a1408",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", height: 6 }}>
          <div style={{ flex: 1, background: "#ffd200" }} />
          <div style={{ flex: 1, background: "#0a0a0a" }} />
          <div style={{ flex: 1, background: "#c8102e" }} />
        </div>
        <div
          style={{
            padding: "72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 18,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#7a6c48",
                marginBottom: 24,
              }}
            >
              Maryland House of Delegates · District 7A
            </div>
            <div
              style={{
                fontSize: 96,
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: -2,
              }}
            >
              Delegate Ryan Nawrocki
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: 26,
              color: "#3a2f1a",
            }}
          >
            <div style={{ width: 64, height: 1, background: "#b88c00" }} />
            <span>
              Showing up · Speaking up · Following through —{" "}
              <span style={{ color: "#9a0c22", fontStyle: "italic" }}>
                ryannawrocki.com
              </span>
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
