import { type Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulse2: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(0)" },
        },
      },
      fontFamily: {},
    },
  },
  plugins: [],
} satisfies Config;
