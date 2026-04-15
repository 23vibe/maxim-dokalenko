#!/usr/bin/env node
/**
 * update-gallery.js
 * ─────────────────
 * Scans the /gallery folder and regenerates gallery/manifest.json
 * with all image files found (jpg, jpeg, png, gif, webp, avif).
 *
 * Run after adding or removing images:
 *   node update-gallery.js
 *
 * Then commit & push — the site will display images in random order.
 */

const fs   = require('fs');
const path = require('path');

const GALLERY_DIR   = path.join(__dirname, 'gallery');
const MANIFEST_PATH = path.join(GALLERY_DIR, 'manifest.json');
const IMAGE_EXTS    = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

// ── Read gallery directory ──────────────────────────────────────────────────
if (!fs.existsSync(GALLERY_DIR)) {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
  console.log('📁  Created /gallery directory.');
}

const allFiles = fs.readdirSync(GALLERY_DIR);

const images = allFiles
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTS.has(ext) && file !== 'manifest.json';
  })
  .sort(); // sort alphabetically; app.js will shuffle on display

// ── Write manifest ──────────────────────────────────────────────────────────
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(images, null, 2) + '\n', 'utf8');

// ── Report ──────────────────────────────────────────────────────────────────
if (images.length === 0) {
  console.log('⚠️   No images found in /gallery. Add .jpg/.png/.webp files and run again.');
} else {
  console.log(`✅  manifest.json updated — ${images.length} image(s) listed:`);
  images.forEach(f => console.log(`     · ${f}`));
}

console.log('\n🚀  Next steps:');
console.log('     git add gallery/manifest.json');
console.log('     git commit -m "update gallery"');
console.log('     git push');
