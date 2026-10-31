# 霜月式 · 淬鏡 — Website design preview

A self-contained, responsive website using the supplied Heikiru poster, original CSS mirror geometry, and a short glass-fracture entrance. No build step or external JavaScript dependencies.

## Preview

Open `index.html` directly in a current browser, or serve this folder with a static web server. The current local preview runs at http://localhost:4173.

The seven-second opening sequence plays once per browser tab session. Use **重播開場** to replay it. **動態 ON/OFF** controls motion; the site also respects the operating system's reduced-motion preference. Escape or **略過動畫** skips the entrance.

## Files

- `index.html`: Traditional Chinese content and page structure.
- `style.css`: responsive layout, mirror geometry, visual effects and animations.
- `revision.css`: version-two rounded typography, larger content, image slots and layered glass effects.
- `app.js`: entrance sequence, motion control, mobile menu, dialogs and reveal effects.
- `assets/heikiru-poster.png`: an unchanged copy of the user-supplied poster.
- `assets/fonts/`: locally bundled jf open-huninn 2.1 (粉圓), with its SIL Open Font License. Source: https://github.com/justfont/open-huninn-font.

## Second draft

- Most of the promotional copy is removed. The short theme explanation is collapsed by default.
- Visible empty slots are reserved for the second character, booth photographs, stage photographs, cosplay photographs, and a venue image or transport map. The background direction is intentionally unchanged pending new assets.
- Clicks anywhere scatter coloured glass. Buttons briefly break into clipped copies of their actual surface, then re-form. These effects are non-interactive and respect motion settings.
- The entrance includes a coloured aurora, an early glimpse of Heikiru, rotating portal rings, spreading cracks, 36 independently moving mirror facets, and depth movement before the hero reveal.

## Draft content

Date, time, venue, contact email, and illustrator credit were transcribed from the supplied poster. They are explicitly provisional in the preview. Ticket prices, registration links, performer lists, booth lists, floor plans and detailed cosplay rules have not been invented.

Heikiru's current reveal uses the full poster cropped in CSS inside a mirror. Once the text-free art and transparent character layers arrive, replace this with independent foreground and background layers for a stronger emergence effect. A second character can be added when the second poster is supplied.

The current preview is local to this computer, not a public deployment. The unchanged source poster is approximately 27 MB; optimize the final artwork and supply mobile sizes before public release.
