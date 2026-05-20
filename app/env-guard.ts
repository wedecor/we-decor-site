import { assertValidEnv } from '@/env/validation';

// Fail fast in production when required public env is missing or misconfigured
if (process.env.NODE_ENV === 'production') {
  assertValidEnv();
}
