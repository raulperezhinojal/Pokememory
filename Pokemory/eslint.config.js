export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        alert: 'readonly',
        clearInterval: 'readonly',
        console: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        sessionStorage: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      semi: ['error', 'always'],
    },
  },
];
