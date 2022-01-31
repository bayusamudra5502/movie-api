module.exports = {
  content: ["./src/**/*.{html,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
