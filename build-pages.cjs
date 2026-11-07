const fs = require('node:fs');
const path = require('node:path');
const eventContent = require('./event-content.cjs');
const { indent } = require('./page-markup.cjs');

const pages = [
  ['introduction', '活動簡介', 'Introduction'],
  ['stage', '舞臺表演', 'Stage'],
  ['map', '場地地圖', 'Map'],
  ['random-play-dance', '隨機宅舞', 'Random Play Dance'],
  ['cosplayer-rules', 'Cosplayer 守則', 'Cosplayer Rules'],
  ['participants-regulations', '參加者守則', 'Participants Regulations'],
  ['faq', '常見問題', 'FAQ'],
];

const bilingual = (zh, en) =>
  `<span data-zh="${zh}" data-en="${en}">${zh}</span>`;

function homeMenu() {
  const links = pages.map(
    ([slug, title, english], i) => `<a class="menu-link" href="${slug}.html">
  <span class="menu-index">0${i + 1}</span>
  ${bilingual(title, english)}
  <span aria-hidden="true">↗</span>
</a>`,
  );

  return `<div class="home-copy">
  <div class="event-title">
    <span>霜月式</span>
    <h1>淬鏡</h1>
    <small>SHIMOTSUKICON · SAIKYOU 2026</small>
  </div>

  <nav class="main-menu" aria-label="活動目錄">
${indent(links.join('\n'), 4)}
  </nav>
</div>`;
}

function detailPanel([slug, title, english]) {
  const links = pages.map(([target, zh, en], i) => {
    const current = target === slug ? ' aria-current="page"' : '';
    return `<a href="${target}.html"${current} aria-label="${zh}" data-label-zh="${zh}" data-label-en="${en}">${i + 1}</a>`;
  });
  const translations = ['zh', 'en'].map(
    lang => `<div class="lang-content" data-lang="${lang}"${lang === 'en' ? ' hidden' : ''}>
${indent(eventContent[lang][slug], 2)}
</div>`,
  );

  return `<section class="page-panel" aria-labelledby="page-title">
  <div class="panel-top">
    <span>${english.toUpperCase()}</span>
    <nav aria-label="頁面切換">
${indent(links.join('\n'), 6)}
    </nav>
  </div>

  <h1 id="page-title">${bilingual(title, english)}</h1>

  <div class="page-content">
${indent(translations.join('\n\n'), 4)}
  </div>

  <nav class="content-pager" aria-label="內容分頁" hidden>
    <button id="sheet-prev" data-zh="← 上一頁" data-en="← Previous">← 上一頁</button>
    <span id="sheet-position" role="status" aria-live="polite"></span>
    <button id="sheet-next" data-zh="下一頁 →" data-en="Next →">下一頁 →</button>
  </nav>
</section>`;
}

const mapDialog = `<dialog class="map-dialog" id="map-dialog" aria-label="場地平面圖">
  <button id="map-close" data-zh="關閉 ✕" data-en="Close ✕" aria-label="關閉平面圖">關閉 ✕</button>
  <div class="map-viewport">
    <img
      src="assets/event/floor-plan.png"
      alt="觀塘海濱活動空間03場地平面圖"
      data-alt-zh="觀塘海濱活動空間03場地平面圖"
      data-alt-en="AquaBeat 03 event floor plan"
    >
  </div>
  <div class="map-controls">
    <button id="map-zoom-out" aria-label="縮小">−</button>
    <button id="map-zoom-reset" data-zh="重設" data-en="Reset">重設</button>
    <button id="map-zoom-in" aria-label="放大">＋</button>
    <a href="assets/event/floor-plan.png" target="_blank" data-zh="開啟原圖 ↗" data-en="Open original ↗" rel="noopener">開啟原圖 ↗</a>
  </div>
</dialog>`;

