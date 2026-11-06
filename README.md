# ShimotsukiCon · Saikyou 2026 — 霜月式 · 淬鏡

A single-screen event menu with seven separate pages: introduction, stage, map, random play dance, cosplayer rules, participants regulations and FAQ.

Hekiru is the default dark theme. The mode button switches to Nozomi and a bright palette. The opening mirror animation includes both characters. Click particles and button fragments respect the motion toggle and OS reduced-motion preference.

## Editing

Edit event-content.cjs for bilingual event information, current-regulations.cjs for the current organizer rules, and build-pages.cjs for shared layout, then run node build-pages.cjs to regenerate the HTML. Only the introduction scrolls, in the order: opening line, date/time/venue table, remaining introduction. Other longer pages use numbered sheets with next/previous controls. The floor plan opens in a zoomable, pannable dialog with an original-image link. The active stylesheet and script are screen.css and screen.js. Image layers are in assets/layers; they are optimized copies of the original supplied artwork. The bundled Huninn font license is in assets/fonts/OFL.txt.

Serve this folder with any static web server. The current local preview is http://localhost:4173/. No package installation or framework build is required.

Event details, ticket prices, stage schedule and rules follow the current sources in SOURCES.md. The organizer supplied the floor-plan artwork and updated Random Play Dance to 17:45–19:00. Performer descriptions are omitted in favour of a time/name schedule. The rule pages use the current 2026 announcements.

## Version control

Commit each completed logical change after verification, as requested by the user. See AGENTS.md. The baseline design, artwork import and multipage redesign have separate commits. GitHub synchronization requires an authenticated repository remote.
