export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  eslintIgnore: ["node_modules"],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
