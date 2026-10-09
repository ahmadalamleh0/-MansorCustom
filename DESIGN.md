---
name: Mansour Customs
description: Cinematic automotive customization site by theDiablo (tokens are a temporary foundation until final brand direction)
colors:
  ink: "#0b0b0c"
  surface: "#141416"
  surface-raised: "#1b1b1e"
  line: "rgb(255 255 255 / 0.1)"
  line-strong: "rgb(255 255 255 / 0.22)"
  paper: "#f2f1ee"
  muted: "#9b9a97"
  faint: "#6b6a68"
  wordmark-white: "#ffffff"
  signature: "rgb(246 247 248 / 0.9)"
  scrim: "rgb(0 0 0 / 0.72)"
typography:
  wordmark:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(2.95vh, calc(84vw / 16.63))"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "1.12em"
  wordmark-nav:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "8px"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "0.5em"
  wordmark-nav-md:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "0.5em"
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 7.2vw, 9.5rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.8vw, 4rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 0.85rem + 5.6vw, 5.25rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.012em"
  statement-body:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.95rem + 0.55vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
  lede:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  eyebrow:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1.25rem, 0.6rem + 3vw, 3.5rem)"
  section-y: "clamp(5rem, 3rem + 8vw, 10rem)"
  header-h: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "56px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  service-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
  collage-card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.none}"
---

# Design System: Mansour Customs

How Mansour Customs is designed, built and verified. It complements
[CLAUDE.md](CLAUDE.md): CLAUDE.md sets the engineering rules, and this file
sets the visual system and the design process. Tokens above mirror
`src/styles/index.css`, which stays the implementation source. Change both
together.

## Overview

A cinematic, editorial website for a US vehicle wrapping and customization
brand. It should feel exclusive, precise and controlled, closer to an
automotive launch film than a template.

**Authority, in order:**
1. The creative director's explicit instructions for the task at hand.
2. Approved references (screenshots, videos) and real brand assets.
3. This document and the existing implementation.
4. Skill and tool suggestions (Frontend Design, Impeccable, UI/UX Pro Max, etc.).
   These advise; they never override 1–3.

**Current state:** the palette, typefaces and copy are a temporary
foundation. Final branding, logo, photography and business details are
pending from the client. Never invent them, and never present placeholder
copy or services as verified client information.

**Approved references** (save them in `references/`, which is gitignored and
not shipped):

| Section | Reference | Status |
|---|---|---|
| Opening intro | Urban Automotive intro video (`references/urban-intro.mp4`) | Implemented |
| Editorial section (cards → statement → cards) | Motorcarlease mobile screenshots | Implemented; images pending |
| Hero / banner | IR Customs mobile banner screenshot | Pending |
| Partner logos | `Banner/` (XPEL, STEK, SunTek, HEXIS, Gtechniq, Ceramic Pro) | Real assets; not yet placed |

Screenshots shared only in chat should also be saved to `references/` so
they can be measured again later.

## Colors

Near-black, neutral foundation. Imagery supplies the colour; the interface
stays quiet.

### Neutral
- `ink` is the page background and the intro curtain. `surface` and
  `surface-raised` are panels and media placeholders.
- `paper` is primary text, `muted` is secondary text, and `faint` is meta,
  captions and placeholder notes.
- `line` and `line-strong` are hairline dividers and borders.

- `signature` is reserved for the intro's signature rules, and `scrim` is
  reserved for modal backdrops.

### Named Rules
- **No decorative gradients or glows.** A gradient is allowed only as a
  functional scrim for legibility over imagery, or as an edge fade that
  blends imagery into the background (when a reference shows it).
- **Accent colours come from the brand.** No accent until the client's
  palette is supplied. If a reference introduces a tint (for example a
  subtle green cast), apply it as the reference does, as a token, not ad hoc.

## Typography

Three voices, each with one job:
- **Wordmark:** Michroma, wide-tracked uppercase, stacked MANSOR / CUSTOMS.
  Brand lockup only (intro and header). Temporary until the client's logo
  files arrive.
- **Editorial display:** Outfit 600. Large centred statements.
- **Interface and body:** system sans. Temporary; replace when the brand face
  is chosen.

### Hierarchy
- `display` for the hero title, `statement` for editorial statements and
  `headline` for section titles.
- `lede` and `statement-body` for supporting paragraphs (max ~26–44ch), and
  `eyebrow` for small uppercase labels.

### Named Rules
- Fonts are self-hosted woff2 in `public/fonts/`, preloaded when above the
  fold. No runtime Google Fonts calls.
- Never stretch, squash or fake-bold a typeface to fit. Adapt size, tracking
  or line breaks instead.
- Line breaks on large type are deliberate: use `text-wrap: balance` and
  check every breakpoint.

## Layout

- Container: `max-width: 90rem` with fluid `gutter` side padding. Vertical
  rhythm comes from `section-y`.
- **Responsive layouts are separate compositions.** For each breakpoint,
  decide what the composition should be (mobile references take priority
  when supplied); don't let desktop shrink by default. Verify at 1440, 768
  and 390.
- Proportions from references are measured, not eyeballed. Record them as
  ratios (for example the collage: S, 0.954S, 0.092S gaps) and tie spacing to
  type size where the reference does (statement spacing = 2.3× and 1.25× the
  headline size).
- No horizontal overflow at any width. Pinned and fixed elements must not
  create layout jumps.

## Elevation & Depth

