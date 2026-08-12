import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  "#FCF9F3",  // paper — warm near-white for card surfaces
          100: "#F3EAD9",  // main light section bg
          200: "#EADBC4",  // deeper sand, subtle fills
          300: "#E4D5BC",  // borders / dividers
        },
        clay: {
          // primary earthy accent — replaces coral/red for text, tags, blocks
          300: "#D8A183",
          400: "#C67F58",
          500: "#B5623F",
          600: "#8F4B30",
          700: "#6E3A26",
        },
        logo: "#FFFBE7", // exact wordmark cream — for logo-style type only
        brand: {
          // heritage red — reserved for logo-adjacent CTAs, tiny dots, focus states
          500: "#C1442E",
          600: "#A6371F",
        },
        sage: {
          400: "#A9AF8E",
          500: "#8B9678",
          600: "#6C7657",
        },
        dusty: {
          400: "#9FB0BC",
          500: "#7C93A3",
          600: "#5C7484",
        },
        forest: {
          700: "#3B4632",
          800: "#2C3526",
          900: "#20271A",
        },
        espresso: {
          // main dark surface — matches the brand logo's forest green
          900: "#3D4F42",
          800: "#4A5F4F",
        },
        ink: {
          900: "#241C15",   // primary text
          800: "#33281F",
          700: "#4A3C30",
          600: "#5C4C3D",
          500: "#7A6A58",
          400: "#96876F",
          300: "#B7A88E",
          100: "#E6DAC3",
        },
      },
      fontFamily: {
        sans:    ["var(--font-grotesk)", "system-ui", "sans-serif"],
        serif:   ["var(--font-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      fontSize: {
        "10xl": ["10rem",  { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        "9xl":  ["8rem",   { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        "8xl":  ["6rem",   { lineHeight: "0.90", letterSpacing: "-0.03em" }],
        "display": ["clamp(4rem,10vw,8.5rem)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
      },
      boxShadow: {
        card:   "0 2px 24px 0 rgba(30,38,32,0.08)",
        "card-lg": "0 8px 48px 0 rgba(30,38,32,0.12)",
        "card-hover": "0 16px 64px 0 rgba(30,38,32,0.16)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up":  "fade-up 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "fade-in":  "fade-in 0.7s ease forwards",
        float:      "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
