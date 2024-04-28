import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      textColor: {
        "twitter-blue": "#1F9BF0",
      },
      backgroundColor: {
        "twitter-blue": "#1F9BF0",
      },
      keyframes: {
        appear: {
          "0%": { transform: "scale(0)", transformOrigin: "center center" },
          "100%": { transform: "scale(1)", transformOrigin: "center center" },
        },
      },
      animation: {
        appear: "appear 0.3s cubic-bezier(.31,1.76,.72,.76) 1",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
