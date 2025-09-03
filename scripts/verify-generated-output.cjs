#!/usr/bin/env node
const fs = require('node:fs');
const pages = ['east_bangalore.txt', 'west_bangalore.txt'];
let failed = false;

for (const f of pages) {
  const p = 'content/' + f;
  if (!fs.existsSync(p)) {
    console.error('Missing', p);
    failed = true;
  } else {
    const txt = fs.readFileSync(p, 'utf8');
    if (!/^CASE STUDY:/m.test(txt) || !/^CTA:/m.test(txt)) {
      console.error('Missing headers in', p);
      failed = true;
    }
  }
}

if (!failed) {
  console.log('verify-generated-output: OK');
}

process.exit(failed ? 1 : 0);
