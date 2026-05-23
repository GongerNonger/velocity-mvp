# Design Team 2 Audit — Student Experience Pages

## app/demo/page.tsx
**Changed:** Added fixed orb background (3 orbs, green/emerald/gray). Student info bar: `border-gray-700/60`, `shadow-lg shadow-black/20`, `animate-fade-in-up`. Progress bar: added `animate-shimmer` overlay span inside relative/overflow-hidden container. Risk alert cards: added `border-l-4` with severity-matched color (red-500/60, amber-500/60, green-500/60); wrapped block in `animate-fade-in-up-delay-1`. Tab buttons: `transition-all duration-200`, active shadow `shadow-md shadow-green-900/30`. Tab content panels: `animate-fade-in-up-delay-2`. Course and career match cards: `hover:border-green-700/50 hover:shadow-md hover:shadow-green-900/10 transition-all duration-300`.

**Not changed:** All functional logic, API calls, routing, copy, data, and header/footer markup.

## app/demo/plan/[studentId]/page.tsx
**Changed:** Added fixed orb background. `statusColor` helper: completed semesters get `opacity-60`; current gets `ring-1 ring-green-600/50 shadow-md shadow-green-900/20`. Semester card div: `hover:-translate-y-0.5 transition-transform duration-200`. Projected graduation stat: `text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent`.

**Not changed:** Plan data rendering, API fetching, legend, footer card copy.

## app/components/AIChat.tsx
**Changed:** Slide-out panel: `bg-gray-950/95 backdrop-blur-md border-gray-700/60`. User bubbles: `bg-green-900/40 border border-green-800/30`. Advisor bubbles (and typing indicator): `bg-gray-800/70 border border-gray-700/30` (Tailwind-only, removed inline style). Suggestion chips: `hover:bg-green-900/30 hover:border-green-700/60 transition-all duration-150`. Trigger button: `shadow-xl shadow-green-900/40 ring-2 ring-green-600/20`.

**Not changed:** Message logic, scroll behavior, send/receive handlers, starter prompts list.

## app/components/DemoRequestForm.tsx
**Changed:** Overlay: `bg-black/60`. Modal panel: `bg-gray-950 border-gray-700/60 shadow-2xl shadow-black/60`. Input `inputClass`: added `focus:ring-1 focus:ring-green-600/50 focus:border-green-600/50 transition-colors duration-150`. Timeline steps: stagger via `animate-fade-in-up/delay-1/delay-2` using an added optional `className` prop on `TimelineStep`.

**Not changed:** Form fields, validation, submission logic, success/error states, copy.

## Design Rationale
Dark glass aesthetic (gray-950 base, blurred borders) gives premium SaaS feel. Orbs add depth without distraction. Accent borders on alerts improve scanability. Hover lifts and shimmer reward interaction without cluttering the interface.

## Round 2 — Overseer fixes
- **#1 Shared orbs:** Replaced inline 3-orb JSX blocks with `<AmbientOrbs />` in `app/demo/page.tsx` and `app/demo/plan/[studentId]/page.tsx`. Added imports from `../components/AmbientOrbs` and `../../../components/AmbientOrbs` respectively. AIChat / DemoRequestForm untouched (they're overlays, no background needed).
- **#3 Risk alert emphasis:** In `app/demo/page.tsx`, dropped the full `border` plus per-severity `border-{color}-800` from the risk alert className builder. Kept `border-l-4` + per-severity left border + tinted bg + text color + badge pill. Removes one redundant emphasis cue while preserving severity scanability.
- **#4 Completed-semester opacity:** In `app/demo/plan/[studentId]/page.tsx`, removed `opacity-60` from the `statusColor` helper's completed branch. Bumped the "Credits earned (course history hidden)" body line from `text-gray-600` to `text-gray-500` to preserve intentional muting via color (now WCAG-AA-safer on `bg-gray-800/50` than the prior blanket opacity stack).
- **#6 Shimmer scope:** Audited `app/demo/page.tsx` — `animate-shimmer` only appears on the primary credits progress bar (Student Info Bar). Career-match progress bars and 4-year plan visualizations have no shimmer. No additional removal needed within student scope.
- **#7 Card style consistency:** Changed Student Info Bar in `app/demo/page.tsx` from `bg-gray-900` to `bg-gray-900/70 backdrop-blur-sm` so orbs bleed through, matching D1 marketing cards across the marketing → demo handoff.

**Verification:** `npx tsc --noEmit` passes. No copy, route, or logic changes.
