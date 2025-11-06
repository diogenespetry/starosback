module.exports = [
  {
    ignores: ["node_modules/**"]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
        Buffer: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-duplicate-imports": "error",
      "no-console": "off"
    }
  }
];