function template(page) {
  const [slug, title] = page ?? ['home', '霜月式 · 淬鏡'];
  const content = page ? detailPanel(page) : homeMenu();
  const mainClass = page ? 'detail-screen' : 'home-screen';
  const menuLink = page
    ? '\n        <a class="home-link" href="index.html" data-zh="目錄" data-en="Menu">目錄</a>'
    : '';
  const eventDate = page
    ? ''
    : '\n      <span class="event-date">2026.11.15 · 12:00–20:00</span>';
  const dialog = slug === 'map' ? '\n\n' + indent(mapDialog, 4) : '';

  return `<!doctype html>
<html lang="zh-Hant" data-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#071d25">
    <title>${title} | 霜月式 · 淬鏡</title>
    <link rel="icon" href="assets/mirror.svg">
    <link rel="stylesheet" href="screen.css">
    <script>
      try {
        if (sessionStorage.getItem('shimo-theme') === 'light') {
          document.documentElement.dataset.theme = 'light';
        }
      } catch {}
    </script>
  </head>
  <body data-page="${slug}">
    <div class="world" aria-hidden="true">
      <div class="world-background dark-background"></div>
      <div class="world-background light-background"></div>
      <img class="glass-art dark-only" src="assets/layers/dark-glass.webp" alt="">
      <img class="glass-art light-only" src="assets/layers/light-glass.webp" alt="">
    </div>

    <header>
      <a class="brand" href="index.html" data-zh="霜月式 · 淬鏡" data-en="ShimotsukiCon · Saikyou">霜月式 · 淬鏡</a>
      <div class="controls">${menuLink}
        <button id="language-toggle" aria-label="Switch to English" lang="en">EN</button>
        <button id="theme-toggle" aria-label="切換至明亮模式" aria-pressed="false"><span class="mode-icon" aria-hidden="true">☀</span><span class="mode-label">明亮模式</span></button>
        <button id="motion-toggle" aria-label="關閉動態效果" aria-pressed="true">動態 ON</button>
      </div>
    </header>

    <main class="${mainClass}" id="main">
${indent(content, 6)}

      <div class="character-stage" aria-label="看板娘">
        <img class="character dark-character" src="assets/layers/hekiru.webp" alt="Hekiru">
        <img class="character light-character" src="assets/layers/nozomi.webp" alt="Nozomi">
        <span class="character-name dark-only">Hekiru</span>
        <span class="character-name light-only">Nozomi</span>
      </div>
    </main>

    <footer>
      <a class="society-link" href="https://www.acabox.studsoc.hku.hk/" target="_blank" rel="noopener" data-zh="ACA 網站 ↗" data-en="ACA website ↗">ACA 網站 ↗</a>${eventDate}
      <div>
        <a class="ticket-link" href="https://www.art-mate.net/doc/99977" target="_blank" rel="noopener" data-zh="購票 ↗" data-en="Tickets ↗">購票 ↗</a>
        <button id="replay" data-zh="重播開場" data-en="Replay intro">重播開場</button>
        <a href="https://www.instagram.com/acahku/" target="_blank" rel="noopener">IG ↗</a>
      </div>
    </footer>${dialog}

    <div class="entrance" id="entrance" hidden>
      <div class="entrance-backdrop"></div>
      <div class="entrance-characters" aria-hidden="true">
        <img class="entrance-hekiru" src="assets/layers/hekiru.webp" alt="">
        <img class="entrance-nozomi" src="assets/layers/nozomi.webp" alt="">
      </div>
      <div class="mirror-surface" id="mirror-surface" aria-hidden="true"></div>
      <svg class="crack-lines" viewBox="0 0 1000 800" preserveAspectRatio="none" aria-hidden="true">
        <g id="fractures"></g>
      </svg>
      <div class="entrance-title" aria-hidden="true">霜月式 · 淬鏡</div>
      <button id="skip" data-zh="略過 ↗" data-en="Skip ↗">略過 ↗</button>
    </div>
    <script src="screen.js"></script>
  </body>
</html>
`;
}

fs.writeFileSync(path.join(__dirname, 'index.html'), template());
for (const page of pages) {
  fs.writeFileSync(path.join(__dirname, page[0] + '.html'), template(page));
}

console.log(`Built menu + ${pages.length} pages`);
