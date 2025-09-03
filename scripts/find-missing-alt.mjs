#!/usr/bin/env node
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const ROOT = process.cwd();
const SRC_DIRS = ['app', 'components', 'pages', 'src'].map((d) => path.join(ROOT, d));
const exts = new Set(['.tsx', '.jsx', '.ts', '.js']);
const files = [];

function walk(dir) {
  try {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (exts.has(path.extname(p))) files.push(p);
    }
  } catch {
    /* ignore missing dirs */
  }
}

SRC_DIRS.forEach(walk);

const offenders = [];
for (const f of files) {
  const code = readFileSync(f, 'utf8');
  let ast;
  try {
    ast = parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });
  } catch {
    continue;
  }
  traverse(ast, {
    JSXOpeningElement(pathEl) {
      const name = pathEl.node.name;
      const tag = name.type === 'JSXIdentifier' ? name.name : null;
      if (!tag) return;
      if (tag.toLowerCase() !== 'image' && tag !== 'Image') return;

      const hasAlt = pathEl.node.attributes.some((attr) => {
        if (attr.type !== 'JSXAttribute') return false;
        const id = attr.name && attr.name.name;
        return id === 'alt';
      });

      if (!hasAlt) {
        offenders.push(f);
      }
    },
  });
}

if (offenders.length) {
  console.error('❌ <Image> without `alt` found in:');
  const uniq = [...new Set(offenders)];
  for (const f of uniq) console.error('  -', path.relative(ROOT, f));
  process.exit(2);
}
console.log('✅ All <Image> elements include an `alt` prop.');
