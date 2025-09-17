## Personal Portfolio (CSCI 310 – Project 1)

Live Site: https://yazeed-ot.github.io/

### Overview
Single‑page, tabbed personal website built with semantic HTML5, CSS Grid for layout, and jQuery + vanilla JavaScript for interactivity. Designed to market skills, showcase projects, and present personal background while strictly following the assignment specification (dual responsive layouts, no heavy JS frameworks).

### Tabs Implemented
- Home (intro + typewriter effect)
- Projects (interactive project gallery & effects)
- About (professional summary, education, skills, awards, resume link)
- Hobbies (personal interests)
- Contact (reach out + demo form)

### Requirement Compliance
| Requirement | Implemented | Notes |
|-------------|-------------|-------|
| Multi‑tab personal site | Yes | Navigation switches `.tab-content` sections without reload |
| Hosted on GitHub Pages | Yes | Root `index.html` in `main` branch |
| Organized folders | Yes | `css/`, `js/`, `assets/img/`, `assets/resume/` |
| Only jQuery / vanilla JS | Yes | jQuery 3.6.4 CDN; no frameworks |
| Projects tab: ≥5 dynamic effects | Yes (6) | Listed below |
| Personal info tab | Yes | About tab with summary, education, skills, awards |
| Hobbies / interests tab | Yes | Hobbies tab |
| Additional tabs optional | Yes | Home + Contact added |
| Two layouts (desktop/mobile) | Yes | 900px desktop grid; 600px mobile stacked |
| No table tags for layout | Yes | CSS Grid + block elements only |
| Menu controls tab content | Yes | Click handler toggles `.active` class |
| Margins & paddings | Yes | Consistent spacing via utilities & section wrappers |
| Images + text (responsive) | Yes | Avatar & project images; stack on mobile |

### Dynamic Effects (Projects / Sitewide)
1. Tab switching + staged fade‑in of project cards.
2. Expand / collapse project detail panels (`slideToggle`).
3. Tooltip on project image hover (generated & positioned live).
4. Project image click animation (shrink / restore pulse).
5. Live project search filtering (input event, text match).
6. Scroll reveal animation for cards (appear on viewport entry).

Additional Enhancements (beyond minimum):
- Typewriter intro effect with post‑typing keyword highlighting.
- Animated skill bars (staggered; percentages increment via `requestAnimationFrame`).
- Dark / Light theme toggle (CSS custom properties).
- Smooth “Back to Top” scroll with focus management (accessibility).
- CSS 3D flip card component (micro‑interaction).
- Resume download link placeholder (`assets/resume/`).

### Layout Implementation
- Desktop: CSS Grid (`.layout-grid`) with areas: image | right (row 1), subtext | right (row 2), content spanning both columns (row 3). Header fixed 200px height, overall width capped at 900px centered.
- Mobile (≤768px): Grid collapses to vertical flow; header 150px, menu row 50px, width capped at 600px.
- All spacing driven by CSS variables (e.g., `--gap: 20px`).

### Accessibility Notes
- `aria-expanded` / `aria-hidden` reflect panel state.
- Focus outline preserved; smooth scroll returns focus to header for Back to Top.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.

### File / Directory Structure
| Path | Purpose |
|------|---------|
| `index.html` | All tab sections & markup |
| `css/style.css` | Theme variables, Grid layout, responsive rules, animations |
| `js/app.js` | jQuery behaviors & effects (tabs, search, tooltips, animations) |
| `assets/img/` | Static images / SVGs / diagram placeholders |
| `assets/resume/` | Resume PDF (add file before submission) |
| `LICENSE` | MIT License |

### Local Preview
Serve the site with any static file server. Example using Python:
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Potential Future Improvements
- Add actual resume PDF file.
- Minify / bundle CSS & JS (build step if desired).
- Add Lighthouse accessibility/performance audit & badges.
- Implement serverless contact form (e.g., form submission API) for real messages.

### License
MIT – see `LICENSE`.

