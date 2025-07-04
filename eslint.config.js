import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

/** @type {import('typescript-eslint').ConfigArray} */
const config = tseslint.config(
  { ignores: ["**/dist/**"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  prettierConfig,
  {
    name: "main",
    settings: {
      node: {
        version: "^20.19.0 || >=22.12.0",
      },
    },
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_", // 允许以 _ 开头的变量
          argsIgnorePattern: "^_", // 允许以 _ 开头的函数参数
          caughtErrorsIgnorePattern: "^_", // 允许以 _ 开头的 try-catch 错误
          destructuredArrayIgnorePattern: "^_", // 允许数组解构的 _ 变量
          ignoreRestSiblings: true, // 允许忽略解构时的剩余属性
        },
      ],
    },
  },
);

export default config;
