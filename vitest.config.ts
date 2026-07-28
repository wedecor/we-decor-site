import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(rootDir, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
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
