import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  // Global ignores
  {
    ignores: ["**/*", "!app/**", "!tests/**", "**/playwright-report/**"],
  },
  // Global ESLint configuration
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  // React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      react.configs.flat.recommended, // This is not a plugin object, but a shareable config object
      react.configs.flat["jsx-runtime"], // Add this if you are using React 17+
    ],
    plugins: {
      react,
    },
    settings: {
      react: { version: "detect" },
    },
  },
  // Typescript
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
);
