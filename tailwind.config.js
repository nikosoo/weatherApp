/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image":
          "url('./src/assets/images/pexels-ming-sun-270578-814449.jpg')",
      },
    },
  },
  plugins: [],
};
