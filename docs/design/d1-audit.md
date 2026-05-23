# Design Team 1 Audit — Marketing Pages Visual Polish

## Scope
Five marketing pages: `app/page.tsx`, `app/about/page.tsx`, `app/pricing/page.tsx`, `app/integrations/page.tsx`, `app/one-pager/page.tsx`.

No copy, routing, or functional logic was changed.

---

## Changes by Page

### app/page.tsx (Landing)
- Added fixed animated orb background (`animate-orb-1/2/3`) at top of root div.
- Applied `bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent` + `animate-fade-in-up` to the hero H1 for gradient text shimmer.
- Added `animate-fade-in-up` with staggered delay classes (`[animation-delay:150ms]`, `[animation-delay:300ms]`) to hero paragraph and CTA row.
- Upgraded all stat cards, how-it-works cards, integration teaser cards, trust badge cards, and FAQ `<details>` from `bg-gray-900 border-gray-800` to `bg-gray-900/70 backdrop-blur-sm border-gray-700/50 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300`.
- Upgraded landing-page pricing tier cards: non-highlighted cards get the same hover treatment; highlighted (Mid) card gets `ring-1 ring-green-700/50 shadow-lg shadow-green-900/20`.

### app/pricing/page.tsx
- Added fixed animated orb background.
- Same tier card upgrades as landing: non-highlighted hover border/shadow; highlighted Mid tier gets ring + glow.
- FAQ `<details>` upgraded to glass-morphism style with hover border transition.
- Feature comparison table even rows changed from `bg-gray-900/30` to `bg-gray-900/40` for stronger zebra contrast.
- Bottom CTA section border upgraded.

### app/about/page.tsx
- Added fixed animated orb background.
- All principle cards upgraded to `bg-gray-900/70 backdrop-blur-sm border-gray-700/50` with hover border/shadow.
- CTA section at bottom upgraded to same style.

### app/integrations/page.tsx
- Added fixed animated orb background.
- Architecture diagram container upgraded to glass style.
- All integration cards upgraded with hover border + shadow.
- Security/compliance rows upgraded with hover border + shadow.
- Bottom CTA section border upgraded.

### app/one-pager/page.tsx
- Added fixed animated orb background wrapped in `no-print` class — the existing print CSS hides it on paper.
- The "paper" article surface (`bg-gray-900 border border-gray-800`) was intentionally left unchanged: it serves as a distinct contained surface and changing it would affect print rendering, which is the primary use case for this page.

---

## Design Rationale
- **Orb gradient background**: Creates ambient depth without competing with content. Fixed positioning means the effect scrolls through the page for a continuous atmospheric feel.
- **Glass-morphism cards** (`bg-gray-900/70 backdrop-blur-sm`): The slight opacity + blur lets the orb background show through, tying the foreground content to the animated background.
- **Hover border lift** (`hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10`): Subtle interactive feedback that reinforces the green brand color without being garish on hover.
- **Hero gradient text**: Adds polish to the most-read element on the site; the `from-white via-gray-100 to-gray-400` range is conservative enough to remain legible on dark backgrounds.
- **Staggered fade-in-up**: Only applied to the hero section where the "entrance" animation has the most impact. Applying it globally would feel busy.

## What Was NOT Changed and Why
- **Copy, routes, functional logic**: Out of scope by brief.
- **Header/nav styling**: Already has `backdrop-blur-sm` and dark treatment; changing it risked breaking the sticky behavior visual contract.
- **One-pager article surface**: Print fidelity is the primary deliverable of that page. Its `bg-gray-900 border-gray-800` is already overridden to white for print, and adding glass effects would complicate the print stylesheet.
- **Footer styling**: Low visual priority; left consistent across all pages.
- **Inline `style` color overrides** (`#275D38`, `#4CAF50`): These are the brand colors. Replacing them with Tailwind classes would require config changes — outside the "no new npm packages, Tailwind only" constraint.
