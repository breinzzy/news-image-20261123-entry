// news-image-20261123 entry (Node 22, standard library only): the image is
// the entry.png beside this file, and the program copies it to
// /output/entry.png. The image sums up Monday 23 November 2026 in one
// front page: 34 dated stories across 9 regions, drawn flat in code.
// Built from page-v8-23nov.html (see build_v8.py) and rendered to 1024x1024
// PNG (352,852 bytes, under the 1 MiB limit); the copy below is byte-exact,
// so both grader runs write identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
if (!existsSync(src)) throw new Error('entry.png missing from repository');
const bytes = readFileSync(src);
// Sanity: PNG magic + expected 1024x1024 dimensions in the IHDR chunk.
if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('entry.png is not a PNG');
if (bytes.readUInt32BE(16) !== 1024 || bytes.readUInt32BE(20) !== 1024) throw new Error('entry.png is not 1024x1024');
if (bytes.length > 1048576) throw new Error('entry.png exceeds 1 MiB');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(src, join(outDir, 'entry.png'));
console.log(`wrote ${bytes.length} bytes to ${join(outDir, 'entry.png')}`);
