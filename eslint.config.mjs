import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  // Global ignores
  {
    ignores: [".next/**", "node_modules/**"],
  },
  
  // Base configuration for all TypeScript/JavaScript files
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "@next/next": nextPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    // This is the key part: tell ESLint to use the TypeScript parser
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    // Apply recommended rulesets
    rules: {
      ...tsPlugin.configs["recommended"].rules,
      ...reactPlugin.configs["recommended"].rules,
      ...hooksPlugin.configs["recommended"].rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...jsxA11yPlugin.configs["recommended"].rules,
      
      // --- FIX for "React in scope" ---
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // Not needed with TypeScript

      // --- FIX for unused vars with underscore ---
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          "argsIgnorePattern": "^_", 
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_" // This fixes the last warning
        }
      ]
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];

export default config;