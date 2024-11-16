/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: "none",
  bracketSameLine: true,
  bracketSpacing: true,
  arrowParens: "avoid",
};

export default config;