Flat. Depth comes from imagery, scale and layering (curtain over hero,
scrims), not from shadows. No drop shadows on cards or text.

## Shapes

Square corners (`rounded.none`) across cards, buttons and media. Hairline
1px frames, as in the wordmark lockup, are the signature line language.
Introduce radius only when a reference explicitly uses it.

## Components

- **Wordmark** (`components/brand/Wordmark.tsx`): letters as separate spans
  for reveals, with an SVG frame (`pathLength` 1000) that traces clockwise
  from the top-left.
- **Logo lockup:** MANSOR / CUSTOMS, stacked and centred (the client's logo
  structure; the spelling "Mansor" was confirmed 2026-10-09). The lines come
  from `site.wordmark`. Intro: full reference tracking (1.12em), leading
  1.05em, about 16.6em wide. Nav: compact tier (0.5em tracking, 8/9px).
- **Signature rules** (intro only): a 1px `signature` rule 2.6em long,
  1.15em above and below the framed lockup, drawn outward from the centre
  (expo.out) before the letters reveal. Pixel-snapped. Keep them minimal;
  they support the type, never compete with it.
- **Media** (`components/ui/Media.tsx`): every image or video slot. Lazy by
  default; videos are muted and inline, play only on screen, and never
  autoplay with reduced motion. An empty slot renders an honest neutral
  placeholder.
- **Service card / Coming Soon dialog:** native `<dialog>`, focus returns to
  the card, and Escape closes it.
- **Collage + statement** (`components/sections/Editorial.tsx`): content from
  `data/editorial.ts`.
- All content and media live in `src/data/*`. Components contain no copy.

## Do's and Don'ts

**Do**
- Start from the reference: measure proportions, type scale, spacing, grid,
  timing and image treatment before writing code.
- Use authentic automotive photography and cinematic video (client-supplied
  or approved).
- Keep compositions disciplined and editorial; let one idea lead each section.
- Keep the homepage visually consistent: shared tokens, line language and
  motion vocabulary.
- Respect accessibility: contrast, focus, semantics, keyboard support,
  reduced motion.

**Don't**
- Generic AI layouts (centred hero + 3 cards + CTA band), repeated card grids
  or interchangeable sections.
- Decorative gradients, glows, neon, heavy shadows, large radii, glassmorphism
  or random particles.
- Generic typography choices made by default, or fonts that fight the brand
  voice.
- Scroll-jacking, exaggerated parallax, bouncy easing or animating
  everything.
- Reusing the look of earlier studio projects (Diablo, Vyper, Black Star,
  Wraptors, IronOak).
- Inventing branding, business details, testimonials or claims.

Luxury is not the number of effects. Luxury is the quality of execution.

## Motion

- **Every animation needs a reason:** reveal hierarchy, connect two states,
  or give feedback. If it does none of these, remove it.
- **Controlled, not showy:** transforms and opacity only; easing from the
  `expo`/`power` families (no bounce or elastic); entrances once only.
- **One owner per sequence:** related motion lives in one GSAP timeline
  (see `animations/intro.ts`), built in `src/animations/*` and called
  inside `useGSAP` so it's reverted on unmount.
- **Responsive and accessible:** variants go through `gsap.matchMedia()`
  with the shared `mq` conditions. Every animation has a
  `prefers-reduced-motion` branch that shows final states.
- **Never block content:** overlays get a failsafe, and nothing waits on
  media that may be slow or missing.
- **Performance:** no layout-thrashing properties, `will-change` only on
  actively moving layers, and check smoothness on mobile.

## Workflow

### Process for visually significant work
1. **Inspect** the approved reference and the current design system (this
   file plus the code). For video, extract frames with ffmpeg and measure
   timing. For screenshots, measure proportions.
2. **Implement** with `frontend-design`, plus the relevant `gsap-*` skills
   when motion is involved. Check uncertain APIs with Context7.
3. **Capture** with Playwright at desktop (1440) and mobile (390), adding
   tablet (768) when layout changes between them. For motion, record video
   or sample animation values per frame.
4. **Compare** against the reference side by side, phase by phase for motion.
5. **Critique** with `/impeccable critique` (composition, typography,
   proportion, polish).
6. **Review motion** with `/review-animations` (Emil Kowalski) when the task
   involves animation. The skill is user-invoked; when Claude runs the
   review itself, it reads
   `~/.claude/skills/review-animations/SKILL.md` and `STANDARDS.md` and
   applies them.
7. **Fix** material visual or motion problems, then recheck once before
   reporting. Bounded passes, not endless polishing.

### Choosing tools (don't run everything for every change)
| Task | Use |
|---|---|
| Copy, spacing or colour tweak | Edit, then a quick Playwright check. No skills needed. |
| New or redesigned section | frontend-design, Playwright compare, impeccable critique |
| Motion work | gsap-* skills, emil-design-eng, Playwright timing check, review-animations |
| UI/UX or accessibility review | web-design-guidelines, impeccable audit |
| Researching type, palette or UX patterns | ui-ux-pro-max search, as input only and never over references |
| Persistent bug | superpowers systematic-debugging |

### Impeccable hook (project-scoped)
After UI edits the detector adds non-blocking notes (quiet mode is on). Fix
real problems. When a finding conflicts with an approved reference or the
creative director's decision, the brief wins: record a narrow
`ignore-value` with the reason through `impeccable hooks`, never by hand.
Settings live in `.impeccable/config.json`.
