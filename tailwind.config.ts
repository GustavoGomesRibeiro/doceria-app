import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rose: {
          primary: "#E8547A",
          dark: "#C03060",
          light: "#FDF2F8",
          muted: "#F9A8C9",
        },
        cream: {
          DEFAULT: "#FFF8F3",
          dark: "#F5EDE4",
        },
        choco: {
          DEFAULT: "#2D1518",
          light: "#5C2E35",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(232,84,122,0.08), 0 1px 4px 0 rgba(0,0,0,0.06)",
        "card-hover": "0 8px 32px 0 rgba(232,84,122,0.16), 0 2px 8px 0 rgba(0,0,0,0.08)",
        glass: "0 8px 32px 0 rgba(31,38,135,0.08)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #FFF8F3 0%, #FDE8F0 50%, #FFF0E7 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 60%, rgba(45,21,24,0.6) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
