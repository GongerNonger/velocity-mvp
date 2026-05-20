# Velocity Competitive Landscape Brief

**Prepared for:** Velocity founder / pitch positioning
**Prepared by:** Competitive Intelligence, Velocity x UVU project
**Document version:** 1.0 — May 2026
**Audience:** Founder, exec team, investors, design partners

---

## Executive summary

The academic advising / student success software market is **crowded but structurally stuck**. The dominant incumbents — EAB Navigate360, Ellucian DegreeWorks, Civitas Learning, Watermark Student Success & Engagement (formerly Aviso) — were architected before the 2023 LLM wave and are now retrofitting AI features onto SIS-coupled, sales-heavy enterprise stacks. The fast-growing modern players — Stellic, Element451, Mainstay, Advisor.AI — are each strong in one slice (degree audit, CRM, chatbots, career exploration) but none of them combine **(a) AI-native conversational UX, (b) per-student career pathway matching tied to live labor market data, and (c) a deployment model that doesn't require nine months of Banner integration before a student sees value.**

That gap is Velocity's wedge. The rest of this brief lays out, competitor by competitor, what they do, where they win, where they bleed, and where Velocity can dominate in a head-to-head pilot.

---

## 1. Stellic

**Site:** stellic.com — CMU-founded, San Francisco, 2017.[^1][^2]

### Core product & pitch
End-to-end degree planning, audit, registration, and advising platform — positioned as the modern replacement for DegreeWorks. "Degree management reimagined." Their three-pillar product is **Stellic Progress** (planner + audit), **Stellic Schedule** (registration), and an advisor caseload view.[^1][^3]

### Pricing model
Subscription, custom by institution size. Available through the **E&I Cooperative Services** contract — which short-circuits RFP cycles for member institutions and is a real GTM advantage.[^4] No public list price; industry-benchmark for this category is roughly **$50K–$300K/yr** depending on enrollment.

### Customer base / notable wins
1M+ students across institutions including Carnegie Mellon, Tufts, TCU, University of Newcastle (Australia), Case Western Reserve, University of Wisconsin–Stout, University of Nebraska Omaha, Santa Monica College, Ball State, Saint Martin's, Quinnipiac.[^1][^5][^6][^7][^8][^9][^10][^11][^12][^13] They are actively replacing DegreeWorks at multiple R1s.

### Funding
**$11M total** across two rounds; Series A March 2022 led by Reach Capital, with ECMC, Impact Engine, Operator Collective, Rethink Education, QSTP. Angels include David Blake (Degreed), John Katzman (Noodle/2U), Matt Pittinsky (Blackboard/Parchment).[^14] Notably no new round disclosed in 2024–2025, which is conspicuous for a company growing this fast — either they're capital efficient or they're between rounds.

### Strengths
- Genuinely modern UX vs. DegreeWorks — students self-report "falling in love with Stellic."[^15]
- Implementation speed and quality is their advertised superpower; one registrar with 25 years of experience called it "the perfect recipe of pace and partnership."[^15]
- Strong "what-if" major switching workflow.
- Replaces a hated incumbent (DegreeWorks), so willingness-to-switch is high.

### Weaknesses / common complaints
- **Transfer credit handling reportedly inconsistent** — Quinnipiac Chronicle student reporting documented advisors struggling with technical difficulties and credits not always showing properly.[^15]
- Degree-planning-centric — **not really an AI advisor.** No conversational interface, no live labor-market career matching, no risk-alert engine that surfaces students proactively. Stellic is a better degree audit; it is not an advisor.
- No published predictive risk model.
- Career pathway / workforce alignment is not a first-class product surface.

### Where Velocity beats them
- **AI-native conversational interface.** Stellic is a forms-and-tables product; Velocity is a chat-first advisor.
- **Live labor market data per pathway.** Stellic shows you what you need to graduate; Velocity shows you what to major in *and* what it pays in Utah.
- **Risk alerts.** Stellic doesn't have a behavioral early-warning system — they leave that to the institution.
- **Pilot speed.** Velocity runs in 30 days on CSV ingest with no SIS write-back; Stellic implementations are months even when fast.

### Where they beat Velocity
- Production-grade **degree audit engine** with scribed Banner rules — this is genuinely hard and Stellic has eight years on it.
- Real customer logos at R1 universities. Velocity has zero paying customers.
- **E&I contract vehicle** — they can sell into hundreds of institutions without going through full RFP. Velocity has no such shortcut yet.

---

## 2. EAB Navigate360 (the incumbent to beat)

**Site:** eab.com — owned by Vista Equity Partners + BC Partners since 2017 ($1.55B carve-out from The Advisory Board Company).[^16][^17]

### Core product & pitch
Higher ed's "leading CRM" — unifies enrollment, advising, and advancement. The standard answer to "what does your student success office use." Modules: **Enrollment CRM**, **Student Success CRM**, **Advancement CRM**, **Academic Planning**, and a 2024-2025 add-on called **Navigate360 AI / NavAI**.[^18][^19]

### Pricing model
Enterprise license, custom-quoted by enrollment. EAB markets it as "no per-user fees" and "no hidden customization fees" — the contract is a single annual line item that scales with FTE.[^20] Industry-benchmark dollar range is roughly **$150K–$1M+ ARR** depending on institution size and module count. Contracts are typically multi-year (UW System renewed for 5 years through Dec 2028 in June 2023).[^21]

