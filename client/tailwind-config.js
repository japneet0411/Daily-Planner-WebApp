module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "dark-purple": "#916BBF",
      purple: "#FDB9FC",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
