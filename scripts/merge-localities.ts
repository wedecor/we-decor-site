#!/usr/bin/env ts-node

import { promises as fs } from 'fs';
import path from 'path';

interface RegionFile {
  name: string;
  path: string;
  order: number;
}

async function mergeLocalities(): Promise<void> {
  try {
    // Define region files in the required order
    const regionFiles: RegionFile[] = [
      { name: 'South Bangalore', path: 'content/south_bangalore.txt', order: 1 },
      { name: 'East Bangalore', path: 'content/east_bangalore.txt', order: 2 },
      { name: 'North Bangalore', path: 'content/north_bangalore.txt', order: 3 },
      { name: 'Central Bangalore', path: 'content/central_bangalore.txt', order: 4 },
      { name: 'West Bangalore', path: 'content/west_bangalore.txt', order: 5 },
    ];

    // Sort by order to ensure correct sequence
    regionFiles.sort((a, b) => a.order - b.order);

    console.log('🔄 Starting locality merge process...');
    console.log(`📁 Processing ${regionFiles.length} region files...\n`);

    let mergedContent = '';
    let processedCount = 0;

    // Process each region file in order
    for (const region of regionFiles) {
      try {
        console.log(`📖 Reading ${region.name}...`);

        // Read the region file
        const content = await fs.readFile(region.path, 'utf-8');

        // Add region header and content
        if (mergedContent) {
          mergedContent += '\n\n'; // Add blank line separator
        }

        mergedContent += `# ${region.name}\n`;
        mergedContent += content.trim();

        processedCount++;
        console.log(`✅ ${region.name} processed (${content.split('\n').length} lines)`);
      } catch (error) {
        console.error(`❌ Error reading ${region.name}:`, error);
        throw new Error(`Failed to read ${region.path}: ${error}`);
      }
    }

    // Write the merged content to the output file
    const outputPath = 'content/we_decor_bangalore_localities_full.txt';
    console.log(`\n💾 Writing merged content to ${outputPath}...`);

    await fs.writeFile(outputPath, mergedContent, 'utf-8');

    // Verify the file was written successfully
    const stats = await fs.stat(outputPath);
    const lineCount = mergedContent.split('\n').length;

    console.log(`\n🎉 Successfully merged ${processedCount} region files!`);
    console.log(`📊 Output file: ${outputPath}`);
    console.log(`📏 Total lines: ${lineCount}`);
    console.log(`💾 File size: ${(stats.size / 1024).toFixed(2)} KB`);

    // Log the success message as required
    console.log(
      `\n✅ Merged ${processedCount} region files into we_decor_bangalore_localities_full.txt`
    );
  } catch (error) {
    console.error('\n❌ Merge process failed:', error);
    process.exit(1);
  }
}

// Run the merge function if this script is executed directly
if (require.main === module) {
  mergeLocalities().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

export { mergeLocalities };
