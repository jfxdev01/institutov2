import type { Config } from "tailwindcss";

/**
 * Identidade Instituto V2 — paleta fixa:
 * Taupe #89836D | Sálvia #8C9975 | Preto #000000
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "var(--font-fallback-condensed)", "sans-serif"],
      },
      colors: {
        black: "#000000",
        /** Sálvia — cor primária da marca */
        primary: {
          50: "#f6f7f4",
          100: "#e8ebe3",
          200: "#d1d8c8",
          300: "#b4bfaa",
          400: "#9aae8c",
          500: "#8C9975",
          600: "#6f7a5f",
          700: "#5a634d",
          800: "#4a5140",
          900: "#3e4336",
        },
        /** Taupe — secundária / apoio */
        accent: {
          50: "#f9f8f6",
          100: "#f0eee9",
          200: "#ddd9cf",
          300: "#c4bdae",
          400: "#a6998a",
          500: "#89836D",
          600: "#6d6856",
          700: "#595547",
          800: "#49463b",
          900: "#3c3a31",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
