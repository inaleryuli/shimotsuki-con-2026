# Project workflow

The user requested a Git commit for each completed logical change. Keep this policy for future edits. Use clear, small commits after appropriate checks. Push to the configured GitHub origin when authentication is available; otherwise report that commits remain local.

Keep the site concise. The home page is a single-screen menu leading to six separate HTML pages: introduction, stage, map, random play dance, cosplayer rules, and FAQ. Do not restore a scrolling marketing page or add promotional filler.

Hekiru is the default dark theme; Nozomi is the bright theme. Preserve the supplied original art and respect reduced-motion preferences. Optimize new source images for browser use without redrawing them.

`build-pages.cjs` generates the seven HTML files. Change its content or template and run `node build-pages.cjs` to regenerate. `screen.css` and `screen.js` contain the current design and interactions. Legacy files are retained only as history/reference.

Do not invent event schedules, ticket prices, rules or application URLs. They need organizer-provided details.
