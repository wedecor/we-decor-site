#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const BUNDLE_SIZE_LIMIT = 1024 * 1024; // 1MB in bytes

async function checkBundleSize() {
  console.log('🔍 Checking bundle size...');
  
  const buildDir = '.next/static/chunks';
  const mainChunkPath = join(buildDir, 'main-*.js');
  
  if (!existsSync('.next')) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  try {
    // Find the main chunk file
    const { readdirSync, statSync } = await import('fs');
    const chunks = readdirSync(buildDir);
    const mainChunk = chunks.find(file => file.startsWith('main-') && file.endsWith('.js'));
    
    if (!mainChunk) {
      console.error('❌ Main chunk not found');
      process.exit(1);
    }
    
    const chunkPath = join(buildDir, mainChunk);
    const stats = statSync(chunkPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`📦 Main bundle size: ${sizeInMB}MB`);
    
    if (stats.size > BUNDLE_SIZE_LIMIT) {
      console.error(`❌ Bundle size exceeds limit: ${sizeInMB}MB > 1MB`);
      console.log('💡 Consider code splitting or removing unused dependencies');
      process.exit(1);
    } else {
      console.log('✅ Bundle size is within limits');
    }
  } catch (error) {
    console.error('❌ Error checking bundle size:', error.message);
    process.exit(1);
  }
}

checkBundleSize().catch(console.error);