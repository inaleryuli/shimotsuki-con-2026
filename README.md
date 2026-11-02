# ShimotsukiCon · Saikyou 2026 — 霜月式 · 淬鏡

A single-screen event menu with six separate pages: introduction, stage, map, random play dance, cosplayer rules and FAQ.

Hekiru is the default dark theme. The mode button switches to Nozomi and a bright palette. The opening mirror animation includes both characters. Click particles and button fragments respect the motion toggle and OS reduced-motion preference.

## Editing

Edit event-content.cjs for bilingual event information and build-pages.cjs for shared layout, then run node build-pages.cjs to regenerate the HTML. Longer content uses numbered sheets with next/previous controls to keep the site free of page scrolling. The active stylesheet and script are screen.css and screen.js. Image layers are in assets/layers; they are optimized copies of the original supplied artwork. The bundled Huninn font license is in assets/fonts/OFL.txt.

Serve this folder with any static web server. The current local preview is http://localhost:4173/. No package installation or framework build is required.

Event details, ticket prices, performers and RPD time follow the official sources in SOURCES.md. The cosplay page explicitly identifies its adaptation of the 2025 guidelines; it does not assert that last year's facilities apply to 2026. The venue floor plan still needs an organizer-supplied asset.

## Version control

Commit each completed logical change after verification, as requested by the user. See AGENTS.md. The baseline design, artwork import and multipage redesign have separate commits. GitHub synchronization requires an authenticated repository remote.
