/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        border: "border-width, border-color",
      },
    },
  },
  variants: {
    extend: {
      // 啟用 hover 狀態的 borderWidth 變化
      borderWidth: ["hover"],
    },
  },
  plugins: [],
};
