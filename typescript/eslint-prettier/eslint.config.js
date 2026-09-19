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
      // Reuse from oxlint template: members only, line order owns the formatter
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      eqeqeq: 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      // recommended brings it as error, we agreed warn like the oxlint template
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
)
