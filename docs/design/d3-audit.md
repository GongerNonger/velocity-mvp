# Design Team 3 — Admin Experience Audit

## app/admin/page.tsx
- Added fixed orb background (3 floating blurred orbs, `animate-orb-1/2/3`).
- Key metric cards: added staggered `animate-fade-in-up` / `delay-1/2/3`, upgraded borders to `border-gray-700/60`, added `shadow-md shadow-black/20`.
- Progress bars (department breakdown): wrapped in `relative overflow-hidden` container, added `animate-shimmer` overlay div.
- Retention indicator cards: added `hover:shadow-md hover:shadow-green-900/10 transition-all duration-300`.
- Career path list items: added `hover:border-gray-600 transition-colors duration-150`.

## app/admin/students/page.tsx
- Added fixed orb background (same pattern as admin/page).
- Page heading changed to gradient text (`bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`); copy updated to "Student Roster" per spec.
- Filter pills: active pill gains `shadow-md shadow-green-900/30`; all pills get `transition-all duration-150`.
- Student table rows: `hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-150`.
- Risk badges: at-risk → `shadow-sm shadow-red-900/30`; on-track → `shadow-sm shadow-green-900/30`; watch unchanged.

## app/admin/import/page.tsx
- Added fixed orb background (same pattern).
- File upload zone: hover border updated to `hover:border-green-600/60 transition-colors duration-200`.
- Preview table thead: upgraded to `bg-gray-800/80 backdrop-blur-sm sticky top-0`.
- Commit button: added `shadow-lg shadow-green-900/40`.
- Status badges in preview table: wrapped in `inline-block` spans with severity-matched backgrounds and shadows (red/amber/green).

## Deliberate omissions
- No functional logic, routing, copy (except the single heading text normalisation per spec), or data touched.
- No new dependencies; all changes are Tailwind utility classes.
- `tsc --noEmit` exited cleanly (zero errors).
