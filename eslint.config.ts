import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default [
  globalIgnores(["coverage", "dist", "src/components", "src/lib"]),
  ...tseslint.configs.recommended,
  reactHooks.configs["recommended-latest"],
  reactX.configs["recommended-typescript"],
  reactDom.configs.recommended,
  reactRefresh.configs.vite,
  prettierConfig,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
