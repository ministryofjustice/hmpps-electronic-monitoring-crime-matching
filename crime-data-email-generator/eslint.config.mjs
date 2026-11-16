import hmppsConfig from '@ministryofjustice/eslint-config-hmpps'

export default [
  ...hmppsConfig(),
  {
    files: ['scripts/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: { ecmaVersion: 2022 },
    },
    rules: { 'no-console': 'off' },
  },
]
