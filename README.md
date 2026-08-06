# C.M. Property Jaipur — Front Page

React + TailwindCSS + Three.js (vanilla, via refs — no react-three-fiber/drei
dependency) front page with a connected interactive 3D house explorer page.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # to test the production build locally
```

The build output goes to `dist/` — upload that folder's contents to any
static host (Netlify, Vercel, GitHub Pages, cPanel, etc).

## What's inside

- `src/App.jsx` — the entire site: navbar, 3D hero, featured project cards,
  interactive Jaipur map, "why choose us", footer, and a second page
  (the 3D house explorer) reached via the hero CTA, project "View in 3D"
  buttons, map pins, or the "3D Tours" nav link.
- Plain `three` is used directly (no `@react-three/fiber` / `@react-three/drei`,
  since those aren't dependencies here) — the 3D scenes are wired up manually
  inside `useEffect` hooks.
- Tailwind handles layout/spacing/typography utilities; the custom dark
  charcoal/gold palette lives in a `<style>` block at the top of `App.jsx`
  as CSS custom properties (`--ink`, `--gold`, etc.) since those exact hex
  values aren't part of Tailwind's default palette.

## Editing content

- Project details (name, location, config, blurb): `PROJECTS` array in
  `App.jsx`.
- Map pins: `PINS` array.
- Exterior finish swatches for the 3D explorer: `FINISHES` array.
- English/Hindi copy: `COPY` object.
- Phone number / WhatsApp link / Instagram handle: search for
  `9636330811` and `_c.m.property_jaipur` in `App.jsx`.
