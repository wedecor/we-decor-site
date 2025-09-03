import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',
      '**/*.e2e.*',
      '**/tests/e2e.spec.ts',
      '**/tests/a11y.spec.ts',
      '**/tests/areas.spec.ts',
    ],
  },
});
