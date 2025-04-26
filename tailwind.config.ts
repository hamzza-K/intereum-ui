import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d8b4fe",

          secondary: "#5d6300",
          accent: "#006500",
          neutral: "#1e1a2a",
          "base-100": "#262626",
          info: "#6dccff",
          success: "#00a400",
          warning: "#ffc400",
          error: "#881337",
        },
      },
    "cyberpunk", "light"],
  },
  plugins: [daisyui],
};
export default config;
