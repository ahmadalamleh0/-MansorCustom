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
  ig-amber: "#f9a03f"
  ig-orange: "#f05a28"
  ig-pink: "#e1306c"
  ig-magenta: "#c13584"
  ig-purple: "#833ab4"
  ig-blue: "#5b51d8"
typography:
  wordmark:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(4vh, calc(84vw / 11.68))"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "0.62em"
  wordmark-nav:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "0.62em"
  wordmark-nav-md:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "0.62em"
  wordmark-footer:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "0.62em"
  footer-link:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 0.9rem + 0.15vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 2.3
  footer-social:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  location-title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 0.95rem + 0.8vw, 1.625rem)"
    fontWeight: 500
    letterSpacing: "0.24em"
  philosophy-headline:
    fontFamily: "Michroma, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 0.9rem + 6.6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0.02em"
  philosophy-copy:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.5rem)"
    fontWeight: 300
    lineHeight: 1.45
    letterSpacing: "0.005em"
  instagram-handle:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2rem)"
    fontWeight: 600
    letterSpacing: "-0.01em"
  hero-headline:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.05rem, 0.9rem + 5.1vw, 5.125rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  hero-services:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.65625rem, 0.6rem + 0.25vw, 0.78125rem)"
    fontWeight: 500
    lineHeight: 2
    letterSpacing: "0.2em"
  button-label:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78125rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.22em"
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
    fontSize: "clamp(2.25rem, 0.75rem + 6.4vw, 5.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  statement-body:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.94rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.005em"
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
  card: "0.625rem"
  card-md: "0.75rem"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 0.6rem + 3vw, 3.5rem)"
  section-y: "clamp(5rem, 3rem + 8vw, 10rem)"
  header-h: "4.5rem"
