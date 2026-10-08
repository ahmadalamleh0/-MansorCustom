# Mansour Customs — website

Client: **Mansour Customs**, a US vehicle wrapping and customization brand (270k+ Instagram followers).
Studio: **theDiablo**. Deliverable: a premium, cinematic, working presentation site. Deadline: ~5–6 days from 2026-10-08.

**Status:** environment ready. No design concept or code yet. Wait for the creative director's concept, references and section briefs before you design or build anything.

## Design standards
- The creative director owns the concept. Implement their direction precisely. Where the brief is silent, make deliberate choices that fit the Mansour Customs brand, and say what you chose.
- No generic templates, no stock AI layouts (centered hero + three cards + CTA band), no repeated section patterns.
- Don't reuse the look of our previous automotive sites (Diablo, Vyper, Black Star, Wraptors, IronOak). This brand gets its own identity.
- Every section needs a clear compositional idea: deliberate typography, scale contrast, spacing rhythm and hierarchy.
- Cinematic but usable. Motion supports the content; navigation, legibility and CTAs always work.
- Use the `frontend-design` skill for new visual work and `web-design-guidelines` for UI/UX/accessibility reviews.

## Motion (GSAP)
- Use the `gsap-*` skills, and check APIs with Context7 when you're unsure.
- Register plugins once. Keep each section's timelines in its own module or scope.
- Always clean up: `gsap.context()` / `useGSAP` with revert on unmount. Kill ScrollTriggers you create.
- Responsive motion goes through `gsap.matchMedia()`, including a `(prefers-reduced-motion: reduce)` branch that shows final states without movement.
- Animate transforms and opacity only. Avoid layout-thrashing properties. Call `ScrollTrigger.refresh()` after media or fonts change the layout.
- Pinned sections must not cause horizontal overflow or layout jumps on mobile.

## Performance
- Compress and size images properly (AVIF/WebP with fallbacks, explicit dimensions, lazy-load below the fold).
- Hero video: compressed, muted, `playsinline`, with a poster frame and a lighter mobile source.
- Preload only the critical fonts. Watch mobile frame rate on scroll-heavy sections.

## Editing workflow
1. Make sure you understand exactly what's being asked.
2. Read the relevant code.
3. Pick the cleanest approach.
4. Change only what was requested.
5. Run build/lint checks.
6. Verify in the browser with Playwright at 1440 / 834 / 390: layout, overflow (`scrollWidth > innerWidth`), animation start and end states, console errors.
7. Briefly say what changed.

## Git
- This folder is its own git repo, separate from the home-directory repo. Commit at stable milestones.
- Keep client assets that are huge or licensed out of git when it makes sense (see .gitignore). Never commit `.env*`.