### Customer base / notable wins
**850+ two- and four-year institutions** as of late 2025 (sometimes reported as 10M+ students reached); the broader EAB business serves 2,100–2,500 institutions across all product lines.[^18][^22] Marquee customer is Georgia State, which used EAB tech alongside the **Pounce** chatbot (now Mainstay) to lift six-year graduation rates 23 points to 54%.[^23] 95%+ annual renewal rate.[^20]

### Strengths
- **Distribution.** Every president, provost, and student affairs VP in the U.S. takes EAB's call. Brand recognition is a moat.
- Real data — 850 institutions and 10M+ student records means their benchmarks and best-practice library are credible.
- Documented outcomes — **3%–15% graduation rate lift, 5:1 ROI.**[^18]
- Enterprise sales motion is buttoned up; Strategic Leader model gives customers a dedicated CSM, which keeps renewal rates high.

### Weaknesses / common complaints
- **Real-time data lag is the #1 complaint on G2.** Banner-to-Navigate sync is nightly at best ("Data in Navigate is pulled from Virginia Tech's Data Warehouse nightly").[^24][^25] Students see stale info.
- **NavAI is a 2024-2025 retrofit, not native.** It's seven distinct "agents" bolted on — a Knowledge Agent, a Web Embed Agent, meeting-note transcription, email drafting.[^26][^27] None of it is a true conversational advisor that does course recommendations and career matching in one thread.
- **Implementation is long.** Grand Valley State took ~9 months from winter 2020 kickoff to fall 2020 launch.[^28] Most customers report a full academic year before steady-state.
- "Doesn't do everything we need; we still need other software" — direct G2 quote.[^24]
- Built on CRM bones (records, cases, campaigns) rather than student-first conversational UX.

### Where Velocity beats them
- **AI-native from day one** — not retrofitted. Velocity's conversational layer was the *primary* interface, not a sidebar agent grafted onto a CRM.
- **30-day pilot vs. 9-month implementation.** Velocity runs on CSV ingest, no Banner write-back required. EAB cannot match this without rebuilding their procurement and onboarding playbook.
- **Live labor market data per student.** EAB's Academic Planning recommends courses; it does not show a student that switching from CS to IT cuts their time-to-degree by two semesters *and* maps to a $72K Salt Lake City sysadmin role.
- **Modern UX.** EAB is a 2010s CRM with AI bolts. Velocity is a 2026 chat interface.

### Where they beat Velocity
- **Brand and distribution.** EAB is on the procurement allow-list at 850 schools.
- **Capital and headcount.** Backed by Vista and BC Partners. Massive R&D budget.
- **Data depth.** 10M+ student records of historical outcomes data. Velocity has none of this yet.
- **Renewal rate.** 95%+ is hard to beat — sticky in a way Velocity will need years to replicate.
- **Banner write-back integration** — EAB can post advising holds and case notes back into the SIS; Velocity (deliberately) cannot in pilot.

---

## 3. Civitas Learning

**Site:** civitaslearning.com — Austin, TX.

### Core product & pitch
"Student Impact Platform" — a unified analytics layer that ingests SIS, LMS, financial aid, and engagement data, then produces predictive student-success scores, advisor caseload prioritization, and "what works" experiments to test interventions.[^29]

### Pricing model
Custom enterprise — not published. Software Suggest and Capterra both flag it as undisclosed, sold via consultative process.[^30] Industry-benchmark: **$100K–$500K+ ARR** depending on institution size.

### Customer base
400+ colleges and universities served (Capterra/SoftwareSuggest figure).[^30]

### Strengths
- Strong **predictive analytics** lineage — they were one of the original Big Data student-success vendors.
- Genuinely cross-data-source — they consolidate signals other tools miss.
- The "Student Impact Platform" positioning is intellectually clean for a CFO buyer.

### Weaknesses / common complaints
Civitas has the **worst public review profile** of any competitor in this brief, and it's not close:

- **G2 / Capterra / TrustRadius reviews include:** "little better than grifters who over-promise and under-deliver"; "getting any usability out of the tool requires forking over money for additional customizations"; "outsourced engineers do not have the ability to solve any of the systemic issues"; "constant errors and downtime occurring weekly"; "implementations taking upwards of a year and then rolling out without promised features"; "company that's meant to solve disparate data issues paradoxically has some of the nastiest data in a CRM."[^30][^31]
- **Glassdoor reviews of the company itself are brutal** — toxic culture, layoffs, leadership turnover, "lying management."[^31]
- "Targets public universities intimidated by better services" — direct customer quote.[^30][^31]

### Where Velocity beats them
- Trust. Civitas is actively *losing* trust with its base. Velocity walks in with no baggage.
- **Modern AI vs. legacy ML.** Civitas's models are pre-LLM; their analytics dashboards feel like 2018.
- Pilot motion: Velocity's 30-day, no-cost, no-Banner pilot is the structural opposite of "a year of implementation and then it ships without the features you bought."
- UX: Civitas is a dashboarding product; Velocity is conversational.

### Where they beat Velocity
- **Data science maturity** for predictive risk modeling on historical cohort data — they've been doing it since 2011.
- **400+ institutional logos** vs. Velocity's zero.
- Cross-source data integration (LMS + SIS + financial aid + engagement) is harder than it looks; Civitas has years of plumbing built.

**Note:** Civitas's reputational fragility is an active *opportunity* for Velocity in any account where Civitas is up for renewal in the next 18 months.

