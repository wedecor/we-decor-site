// scripts/check-route-collisions.js
// Fails CI if both Pages and App define the same route
const { globSync } = require('glob');

const toRoute = (p) =>
  p.replace(/^pages\//, '/')
   .replace(/^app\//, '/')
   .replace(/\/page\.tsx?$/, '/')
   .replace(/\.tsx?$/, '')
   .replace(/index$/, '');

const pages = globSync('pages/**/*.{ts,tsx}', { nodir: true }).map(toRoute);
const app = globSync('app/**/*.{ts,tsx}', { nodir: true }).map(toRoute);
const dupes = [...new Set(pages)].filter((r) => app.includes(r));

if (dupes.length) {
  console.error('❌ Route collisions found:');
  dupes.forEach(route => console.error(`  ${route}`));
  console.error('\nBoth Pages and App routers define these routes. Fix by removing one.');
  process.exit(1);
}
console.log('✅ No route collisions.');
console.log(`Pages routes: ${pages.length}, App routes: ${app.length}`); 