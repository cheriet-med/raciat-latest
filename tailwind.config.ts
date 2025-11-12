import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   plugins: [
    require('tailwindcss-rtl'),
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "var(--font-montserrat), sans-serif",
        playfair: "var(--font-playfair), serif",
      },
      animation: {
        flickerHover: "flickerHover 350ms ease-in-out forwards",
        contentFlickerHover: "contentFlickerHover 350ms ease-in-out forwards",
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      colors: {
        prim: "#142B40",
        sec: "#D9AA52",
        third: '#A6763C',
        neutral: "#F2F2F2",
        forth: "#8C5A2E",
        bl: "#7EB8E0",
        accent: "#82A7A6",
        background: "#9ED0E6",
        highlights: "#B796AC",
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
    },
  },
} satisfies Config;