components:
  cta-link:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    padding: "14px 4px"
    height: "48px"
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
| Hero composition | DAS Tuning mobile video (`references/das-tuning.mp4`) | Implemented; hero media pending |
| Brand-logo banner after the hero | IR Customs mobile banner screenshot | Implemented (logo row only; angled panels removed) |
| Footer | MANSORY mobile footer screenshot | Implemented; socials hidden until verified |
| Selected Projects gallery | VOIR PPF archived screenshot (`references/voir-collection.png`) | Implemented (Michroma vertical models, 1px gutters, maker marks) |
| "Beyond Factory." brand section | Alain Class Aftersales mobile screenshot (`references/alainclass-aftersales.jpeg`) | Implemented (monochrome; no red glow, arc + ticks kept) |
| Instagram showcase | Venuum mobile screenshot (`references/venuum-instagram.jpeg`) | Implemented; Reels via official API (awaiting Mansor's authorisation); follower count and badge pending confirmation |
| Location map | Creative director's aerial reference image | Implemented: aerial preview → live Google Maps satellite |
| Product-brand logos | `Banner/` (XPEL, STEK, SunTek, HEXIS, Gtechniq, Ceramic Pro) | In the showcase, monochrome; no partnership claimed |

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
- **Editorial display:** Outfit 500. Large centred statements ("The Mansor
  Standard.": one line on md+, a balanced two-line break on phones; block
  spacing still follows the original statement scale).
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

Square corners (`rounded.none`) across cards, buttons and media, except where
a reference explicitly rounds: the Instagram showcase's pills and Reel cards. The hero
CTA has no container at all: it's an editorial text link. Thin 1px rules
(the intro's signature rules, footer dividers) are the signature line
language. The logo has no frame.
Introduce radius only when a reference explicitly uses it.

### Geometric display face (RYFT reference, 2026-10-13)
RYFT's heading face (RyftSansHeading) is proprietary, so **Bruno Ace SC**
(SIL OFL, self-hosted, `--font-geo`) is the closest licensed match: wide
geometric caps, pointed A, M with the V on the baseline, rounded-square O/G.
Used in capitals only for: the hero headline (1.5-4rem, +0.02em), "The
Mansor Standard." (1.75-4rem, one line on lg, two below) and the Beyond
Factory description (0.81-1rem, +0.05em, leading 1.85). The logo, Michroma
headings (Beyond Factory, Recent Work, Testimonials, Build Brief, FAQ) and
Outfit body copy are unchanged.

## Components

- **Official logo** (`components/brand/BrandLogo.tsx`): MANSOR over tracked
  CUSTOMS, white on transparent, extracted from the client's logo
  (`client-photos/brand/mansor-logo-official.jpg`; the starfield dropped).
  Header (147px phones / 156px md+) and footer (176 / 205px). The intro
  keeps the typeset Wordmark below. Favicons (16/32/48 + .ico) and
  apple-touch / manifest icons: the official starfield disc itself, cut on
  its edge (2026-10-13). Social preview `public/og-image.jpg` (1200×630,
  the official disc on black); OG/Twitter tags use an absolute URL filled at build time
  (`SITE_URL`, else Netlify's `URL`).
- **Wordmark** (`components/brand/Wordmark.tsx`): letters as separate spans
  for the letter-by-letter reveal. Type only, with no frame.
- **Logo lockup:** MANSOR over CUSTOMS (the client's logo structure; the
  spelling "Mansor" was confirmed 2026-10-09). MANSOR is primary; CUSTOMS is
  a small tracked subtitle (42% of MANSOR's size, about 60% of its width),
  centred beneath it, as in the client's logo. No frame. The lines come from `site.wordmark`.
  The same proportions everywhere (intro, nav, footer): CUSTOMS 0.42em with
  1.08em tracking, line gap 0.38em. Nav 15/16px and footer 18/21px, so the
  subtitle stays legible.
  Intro: MANSOR tracking 0.62em, leading 0.55em, about 11.7em wide. Nav:
  12/13px.
- **Signature rules** (intro only): a 1px `signature` rule (55% white) 2.2em
  long, 1.5em above and below the lockup, drawn outward from the centre
  (expo.out) before the letters reveal. Pixel-snapped. Keep them minimal;
  they support the type, never compete with it.
- **Hero** (`components/sections/Hero.tsx`): DAS Tuning composition, set
  low in the frame so the vehicle leads. A centred `hero-headline` (Outfit
  500; 3 rows on phones, 2 on md+), the service categories in tracked
  uppercase with round 3px dot separators (two fixed rows on phones, one
  line on md+, never breaking inside a category), and one editorial CTA,
  "Book Appointment": transparent, tracked off-white capitals over a 1px
  rule at 32%. On hover a full-strength rule draws in from the left and
  retracts to the right (expo.out, hover-capable devices only). 48px tap
  target.
  With no booking method confirmed, the CTA opens the Coming Soon dialog
  (`site.hero.cta.bookingUrl` switches it to a link). A functional scrim
  fades the hero into `ink`.
- **Brand banner** (`components/sections/Showcase.tsx`, `data/banner.ts`):
  directly after the hero, a slow monochrome marquee with faded edges of
  brands genuinely associated with Mansor. Only `confirmed` brands show:
  Stage 4 Tuning (its official S4T logo, cut white on transparency, set a
  little taller as a two-line lockup) and Brillsteel Motorsport (removed from
  the strip 2026-10-12; entry kept hidden with its logo for easy return). Both logos are supplied files, cut
  onto transparency, never redrawn. Also confirmed and shown (logos supplied
  2026-10-12): Akrapovič (red emblem kept, black lettering reversed to white),
  XPEL (reversed to white) and 3M (the official mark as a clean Simple Icons
  vector in 3M red; the supplied file was a watermarked clip-art copy). PurePPF:
  its official light logo at full size from pureprotectionfilm.com (the
  supplied file was a 126px thumbnail of it), ghost tagline removed. Akrapovič,
  Eventuri, Wagner Tuning, XPEL, 3M and SunTek are staged as `pending`
  (mentioned on Mansor's site, awaiting approval). The set repeats to fill
  the row; static and wrapped with reduced motion. The reference shop's
  logos were removed (2026-10-11).
- **The Build Brief** (`components/sections/BuildDesk.tsx`,
  `lib/buildRequest.ts`, `data/makes.ts`; compact card redesign, creative
  director 2026-10-14, which supersedes the flat/no-glass rules for this
  section only; restyled to stealth black the same day): after the service
  tiles. One centred card in near-true black (#060606, 44rem max, 18px
  radius, a 6% hairline with a faint inner top edge, a barely-there shadow;
  no glass, no glow), deliberately unlike the Wraptors quote form.
  Inside: a status pill (green dot with a slow ping, "Ready to
  collaborate"), "Let's Talk Builds." in the brand headline at 1.5-2.1rem,
  the lede, a hairline, then the sheet. **Three steps, one visible at a
  time**: three 2px hairline progress bars with "Step n of 3", the step title
  (Outfit 500), then the fields. Fields are black-on-black rounded (10px)
  boxes with thin 8% outlines, 46px tall, 16px text, sentence-case labels
  above; focus brightens the outline. Make (searchable combobox, "Other" → free
  text), Model, Year (custom select-only combobox); services as eight
  two-column chips with a radio dot (Wraps preselected, or the service sent
  by `lib/buildBrief.ts`); preferred contact as a three-way segmented
  control. Dropdowns are rounded black lists. Actions: quiet "Back" left, a
  compact off-white button ("Continue" / "Submit Your Build", arrow) right,
  full width on phones. Steps validate before advancing, keep every value,
  move focus to the step heading and fade in (0.32s). Posts to **Netlify
  Forms** (`build-request`, static copy in index.html, honeypot
  `bot-field`).
- **Tuning / performance** (`components/sections/Tuning.tsx`,
  `data/tuning.ts`, `animations/tuningReveal.ts`; creative director,
  2026-10-14), directly after Recent Work. Left-aligned, unlike
  the centred sections around it. One lead video (the pink SF90 firing
  flames on the dyno, 2.5-16.5s of the client clip, 4:5; a 3:2 crop on
  tablets; 480px mobile source), a
  **rev gauge** (`components/ui/RevGauge.tsx`, `lib/revGauge.ts`; refined
  2026-10-14: 0-8 ×1000 rpm over a 240° arc, crisp white quarter ticks and
  Outfit 500 numerals, red ticks and numerals at 7-8, an amber-to-red band
  outside the scale from 6k, a 2.25px lit arc, a white needle with a red tip
  and a tabular rpm readout). It sits to the right of the heading and line
  (spanning both from 640px; on phones top right beside the heading, the
  line full width below), 7.25-13.5rem wide,
  "Tuned to / be heard." in the geometric caps face, one line
  ("Exhausts, downpipes and tuning…") and the editorial CTA "Plan a Tuning
  Build", which opens the Build Brief with Tuning preselected
  (`lib/buildBrief.ts` event + scroll). A supporting row: SF90 engine bay
  (4:3, cats and downpipes), the black SF90 flame clip (3:4 video tile; it is
  also a Recent Work card) and the green Huracán firing flames on the dyno
  (3:4 video tile, 2-10s of the client clip, 480×640), one row at
  one height from 640px (16:9:9 columns); on phones the engine bay full width
  with the two flame tiles under it. lg: video left spanning the column,
  text right, the row on the video's baseline. Below lg: heading, line, then
  video + row as one media block (8px gaps), CTA last. Motion: media and text rise in once. The gauge plays
  each time the section enters view: idle at 900, a quick rev to 7,600 just
  inside the redline, a settle at 6,400, then a soft live idle that runs
  only while it is in view (slow sweeps between ~6.1k and 6.9k, an
  occasional blip to 7,350). The lit arc goes white to 4k, warms to amber by
  6.5k and turns red only past 7k; its glow (max 50%) and the warm band's
  glow (max 90%, from 6k) build with the revs. Reduced motion: the settled
  reading, static.
- **Selected Projects** (`components/sections/Projects.tsx`,
  `data/projects.ts`, VOIR PPF reference), between the service tiles and
  Beyond Factory. No visible heading (an sr-only h2). A horizontal strip of
  square-cornered 3:5 build cards, full-bleed photos, with narrow black
  gutters (12–14px) and a 1px 22% rule. Each card has a small monochrome
  maker mark top-left (a CSS mask of a Simple Icons SVG with its viewBox
  tightened to the artwork, in a 20×8cqw box; makes without an open-licence
  mark get a tracked Outfit wordmark until official logos arrive). The
  model is set in Michroma at 11.5cqw, reading bottom-to-top up the right
  edge, fully visible, over a soft right-edge scrim. Cards are 72vw on
  phones (the next card peeks in), 40vw on tablet and 17–24rem on desktop.
  Native scroll-snap with no scroll hijack. Discreet 44px previous/next
  circles and a 1px progress line on md+. Hover: photo scale 1.04 (fine
  pointers). Entrance: a once-only stagger (y 36, expo.out). Add a vehicle
  by appending to `projects`; `image: null` renders a placeholder card.
  Headline "Recent Work" in the shared `.brand-headline` (identical to
  "Beyond Factory."). **Video cards** (`video`): the poster shows first;
  the 3:5 muted loop is attached near the viewport, plays while 40%
  visible and pauses off screen; reduced motion keeps the poster (S-Class,
  M3). **Multi-photo cards** (`gallery`): photos crossfade (450ms); tap or
  click the card for the next photo, or a dot to jump. Small 6px dots sit
  bottom-left, opposite the model name; the active dot is full paper.
  Tap-based so it never fights the strip's swipe (McLaren, 4 photos).
- **"Beyond Factory." brand section** (`components/sections/Philosophy.tsx`,
  Alain Class reference), after the service tiles and before the Instagram showcase (the six-card
  Services grid was removed at the creative director's request, 2026-10-10;
  the nav "Services" link now targets the tiles):
  brand storytelling, not services. Centred: no eyebrow (removed by the
  creative director, 2026-10-10), the `philosophy-headline` in Michroma caps with a
  paper-to-graphite gradient fill (stacked on two lines below 1280px, one
  line above), then the burgundy widebody supercar (1.6:1 frame on md+,
  4:5 on phones; the whole car from wing to splitter, shown at 0.94 scale
  so it breathes inside the arc) whose top tucks under
  the headline and whose edges mask into the page black (desktop sides
  extended and blended; the photo's own baked-in halo ring retouched out so
  the animated arc replaces it at the same geometry). A thin 42% white arc with three ticks (top,
  left, right) frames the car and fades out below its midline. Then the client's line
  "Our goal is not just to create a car that looks great, but also one that
  performs at the highest level and provides our clients with an
  unparalleled driving experience." (2026-10-14; 36ch phones, 46ch md+) and the shared editorial CTA "Start Your Build" (Coming Soon
  dialog until a build-enquiry flow exists). The vehicle swaps via the
  three crops in `assets/images/philosophy/` (`site.philosophy`). Motion,
  once only: the headline rises in, the car emerges from the dark (fade, scale
  1.05 → 1), the arc draws outward from its top tick, then the copy and CTA
  follow. **Car and headlights**: a lights-off / lights-on pair of the same
  render, processed identically (ring removed; neutral environment graded
  darker with the red paint protected; deepest black mapped to the page
  black; edge falloff baked in, so no frame edge can show). The car is
  stationary from the start (no zoom or fade entrance), shown at 0.94
  scale. Ignition at 0.9s after the section enters: a 50ms pulse of the lit
  photo, a drop, then a sharp reveal to full (power4.out) so the real light
  on the bodywork and floor arrives with it; a white bloom and halo flare
  and settle. Reduced motion: lights on, no movement.
- **Editorial CTA** (`.cta-line`, shared by the hero and the brand section):
  transparent tracked capitals over a 1px rule at 32%, with a full-strength
  rule drawing in on hover. 48px tap target.
- **Client reviews** (`components/sections/Reviews.tsx`, `data/reviews.ts`,
  Wraptors Dubai quote-form reference for the material), between Recent
  Work and Beyond Factory. Heading "Testimonials" in the brand
  headline style at a smaller scale (1.75–3.5rem; one line).
  Glassy charcoal cards: a charcoal fill with a soft top-left radial
  highlight, an inner 1px top edge, a 9% white hairline border, 20px
  radius and a soft drop. No blur, no colour. Each card: stars (with an
  accessible rating label) and the source badge, the review, then the
  name under a hairline. Native scroll-snap strip: 1 card + peek on phones, 2 on md, 3
  inside the 90rem container on lg; equal heights; the shared 44px
  controls on md+; never auto-advances. Content: eight client-supplied
  reviews, verbatim, published on Mansor's own site as Google reviews
  (`data/reviews.ts`). Source badge top-right: Google's four-colour G
  (13px) with "Google Review" in muted Outfit, in a quiet glass pill; it
  names the source and claims no verification. `demo: true` swaps the badge
  for a "Demo" tag.
- **Instagram showcase** (`components/sections/InstagramShowcase.tsx`,
  Venuum reference), before "Visit Us": a left-aligned profile (avatar
  ~146px on phones and 184px on desktop, with a thin conic `ig-*` gradient
  ring, a black gap and the wordmark disc), "@mansor.customs", a meta line,
  and pill buttons "View Instagram" (profile) and "Send Message"
  (`ig.me/m/mansor.customs`, verified to redirect to Instagram's DM
  handler). Then three rounded 9:16 Reel cards (never stacked; inside a
  64rem column on md+). Follower count and verified badge stay hidden until
  confirmed (`site.instagram`). Motion: avatar settle plus a text stagger;
  the three slots unmask upward (clip-path); hover zoom on hover-capable
  devices only.
- **Instagram Reels** (`components/ui/ReelCard.tsx`,
  `hooks/useInstagramReels.ts`, `netlify/functions/instagram-reels.mts`):
  our own inline player, not Instagram's embed. Each card shows the
  thumbnail first; the video is only attached once the card is within 300px
  of the viewport. It is muted, inline and looping, plays while at least 50%
  visible and pauses off screen. A round 32px/38px play/pause toggle (44px
  hit area; the user's choice wins over autoplay) sits bottom-left and a
  "View Reel →" link to the original sits bottom-right, on a soft bottom
  scrim. Reduced motion: no autoplay, and nothing downloads until Play. A
  Reel whose file Meta withholds (licensed music) or whose CDN URL has
  expired keeps its thumbnail and link, with no toggle. Source: the three
  clips supplied by the creative director (`site.instagram.reels`, 540×960
  muted H.264; without permalinks the link reads "View Reels" and opens the
  Reels tab). Once connected, `/api/instagram-reels` takes over, fed by the
  official Instagram API with Instagram
  Login (`instagram_business_basic`, read-only). A key-protected connect
  flow stores the token in Netlify Blobs, an hourly sync fetches new Reels
  and renews the token, and the CDN caches for 5 minutes.
  With neither source, the slots are quiet `surface-raised` cards with a Reels
  glyph linking to the Reels tab. Never stand-in footage or reused site
  photos. Setup and operations: `docs/INSTAGRAM.md`. Vite dev stubs the
  endpoint as `not_configured`.
- **Service pages** (`components/pages/ServicePage.tsx`, `data/services.ts`,
  `lib/router.ts`): one shared Coming Soon template at `/services/:slug`
  for the eight service tiles (slug = tile id; the tile's photo and name).
  Phones: the photo on top (4:5, max 72svh), fading into the copy. lg+: a
  full-height photo panel (56% wide) bleeding off the right edge and fading
  left into black, with the copy in the left column. Copy: the service name
  in Michroma caps (gradient fill, balanced wrap), a 56px hairline, COMING
  SOON (tracked Outfit 500), one line, and "Back to Services" (arrow, goes
  to `/#editorial`). Restrained once-only entrance (photo settles, hairline
  draws, copy rises). Tiles and footer links navigate client-side (a small
  History-API router; the homepage stays mounted, so the intro never
  replays); direct links skip the intro. Netlify serves index.html for
  `/services/*`. The Coming Soon dialog now only covers booking CTAs.
- **Frequently Asked Questions** (`components/sections/Faq.tsx`,
  `data/faq.ts`), after Visit Us and before the footer: a quieter break.
  Smaller left-aligned brand heading (`.quiet-title`, 1.5-2.5rem); heading
  left / list right on lg; questions between 1px rules; a plus that becomes
  a minus; answers open via grid-row height + fade (0.32s, interruptible),
  several at once; closed panels are inert. Copy: four questions supplied
  by the creative director (proposed, pending Mansor's approval; no visible
  labels). (The Journal section was deleted 2026-10-13.)
- **Location** (`components/sections/LocationMap.tsx`): the "Visit Us"
  heading, then the address and "Get Directions" (Google Maps directions to
  the exact address) on the black page, then a compact full-bleed band
  (`clamp(18.75rem, 15rem + 10vw, 26rem)`, about 300px on phones and 384px
  on desktop) directly before the footer. It is the "Contact" nav target.
  **Preview → live:** the creative director's aerial image
  (`assets/images/location-aerial.jpg`, pin at the centre, so the cover crop
  keeps it in view) with an "Explore Location" control. Activating it loads
  the live **Google Maps satellite** embed (zoom 17, top-down) and fades it
  in over the preview. Google is contacted only on demand.
  **Embed:** with `VITE_GOOGLE_MAPS_EMBED_KEY` (in `.env.local`, never
  committed; see `.env.example`) it uses the official Maps Embed API (place
  mode, satellite); otherwise Google's keyless "Share → Embed" iframe.
  **Query the address only.** Adding the business name made Google match a
  different "Customs" shop; the address alone resolves to the Mansor
  Customs listing (verified in Google's place data). Google's marker, place
  card and attribution stay unmodified. No filters or overlays on the live
  map.
- **Footer** (`components/layout/Footer.tsx`, MANSORY reference): one
  centred column. Wordmark (`wordmark-footer`), a full-width hairline,
  two symmetric columns of services (`footer-link`, 68% white, hover to
  paper) that open the Coming Soon dialog, socials only when a verified URL
  exists, a 10rem hairline and "© Mansor Customs".
- **Media** (`components/ui/Media.tsx`): every image or video slot. Lazy by
  default; videos are muted and inline, play only on screen, and never
  autoplay with reduced motion. An empty slot renders an honest neutral
  placeholder.
- **Coming Soon dialog** (`ComingSoonModal`): a native `<dialog>` with its
  content passed in as props (services, booking). Focus returns to the
  trigger, and Escape closes it.
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
