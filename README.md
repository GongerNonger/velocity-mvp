# Velocity  AI Academic Advisor

> The AI advising platform for higher ed.
> Personalized degree plans, conversational AI advising, risk detection, and labor-market-tied career pathway matching.
> Founded by students at Utah Valley University.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — that's it.

## What's in here

### `/` — Marketing landing page
Hero, problem stats, three-step explainer, integrations teaser, embedded ROI calculator, three pricing tiers, FAQ, demo request modal. Every CTA opens the pilot request form or routes into the live demo.

### `/demo` — Student dashboard
- **15 sample students** across CS, IT, Business, Digital Marketing, Cybersecurity, and Nursing
- Default opener is **Sarah Chen** — a GPA-2.1 at-risk student that triggers every risk alert at once. The "look what AI catches" moment
- Degree progress, recommended courses, career matches, skill gaps
- **Velocity AI chat** in the bottom-right — ask any student question and get a personalized response from the advisor engine

### `/demo/plan/[studentId]` — 4-Year Plan
8-semester kanban grid. Completed / current / future. AI-generated course sequencing aligned with the student's career goals.

### `/admin` — Institutional analytics
Real-time metrics for the loaded student population. Average GPA, on-track graduation rate, program distribution, common skill gaps, popular career aspirations.

### `/admin/import` — Banner CSV import _(new)_
Upload a CSV export from Banner (or any SIS that can produce a flat student-record export). Velocity parses it, validates each row, shows a preview, and on confirmation merges the new students into the in-memory store. Sample template + column-alias documentation included.

### `/integrations` — Technical detail for CIOs
Architecture diagram + integration cards for Banner SIS, Canvas LMS, DegreeWorks, Okta/Entra, Salesforce/Slate, Lightcast, and Civitas read-only co-existence. Five-item security & compliance section.

### `/pricing` — Three tiers, ROI calc, FAQ
Tier cards, embedded ROI calculator, 18-row feature comparison matrix, 8-item pricing FAQ.

### `/about` — Company & origin story
Why we built Velocity, what we believe, where we are.

## Catalog data

The demo runs on real public data:
- **116 courses** with real UVU course codes (CS 2420, IT 2300, MATH 1210, NURS 3010, ENGR 2010, etc.)
- **24 bachelor's degree programs** sourced from UVU's public catalog
- **55 career paths** with BLS-cited median salary + 2024-2034 projected growth, every entry carrying a `bls_link` to the Occupational Outlook Handbook

Sources are documented inline in `app/api/data/uvu-catalog.ts` and `app/api/data/career-paths.ts`.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, dark theme
- Zero external APIs in the advisor engine — local algorithmic logic
- In-memory store; CSV import lets a buyer's own data flow in for a pilot

## Pricing

| Tier | Students | Platform fee | Per student |
|---|---|---:|---:|
| Small | < 5,000 | $50K | $30 |
| Mid | 5,000  20,000 | $100K | $25 |
| Large | 20,000+ | $250K | $20 |

## Running tests

```bash
npm test
```

97 tests cover the advisor engine.

## Deployment

```bash
npx vercel
```

No environment variables required.

## Repo layout

```
app/
  page.tsx                          marketing landing
  demo/page.tsx                     student dashboard with AI chat
  demo/plan/[studentId]/page.tsx    4-year plan view
  admin/page.tsx                    institutional analytics
  admin/import/page.tsx             CSV import UI
  about/page.tsx                    company / origin story
  integrations/page.tsx             technical detail for CIO buyers
  pricing/page.tsx                  pricing + ROI calc + FAQ
  components/
    AIChat.tsx                      slide-out conversational AI panel
    DemoRequestForm.tsx             pilot request modal
    ROICalculator.tsx               interactive ROI widget
  api/
    advisor.ts                      core engine: recommend, risk, career, chat, plan
    store.ts                        in-memory data: students, courses, degrees, careers
    data/
      uvu-catalog.ts                91 real UVU courses + 18 degrees
      career-paths.ts               42 BLS-sourced careers
    chat/route.ts                   POST /api/chat
    leads/route.ts                  POST /api/leads (pilot requests)
    import/route.ts                 POST /api/import (Banner CSV)
    students/[id]/plan/route.ts     GET 4-year plan
    students/[id]/{advise,career}/  per-student advising + career
    ...
docs/
  research/
    market-and-buyer.md             UVU as a buyer: research notes
    competitive-landscape.md        9 competitors, defensible wedge
    pilot-proposal.md               30-day pilot scope + success metrics
    outreach-templates.md           Cold email / LinkedIn DM / warm intro
    one-pager.md                    Leave-behind deal sheet
  data/
    uvu-facts.md                    Institutional facts reference
  design/
    design-spec.md                  Full IA + visual spec
```
