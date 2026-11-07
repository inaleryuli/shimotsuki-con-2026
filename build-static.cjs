const fs = require('node:fs');
const path = require('node:path');

require('./build-pages.cjs');

const pages = [
  'index', 'introduction', 'stage', 'map', 'random-play-dance',
  'cosplayer-rules', 'participants-regulations', 'faq',
].map(page => page + '.html');
const documents = [...pages, 'screen.css', 'screen.js'];
const assets = new Set(['assets/fonts/OFL.txt']);

for (const file of documents) {
  const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
  for (const match of source.matchAll(/assets\/[\w./-]+/g)) assets.add(match[0]);
}

for (const file of [...documents, ...assets]) {
  const destination = path.join(__dirname, 'dist', file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(__dirname, file), destination);
}

console.log(`Prepared ${documents.length} site files and ${assets.size} assets in dist/.`);
