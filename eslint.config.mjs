import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import security from "eslint-plugin-security";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const config = [
  {
    ignores: [
      "**/.next/",
      "**/node_modules/",
      "**/dist/",
      "**/.git/",
      "**/coverage/",
      "**/.nyc_output/",
      "**/build/"
    ]
  },
  ...compat.extends(
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:security/recommended"
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "security": security
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "security/detect-object-injection": "error",
      "security/detect-non-literal-require": "error",
      "security/detect-possible-timing-attacks": "error",
      "no-console": "warn",
      "prefer-const": "error"
    }
  }
];

export default config;
