# Design Overseer Recommendations

Audit of D1 (marketing), D2 (student), D3 (admin) visual polish work. Spot-check covered `app/page.tsx`, `app/demo/page.tsx`, `app/admin/page.tsx`, and `app/globals.css`.

Overall the work is coherent: orbs use `transform`-only animation (good perf), share keyframe names, and use a consistent dark-glass card palette. Issues below are mostly inconsistency in orb size/opacity, redundant emphasis on alert cards, and a few legibility risks.

---

## 1. Standardize orb pattern across all pages
**Pages:** `app/page.tsx`, `app/demo/page.tsx`, `app/admin/page.tsx`, all D1/D3 marketing & admin pages
**Priority:** MED
**Issue:** Orb sizes, opacities, and positions diverge across teams (D2 uses 500/400/450px at `/15`, `/10`, `/15`; D3 admin uses 500/400/300px at `/12`, `/10`, `/12`) — same visual idea, drifting parameters.
**Fix:** Extract a shared `<AmbientOrbs />` component (or fixed Tailwind class trio) so every page mounts the identical three-orb arrangement.
**Team:** ALL

## 2. Card border opacity is inconsistent (`/50` vs `/60`)
**Pages:** D1 marketing cards (`border-gray-700/50`) vs D2/D3 cards (`border-gray-700/60`)
**Priority:** LOW
**Issue:** Two near-identical border tones make cards on the marketing-to-app transition feel subtly different.
**Fix:** Pick one (recommend `/60`) and apply across all card surfaces.
**Team:** D1

## 3. Risk alert cards have too many simultaneous emphasis cues
**Pages:** `app/demo/page.tsx` (risk alerts block, lines ~278-306)
**Priority:** MED
**Issue:** Each alert combines tinted background + full border + 4px left border + colored text + colored pill badge — five overlapping severity signals for one piece of info.
**Fix:** Drop the full `border` and keep only the colored left border + badge; reduces visual noise without losing scanability.
**Team:** D2

## 4. `opacity-60` on completed semesters risks low-contrast text
**Pages:** `app/demo/plan/[studentId]/page.tsx` (statusColor helper)
**Priority:** MED
**Issue:** `opacity-60` on already-muted gray text can drop below WCAG AA on the dark orb background.
**Fix:** Replace with a specific muted color (e.g. `text-gray-500`) and/or a subtle desaturation rather than blanket opacity.
**Team:** D2

## 5. Hero gradient text on landing is fine; gradient on admin/students heading is riskier
**Pages:** `app/admin/students/page.tsx` (page heading), `app/page.tsx` (hero H1)
**Priority:** LOW
**Issue:** `from-white to-gray-400` on a smaller, denser admin heading reads as washed-out compared to the large marketing hero where it's earned.
**Fix:** Limit gradient text to hero-scale H1s; keep operational headings solid `text-white`.
**Team:** D3

## 6. Progress-bar shimmer is duplicated in both demo and admin — confirm it's not visually competing with the orb animation
**Pages:** `app/demo/page.tsx` (line ~269), `app/admin/page.tsx` (department breakdown bars)
**Priority:** LOW
**Issue:** Two infinite animations on the same viewport (orb float + bar shimmer) can feel busy on the admin dashboard where many bars stack.
**Fix:** Apply shimmer only to the single "primary" progress bar (student credits) and leave department breakdown bars static.
**Team:** D2, D3

## 7. Demo page mixes `bg-gray-900` (Student Info Bar) with D1's `bg-gray-900/70 backdrop-blur-sm` card style
**Pages:** `app/demo/page.tsx` line 224, vs D1 marketing cards
**Priority:** MED
**Issue:** D2 chose opaque `bg-gray-900` for the hero-card while D1's marketing cards are glassy `bg-gray-900/70 backdrop-blur-sm` — feels like two products at the marketing → app handoff.
**Fix:** Standardize on `bg-gray-900/70 backdrop-blur-sm` for all primary cards so orbs bleed through consistently.
**Team:** D2

## 8. Inline brand colors (`#275D38`, `#4CAF50`) remain scattered
**Pages:** `app/demo/page.tsx`, `app/admin/page.tsx`, others
**Priority:** LOW
**Issue:** Inline `style={{ backgroundColor: "#275D38" }}` coexists with Tailwind `green-700/600` classes — small visual drift between the two greens, and the inline styles bypass hover transitions.
**Fix:** Add the two brand hexes to `tailwind.config` as `brand-green` / `brand-green-light`, then refactor inline styles to classes (low-risk follow-up).
**Team:** ALL

## 9. Confirm `prefers-reduced-motion` is honored
**Pages:** `app/globals.css`
**Priority:** MED
**Issue:** Three infinite orb animations + shimmer + fade-in-up are declared globally with no `@media (prefers-reduced-motion: reduce)` guard.
**Fix:** Wrap the `.animate-orb-*`, `.animate-shimmer`, and `.animate-fade-in-up*` animation declarations so they're disabled (or reduced to a single state) under reduced-motion.
**Team:** ALL (lives in globals.css)

## 10. Highlighted-tier ring vs admin metric card shadows — same intent, different implementations
**Pages:** D1 pricing highlighted tier (`ring-1 ring-green-700/50 shadow-lg shadow-green-900/20`) vs D3 admin metric cards (`shadow-md shadow-black/20`)
**Priority:** LOW
**Issue:** "Important card" semantics use different visual languages on marketing vs app surfaces.
**Fix:** Decide whether "important" = green ring (marketing) or black drop shadow (app), then apply uniformly. Recommend green-tinted shadow throughout for brand cohesion.
**Team:** D1, D3
