# Velocity — MVP Design Spec (v1)

> Authoritative spec for tonight's build. Engineering implements directly from this.
> Goal: turn the dashboard prototype into a **buyer-ready demo** that survives a 90-second pitch and an advisor's 5-minute deep-dive.

---

## 0. Demo narrative (read this first)

The demo has three beats. Every design decision below serves one of them.

1. **Pitch (15s)** — Buyer lands on `/`. Sees a polished SaaS landing page. "Velocity is AI academic advising for universities. Used by UVU."
2. **Wow (45s)** — Founder clicks "Live Demo." Lands on student dashboard pre-loaded as **Sarah Chen** (the at-risk student). Risk alerts are red. Founder opens the **AI chat panel** and types "what should Sarah do next semester?" — AI answers with a structured plan.
3. **Depth (30s)** — Founder clicks "View 4-Year Plan" → impressive kanban-style 8-semester grid. Then clicks "Admin View" → analytics. Buyer says "how much?" → founder scrolls back to `/` pricing.

Everything in this spec is calibrated to that sequence. Anything that doesn't serve it, cut.

---

## A. Information Architecture

### Routes

| Route | Purpose | New? |
|---|---|---|
| `/` | **Marketing landing page** — first impression, pitch, pricing, CTA | NEW (replaces current dashboard at `/`) |
| `/demo` | Student dashboard (the current `/`, moved here) | MOVED |
| `/demo/plan/[studentId]` | 4-year degree plan view (kanban) | NEW |
| `/admin` | Institutional analytics (unchanged content) | EXISTING |
| `/admin/[studentId]` | Advisor detail view — single student deep-dive for advisors | NEW |
| `/pricing` | (optional) Standalone pricing — skip if time-constrained, anchor on `/` instead | OPTIONAL |

Skip `/about`. Not needed for a sales demo.

### Navigation

**Global top nav** (appears on `/demo`, `/demo/plan/*`, `/admin`, `/admin/*` — NOT on `/` which has its own marketing nav):

```
[V] Velocity  [UVU badge]   ──   Student Demo  |  4-Year Plan  |  Admin   ──   [Student selector dropdown]
```

- "Student Demo" → `/demo`
- "4-Year Plan" → `/demo/plan/{currentStudentId}` (uses last-selected student; falls back to STU-001)
- "Admin" → `/admin`
- Student selector dropdown is shared across `/demo` and `/demo/plan` (persist selected ID in `localStorage` under `velocity:selectedStudentId` so navigation between views keeps context).

**Marketing nav on `/`** (different style — light/transparent over hero):
```
[V] Velocity                                  Product  Pricing  For Institutions  [Live Demo →]
```
"Live Demo →" is a UVU-green pill button → `/demo`.

**Back-to-marketing affordance:** On `/demo` header, add a small "← Back to site" link to the left of the logo, gray-500, hover green-400.

---

## B. Landing page (`/`) — full wireframe + copy

File: `app/page.tsx` (replace existing content; move existing content to `app/demo/page.tsx`).

Dark theme. UVU green #275D38 as the single accent color. Wide max-width 7xl. Sections stack vertically.

### Section 1 — Hero (full viewport height minus nav, ~85vh)

Layout: centered text, no image. Subtle radial gradient background (green glow behind headline).

**Eyebrow** (small, uppercase, tracking-widest, green-400):
> AI ACADEMIC ADVISING · BUILT FOR HIGHER ED

**Headline** (text-6xl md:text-7xl, font-black, white, tight leading):
> Every student gets a Stanford-grade advisor.
> Every advisor gets superpowers.

**Sub-headline** (text-xl, gray-400, max-w-2xl):
> Velocity is the AI advising platform that turns a 41,000-student university into 41,000 personalized degree plans. Catch at-risk students before they drop out. Match every graduate to a career they'll actually love.

