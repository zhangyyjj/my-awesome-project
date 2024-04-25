module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-absolute-path': [0]
  },
  settings: {
    // @路径引入的文件也需要校验
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.jsx', '.json', '.vue']
      }
    }
  }
}