---

## 4. Watermark Student Success & Engagement (formerly Aviso Retention)

**Site:** watermarkinsights.com — acquired Aviso Retention in December 2021 and rebranded the product line in 2023.[^32][^33]

### Core product & pitch
Predictive-analytics-driven retention platform: ingests course performance, attendance, and engagement signals, produces risk scores, and routes "needs intervention" cases to advisors. Now sold as one component of Watermark's broader suite (which also covers course evaluations, assessment, and accreditation across 1,700+ institutions).[^32][^34]

### Pricing model
Bundled into Watermark's institutional suite — no published pricing. Industry-benchmark for the SS&E module standalone is **$50K–$200K ARR**; the full Watermark bundle goes higher.

### Customer base
The broader Watermark business serves **1,700+ higher ed institutions** for assessment and accreditation; SS&E is a subset of that base.[^32]

### Strengths
- Embedded in institutions that already use Watermark for course evaluations and accreditation — natural cross-sell.
- Predictive analytics with reasonable track record (under the Aviso brand, this was a known retention tool).
- Equity-framed marketing — "identify issues preventing students from succeeding and reach out to students most in need" — resonates with student affairs.[^32]

### Weaknesses / common complaints
- **Interface complexity** — support docs "use different terms to explain the same concept"; common actions (e.g., contacting people associated with a student) "require multiple steps."[^35]
- The product was acquired and rebranded — there's the usual post-acquisition slowdown of roadmap, with two product cultures still merging.
- Not AI-native — predictive models, yes; conversational AI, no.
- Watermark's strategic center of gravity is **assessment and accreditation, not advising** — advising is a side product.

### Where Velocity beats them
- AI-native, modern UX vs. multi-step legacy workflows.
- Advising is Velocity's *only* product; for Watermark it's one of several.
- Faster pilot.

### Where they beat Velocity
- Already embedded at the institution via course evaluations / accreditation — switching cost works against Velocity.
- 1,700-institution distribution.
- Real retention-outcome data from years of Aviso deployments.

---

## 5. Degree Compass (now part of D2L Brightspace)

### Core product & pitch
Originally a course-recommendation engine built at **Austin Peay State University** in 2011, using Netflix-style collaborative filtering on grade + enrollment data to predict which courses each student would do well in.[^36][^37] **Acquired by Desire2Learn (D2L) in January 2013** and folded into Brightspace.[^38]

### Status in 2026
Effectively **dormant as a standalone product.** The hype died down by 2018 — EdSurge's "How a 'Netflix' Model For Advising Lost Its Luster" documented that Austin Peay's graduation rates stopped budging after 2014 and retention had started dropping.[^39] D2L's recent acquisitions (H5P Group in July 2024) are content-creation tools, not advising — Degree Compass is not their strategic focus.[^40]

### Why this matters for Velocity
Degree Compass is the **cautionary tale** for any pitch meeting. A pre-LLM, statistically clever course recommender that got celebrated by *Inside Higher Ed* and then quietly faded because:
1. It was a recommendation engine, not an advisor — it didn't *talk* to students.
2. It optimized for "course you'll get a B in," not "career path that matches your strengths and the labor market."
3. It was tied to a single institution's data and didn't generalize.

**Velocity's pitch should explicitly contrast against Degree Compass:** "We are not a course recommender. We are a conversational advisor with live labor market signal, and our recommendations are explanations, not opaque scores."

### Where Velocity beats them
Across the board — Degree Compass is a decade behind on UX, modality (chat vs. tabular), and on tying recommendations to careers and earnings.

### Where they beat Velocity
- The Austin Peay academic paper (90% prediction accuracy on course passing) gave them peer-reviewed credibility Velocity does not yet have.[^41]

---

## 6. Ellucian DegreeWorks (the Banner-bundled incumbent)

