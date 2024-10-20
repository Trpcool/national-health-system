module.exports = {
    env: {
      browser: true,
      node: true
    },
    extends: [
      "eslint:recommended", // 使用推荐的eslint
      'plugin:vue/vue3-recommended' // 使用插件支持vue3
    ],
    parserOptions: {
      parser: '@babel/eslint-parser',
      sourceType: 'module',
      ecmaVersion: 12,
      allowImportExportEverywhere: true, // 不限制eslint对import使用位置
      ecmaFeatures: {
        modules: true,
        legacyDecorators: true
      },
      requireConfigFile: false // 解决报错：vue--Parsing error: No Babel config file detected for
    },
    plugins: [
      'vue'
    ],
    rules: {
       
    }
  }
  