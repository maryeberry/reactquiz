// This script runs after expo export to prepare the dist folder for GitHub Pages.
//
// Fix 1: Expo generates absolute paths like /_expo/... and /favicon.ico,
// but GitHub Pages serves the app from /reactquiz/, so we add that prefix.
//
// Fix 2: GitHub Pages uses Jekyll by default, which ignores folders starting
// with underscore (like _expo/). Adding a .nojekyll file disables Jekyll so
// the _expo folder is served correctly.

const fs = require('fs');
const path = require('path');

// Fix 1: patch asset paths in index.html
const filePath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');
html = html.replace(/href="\//g, 'href="/reactquiz/');
html = html.replace(/src="\//g, 'src="/reactquiz/');
fs.writeFileSync(filePath, html, 'utf8');
console.log('Patched dist/index.html with /reactquiz base path.');

// Fix 2: add .nojekyll so GitHub Pages serves the _expo folder
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');
console.log('Added .nojekyll to disable Jekyll on GitHub Pages.');
