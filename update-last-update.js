// Replaces <!--BUILD_TIMESTAMP--> in index.html with the current UTC date/time.
// Run during the deployment process before uploading the artifact.

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
const now = new Date();
const timestamp = now.toUTCString(); // e.g. "Mon, 21 Apr 2026 14:30:00 GMT"

let html = fs.readFileSync(filePath, 'utf8');
html = html.replace('<!--BUILD_TIMESTAMP-->', timestamp);
fs.writeFileSync(filePath, html, 'utf8');

console.log(`Build timestamp set to: ${timestamp}`);
