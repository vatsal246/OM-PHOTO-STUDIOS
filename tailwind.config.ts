import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          gold: {
            50: "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            300: "#FCD34D",
            400: "#FBBF24",
            500: "#F59E0B",
            600: "#D97706",
            700: "#B45309",
          },
          blue: {
            50: "#EFF6FF",
            100: "#DBEAFE",
            200: "#BFDBFE",
            500: "#2563EB",
            600: "#1D4ED8",
            700: "#1E40AF",
            800: "#1E3A8A",
            900: "#172554",
          },
          coral: {
            50: "#FEF2F2",
            100: "#FEE2E2",
            500: "#EF4444",
            600: "#DC2626",
            700: "#B91C1C",
          },
          navy: {
            800: "#1E293B",
            900: "#0F172A",
            950: "#0B0F19",
          },
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)",
        cardHover: "0 10px 25px -3px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;

