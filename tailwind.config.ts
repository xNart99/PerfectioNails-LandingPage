import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "oklch(0.985 0.008 85)",
        "cream-warm": "oklch(0.97 0.012 82)",
        "cream-deep": "oklch(0.94 0.015 80)",
        ink: "oklch(0.22 0.01 80)",
        "ink-soft": "oklch(0.38 0.008 80)",
        "ink-faint": "oklch(0.56 0.006 80)",
        rule: "oklch(0.88 0.008 80)",
        "rule-soft": "oklch(0.92 0.008 80)",
        gold: "oklch(0.72 0.12 85)",
        "gold-deep": "oklch(0.62 0.11 80)",
        "gold-soft": "oklch(0.88 0.06 88)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Times New Roman", "serif"],
        display: ["var(--font-italiana)", "var(--font-cormorant)", "serif"],
        script: ["var(--font-pinyon)", "cursive"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        site: "1280px",
      },
      animation: {
        marquee: "marquee 38s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
