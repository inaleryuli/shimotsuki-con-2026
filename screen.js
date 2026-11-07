(() => {
  'use strict';

  const $ = s => document.querySelector(s),
    root = document.documentElement,
    reduced = matchMedia('(prefers-reduced-motion: reduce)'),
    entrance = $('#entrance');

  const storage = {
    get(k) {
      try {
        return sessionStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        sessionStorage.setItem(k, v);
      } catch {}
    },
  };

  let motion = !reduced.matches,
    active = false,
    timers = [],
    returnFocus = null;
  let language = storage.get('shimo-language') === 'en' ? 'en' : 'zh';
  const tr = (zh, en) => (language === 'en' ? en : zh);

  function updateLabels() {
    const light = root.dataset.theme === 'light';
    $('#theme-toggle').setAttribute(
      'aria-label',
      light
        ? tr('切換至深色模式', 'Switch to dark mode')
        : tr('切換至明亮模式', 'Switch to bright mode'),
    );
    $('.mode-label').textContent = light
      ? tr('深色模式', 'Dark mode')
      : tr('明亮模式', 'Bright mode');
    $('#motion-toggle').textContent =
      tr('動態', 'Motion') + (motion ? ' ON' : ' OFF');
    $('#motion-toggle').setAttribute(
      'aria-label',
      motion
        ? tr('關閉動態效果', 'Turn motion off')
        : tr('開啟動態效果', 'Turn motion on'),
    );
  }

  function setLanguage(next) {
    language = next;
    root.lang = language === 'en' ? 'en' : 'zh-Hant';
    root.dataset.language = language;
    storage.set('shimo-language', language);
    document
      .querySelectorAll('[data-zh][data-en]')
      .forEach(el => (el.textContent = el.dataset[language]));
    document
      .querySelectorAll('.lang-content')
      .forEach(el => (el.hidden = el.dataset.lang !== language));
    const btn = $('#language-toggle');
    btn.textContent = language === 'en' ? '中文' : 'EN';
    btn.lang = language === 'en' ? 'zh-Hant' : 'en';
    btn.setAttribute('aria-label', tr('Switch to English', '切換至中文'));
    document
      .querySelectorAll('.menu-link')
      .forEach(a =>
        a.setAttribute(
          'aria-label',
          a.querySelector('[data-en]').dataset[language],
        ),
      );
    document
      .querySelectorAll('.panel-top nav a')
      .forEach(a =>
        a.setAttribute(
          'aria-label',
          a.dataset[language === 'en' ? 'labelEn' : 'labelZh'],
        ),
      );
    $('main nav')?.setAttribute('aria-label', tr('活動目錄', 'Event menu'));
    document.title =
      ($('#page-title')?.textContent ||
        tr('霜月式 · 淬鏡', 'ShimotsukiCon · Saikyou')) +
      ' | ShimotsukiCon · Saikyou 2026';
    document
      .querySelectorAll('[data-alt-zh]')
      .forEach(
        el => (el.alt = el.dataset[language === 'en' ? 'altEn' : 'altZh']),
      );
    updateLabels();
    renderSheet();
  }

  let sheetIndex = 0;
  function renderSheet() {
    const area = document.querySelector(
        `.lang-content[data-lang="${language}"]`,
      ),
      parts = area?.querySelectorAll('[data-sheet]') || [],
      pager = $('.content-pager');
    if (!pager) return;
    sheetIndex = Math.min(sheetIndex, Math.max(0, parts.length - 1));
    parts.forEach((part, i) => (part.hidden = i !== sheetIndex));
    pager.hidden = parts.length < 2;
    if (parts.length) {
      $('#sheet-position').textContent = `${sheetIndex + 1} / ${parts.length}`;
      $('#sheet-prev').disabled = sheetIndex === 0;
      $('#sheet-next').disabled = sheetIndex === parts.length - 1;
      pager.setAttribute('aria-label', tr('內容分頁', 'Content pages'));
    }
  }
  $('#sheet-prev')?.addEventListener('click', () => {
    sheetIndex--;
    renderSheet();
  });
  $('#sheet-next')?.addEventListener('click', () => {
    sheetIndex++;
    renderSheet();
  });

  // The original floor plan stays readable on small screens through zoom and pan.
  const mapDialog = $('#map-dialog');
  let mapScale = 1;
  function zoomMap(next) {
    mapScale = Math.max(1, Math.min(4, next));
    mapDialog?.style.setProperty('--map-scale', mapScale);
    $('#map-zoom-out')?.toggleAttribute('disabled', mapScale === 1);
    $('#map-zoom-in')?.toggleAttribute('disabled', mapScale === 4);
  }
  document.querySelectorAll('[data-open-map]').forEach(btn =>
    btn.addEventListener('click', () => {
      zoomMap(1);
      mapDialog.showModal();
      $('#map-close').focus();
    }),
  );
  $('#map-close')?.addEventListener('click', () => mapDialog.close());
  $('#map-zoom-out')?.addEventListener('click', () => zoomMap(mapScale - 0.5));
  $('#map-zoom-in')?.addEventListener('click', () => zoomMap(mapScale + 0.5));
  $('#map-zoom-reset')?.addEventListener('click', () => {
    zoomMap(1);
    $('.map-viewport').scrollTo(0, 0);
  });
  mapDialog?.addEventListener('click', e => {
    if (e.target === mapDialog) mapDialog.close();
  });
  setLanguage(language);
  $('#language-toggle').addEventListener('click', () =>
    setLanguage(language === 'en' ? 'zh' : 'en'),
  );

  function theme(next) {
    root.dataset.theme = next;
    storage.set('shimo-theme', next);
    const light = next === 'light';
    $('#theme-toggle').setAttribute('aria-pressed', String(light));
    $('#theme-toggle').setAttribute(
      'aria-label',
      light ? '切換至深色模式' : '切換至明亮模式',
    );
    $('.mode-label').textContent = light ? '深色模式' : '明亮模式';
    $('.mode-icon').textContent = light ? '☾' : '☀';
    document.querySelector('meta[name="theme-color"]').content = light
      ? '#f3e7f3'
      : '#071d25';
    $('.dark-character').setAttribute('aria-hidden', String(light));
    $('.light-character').setAttribute('aria-hidden', String(!light));
    updateLabels();
  }
  theme(root.dataset.theme);
  $('#theme-toggle').addEventListener('click', () =>
    theme(root.dataset.theme === 'dark' ? 'light' : 'dark'),
  );

  // Mirror geometry and opening animation.
  const center = [50, 45],
    edge = [
      [0, 0],
      [22, 0],
      [55, 0],
      [83, 0],
      [100, 0],
      [100, 35],
      [100, 72],
      [100, 100],
      [70, 100],
      [35, 100],
      [0, 100],
      [0, 70],
      [0, 30],
    ],
    inner = edge.map((p, i) =>
      p.map(
        (n, j) => center[j] + (n - center[j]) * (0.34 + 0.06 * Math.sin(i)),
      ),
    );
  let index = 0;
  function facet(points) {
    const el = document.createElement('div');
    el.className = 'facet';
    el.style.clipPath = `polygon(${points.map(p => p.map(n => n + '%').join(' ')).join(',')})`;
    const c = points.reduce(
        (a, p) => [a[0] + p[0] / 3, a[1] + p[1] / 3],
        [0, 0],
      ),
      i = index++;
    const props = {
      '--angle': i * 31 + 'deg',
      '--origin': c.map(n => n + '%').join(' '),
      '--dx': (c[0] - 50) * 3.8 + 'vw',
      '--dy': (c[1] - 45) * 3.8 + 'vh',
      '--dz': 180 + (i % 7) * 85 + 'px',
      '--rx': (i % 2 ? 1 : -1) * (20 + (i % 4) * 13) + 'deg',
      '--ry': (i % 3 ? 1 : -1) * (20 + (i % 5) * 14) + 'deg',
      '--rz': (i % 2 ? i : -i) + 'deg',
      '--delay': (i % 5) * 55 + 'ms',
    };
    Object.entries(props).forEach(([k, v]) => el.style.setProperty(k, v));
    $('#mirror-surface').append(el);
  }
  edge.forEach((p, i) => {
    const j = (i + 1) % edge.length;
    facet([center, inner[i], inner[j]]);
    facet([inner[i], p, edge[j]]);
    facet([inner[i], edge[j], inner[j]]);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const x = p[0] * 10,
      y = p[1] * 8;
    line.setAttribute(
      'd',
      `M500 360 L${500 + (x - 500) * 0.24 + 10} ${360 + (y - 360) * 0.24} L${500 + (x - 500) * 0.57 - 15} ${360 + (y - 360) * 0.57} L${x} ${y} M${inner[i][0] * 10} ${inner[i][1] * 8} L${inner[j][0] * 10} ${inner[j][1] * 8}`,
    );
    line.setAttribute('pathLength', '1');
    line.style.setProperty('--delay', i * 45 + 'ms');
    $('#fractures').append(line);
  });
  function finish() {
    timers.forEach(clearTimeout);
    timers = [];
    entrance.hidden = true;
    entrance.className = 'entrance';
    active = false;
    document.body.classList.remove('entering');
    document
      .querySelectorAll('header,main,footer')
      .forEach(el => (el.inert = false));
    storage.set('shimo-entered-v3', 'yes');
    if (returnFocus) {
      returnFocus.focus({ preventScroll: true });
      returnFocus = null;
    }
  }
  function play() {
    if (!motion) return;
    finish();
    returnFocus = $('#replay');
    active = true;
    entrance.hidden = false;
    document.body.classList.add('entering');
    document
      .querySelectorAll('header,main,footer')
      .forEach(el => (el.inert = true));
    $('#skip').focus({ preventScroll: true });
    timers.push(
      setTimeout(() => entrance.classList.add('awake'), 150),
      setTimeout(() => entrance.classList.add('cracked'), 1900),
      setTimeout(() => {
        entrance.classList.add('broken');
        document.body.classList.remove('entering');
      }, 3500),
      setTimeout(finish, 6500),
    );
  }
  $('#skip').addEventListener('click', finish);
  $('#replay').addEventListener('click', play);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && active) finish();
  });
  function setMotion(on) {
    motion = on && !reduced.matches;
    document.body.classList.toggle('paused', !motion);
    $('#motion-toggle').textContent = motion ? '動態 ON' : '動態 OFF';
    $('#motion-toggle').setAttribute('aria-pressed', String(motion));
    $('#motion-toggle').setAttribute(
      'aria-label',
      motion ? '關閉動態效果' : '開啟動態效果',
    );
    $('#replay').disabled = !motion;
    updateLabels();
    storage.set('shimo-motion', motion ? 'on' : 'off');
    if (!motion) {
      finish();
      document.querySelectorAll('.fx').forEach(el => el.remove());
      document
        .getAnimations()
        .filter(a => a.effect?.target?.dataset?.breaking)
        .forEach(a => a.cancel());
    }
  }
  if (storage.get('shimo-motion') === 'off') motion = false;
  setMotion(motion);
  reduced.addEventListener('change', () => setMotion(!reduced.matches));
  $('#motion-toggle').addEventListener('click', () => setMotion(!motion));

  // Click and button effects.
  const colors = ['#b5f5e7', '#d3b8ff', '#f8bfdc', '#acdfff'];
  function layer() {
    let fx = $('.fx');
    if (!fx) {
      fx = document.createElement('div');
      fx.className = 'fx';
      fx.setAttribute('aria-hidden', 'true');
      fx.inert = true;
      document.body.append(fx);
    }
    return fx;
  }
  function remove(el, ms) {
    setTimeout(() => {
      const p = el.parentElement;
      el.remove();
      if (p && !p.children.length) p.remove();
    }, ms);
  }
  function scatter(x, y) {
    const fx = layer();
    if (fx.children.length > 100) return;
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('i');
      el.className = 'spark';
      const a = (i / 10) * Math.PI * 2,
        d = 35 + Math.random() * 50;
      Object.entries({
        '--x': x + 'px',
        '--y': y + 'px',
        '--size': 5 + Math.random() * 6 + 'px',
        '--dx': Math.cos(a) * d + 'px',
        '--dy': Math.sin(a) * d + 10 + 'px',
        '--color': colors[i % 4],
      }).forEach(([k, v]) => el.style.setProperty(k, v));
      fx.append(el);
      remove(el, 900);
    }
  }
  function shatter(button) {
    if (button.dataset.breaking) return;
    button.dataset.breaking = 'yes';
    const r = button.getBoundingClientRect(),
      style = getComputedStyle(button),
      fx = layer(),
      points = [
        [0, 0],
        [50, 0],
        [100, 0],
        [100, 100],
        [50, 100],
        [0, 100],
      ];
    points.forEach((p, i) => {
      const q = points[(i + 1) % 6],
        el = document.createElement('div');
      el.className = 'button-piece';
      el.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;clip-path:polygon(50% 50%,${p[0]}% ${p[1]}%,${q[0]}% ${q[1]}%);`;
      el.style.setProperty('--dx', ((p[0] + q[0]) / 2 - 50) * 1.6 + 'px');
      el.style.setProperty('--dy', ((p[1] + q[1]) / 2 - 50) * 1.6 + 'px');
      el.style.setProperty('--r', (i % 2 ? i * 5 : -i * 5) + 'deg');
      const copy = button.cloneNode(true);
      copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
      copy.style.width = r.width + 'px';
      copy.style.height = r.height + 'px';
      copy.style.font = style.font;
      copy.style.background = style.background;
      copy.inert = true;
      el.append(copy);
      fx.append(el);
      remove(el, 850);
    });
    const a = button.animate(
      [
        { opacity: 1 },
        { opacity: 0.03, offset: 0.17 },
        { opacity: 0.03, offset: 0.5 },
        { opacity: 1 },
      ],
      { duration: 680 },
    );
    a.onfinish = a.oncancel = () => delete button.dataset.breaking;
  }
  document.addEventListener(
    'click',
    e => {
      if (!motion || active) return;
      if (e.detail) scatter(e.clientX, e.clientY);
      const target = e.target.closest('.menu-link,button,.home-link');
      if (target && !target.matches('#skip,#replay,#motion-toggle'))
        shatter(target);
      const link = e.target.closest('a[href$=".html"]');
      if (
        link &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey &&
        e.button === 0
      ) {
        e.preventDefault();
        setTimeout(() => location.assign(link.href), 240);
      }
    },
    true,
  );

  // A single expanded answer keeps the FAQ within one screen.
  document.querySelectorAll('.faq-items details').forEach(d =>
    d.addEventListener('toggle', () => {
      if (d.open)
        document.querySelectorAll('.faq-items details').forEach(other => {
          if (other !== d) other.open = false;
        });
    }),
  );
  if (
    document.body.dataset.page === 'home' &&
    motion &&
    !storage.get('shimo-entered-v3')
  )
    play();
})();