**CTA row** (two buttons, gap-4):
- Primary: **"See Live Demo"** → `/demo` (UVU green bg #275D38, white text, px-8 py-4, rounded-lg, hover lifts -translate-y-0.5, shadow-lg shadow-green-900/50)
- Secondary: **"How It Works"** → anchor `#how-it-works` (transparent, border border-gray-700, white text, same padding)

**Trust strip** (below CTAs, mt-12, opacity-60):
> Trusted by Utah Valley University · 41,000 students · Built for the Wolverines
> (small gray-500 text — sets up "we ship to real institutions" credibility)

### Section 2 — Problem statement ("The advising crisis")

Three-column grid, gray-900 cards, border-gray-800, padding-8, rounded-xl. Each card has a big number, a label, a short paragraph.

Heading (above cards): **"The advising crisis is real."** (text-4xl font-bold center)
Sub: "Higher ed institutions are losing students they could have saved." (gray-400 center mb-12)

| Stat | Label | Body |
|---|---|---|
| **40%** | of students drop out before graduating | One overworked advisor for every 300 students. The math doesn't work. |
| **6.5 years** | average time to a 4-year degree | Students take wrong courses, switch majors blind, and pay for credits that don't count. |
| **$1.7T** | in student debt | Most of it owed by people who never finished. Advising failure has a price tag. |

Each big number in UVU green #275D38, font-black, text-6xl.

### Section 3 — "How Velocity works in 60 seconds" (`#how-it-works`)

Three-step horizontal flow. Each step is a card with a number badge (1/2/3 in green circle), an icon-free heading, and 2 lines of body. Connect with thin gray lines between cards on desktop.

Heading: **"From enrollment to career — on autopilot."**
Sub: "Three things Velocity does that human advisors can't do alone."

**Step 1 — Personalized degree plan**
> Every student gets a custom 4-year roadmap the day they enroll. Courses sequenced by prerequisite, optimized for graduation speed, aligned to their career goals.

**Step 2 — Catch at-risk students early**
> Velocity flags GPA drops, credit pace issues, and skill gaps before they become dropout risks. Advisors see exactly who needs a conversation this week.

**Step 3 — Match skills to careers**
> When students graduate, they're not guessing. Velocity matches their actual skill profile to real career paths with salary data and growth projections.

### Section 4 — Product preview (screenshot frame)

Single dark card with a subtle inner border, padding-2, rounded-2xl. Inside, an `<iframe>` or a styled `<img>` placeholder showing the `/demo` dashboard. Caption below in gray-500: *"Live dashboard — click "See Live Demo" above to try it."*

If iframe is too complex, use a static `<div>` mocked to look like a screenshot frame: top bar with three traffic-light dots and `velocity.app/demo` URL pill, then the rest blurred-bg with a CTA overlay "View live →".

### Section 5 — Social proof / institutional logos placeholder

Heading (small, centered, gray-500 uppercase tracking-widest): **"Built for universities like yours"**

Below: 5 logo placeholders in a horizontal row. Each is a `<div>` with gray-700 text in a uniform style (since we don't have real logos yet):

> UVU · BYU · USU · WEBER STATE · DIXIE STATE

(Render these as plain text in a serif font like `font-serif text-2xl text-gray-600` to feel like a logo bar without faking real logos.)

### Section 6 — Pricing tiers

Heading: **"Pricing scales with your institution."**
Sub: "Simple platform fee + per-student. No hidden costs. Volume discounts at every tier."

Three cards in a grid (grid-cols-1 md:grid-cols-3 gap-6). Middle card "Mid" is highlighted (border-green-700, scale-105, "Most Popular" badge in green at top).

Pull data from `pricingTiers` in `store.ts`. Render each card:

```
[Tier Name]                         (text-2xl font-bold white)
[Label - "5,000 - 20,000 Students"] (text-sm gray-400)

$100,000                            (text-5xl font-black white)
/ year platform fee                 (text-sm gray-500)

+ $25 / student / year              (text-base gray-300, green dot before)

[Description italic gray-400]

────────────────

✓ Unlimited student plans
✓ AI advisor chat
✓ Risk detection & alerts
✓ Admin analytics dashboard
✓ Career pathway matching
✓ SSO / SIS integration

[CTA: "Contact Sales" - full width, outline button for small/large, solid green for mid]
```

### Section 7 — Final CTA footer

Full-width gray-900 band, py-24, centered.

**Heading** (text-4xl font-bold white):
> Ready to give every student an advisor that never sleeps?

**Sub** (gray-400):
> See Velocity in action with our live UVU demo. No signup, no demo call, just the product.

**Button:** "Launch Live Demo →" (UVU green, large px-10 py-5)

**Footer below** (border-t border-gray-800, text-gray-500 text-sm, py-8):
> Velocity · AI Academic Advising · Built in Utah · © 2026
> [Privacy] [Terms] [Contact]

---

## C. 4-Year Plan view (`/demo/plan/[studentId]`)

The visual centerpiece. Must look like a real product, not a wireframe.

### File

`app/demo/plan/[studentId]/page.tsx` (Next.js dynamic route).

### Data model

Add to `store.ts`:

```ts
export interface SemesterPlan {
  semester: string;       // "Fall 2024"
  status: "completed" | "current" | "future";
  courses: { code: string; name: string; credits: number; status: "completed" | "in-progress" | "planned" | "recommended" }[];
  totalCredits: number;
  gpa?: number;           // only present for completed
}

export interface FourYearPlan {
  studentId: string;
  semesters: SemesterPlan[];  // exactly 8 entries
}
```

Add a function `generateFourYearPlan(student: Student): FourYearPlan` in `advisor.ts` that:
- Builds 8 semesters from `enrollmentYear` (Fall Y1, Spring Y2, Fall Y2, ..., Spring Y4).
- Marks semesters before current (Spring 2026) as `completed`.
- Marks Spring 2026 as `current`.
- Marks subsequent as `future`.
- For completed semesters: synthesize 4-5 courses from the student's major's required course list, total ~15 credits, give each a believable past-tense GPA.
- For current: use 2-3 of the current `recommendCourses()` output, status `in-progress`.
- For future: use remaining required courses + electives, status `planned`. Mark the top 1-2 future recommendations as `recommended` (highlighted differently).

### Layout

Top section reuses the same student info bar from `/demo` (name, GPA, progress) — paste verbatim. Add a "View Dashboard →" link on right side back to `/demo`.

Below: **the 8-semester kanban grid**.

```
grid grid-cols-4 gap-4                            (4 cols x 2 rows on desktop)
md:grid-cols-4 sm:grid-cols-2 grid-cols-1         (responsive)
```

Each semester is a **column card**:

```
┌──────────────────────────────────┐
│ Fall 2024                  ✓    │  ← header: semester name + status icon
│ Completed · 16 credits · 3.7 GPA│  ← gray-500 small
├──────────────────────────────────┤
│ ┌──────────────────────────────┐ │
│ │ CS 1410                  4cr │ │  ← course pill
│ │ Object-Oriented Programming  │ │
│ │ A-                           │ │
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ MATH 1210                4cr │ │
│ │ Calculus I                   │ │
│ │ B+                           │ │
│ └──────────────────────────────┘ │
│ ...                              │
└──────────────────────────────────┘
```

#### Visual treatment per semester status

| Status | Card BG | Border | Header text | Course pills |
|---|---|---|---|---|
| `completed` | `bg-gray-900/40` | `border-gray-800` | `text-gray-500` | `bg-gray-800/50 text-gray-500 border-gray-800` — greyed, opacity-60 |
| `current` | `bg-gray-900` w/ subtle green glow `shadow-[0_0_40px_-12px_rgba(39,93,56,0.5)]` | `border-green-700` (2px) | `text-white` w/ green pulse dot | `bg-gray-800 text-white border-gray-700` — full color, course code in green-400 |
| `future` | `bg-gray-900` | `border-gray-800` | `text-gray-300` | `bg-gray-800/70 text-gray-300 border-gray-700` — normal; `recommended` pills get `border-green-700/50` + a small "AI pick" badge in green |

#### Top action bar above grid

A small toolbar (flex justify-between mb-6):
- Left: "**4-Year Degree Plan**" h2 + "Generated by Velocity AI · Updated [today's date]" subtitle
- Right: Two buttons:
  - "Export PDF" (outline, gray, decorative — no actual functionality, fine to leave as button onClick alert or no-op for demo)
  - "Optimize Plan" (UVU green solid) — on click, briefly show a loading spinner and a toast "Plan optimized — graduation moved up 1 semester" (purely cosmetic — demo magic).

#### Bottom summary strip

Below grid, a single full-width card:

```
Total credits planned: 120        Required: 120        On track: ✓ Spring 2028
Required courses scheduled: 24/24        Electives: 12        Free credits: 6
```

Three columns, big numbers in green. Anchors the "this plan works" message.

#### Constraint: 30-second-demo impressive

- All 8 semesters visible without scroll on a 1440px laptop screen (grid-cols-4, 2 rows ~= height ~600px). On smaller screens it stacks.
- Current semester has a pulsing green dot in its header — visual anchor for the eye.
- AI-recommended future courses have a tiny `Sparkles` icon (use inline SVG or a unicode `✦`) in green — buyer immediately sees the "AI did this" signal.
- Hover state on any course pill: subtle lift + green border highlight + tooltip showing prerequisites (use `title` attribute for v1).

---

## D. AI chat panel spec (right-side slide-out on `/demo`)

### Trigger

Floating action button (FAB), bottom-right of viewport, on `/demo` only:

```
position: fixed; bottom: 24px; right: 24px; z-50;
w-14 h-14 rounded-full
bg-[#275D38] shadow-lg shadow-green-900/60
hover:scale-110 transition-transform
```

Icon: white sparkles `✦` glyph or inline SVG (chat bubble + sparkle). Pulsing animation: `animate-pulse` on a thin outer ring `before:` pseudo-element (or just a `box-shadow` keyframe `0 0 0 0 → 0 0 0 12px rgba(39,93,56,0.3)`).

Tooltip on hover (left of FAB): "Ask Velocity AI".

### Panel structure

Slides in from right when FAB is clicked. Width `w-[420px]`, full height `h-screen`, fixed positioned.

```
fixed top-0 right-0 h-screen w-[420px] z-40
bg-gray-950 border-l border-gray-800
transform transition-transform duration-300
translate-x-full           (closed)
translate-x-0              (open)
```

Backdrop: `fixed inset-0 bg-black/40 backdrop-blur-sm z-30` only when open, click to close.

### Panel header

```
┌──────────────────────────────────────────┐
│ ✦ Velocity AI            ●  [×]          │  ← title + green online dot + close
│ Advising assistant · context: McKenna J. │  ← gray-500 small, shows current student
├──────────────────────────────────────────┤
```

Title in white font-semibold. The green dot uses `bg-green-500 w-2 h-2 rounded-full animate-pulse`.

### Message area

Flex column, flex-1, overflow-y-auto, p-4, gap-3.

**Bot message bubble:**
```
bg-gray-900 border border-gray-800
rounded-2xl rounded-tl-sm
p-4 max-w-[85%] self-start
text-sm text-gray-200
```

Prefix with small green "✦" icon and "Velocity AI" label above the bubble.

**User message bubble:**
```
bg-[#275D38] text-white
rounded-2xl rounded-tr-sm
p-4 max-w-[85%] self-end
text-sm
```

**Typing indicator** (shown for 600-900ms before bot replies):
Three dots in a bot bubble, animated with staggered `animate-bounce` delays (0ms, 150ms, 300ms). Use:
```html
<div class="flex gap-1 p-4">
  <span class="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
  <span class="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style="animation-delay:150ms"></span>
  <span class="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style="animation-delay:300ms"></span>
</div>
```

### Starter chips (shown when conversation is empty)

Above the input, a flex-wrap row of 5 chip buttons. On click, populate input and auto-send.

Suggested prompts (write these literally):
1. "What should I take next semester?"
2. "Am I on track to graduate?"
3. "What careers match my skills?"
4. "Where am I falling behind?"
5. "How do I prepare for a Software Engineering internship?"

Chip styling:
```
text-xs px-3 py-1.5 rounded-full
bg-gray-900 border border-gray-700
text-gray-300 hover:border-green-700 hover:text-white
transition
```

### Input area

Sticky at bottom of panel:

```
border-t border-gray-800 p-4
bg-gray-950
```

Single text input + send button:
```
[Ask Velocity anything...]                  [↑]
```

Input: `bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm w-full focus:border-green-700 outline-none`
Send button: green circle with white up-arrow, 40x40, disabled state when input empty.

Footer microcopy below input: `text-xs text-gray-600 mt-2 text-center`: "Velocity AI uses your academic record. Responses are recommendations, not requirements."

### Response engine (no LLM)

Add `app/api/chat/route.ts` — POST endpoint `{ studentId, message }` → `{ reply: { text: string, sections?: ChatSection[] } }`.

Logic: keyword match the message to intents:

| Keywords (lowercase contains) | Intent | Response builder |
|---|---|---|
| "next semester", "what should i take", "courses" | recommend | Use `recommendCourses(student)` — return text intro + bullet list of 3-4 courses with reasoning |
| "on track", "graduate", "graduation", "timeline" | timeline | Use `calculateGraduationProgress(student)` — return graduation date, credits remaining, on-track status |
| "career", "job", "match" | career | Use `analyzeCareerPathways(student)` — return top 2 matches with match scores |
| "behind", "falling", "risk", "wrong" | risk | Use `generateRiskAlerts(student)` — return alerts in priority order with suggested action per alert |
| "internship", "prepare" | skill_gap | Pull missing skills from career analysis, recommend specific UVU courses that teach them |
| default | fallback | "I can help with course selection, graduation timeline, career matching, and identifying risks. Try one of the prompts above." |

### Response format

The `text` field uses simple newline-separated lines. The optional `sections` is a structured array for rich rendering:

```ts
type ChatSection =
  | { type: "text"; content: string }
  | { type: "course_list"; items: { code: string; name: string; reason: string }[] }
  | { type: "callout"; tone: "info"|"warning"|"success"; content: string }
  | { type: "stats"; items: { label: string; value: string }[] }
```

Render `course_list` as compact cards inside the bot bubble (gray-800 inner cards, code in green-400 monospace, reason in gray-400). `callout` gets a colored left border (4px) matching tone. `stats` is a 2-column grid of label/value pairs.

### "AI-native" details (do not skip)

- **Streaming feel:** even though it's local, after typing dots, reveal the response one section at a time with a 100ms stagger (`setTimeout` chain).
- **Citation chips:** below each response, show a row of "Source:" pills referencing the data used — e.g., "📊 Your transcript", "🎯 Career goals", "📚 UVU catalog". Hardcoded per intent.
- **Persistent across student changes:** when user switches students via dropdown, the panel posts an automatic system message: "Now advising on **Sarah Chen**. What would you like to know?"

---

## E. Demo data expansion — 9 new students (15 total)

Append to `students` array in `app/api/store.ts`. The hero of the demo is **STU-007: Sarah Chen**. Make sure she appears prominently — recommend putting her **first** in the array so she's the default selected student.

**Action:** reorder the array so STU-007 (Sarah Chen) is index 0. The dashboard auto-selects `students[0]`, so she becomes the demo's opening shot.

### Story arcs

| ID | Name | Arc | Why she/he matters |
|---|---|---|---|
| STU-007 | Sarah Chen | **At-risk wake-up call** | GPA 2.1, behind on credits, skill gaps → triggers ALL risk alerts at once. The "look what AI catches" moment. |
| STU-008 | Tanner Hatch | High-flyer transfer | 4.0 transfer student, fast-track to graduation. Shows positive case. |
| STU-009 | Maria Gutierrez-Lopez | First-gen low-income | CS major with unexpected career match (FinTech via Spanish + CS combo). Shows AI surfaces non-obvious paths. |
| STU-010 | Brandon Beck | Solid CS junior | Middle-of-road, on-track. Demo "normal" baseline. |
| STU-011 | Hailey Whitmore | Business middle-of-road | Healthy progress, common case. |
| STU-012 | Preston Larsen | Nursing pivot | Switched from biology → represents nontraditional path. |
| STU-013 | Jaxon Tupou | Late bloomer | GPA recovered from 2.4 to 3.3, shows trend recovery. |
| STU-014 | Emma Sorenson | Returning adult learner | Age 34, working parent, Digital Marketing — diversity of UVU population. |
| STU-015 | Carter Nguyen | First-year Cybersecurity | Just enrolled, blank slate — shows "day one" experience. |

### Exact paste-ready data

Insert this block into `students` in `store.ts`. Put STU-007 first (before STU-001).

**Note on Nursing:** UVU has a Nursing program but the current `store.ts` doesn't list it as a `DegreeRequirement`. Add a minimal nursing degree requirement (see addendum at end of this section) so STU-012 resolves cleanly.

```ts
{
  id: "STU-007",
  name: "Sarah Chen",
  email: "schen@uvu.edu",
  uvid: "10745892",
  major: "Computer Science",
  minor: null,
  college: "Scott M. Smith College of Engineering & Technology",
  enrollmentYear: 2022,
  expectedGraduation: "Spring 2026",
  completedCredits: 58,
  requiredCredits: 120,
  gpa: 2.1,
  skills: ["Python", "HTML/CSS"],
  careerGoals: ["Software Engineer", "Web Developer"],
},
{
  id: "STU-008",
  name: "Tanner Hatch",
  email: "thatch@uvu.edu",
  uvid: "10967234",
  major: "Computer Science",
  minor: "Mathematics",
  college: "Scott M. Smith College of Engineering & Technology",
  enrollmentYear: 2024,
  expectedGraduation: "Fall 2026",
  completedCredits: 84,
  requiredCredits: 120,
  gpa: 4.0,
  skills: ["Python", "Java", "C++", "Data Structures", "Algorithms", "Machine Learning", "SQL", "Git", "Linux", "Neural Networks", "Linear Algebra", "Statistics"],
  careerGoals: ["Machine Learning Engineer", "Software Engineer"],
},
{
  id: "STU-009",
  name: "Maria Gutierrez-Lopez",
  email: "mgutierrez@uvu.edu",
  uvid: "10812937",
  major: "Computer Science",
  minor: null,
  college: "Scott M. Smith College of Engineering & Technology",
  enrollmentYear: 2023,
  expectedGraduation: "Spring 2027",
  completedCredits: 45,
  requiredCredits: 120,
  gpa: 3.62,
  skills: ["Python", "JavaScript", "HTML/CSS", "Git", "SQL", "Bilingual (Spanish/English)", "Customer Service"],
  careerGoals: ["Web Developer", "Software Engineer"],
},
{
  id: "STU-010",
  name: "Brandon Beck",
  email: "bbeck@uvu.edu",
  uvid: "10778452",
  major: "Computer Science",
  minor: null,
  college: "Scott M. Smith College of Engineering & Technology",
  enrollmentYear: 2023,
  expectedGraduation: "Spring 2027",
  completedCredits: 68,
  requiredCredits: 120,
  gpa: 3.18,
  skills: ["Java", "Python", "Data Structures", "Algorithms", "Git", "SQL", "Linux"],
  careerGoals: ["Software Engineer"],
},
{
  id: "STU-011",
  name: "Hailey Whitmore",
  email: "hwhitmore@uvu.edu",
  uvid: "10889123",
  major: "Business Management",
  minor: null,
  college: "Woodbury School of Business",
  enrollmentYear: 2023,
  expectedGraduation: "Spring 2027",
  completedCredits: 70,
  requiredCredits: 120,
  gpa: 3.52,
  skills: ["Excel", "Financial Analysis", "Communication", "Business Writing", "Leadership", "Project Management", "Accounting"],
  careerGoals: ["Management Consultant", "Product Manager"],
},
{
  id: "STU-012",
  name: "Preston Larsen",
  email: "plarsen@uvu.edu",
  uvid: "10923871",
  major: "Nursing",
  minor: null,
  college: "College of Health & Public Service",
  enrollmentYear: 2022,
  expectedGraduation: "Spring 2026",
  completedCredits: 92,
  requiredCredits: 120,
  gpa: 3.41,
  skills: ["Patient Care", "Anatomy", "Pharmacology", "Clinical Skills", "Communication", "Critical Thinking"],
  careerGoals: ["Registered Nurse", "Nurse Practitioner"],
},
{
  id: "STU-013",
  name: "Jaxon Tupou",
  email: "jtupou@uvu.edu",
  uvid: "10845612",
  major: "Information Technology",
  minor: null,
  college: "Scott M. Smith College of Engineering & Technology",
  enrollmentYear: 2022,
  expectedGraduation: "Spring 2026",
  completedCredits: 88,
  requiredCredits: 120,
  gpa: 3.31,
  skills: ["Networking", "Linux Administration", "Windows Server", "Cisco", "AWS", "Shell Scripting", "Automation"],
  careerGoals: ["Cloud Engineer", "Systems Administrator"],
},
{
  id: "STU-014",
  name: "Emma Sorenson",
  email: "esorenson@uvu.edu",
  uvid: "10712398",
  major: "Digital Marketing",
  minor: null,
  college: "Woodbury School of Business",
  enrollmentYear: 2023,
  expectedGraduation: "Fall 2026",
  completedCredits: 56,
  requiredCredits: 120,
  gpa: 3.84,
  skills: ["SEO", "Social Media Marketing", "Content Strategy", "Google Analytics", "Copywriting", "Brand Strategy", "Project Management", "Communication"],
  careerGoals: ["Digital Marketing Manager", "Brand Strategist"],
},
{
  id: "STU-015",
  name: "Carter Nguyen",
  email: "cnguyen@uvu.edu",
  uvid: "10998765",
  major: "Cybersecurity",
  minor: null,
  college: "Scott M. Smith College of Engineering & Technology",
  enrollmentYear: 2025,
  expectedGraduation: "Spring 2029",
  completedCredits: 12,
  requiredCredits: 120,
  gpa: 3.65,
  skills: ["Linux", "Python"],
  careerGoals: ["Cybersecurity Analyst", "Penetration Tester"],
},
```

### Addendum — add Nursing degree requirement

Add to `degreeRequirements` array so STU-012 has a valid major mapping:

```ts
{
  id: "DEG-006",
  major: "Nursing",
  college: "College of Health & Public Service",
  totalCredits: 120,
  requiredCourses: ["CRS-021"],  // Stats is the only existing course Nursing reasonably maps to
  electiveCredits: 60,
},
```

Also add a Nursing-relevant career path to `careerPaths`:

```ts
{
  id: "CAR-012",
  title: "Registered Nurse",
  requiredSkills: ["Patient Care", "Clinical Skills", "Pharmacology", "Anatomy", "Communication", "Critical Thinking"],
  averageSalary: 82000,
  growthRate: 9,
  relatedMajors: ["Nursing"],
},
{
  id: "CAR-013",
  title: "Nurse Practitioner",
  requiredSkills: ["Patient Care", "Clinical Skills", "Pharmacology", "Diagnostics", "Anatomy", "Critical Thinking", "Communication"],
  averageSalary: 121000,
  growthRate: 38,
  relatedMajors: ["Nursing"],
},
```

### Why these students work for the demo

- **Sarah Chen (STU-007)** is the lead. GPA 2.1 triggers the high-severity GPA alert. Behind on credits triggers credit pace alert. Only 2 skills triggers skill gap alerts for both her career goals. She's the **demo's first impression** — buyers see "the AI caught all this in 2 seconds."
- **Tanner Hatch (STU-008)** is the contrast — perfect student, AI surfaces "consider grad school / research" rather than risks. Shows the platform works on the happy path too.
- **Maria Gutierrez-Lopez (STU-009)** — first-gen, has bilingual skill that pairs with CS for unique career angles (the AI can suggest "bilingual technical recruiter" type paths). Adds demographic depth without being preachy.
- **Brandon, Hailey, Jaxon, Emma** — texture. The buyer sees a realistic spread, not 3 perfect students.
- **Preston** — proves we're not just CS/Business. Nursing is the largest single program at most regional universities.
- **Carter** — proves day-1 onboarding works (12 credits, blank slate).

---

## F. Visual polish recommendations

These are the lifts that take the demo from "hackathon" to "I'd write a check." All Tailwind-only. Apply in order of impact.

### F1. Global — typography & spacing

In `app/layout.tsx`, swap the default sans-serif for **Inter** with tight tracking:

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

<body className={`${inter.variable} font-sans antialiased bg-gray-950`}>
```

In `tailwind.config.ts`, extend:

```ts
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
    },
    colors: {
      "uvu-green": {
        DEFAULT: "#275D38",
        50: "#E8F0EB",
        400: "#4CAF50",
        500: "#3E8E4D",
        600: "#2F7340",
        700: "#275D38",
        800: "#1B4327",
        900: "#0F2A18",
      },
    },
    boxShadow: {
      "glow-green": "0 0 40px -8px rgba(39, 93, 56, 0.5)",
    },
    keyframes: {
      "pulse-ring": {
        "0%": { boxShadow: "0 0 0 0 rgba(39,93,56,0.5)" },
        "100%": { boxShadow: "0 0 0 14px rgba(39,93,56,0)" },
      },
      "fade-in-up": {
        "0%": { opacity: "0", transform: "translateY(8px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      "pulse-ring": "pulse-ring 1.8s infinite",
      "fade-in-up": "fade-in-up 0.4s ease-out",
    },
  },
},
```

This gives you `bg-uvu-green-700`, `shadow-glow-green`, `animate-pulse-ring`, `animate-fade-in-up` everywhere — replaces inline `style={{ backgroundColor: "#275D38" }}` clutter.

**Existing files that should be refactored to use these tokens (not blocking the demo, but worth doing if time):** `app/page.tsx` (current, becoming `app/demo/page.tsx`), `app/admin/page.tsx`. Replace `style={{ backgroundColor: "#275D38" }}` with `className="bg-uvu-green-700"`.

### F2. Existing dashboard (`/demo`) — specific changes

**Header logo block** (currently the green "V" box): add `shadow-lg shadow-green-900/50` and on hover `hover:shadow-glow-green transition-shadow`.

**Student info bar card:**
- Add `hover:border-gray-700 transition-colors`.
- The stat numbers (GPA, %, Status) — wrap each in a `group` div with `hover:scale-105 transition-transform`.
- Status badge ("On Track"/"Behind") — make it a pill with `px-3 py-1 rounded-full bg-green-900/30 border border-green-800/50` instead of plain text.

**Progress bar:**
- Replace solid green with a subtle gradient: `bg-gradient-to-r from-uvu-green-700 to-uvu-green-500`.
- Add a moving sheen on the bar — pseudo-element with `animate-pulse` opacity-30 white overlay (cosmetic only).

**Risk alert cards:**
- Add a left border indicator (4px solid red/amber/green) instead of/in addition to background tint:
  `border-l-4 border-l-red-500 bg-red-950/20 border-red-900/40`
- On the high-severity alert, add `animate-pulse` to a small dot beside the type label.

**Tab navigation:**
- Active tab: currently just bg. Add `shadow-md shadow-green-900/30 ring-1 ring-green-700/50`.
- Hover on inactive tabs: add `hover:translate-y-[-1px] transition-transform`.

**Course recommendation cards:**
- Change `hover:border-green-700` to `hover:border-green-700 hover:shadow-lg hover:shadow-green-900/20 hover:-translate-y-0.5 transition-all duration-200`.
- Course code (CS 2420) — wrap in a small pill `bg-gray-800 border border-gray-700 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider`.

**Skills pills:**
- Add `hover:scale-105 transition-transform cursor-default`.
- For "skills you have": add a tiny green check `✓` before the text.
- For "skills to develop": add a tiny `+` before the text.

**Career match score:**
- Wrap the giant number in a circular SVG progress ring (radius 32, stroke matching matchScore percentage). The bare number feels flat — a ring makes it look like a real product metric.

### F3. Existing admin (`/admin`) — specific changes

**Key metrics cards (top row):**
- Add subtle hover: `hover:bg-gray-900/70 hover:border-gray-700 transition-colors`.
- Wrap big numbers in `animate-fade-in-up` on mount (staggered 50ms each).
- Add a tiny trend arrow next to each: `↑ 12% vs last semester` in green-400 text-xs (hardcoded — it's a demo).

**Retention indicators:**
- Status pill (good/warning/critical) — add a colored dot (●) inside, give it `animate-pulse` if status is critical.

**Program distribution bars:**
- Bars currently animate on mount? Add `transition-all duration-700` so they grow from 0 → final width on page load.

**Workforce readiness section:**
- Skill gap pills — make them clickable (no-op handler, but cursor pointer + hover lift). Suggests "click to see students missing this skill" — buyer's imagination fills in the rest.

### F4. New: Loading states

Replace the spinner text "Loading Velocity x UVU..." with a proper skeleton screen. Use `bg-gray-800 animate-pulse` rectangles in roughly the shape of the final dashboard. Implementation hint: extract a `<DashboardSkeleton />` component with 3-4 gray pulsing blocks (header bar, info card, two grid items).

### F5. New: Page transitions

Add `animate-fade-in-up` to the top-level container of each page. Already-trivial with the keyframe defined above. Makes navigation feel premium.

### F6. Microcopy upgrades on existing pages

- Footer "Built for Utah Valley University" → "Velocity · AI Academic Advising · Live at Utah Valley University · Built in Orem, UT" (sounds more like a product, less like a project).
- Empty-state messages everywhere: instead of plain text, add a small green sparkle icon and slightly more confident copy.
- Replace "No significant skill gaps identified. You are well-prepared for your career goals!" with "You're ready. Velocity sees no critical skill gaps for your target careers." (more product-voice).

### F7. Favicon + page titles

In `app/layout.tsx`, set:
```ts
export const metadata = {
  title: "Velocity — AI Academic Advising",
  description: "The AI advising platform for higher education. Built at UVU.",
};
```

Add a simple `app/icon.tsx` that renders the green "V" using `ImageResponse`:
```tsx
import { ImageResponse } from "next/og";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div style={{ background: "#275D38", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 22, fontWeight: 900 }}>V</div>,
    size
  );
}
```

---

## G. `/admin/[studentId]` — advisor detail view (brief spec)

Lower priority than A-F, but a one-screen advisor deep-dive that a UVU buyer would expect.

Layout: a "Sarah Chen" detail page styled like the student dashboard but with **advisor-facing controls**:

- Header: "Advisor View" pill (amber, not green, to differentiate role).
- Same student info bar (reused component from `/demo`).
- Three sections stacked:
  1. **Recommended interventions** (gray-900 card): a checklist of suggested actions — "Schedule meeting (high priority)", "Refer to tutoring center", "Add to credit recovery cohort". Just static checkbox list with action labels — no real action, just the appearance.
  2. **Communication log** (gray-900 card): a fake timeline of past advisor touchpoints — "Email sent 2026-02-12: Mid-term check-in", "Office hours visit 2026-01-29". Reads like a CRM. Three fake entries per student is enough.
  3. **Notes** (gray-900 card): textarea with placeholder "Add advisor notes...". Below it a "Save Note" button (no-op). Suggests Velocity replaces / augments existing advising tools.

Navigation: clicking a student row in `/admin` (if/when we add a roster table) → goes to `/admin/[studentId]`. For now, link to it from the dashboard header when in admin mode.

**Implementation hint:** punt on this if time runs out. The 4-year plan + AI chat are the WOW moments. Advisor detail is the "yes, we thought of that" moment — important but second-priority.

---

## H. Build order (recommended)

If implementing tonight, do in this order to maximize demo readiness at every checkpoint:

1. **Data first** (15 min): Update `store.ts` with all 9 new students, Sarah first. Add Nursing degree + RN/NP career paths. Verify dashboard loads with Sarah selected.
2. **Routing shuffle** (15 min): Move current `app/page.tsx` → `app/demo/page.tsx`. Stub a placeholder marketing page at `app/page.tsx`. Make sure `/demo` works fully.
3. **Marketing page** (45 min): Build sections 1-7 of part B. This is the "buyer's first impression" — high ROI per minute.
4. **Tailwind tokens + Inter font** (15 min): Part F1. Touch nothing else, just register the config so subsequent work uses tokens cleanly.
5. **AI chat panel** (60 min): Part D. The FAB, the panel, the keyword-routed responses. The single most "AI" thing in the demo.
6. **4-year plan view** (60 min): Part C. Visual centerpiece for the depth portion of the demo.
7. **Polish pass** (30 min): Part F2-F6. Quick visual lifts on dashboard + admin.
8. **Stretch** (if time): `/admin/[studentId]` detail view (G). Favicon (F7).

Total estimate: ~4 hours for everything through step 7. Step 8 is gravy.

---

## Appendix — design tokens (canonical reference)

| Token | Value | Use |
|---|---|---|
| Background | `bg-gray-950` | Page background |
| Surface | `bg-gray-900` | Cards |
| Surface elevated | `bg-gray-900/80 backdrop-blur-sm` | Sticky headers |
| Border default | `border-gray-800` | Cards, dividers |
| Border hover | `border-gray-700` | Card hover |
| Primary | `bg-uvu-green-700` (#275D38) | CTAs, active states |
| Primary hover | `bg-uvu-green-600` | CTA hover |
| Primary glow | `shadow-glow-green` | CTA shadow on hover |
| Success | `text-green-400` / `bg-green-900/50` | On-track, completed |
| Warning | `text-amber-400` / `bg-amber-900/50` | At-risk medium |
| Danger | `text-red-400` / `bg-red-900/50` | At-risk high |
| Text primary | `text-white` | Headings, key numbers |
| Text secondary | `text-gray-300` | Body |
| Text tertiary | `text-gray-400` | Subdued body |
| Text quaternary | `text-gray-500` | Labels, captions |
| Text faint | `text-gray-600` | Footer, microcopy |
| Radius card | `rounded-xl` (12px) | All cards |
| Radius pill | `rounded-full` | Chips, status pills, FAB |
| Radius button | `rounded-lg` (8px) | Buttons |
| Animation default | `transition-all duration-200` | Hover states |

Use these everywhere. Do not introduce new hex codes outside the `uvu-green` ramp.
