import type { Config } from "tailwindcss";
import daisyui from 'daisyui';

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
                "primary": "#00c4dc",
                "secondary": "#e70000",
                "accent": "#00f28d",
                "neutral": "#130a11",
                "base-100": "#39253d",
                "info": "#007dc0",
                "success": "#00b02a",
                "warning": "#b17a00",
                "error": "#ff6173",
            },
          },
        ],
      },
  plugins: [daisyui],
};
export default config;
