import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        maroon: "var(--maroon)",
        "maroon-2": "var(--maroon-2)",
        "md-red": "var(--md-red)",
        "md-red-hot": "var(--md-red-hot)",
        "red-blood": "var(--red-blood)",
        "md-gold": "var(--md-gold)",
        "gold-hot": "var(--gold-hot)",
        "gold-deep": "var(--gold-deep)",
        white: "rgb(255 255 255 / <alpha-value>)",
        off: "var(--off)",
        mute: "var(--mute)",
        rule: "var(--rule)",
        "rule-dark": "var(--rule-dark)",
        brand: {
          navy: "#07193f",
          navy2: "#0c2557",
          maroon: "#8a1020",
          "maroon-hot": "#a3162a",
          gold: "#d9a441",
          paper: "#f7f8fa",
          paper2: "#eef0f4",
          slate: "#41506a",
          hairline: "#dfe3ea",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        stage: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        cinema: "cubic-bezier(0.7, 0, 0.2, 1)",
        quiet: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      maxWidth: {
        shell: "1440px",
        reading: "720px",
      },
      letterSpacing: {
        eyebrow: "0.22em",
        kicker: "0.16em",
        display: "-0.04em",
        headline: "-0.02em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
