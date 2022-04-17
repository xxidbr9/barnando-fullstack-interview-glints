module.exports = {
  root: true,
  extends: [
    "prettier",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "import/extensions": 0,
    "@typescript-eslint/no-use-before-define": ["error", { variables: false }],
    "import/no-unresolved": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
      },
    },
  ],
};
