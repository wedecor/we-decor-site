#!/usr/bin/env node
// Fail CI if both Pages and App define the same route (e.g., "/" via pages/index.tsx and app/page.tsx)
const { globSync } = require('glob');

const toRoute = (p) =>
  p.replace(/^pages\//, '/')
   .replace(/^app\//, '/')
   .replace(/\/page\.tsx?$/, '/')
   .replace(/\.tsx?$/, '')
   .replace(/index$/, '');

const pages = globSync('pages/**/*.{ts,tsx}').map(toRoute);
const app = globSync('app/**/*.{ts,tsx}').map(toRoute);
const dupes = [...new Set(pages)].filter((r) => app.includes(r));

if (dupes.length) {
  console.error('❌ Route collisions found:\n' + dupes.join('\n'));
  console.error('\n💡 Fix by removing one of the conflicting routes');
  console.error('   - Pages Router: pages/ directory');
  console.error('   - App Router: app/ directory');
  process.exit(1);
}
console.log('✅ No route collisions.');
console.log(`📁 Pages routes: ${pages.length}`);
console.log(`📁 App routes: ${app.length}`); 