// https://docs.expo.dev/guides/using-eslint/
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const prettierPlugin = require("eslint-plugin-prettier");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": typescriptPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: true,
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "error", // any kullanımını yasaklar
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports", // type importları için "import type" kullanımını zorunlu kılar
          fixStyle: "separate-type-imports", // type ve value importlarını ayrı satırlarda tutar
        },
      ],

      // React import rules
      "react/jsx-uses-react": "off", // React 17+ JSX transform ile gereksiz
      "react/react-in-jsx-scope": "off", // React 17+ JSX transform ile gereksiz
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: false, // Daha sıkı kontrol
          args: "all",
          caughtErrors: "all",
          destructuredArrayIgnorePattern: "^_",
          // Import edilen ama kullanılmayan değişkenler için sıkı kontrol
          vars: "all",
        },
      ],

      // React namespace kullanımını kontrol et
      "react/jsx-uses-vars": "error", // JSX'te kullanılan değişkenleri kontrol eder

      // React component function declaration rules
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration", // Named componentleri function declaration olarak zorla
          unnamedComponents: "arrow-function", // Unnamed (callback) componentler arrow function olabilir
        },
      ],

      // React component export rules
      "import/prefer-default-export": "error", // Single export varsa default export kullanımını zorunlu kılar
      "import/no-default-export": "off", // Default export'u yasaklama (off çünkü prefer ediyoruz)

      "no-unused-vars": "off", // Turn off base rule as it can report incorrect errors

      // Import rules
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react-native",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          distinctGroup: false,
          pathGroupsExcludedImportTypes: ["react", "react-native"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "sort-imports": [
        "warn",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
    },
  },
];
