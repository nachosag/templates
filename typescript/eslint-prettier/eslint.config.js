import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {
      // vtsls/tsc owns unused (noUnusedLocals/Parameters), silence eslint to avoid duplicates
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // Reuse from oxlint template: members only, line order owns the formatter
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      eqeqeq: 'error',
      'prefer-const': 'error',
      // recommended brings it as error, we agreed warn like the oxlint template
      '@typescript-eslint/no-explicit-any': 'warn',
      // Named functions and methods must declare their return type; inline callbacks may infer
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    },
  },
)
