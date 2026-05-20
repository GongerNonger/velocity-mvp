# Velocity x UVU — AI Academic Advisor

> AI-powered academic advising platform built for **Utah Valley University** (48,000+ students)
> and designed to deploy across higher ed. Personalized degree plans, conversational AI advisor,
> 4-year planning, career pathway matching, and advisor risk alerts.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — that's it.

## What you'll see

### `/` — Marketing landing page
Pitch + pricing for the platform. Sales-ready, links to the demo. No buyer signup required.

### `/demo` — Student dashboard
- **15 sample UVU students** across CS, IT, Business, Digital Marketing, Cybersecurity, Nursing
- Default opener is **Sarah Chen** — a GPA-2.1 at-risk student that triggers every risk alert at once
- Degree progress, recommended courses, career matches, skill gaps
- **Velocity AI chat** in the bottom-right — ask any student question ("what should I take next semester?", "am I on track to graduate?") and get a personalized response

### `/demo/plan/[studentId]` — 4-Year Plan view
Kanban-style 8-semester grid. Completed / current / future semesters. AI-generated course
sequencing aligned with the student's career goals.

### `/admin` — Institutional analytics
Real-time success metrics — average GPA, on-track graduation rate, program distribution,
workforce-readiness skill gaps, popular career aspirations.

## Sample data

- **6 UVU degree programs** including a Nursing path (College of Health & Public Service)
- **25 courses** with real UVU codes (CS 2420, IT 2300, MKTG 3660, CS 4470, etc.)
- **15 students** spanning at-risk, high-flyer, first-gen, returning adult, day-1 freshman
- **13 career paths** with salary + BLS-style growth data (Software Engineer, ML Engineer,
  Cybersecurity Analyst, RN, Nurse Practitioner, etc.)

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, dark theme, UVU green (#275D38) accent
- Zero external APIs — advisor engine is all local algorithmic logic
- In-memory store, ready to swap to Postgres / Banner export ingestion

## Pricing

| Tier | Students | Platform fee | Per student |
|---|---|---:|---:|
| Small | < 5,000 | $50K | $30 |
| Mid | 5,000 – 20,000 | $100K | $25 |
| Large | 20,000+ | $250K | $20 |

UVU at 48,670 students (Fall 2025) sits in the Large tier — annual contract size ~$1.22M.

## Running tests

```bash
npm test
```

97 tests cover the advisor engine: graduation progress, course recommendations, risk alerts,
career analysis, institutional analytics, and UVU course-code sanity.

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
  components/AIChat.tsx             slide-out conversational AI panel
  api/
    advisor.ts                      core engine: recommend, risk, career, chat, plan
    store.ts                        in-memory data: students, courses, degrees, careers
    chat/route.ts                   POST /api/chat
    students/[id]/plan/route.ts     GET 4-year plan
    students/[id]/{advise,career}/  per-student advising + career
    ...
docs/
  research/
    market-and-buyer.md             UVU institutional research, decision-makers, procurement
    competitive-landscape.md        9 competitors, comparison table, defensible wedge
    pilot-proposal.md               30-day no-risk pilot scope + success metrics
    outreach-templates.md           Cold email + LinkedIn DM + warm-intro templates
    one-pager.md                    Leave-behind deal sheet
  design/
    design-spec.md                  Full IA, copy, visual spec
```
