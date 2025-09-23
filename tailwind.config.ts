module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var( --tertiary-color)",
      },

      keyframes: {
        "bounce-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" }, // adjust distance
        },
      },
      animation: {
        "bounce-x": "bounce-x 0.4s ease-in-out infinite",
      },
    },
  },
};
