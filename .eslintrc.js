module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: ['./services/backend/tsconfig.json', './services/frontend/tsconfig.json'],
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
