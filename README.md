# Hari Dhaarani S — Portfolio

A premium, single-page developer portfolio built with plain HTML, CSS and JavaScript (no build step required).

## Design concept

The site is framed around the idea of a **live database schema** — fitting for a PHP/Laravel + MySQL/PostgreSQL developer:

- The hero opens with a SQL query resolving into the name/title.
- Section eyebrows use SQL-comment style (`-- table: about_me`) instead of generic numbering.
- The hero side panel reads like a table record (`developer_profile.sql`).
- The animated hero background renders nodes and dashed relation lines, like an ER diagram.
- Project cards are framed as inspectable records with tech-stack tags and status badges.

Color system: deep navy-slate background, amber primary accent, teal secondary/structural accent. Type: Space Grotesk (display), Inter (body), JetBrains Mono (labels/data).

## Structure

```
portfolio/
├── index.html          # single-page site (all sections, anchor navigation)
├── css/
│   ├── style.css        # design tokens + all component styles
│   └── responsive.css   # mobile nav + breakpoint overrides
├── js/
│   ├── script.js         # loader, nav, cursor, theme, typing, counters, filters, form
│   └── animations.js     # canvas ER-diagram hero background
├── assets/
│   ├── images/
│   ├── icons/
│   └── resume/
│       └── HariDhaaraniS_Resume.pdf
└── README.md
```

> Note: the brief requested separate `about.html`, `projects.html` and `contact.html` pages. This build uses a single-page layout with in-page anchor navigation instead — the current standard for developer portfolios (faster, no full page reloads, easier to keep the sticky nav's active-state highlighting in sync). All requested content and sections are present; ask if you'd instead like it split into multiple physical pages.

## Running locally

No build tools needed. Just open `index.html` in a browser, or serve the folder:

```bash
cd portfolio
python3 -m http.server 8000
# visit http://localhost:8000
```

## Customizing

- **Colors / fonts**: edit the CSS custom properties at the top of `css/style.css` (`:root` block).
- **Content**: all text lives directly in `index.html`, organized by section with HTML comments.
- **Resume**: replace `assets/resume/HariDhaaraniS_Resume.pdf` with an updated file (keep the same filename, or update the `href` in the hero's "Download Resume" button).
- **GitHub / live demo links**: each project card in `index.html` has two placeholder links (`Code`, `Live Demo`) — swap the `href="#"` values for real URLs.
- **Contact form**: currently opens the visitor's email client via a `mailto:` link (no backend). To collect submissions directly, wire `js/script.js`'s submit handler to a form service (e.g. Formspree) or your own backend endpoint.

## Deploying (for your interview link)

Fastest free options:
- **GitHub Pages**: push this folder to a repo, enable Pages on the `main` branch.
- **Netlify / Vercel**: drag-and-drop the `portfolio` folder onto their dashboard for an instant live URL.
