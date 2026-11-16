import hmppsConfig from '@ministryofjustice/eslint-config-hmpps'

export default [
  ...hmppsConfig(),
  {
    files: ['scripts/*.ts', 'tests/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: { ecmaVersion: 2022 },
    },
    rules: {
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': ['error', { packageDir: [process.cwd()] }],
      'no-console': 'off',
    },
  },
]
