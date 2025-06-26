import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat with proper typing
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Create the config array and assign to variable
const config = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/consistent-type-imports": "error",
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      }
    }
  }
];

// Export the named variable as default
export default config;