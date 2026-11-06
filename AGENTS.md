# Project workflow

The user requested a Git commit for each completed logical change. Keep this policy for future edits. Use clear, small commits after appropriate checks. Push to the configured GitHub origin when authentication is available; otherwise report that commits remain local.

Keep the site concise. The home page is a single-screen menu leading to seven separate HTML pages: introduction, stage, map, random play dance, cosplayer rules, participants regulations, and FAQ. Only the introduction uses normal document scrolling, as requested on 7 November 2026. Other long text pages use next/previous sheets. Do not restore a scrolling marketing page or add promotional filler.

Hekiru is the default dark theme; Nozomi is the bright theme. Preserve the supplied original art and respect reduced-motion preferences. Optimize new source images for browser use without redrawing them.

`build-pages.cjs` generates eight HTML files. Event copy is in `event-content.cjs`; current rules are in `current-regulations.cjs`. Change these sources or the template and run `node build-pages.cjs` to regenerate. `screen.css` and `screen.js` contain the current design and interactions. Legacy files are retained only as history/reference.

Do not invent event schedules, ticket prices, rules or application URLs. They need organizer-provided details.
