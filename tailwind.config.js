/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": { transform: "translateX(-400px)" },
          "100%": { transform: "translateX(0)" },
        },
        appear2: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(50px)" },
        },
        disappear: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-400px)" },
        },
      },
      animation: {
        appear: "appear 1s ease-out",
        appear2: "appear2 0.5s ease-out",
        disappear: "disappear 2s ease-in-out",
      },
    },
  },
  plugins: [],
};
