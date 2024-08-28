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
          "0%": {
            transform: "translateX(0px)",
            opacity: "100%",
          },
          "100%": {
            transform: "translateX(200px)",
            opacity: "0%",
          },
        },
        appear3: {
          "0%": {
            transform: "translateX(0px)",
            opacity: "100%",
            width: "full",
          },
          "100%": {
            transform: "translateX(150px)",
            opacity: "0%",
            width: "30px",
          },
        },
        appear4: {
          "0%": {
            opacity: "100%",
            marginLeft: "0px",
          },
          "100%": {
            opacity: "0%",
            marginLeft: "100%",
          },
        },

        appearXL: {
          "0%": {
            marginLeft: "0px",
          },
          "100%": {
            marginLeft: "18rem",
          },
        },

        disappearXL: {
          "0%": {
            marginLeft: "18rem",
          },
          "100%": {
            marginLeft: "0px",
          },
        },

        disappear: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-450px)" },
        },

        appear2Reverse: {
          "0%": {
            transform: "translateX(200px)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateX(0px)",
            opacity: "100%",
          },
        },

        appear3Reverse: {
          "0%": {
            transform: "translateX(150px)",
            opacity: "0%",
            width: "30px",
          },
          "100%": {
            transform: "translateX(0px)",
            opacity: "100%",
            width: "full",
          },
        },

        appear4Reverse: {
          "0%": {
            opacity: "0%",
            marginLeft: "100%",
          },
          "100%": {
            opacity: "100%",
            marginLeft: "10px",
          },
        },
      },
      animation: {
        appear: "appear 0.5s ease-out",
        appear2: "appear2 0.5s ease-out",
        appear3: "appear3 0.5s ease-out",
        appear4: "appear4 0.5s ease-out",
        appearXL: "appearXL 0.5s ease-out",
        disappearXL: "disappearXL 0.5s ease-out",

        disappear4: "appear4Reverse 0.5s ease-out ",
        disappear2: "appear2Reverse 0.5s ease-out ",
        disappear3: "appear3Reverse 0.5s ease-out ",
        disappear: "disappear 1s ease-in-out",
        "spin-slow": "spin 25s linear infinite",
      },
    },
  },
  plugins: [],
};