### Core product & pitch
Degree audit and academic planning tool, deeply integrated with **Banner SIS** (Ellucian's flagship ERP). Sold as the default advising tool when an institution adopts Banner. "Higher education's broadest native Banner integration."[^42]

### Pricing model
Bundled or modular alongside Banner; Banner itself is custom-priced by institution size, modules selected, and on-prem vs. cloud.[^43] DegreeWorks specifically is not separately listed but typically rolls in at a few tens to low hundreds of thousands per year as part of the Ellucian footprint.

### Customer base
The largest install base of any degree audit tool — **hundreds of Banner-using institutions globally.** It is the default that Stellic, Velocity, and every other modern entrant has to displace or work alongside.

### Strengths
- **Native Banner integration** — there is no other tool with deeper SIS coupling.
- Sunk-cost moat: every advisor at a Banner school already knows DegreeWorks. Migration is expensive.
- Scribed-rules audit engine is mature (decades of refinement).

### Weaknesses / common complaints
- **The UI is dated.** G2 and Capterra reviewers consistently flag this.[^44][^45]
- **"What-If" plans don't save.** Students have to re-run them every login.[^45]
- **Data staleness:** changes to majors, minors, registrations, grades, transfer credits take "at least 24-48 hours" to appear in DegreeWorks.[^46]
- **Scribing is a black art.** "When Degree Works audit blocks contain too many if/then conditions or vague descriptions, students and advisors struggle to interpret what's required."[^44] Courses regularly appear in the wrong block.
- Students cannot change a major or pursue a certificate from inside the tool — they have to go to the registrar.[^45]
- It is a **forms-and-tables product**, period. There is no AI, no chat, no career matching, no labor market data, no risk alerts.

### Where Velocity beats them
- Everything except SIS coupling. DegreeWorks is the *single most replaceable* product in this market because every user (advisor and student) is frustrated with it.
- This is Stellic's wedge too — and Velocity's path is to be "Stellic-modern audit + AI conversational layer + career pathway + risk alerts" in one.

### Where they beat Velocity
- **Banner integration depth.** Velocity will not be the system of record for degree requirements at Banner schools for years.
- Inertia. CIOs do not rip out DegreeWorks lightly.
- This is why Velocity's go-to-market is **coexistence, not replacement** — Velocity reads from DegreeWorks/Banner data, doesn't try to *be* DegreeWorks.

---

## 7. InScribe

**Site:** inscribeapp.com

### Core product & pitch
**Online community platform** for higher ed — students and mentors connect in branded forums (NinerLink at UNC Charlotte, similar at UMGC, Indiana State, Marshall).[^47] AI assistant "ROSI" auto-flags posts that need expert attention; the platform builds a searchable knowledge base from answered questions.

### Why it's in this brief
It is **not actually an advising product** — but it gets pitched in the same buyer meetings, so a Velocity sales motion will encounter it.

### Strengths
- Solves a real problem (community + peer support) that pure advising tools don't address.
- AI moderation is competent.
- Recent customer wins: UMGC (June 2024), Indiana State (announced 2025), Marshall (announced 2025).[^47]

### Weaknesses
- Not a degree planner, not a course recommender, not a risk-alert tool. Different category.
- Community products are notorious for cold-start problems at smaller schools.

### Velocity vs InScribe positioning
**Don't compete; coexist.** If a school is buying InScribe for community, Velocity is the academic and career advising layer. Pitch as complementary.

---

## 8. Othot (now Liaison)

**Site:** othot.com / liaisonedu.com — acquired by Liaison International in **April 2021.**[^48]

### Core product & pitch
**Predictive and prescriptive analytics** for the full student lifecycle — enrollment, yield, financial aid optimization, retention, persistence. Models are built per-institution from historical data. "Continuous intelligence in real-time."[^49][^50]

### Customer base
Through the combined Liaison entity, they touch **31,000+ programs across 1,500+ campuses** (this is the full Liaison footprint, not just Othot).[^51]

### Strengths
- Real ML expertise. Custom-built models per customer.
- Liaison distribution into admissions (CAS application platforms) is a strong cross-sell channel.
- Strong on **enrollment-side** decisions (yield, financial aid leveraging) — this is their original wedge.

### Weaknesses
- **Primarily an enrollment management product**, not a student-facing advisor. The student never sees Othot.
- Pricing is invisible — sold by Liaison's enterprise team.
- No conversational UX; this is a dashboard product for institutional researchers.

### Velocity vs Othot
**Different buyer, mostly different problem.** Othot sells to enrollment management VPs; Velocity sells to provosts and student affairs. There's overlap in retention analytics, but Othot is back-office analytics and Velocity is front-office advisor. Pitch as complementary unless the school has consolidated student success under one VP.

---

## 9. Recent AI-native entrants (2024–2026)

### Mainstay (formerly AdmitHub)
The **OG higher-ed AI chatbot** (Georgia State's "Pounce"). Behaviorally-intelligent SMS chatbot for student engagement. Supports 5M students across hundreds of institutions; raised **$24.4M total** including a $16M Series B led by Rethink Education in Feb 2021.[^52][^53][^54] **Acquired by Lemnis in March 2026.**[^55]

- **Strengths:** Proven outcomes at GSU (54% six-year grad rate, 23-point lift); SMS reach into students who don't open email; Pounce has fielded 200K+ questions in 3 months at GSU.[^23][^56]
- **Weaknesses:** Primarily an admissions / onboarding / summer-melt tool; light on academic planning and career matching. SMS-first UX is constraining.
- **Velocity vs Mainstay:** Mainstay nudges; Velocity advises. Mainstay tells you "remember to submit FAFSA"; Velocity tells you "given your CS coursework and the Salt Lake market, here are three career paths with a $68K–$95K starting range." Different product, different buyer center of gravity (Mainstay → enrollment; Velocity → academic/student success).

### Element451
"AI-first student engagement CRM." Launched **Bolt Agents** in April 2025 — a suite of seven autonomous AI agents (admissions, marketing, engagement, success).[^57][^58]

- **Customer base:** 60M+ student journeys powered; 25% market share vs. Slate's 55% in their CRM segment per Volt's 2026 comparison.[^59]
- **Pricing:** Starts ~$20K/year for small schools; $40K–$80K+ for mid-sized; February 2025 they introduced **usage-based pricing** for premium AI features (50 credits per fraudulent-app detection).[^60]
- **Strengths:** Genuinely AI-native, recent funding momentum, modern UX, fast deployment.
- **Weaknesses:** Center of gravity is **admissions/recruitment marketing**, not academic advising. Their "Academic Advisor Agent" is one of seven and not the lead product.[^58]
- **Velocity vs Element451:** Velocity is academic + career; Element451 is marketing + enrollment. They will encounter each other in larger RFPs but compete only at the edges.

### Advisor.AI (joinadvisorai.com)
**Most direct AI-native competitor** to Velocity in this brief. "4-stage framework — Explore, Prepare, Connect, Optimize" — career exploration, academic momentum, workforce readiness in one platform.[^61]

- **Pricing — and this is the most useful data point in the entire brief:** **$10–$15 per student annually, 3,000-license minimum, most institutions starting at $30K/year.**[^62] This is the only competitor with **transparent published pricing** in this category, and it is materially cheaper than EAB.
- **Strengths:** AI-native, transparent pricing, full enrollment-tier access, career-pathway focus aligned with Velocity's wedge.
- **Weaknesses:** Smaller / less proven than incumbents. Founder Arjun Arora; limited public traction signals (no major customer logos surfaced in research).[^61] Light public footprint vs. the marketing of incumbents.
- **Velocity vs Advisor.AI:** This is the company Velocity needs to differentiate against most clearly. Both are AI-native, career-pathway-focused, modern UX. Velocity's differentiation has to be:
  1. **Deeper labor market integration** (e.g., Lightcast API) tied to per-student recommendations.
  2. **Risk-alert engine** that surfaces off-track students before advisors notice.
  3. **30-day, no-cost, no-integration pilot** structure that beats their $30K floor.
  4. **Tighter Utah / regional workforce alignment** for the UVU launch.

### Other AI-native entrants worth tracking
- **Lightcast / Career Coach** — labor market data infrastructure (formerly Burning Glass + EMSI, merged 2021). Not a competitor; potentially a **data partner**. They power career-pathway recommendations across many of the above. Velocity should ship with a Lightcast integration if it doesn't already.[^63][^64]
- **OpenAI / "AI-native university" forum** — OpenAI hosted a 2025 forum positioning the AI-native university where every student gets a personal AI assistant; not a competitor but a tailwind that legitimizes Velocity's category.[^65]
- **Academic chatbot research** — ACM Southeast 2025 published "Academic Advising Chatbot Powered with AI Agent"; GPT-4 major-recommendation studies show advisors rate LLM recommendations 4.0/5 for helpfulness.[^66] These signal academic legitimacy for the category.

---

## Comparison table

| Competitor | Category | Pricing (best public estimate) | AI-native? | Student-facing chat? | Career + labor market matching? | Risk alerts? | Pilot deploy time | Customer count |
|---|---|---|---|---|---|---|---|---|
| **Velocity** | AI academic advisor | $100K platform + $25/student | Yes | Yes | Yes | Yes | **30 days** | 0 (pilot stage) |
| Stellic | Modern degree planning | ~$50K–$300K/yr | No (no chat) | No | No | No | 3–6 months | 1M+ students[^1] |
| EAB Navigate360 | Student success CRM | ~$150K–$1M+/yr | Retrofit (NavAI 2024-25) | Partial (knowledge bot) | Limited (Academic Planning) | Yes | ~9 months[^28] | 850+ institutions[^18] |
| Civitas Learning | Predictive analytics | ~$100K–$500K+/yr | No (pre-LLM ML) | No | No | Yes | 12+ months[^30] | 400+ institutions[^30] |
| Watermark SS&E (Aviso) | Retention analytics | ~$50K–$200K/yr | No | No | No | Yes | 6+ months | Subset of 1,700+ Watermark customers[^32] |
| Degree Compass (D2L) | Course recommender | Bundled w/ Brightspace | No | No | No | No | Dormant | Effectively legacy[^39] |
| Ellucian DegreeWorks | Degree audit (Banner) | Bundled w/ Banner | No | No | No | No | Years (Banner-tied) | Banner install base |
| InScribe | Student community | Custom | Partial (AI moderation) | Forum-based, not 1:1 advisor | No | No | 1–3 months | Marshall, UMGC, Indiana State[^47] |
| Othot (Liaison) | Enrollment/retention analytics | Custom | No (predictive ML) | No | No | Yes | 6+ months | 1,500+ campuses (via Liaison)[^51] |
| Mainstay | SMS engagement chatbot | Custom (acquired by Lemnis 2026) | Partial (rules-based + LLM) | Yes (SMS) | No | Limited | 1–2 months | 5M students[^52][^55] |
| Element451 | AI-first CRM | $20K–$80K+/yr[^60] | Yes (Bolt Agents 2025) | Yes | Limited | Limited | 1–3 months | 60M student journeys[^57] |
| Advisor.AI | AI academic + career | **$10–$15/student/yr, min $30K**[^62] | Yes | Yes | Yes | Yes | 1–3 months | Limited public traction[^61] |

---

## Velocity's defensible wedge

Looking across the field, **three structural advantages compound for Velocity** that incumbents cannot copy in under 18–24 months. The pitch should hammer all three.

### Wedge 1: AI-native conversational UX *as the product*, not a bolt-on

EAB shipped NavAI in 2024–25 as **seven discrete agents** sitting next to their existing CRM workflows.[^26] Civitas's models predate the LLM era. DegreeWorks has no AI. Stellic doesn't have a chat interface at all. Element451's Bolt Agents are real, but their center of gravity is admissions/marketing, not academic advising. **Only Velocity and Advisor.AI are chat-first academic advisors** — and incumbents cannot become chat-first without rewriting their data models and their UX. Every retrofit pattern in the market shows the same shape: a sidebar agent that drafts an email or summarizes a meeting. That is not the same product as an advisor.

This is structurally hard to copy because the underlying data model for a CRM (cases, campaigns, opportunities) is not the right shape for a conversational advisor (turns, context, student state, plan state, labor-market state). Rebuilding that is a multi-year R&D investment that incumbents will not prioritize while their existing customers are renewing at 95%.

### Wedge 2: Per-student career pathway matching tied to live labor market data

This is the single largest gap in the incumbent stack. EAB, Stellic, DegreeWorks, Civitas, Watermark — **none of them currently surface to the student** "based on your coursework and strengths, here are three career paths in your regional labor market with median salaries, projected growth, and the courses you'd need to add." Career services lives in a separate building, on separate software (Handshake, etc.). Academic advising lives in DegreeWorks / Navigate. **Velocity's wedge is to fuse them, per student, in chat.**

Lightcast (the merged Burning Glass + EMSI entity that owns the data infrastructure for this) is a partner, not a competitor.[^63][^64] Velocity should ship with deep Lightcast integration for the UVU pilot — that gives Velocity an **immediate moat against Advisor.AI**, which talks about "workforce readiness" but doesn't publicly disclose its labor market data source.

This wedge maps directly to legislative pressure (Utah HB 265, similar workforce-alignment bills in other states) and to the WSJ / NYT narrative that "college is no longer worth it if the major-to-job map is broken." It is the single highest-conviction pitch line in the entire competitive set.

### Wedge 3: 30-day pilot, no Banner integration required

Every competitor in this brief — every single one — has a multi-month implementation that includes SIS integration as a precondition for the product working at all. EAB takes ~9 months.[^28] Civitas takes a year.[^30] Stellic is faster but still measured in months. Banner integration is the universally-acknowledged worst part of the higher-ed software buying experience.

**Velocity's pilot motion is the structural opposite:** CSV ingest, no Banner write-back, no IT ticket, run on simulated data if needed. The pilot proposal already commits to running on Day 1 regardless of whether UVU's data export ever arrives. That is a **completely different sales motion** than the incumbents have, and it lets Velocity get to "student logged in and used the product" in days, not quarters. CFOs love the no-cost pilot. CIOs love the no-integration pilot. Provosts love the 30-day decision window.

This is hard for incumbents to copy because their procurement processes, contract structures, and customer success teams are all built around big-bang annual contracts with implementation services baked in. EAB's Strategic Leader model — a dedicated CSM per account — is incompatible with $0 pilots; the unit economics don't work. **Velocity can run 30-day free pilots until incumbents change their business model.**

### Bonus wedge (worth tracking): regional / state alignment

The UVU pilot already ties Velocity to **Utah HB 265** workforce-alignment language. If Velocity ships with Utah-specific labor market data (Wasatch Front, Silicon Slopes employers, in-state wage projections) and demonstrates impact at UVU, the playbook ports to **every other state with similar workforce-alignment legislation** — Florida, Texas, Tennessee, North Carolina, Indiana. Incumbents sell national; Velocity can sell hyperlocal and then nationalize. This is a go-to-market wedge more than a product wedge, but it is real.

---

## Positioning statement (for cold pitch meetings)

> Velocity is the AI academic advisor that incumbents structurally can't be. EAB Navigate, DegreeWorks, and Civitas are 2010s student-success platforms with AI features bolted on — built for institutional CRM, not for the student in the chat window. We're chat-first, we ship in 30 days with no Banner integration, and we're the only platform that ties every student's degree path to live regional labor market data — so an advisor can say "here are three careers, here's what they pay in Salt Lake, here's the two-class change to your plan that gets you there." We're already piloting with Utah Valley University against their 2030 completion goal, and the same playbook ports to every state with workforce-alignment legislation. Where the incumbents take a year to deploy and need a six-figure implementation, we'll be live in your College of Engineering in thirty days — at zero cost — and you'll know on Day 30 whether we earned the contract.

---

## Sources

[^1]: [Stellic — Degree Management Reimagined](https://www.stellic.com/)
[^2]: [Stellic Inc. Asset Profile | Preqin](https://www.preqin.com/data/profile/asset/stellic-inc-/347063)
[^3]: [Stellic Progress | Degree Planner, Registration, and Degree Audit](https://www.stellic.com/products/pathway-planner)
[^4]: [Stellic Student Services Contract | E&I Cooperative](https://www.eandi.org/contracts/stellic/)
[^5]: [Carnegie Mellon University — Stellic](https://www.cmu.edu/es/stellic/index.html)
[^6]: [University of Wisconsin–Stout — Stellic](https://www.uwstout.edu/academics/academic-services/advisement-center/stellic-degree-planning-class-registration-tool)
[^7]: [Santa Monica College — Stellic](https://www.smc.edu/admission-aid/enrollment/stellic/)
[^8]: [Case Western Reserve — Degree Planning](https://case.edu/registrar/registration-classes/degree-planning)
[^9]: [University of Nebraska Omaha — Stellic](https://www.unomaha.edu/enterprise-systems/stellic/index.php)
[^10]: [Tufts University — Stellic customer story](https://www.stellic.com/customer-story/tufts-university)
[^11]: [TCU — Stellic case study](https://www.stellic.com/success-stories/tcu)
[^12]: [Ball State University — Stellic](https://www.bsu.edu/academics/advising/academic-basics/academic-progress/stellic)
[^13]: [Saint Martin's University — Stellic](https://www.stmartin.edu/directory/offices-departments-directory/center-student-success/advising-center/stellic)
[^14]: [Stellic Funding Rounds — Tracxn](https://tracxn.com/d/companies/stellic/__UfaqM9cL8kT_XVtA3QY-cbFCnthsQeEo1eYzLhoG0iY/funding-and-investors); [Stellic Series A — Crunchbase](https://www.crunchbase.com/funding_round/stellic-series-a--c60b8d42); [Letter From the CEO: Series A](https://www.stellic.com/post/letter-from-the-ceo-series-a-funding-announcement)
[^15]: [Less-than-stellar reviews for Stellic — Quinnipiac Chronicle](https://quchronicle.com/84261/news/less-than-stellar-reviews-for-stellic/); [Institution Success Stories — Stellic](https://www.stellic.com/customers/success-stories)
[^16]: [Vista Equity Partners and BC Partners Acquire EAB — Mergr](https://mergr.com/transaction/vista-equity-partners-acquires-eab-global)
[^17]: [EAB to Become a Standalone Company — PR Newswire](https://www.prnewswire.com/news-releases/eab-to-become-a-standalone-company-300510669.html)
[^18]: [Navigate360 — EAB](https://eab.com/solutions/navigate360/)
[^19]: [Navigate360 Enrollment CRM — EAB](https://eab.com/solutions/navigate360/enrollment-crm/)
[^20]: [Navigate360 Pricing — G2](https://www.g2.com/products/eab-navigate360/pricing)
[^21]: [Navigate360 Resource Center — University of Wisconsin](https://www.wisconsin.edu/ss-eab-project/)
[^22]: [EAB — Crunchbase / Influence Watch / Tracxn](https://www.crunchbase.com/organization/eab-education-business)
[^23]: [How a chatbot boosted graduation rates at Georgia State — Axios](https://www.axios.com/2019/09/21/chatbot-colleges-academic-performance); [Mainstay GSU case study](https://mainstay.com/case-study/how-georgia-state-university-supports-every-student-with-personalized-text-messaging/)
[^24]: [Navigate360 Reviews — G2](https://www.g2.com/products/eab-navigate360/reviews)
[^25]: [Navigate — Virginia Tech Office of the University Registrar](https://www.registrar.vt.edu/campus.html)
[^26]: [Navigate360 AI — EAB](https://eab.com/navigate360-ai/); [Inside Navigate360's New AI Features PDF](https://pages.eab.com/rs/732-GKV-655/images/AI%20for%20Navigate360.pdf)
[^27]: [Feature Focus: Activating Navigate360 AI — EAB](https://eab.com/events/2025-feature-focus-activating-navigate360-ai/)
[^28]: [EAB Navigate — Grand Valley State University](https://www.gvsu.edu/navigate)
[^29]: [Civitas Learning Student Impact Platform](https://www.civitaslearning.com/platform/)
[^30]: [Civitas Learning — Capterra](https://www.capterra.com/p/180705/Student-Success-Intelligence-Platform/); [Civitas Learning — SoftwareSuggest](https://www.softwaresuggest.com/civitas-learning); [Civitas Learning — TrustRadius](https://www.trustradius.com/products/civitas-learning/reviews)
[^31]: [Civitas Learning Reviews — Glassdoor](https://www.glassdoor.com/Reviews/Civitas-Learning-Reviews-E673492.htm); ["Troubling leadership, toxic culture" — Glassdoor employee review](https://www.glassdoor.com/Reviews/Employee-Review-Civitas-Learning-RVW18170194.htm)
[^32]: [Aviso Retention Joins Watermark — Watermark blog](https://www.watermarkinsights.com/resources/blog/press/aviso-retention-joins-watermark/); [Watermark acquires Aviso Retention — Tambellini Group](https://www.thetambellinigroup.com/watermark-acquires-aviso-retention/)
[^33]: [FAQs — Renaming Aviso to Watermark SS&E](https://support.watermarkinsights.com/hc/en-us/articles/11305922742043-FAQs-Renaming-Aviso-to-Watermark-Student-Success-Engagement)
[^34]: [Watermark Insights Hub launch — Campus Technology](https://campustechnology.com/articles/2022/07/06/watermark-launches-insights-hub-product-updates-geared-toward-student-success.aspx)
[^35]: [Watermark Student Success & Engagement Reviews — G2](https://www.g2.com/products/watermark-watermark-student-success-engagement/reviews)
[^36]: [Austin Peay State University: Degree Compass — EDUCAUSE Review](https://er.educause.edu/articles/2012/9/austin-peay-state-university-degree-compass)
[^37]: [Degree Compass: A Course Recommendation System — EDUCAUSE Review](https://er.educause.edu/articles/2013/9/degree-compass-a-course-recommendation-system)
[^38]: [Desire2Learn Acquires Course Recommendation Tech from Austin Peay State — Campus Technology](https://campustechnology.com/articles/2013/01/24/desire2learn-acquires-course-recommendation-tech-from-austin-peay-state.aspx)
[^39]: ["Are You Still There? How a 'Netflix' Model For Advising Lost Its Luster" — EdSurge](https://www.edsurge.com/news/2018-03-15-are-you-still-there-how-a-netflix-model-for-advising-lost-its-luster)
[^40]: [D2L Acquires H5P Group — Newswire](https://www.newswire.ca/news-releases/d2l-acquires-global-saas-learning-solution-h5p-group-837005041.html)
[^41]: [Degree Compass: The Preferred Choice Approach — ERIC](https://files.eric.ed.gov/fulltext/EJ1140985.pdf)
[^42]: [Ellucian DegreeWorks — Coursedog integration](https://www.coursedog.com/integrations/ellucian-degreeworks)
[^43]: [Ellucian Banner Pricing 2026 — PricingNow](https://pricingnow.com/question/ellucian-banner-pricing/)
[^44]: [5 Common Issues with Ellucian Degree Works Audits — David Kent Consulting](https://davidkentconsulting.com/blog/common-issues-with-degree-works-audits-explained/)
[^45]: [Ellucian Degree Audit & Planning Reviews — G2](https://www.g2.com/products/ellucian-degree-audit-planning/reviews)
[^46]: [DegreeWorks FAQ — Binghamton University](https://www.binghamton.edu/registrar/student/degreeworks/faq.html); [DegreeWorks FAQ — Drexel](https://drexel.edu/ais/applications/admin/degreeworks/degreeworks-faqs)
[^47]: [InScribe](https://www.inscribeapp.com/); [NinerLink by InScribe — UNC Charlotte](https://teaching.charlotte.edu/ninerlink-by-inscribe-online-student-support-community/); [Marshall + InScribe partnership — PR Newswire](https://www.prnewswire.com/news-releases/marshall-university-partners-with-inscribe-to-build-stronger-connections-for-online-learners-302637858.html); [UMGC + InScribe](https://www.umgc.edu/news/archives/2024/06/inscribe-and-umgc-successfully-partner-to-enhance-student-connec); [Indiana State + InScribe — Yahoo Finance](https://finance.yahoo.com/news/indiana-state-university-partners-inscribe-141500713.html)
[^48]: [Liaison International Acquisition of Othot — BusinessWire](https://www.businesswire.com/news/home/20210422005162/en/Liaison-International-Acquisition-of-Othot-Raises-the-Bar-for-Data-driven-Strategic-Enrollment-Management-and-Retention)
[^49]: [Othot Predictive Platform for Retention — BusinessWire](https://www.businesswire.com/news/home/20210511005152/en/Advanced-Analytics-Company-Othot-Releases-Predictive-Platform-to-Retain-At-Risk-College-Students)
[^50]: [Othot Predictive Analytics — Liaison](https://www.liaisonedu.com/higher-education-ai/othot/)
[^51]: [Real-Time Analytics — Liaison/Othot](https://www.liaisonedu.com/higher-education-ai/othot/enrollment-management/)
[^52]: [Mainstay — Crunchbase](https://www.crunchbase.com/organization/admithub)
[^53]: [Higher Ed AI Pioneer Raises $16M — PR Newswire](https://www.prnewswire.com/news-releases/higher-ed-ai-pioneer-raises-16-million-to-realize-the-potential-of-chatbots-for-student-success-301227795.html)
[^54]: [Mainstay — PitchBook](https://pitchbook.com/profiles/company/99391-15)
[^55]: [Mainstay — Tracxn (Lemnis acquisition Mar 2026)](https://tracxn.com/d/companies/mainstay/__k2Kt-6yE2Tg6AtnWc26aHClvv8S2X29NxJwtcY9PwZg)
[^56]: [Mainstay platform](https://mainstay.com/)
[^57]: [Element451 — main site](https://element451.com/); [Element451 AI CRM](https://element451.com/ai-student-engagement-crm)
[^58]: [Higher Ed's AI Workforce Has Arrived: Element451 Introduces Bolt Agents — PR Newswire](https://www.prnewswire.com/news-releases/higher-eds-ai-workforce-has-arrived-element451-introduces-bolt-agents-302421540.html); [Element451 Bolt Agents blog](https://element451.com/blog/ai-workforce-platform-higher-ed)
[^59]: [Top 5 Element451 alternatives — Gravyty](https://gravyty.com/blog/element451-alternatives-for-higher-education/); [Element451 Reviews — SaasCRMReview](https://saascrmreview.com/element451-review/)
[^60]: [Element451 Pricing & Packages](https://element451.com/pricing); [What Are You Really Buying When You Invest in AI for Higher Education — Element451](https://element451.com/blog/investing-in-ai-for-higher-education-2025)
[^61]: [Advisor.AI](https://joinadvisorai.com/); [Advisor.AI — Academic Advising](https://joinadvisorai.com/academic-advising); [Advisor.AI — Core Capabilities](https://joinadvisorai.com/-core-platform-features)
[^62]: [Advisor.AI — Pricing Options](https://joinadvisorai.com/pricing-options)
[^63]: [Lightcast — formerly Emsi + Burning Glass](https://lightcast.io/why-lightcast/history); [Burning Glass is now Lightcast](https://lightcast.io/burning-glass-technologies)
[^64]: [Emsi API for higher education](https://lightcast.io/resources/blog/everything-you-need-to-know-about-emsi-apis-and-3-higher-education-use-cases); [Career Coach — Lightcast](https://lightcast.io/open-titles/titles/ET4F713BAF12E5D3BF/career-coaches)
[^65]: [The rise of AI-native universities — eCampus News](https://www.ecampusnews.com/ai-in-education/2025/12/29/the-rise-of-ai-native-universities/)
[^66]: [AI-Augmented Advising — Journal of Learning Analytics](https://learning-analytics.info/index.php/JLA/article/view/8593); [Academic Advising Chatbot Powered with AI Agent — ACM Southeast 2025](https://dl.acm.org/doi/10.1145/3696673.3723065)
