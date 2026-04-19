// This script runs after expo export to prepare the dist folder for GitHub Pages.
//
// Fix 1: Expo generates absolute paths like /_expo/... and /favicon.ico,
// but GitHub Pages serves the app from /reactquiz/, so we add that prefix.
//
// Fix 2: GitHub Pages uses Jekyll by default, which ignores folders starting
// with underscore (like _expo/). We rename _expo to expo and update the
// reference in index.html to avoid the issue entirely.
//
// Fix 3: Add .nojekyll as an extra safeguard.

const fs = require('fs');
const path = require('path');

// Fix 2: rename _expo folder to expo
const expoOld = path.join(__dirname, 'dist', '_expo');
const expoNew = path.join(__dirname, 'dist', 'expo');
if (fs.existsSync(expoOld)) {
  fs.renameSync(expoOld, expoNew);
  console.log('Renamed dist/_expo to dist/expo.');
}

// Fix 1: patch asset paths in index.html
// - add /reactquiz prefix to all absolute paths
// - replace /_expo/ references with /expo/
const filePath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');
html = html.replace(/href="\//g, 'href="/reactquiz/');
html = html.replace(/src="\//g, 'src="/reactquiz/');
html = html.replace(/\/reactquiz\/_expo\//g, '/reactquiz/expo/');
fs.writeFileSync(filePath, html, 'utf8');
console.log('Patched dist/index.html with /reactquiz base path and expo folder rename.');

// Fix 3: add .nojekyll as extra safeguard
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');
console.log('Added .nojekyll to disable Jekyll on GitHub Pages.');
