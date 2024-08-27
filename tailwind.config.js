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
          "0%": { transform: "translateX(0px)", opacity: "100%" },
          "100%": { transform: "translateX(200px)", opacity: "0%" },
        },
        appear3: {
          "0%": {
            transform: "translateX(0px)",
            opacity: "100%",
            width: "full",
          },
          "100%": {
            transform: "translateX(50px)",
            opacity: "0%",
            width: "50px",
          },
        },
        disappear: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-450px)" },
        },
      },
      animation: {
        appear: "appear 0.5s ease-out",
        appear2: "appear2 0.5s ease-out",
        appear3: "appear3 0.5s ease-out",
        reappear2: "appear2 0.5s ease-out reverse",
        reappear3: "appear3 0.5s ease-out reverse",
        disappear: "disappear 1s ease-in-out",
        "spin-slow": "spin 25s linear infinite",
      },
    },
  },
  plugins: [],
};
