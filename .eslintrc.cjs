/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['simple-import-sort', 'import'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:unicorn/recommended',
    'plugin:vuejs-accessibility/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  overrides: [
    {
      files: [
        '**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-var': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'warn',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true
        },
        ignore: ['App.vue']
      }
    ],
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-unused-properties': 'warn',
    'unicorn/prefer-string-replace-all': 'warn',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/prefer-at': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          emits: true,
          Ref: true,
          Refs: true
        },
        checkFilenames: false
      }
    ],
    'vue/multi-word-component-names': 'error',
    'vue/script-setup-uses-vars': 'error',
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/no-export-in-script-setup': 'error',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      { registeredComponentsOnly: false, ignores: ['i18n-t'] }
    ],
    'vue/html-comment-content-spacing': ['error', 'always'],
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/no-deprecated-v-is': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-use-computed-property-like-method': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/no-v-text': 'error',
    'vue/static-class-names-order': 'error',
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/valid-define-props': 'error',
    'vue/no-empty-component-block': 'warn',
    'vue/no-static-inline-styles': 'warn',
    'vue/no-child-content': 'error',
    'vue/no-expose-after-await': 'error',
    'vue/prefer-separate-static-class': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' }
    ],
    'vue/no-setup-props-destructure': 'off', // https://github.com/vuejs/rfcs/discussions/369
    'vue/no-ref-object-destructure': 'off', // Need to figure out how to handle ref.value.push() before turning on
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/define-emits-declaration': ['error', 'type-based']
  }
}
