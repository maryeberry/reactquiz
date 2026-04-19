// This script fixes the asset paths in dist/index.html after expo export.
// Expo generates absolute paths like /_expo/... and /favicon.ico,
// but GitHub Pages serves the app from /reactquiz/, so we need to add that prefix.

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace all absolute asset paths with the /reactquiz prefix
html = html.replace(/href="\//g, 'href="/reactquiz/');
html = html.replace(/src="\//g, 'src="/reactquiz/');

fs.writeFileSync(filePath, html, 'utf8');

console.log('Patched dist/index.html with /reactquiz base path.');
