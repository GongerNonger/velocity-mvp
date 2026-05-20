# Velocity x UVU — Market & Buyer Research Brief

*Prepared for founder review prior to UVU outbound. Date: 2026-05-20.*

This brief synthesizes public sources on UVU's institutional posture, current advising tech stack, ed-tech buying behavior, FERPA/Utah privacy constraints, competitor pricing, and deal-kill risks. Headline finding up front: **UVU is not a greenfield account. Civitas Learning is already deployed and the CIO is shipping in-house AI (Ask Wilson). Our wedge has to be advising-specific, FERPA-defensible, and pilot-shaped — not a platform sale.**

---

## 1. UVU Institutional Profile

### Scale (matters a lot for our $25/student math)
- **Fall 2025 enrollment: 48,670 students** — a record, up 3.98% YoY. Largest university by enrollment in Utah. ([UVU News, Fall 2025 Enrollment](https://www.uvu.edu/news/2025/fall-2025-enrollment.html))
- Fall 2024 was 46,809; 41% are first-generation college students. ([UVU News, Oct 2024](https://www.uvu.edu/news/2024/10/uvu-enrollment-for-fall-2024.html))
- UVU internal projection: ~51,650 by 2026. ([UVU 10-Year Projection PDF](https://www.uvu.edu/birs/docs/info_about_uvu/enrollment/uvu_projections_2016-2025_updated.pdf))
- **Implication for our pitch deck:** the "~41,000 students → $1.1M" number is stale. The correct envelope today is closer to **48,670 × $25 = $1.217M + $100K platform = ~$1.32M ACV**. Update before outbound.

### Academic colleges (where pilots could land)
Seven academic units. ([UVU Colleges & Schools](https://www.uvu.edu/collegesandschools/))
- Woodbury School of Business
- Smith College of Engineering & Technology
- College of Health & Public Service
- College of Humanities & Social Sciences
- College of Science
- School of Education
- School of the Arts

300+ degree programs from certificates to master's — meaning the degree-audit complexity is real, and that's the surface area where AI advising creates value.

### Leadership (decision-makers for our deal)
- **Acting President: Wayne Vaught** — moved up from Provost on May 1, 2026, after President Astrid Tuminez stepped down. ([Deseret News, Mar 2026](https://www.deseret.com/utah/2026/03/03/uvu-acting-president-wayne-vaught/); [USHE announcement](https://ushe.edu/board-appoints-wayne-vaught-2026/))
- **Provost / SVP Academic Affairs: TBD** — Vaught held this role 2019-Apr 2026; no confirmed successor in public reporting as of this brief. Verify via UVU directory before outbound.
- **VP Digital Transformation & CIO: Christina Baum** (since June 2022). Reports directly to the President — one of few CIOs in Utah higher ed at cabinet level. Champion of in-house AI (Ask Wilson). ([UVU News, May 2022](https://www.uvu.edu/news/2022/05/2022_05_17_christina_baum.html); [EdTech Magazine Q&A, Feb 2026](https://edtechmagazine.com/higher/article/2026/02/qa-how-utah-valley-university-using-ai-help-students-succeed))
- **VP Student Affairs: Dr. Michelle L. Kearns** — oversees Enrollment Management. ([UVU Student Affairs org chart PDF](https://www.uvu.edu/studentaffairs/docs/orgchart.pdf))
- **AVP Enrollment Management: Andrew J. Stone** — reports to Kearns. ([UVU Student Affairs Leadership](https://www.uvu.edu/studentaffairs/leadership/index.html))

### Strategic priorities (what we map our pitch to)
UVU runs on a three-pillar strategic plan: **Include, Engage, Achieve** under "Vision 2030." ([Vision 2030](https://www.uvu.edu/vision2030/))
- **Achieve pillar: 50% graduation rate by 2030.** Current is 46% completion (up from 24% five years ago); one-year retention rose from 65% → 70%. ([UVU Completion Plan 3.0 PDF](https://www.uvu.edu/studentaffairs/docs/completionplan3.0.pdf); [UVU Reaches 2025 Grad Goal Early](https://www.uvu.edu/news/2024/02/2024_02_14_graduation.html))
- 41% first-gen population means advising load is heavier per student than the national norm — pain we can quantify.
- "Most accessible, affordable, relevant" is the rhetorical brand. Any pitch that smells expensive or exclusive will be rejected.

---

## 2. Current Advising Tools at UVU (the install base we're displacing or augmenting)

UVU has a mature, multi-vendor stack. **Do not pitch as if they have nothing.**

| Layer | System | Notes |
|---|---|---|
| SIS | Ellucian **Banner** | Source of record for admits/students/registration/financial aid. ([UVU Banner page](https://www.uvu.edu/itservices/business-applications-reporting/banner.html)) |
| LMS | **Canvas** (via UEN consortium) | ([UEN Software](https://www.uen.org/software/)) |
| Degree audit / planning | **Wolverine Track** | UVU-branded Ellucian DegreeWorks deployment. Handles audits, what-if, look-ahead. ([Wolverine Track](https://www.uvu.edu/wolverinetrack/)) |
| Predictive analytics / retention | **Civitas Learning** — actively deployed | UVU is a Civitas customer; embedded in workflows for early outreach, hold removal, stop-out re-engagement, faculty alerts. Public case study with named results: +3pp retention, 100+ holds eliminated, 600+ re-enrolled. ([UVU Civitas page](https://www.uvu.edu/biservices/civitas.html); [Civitas case study](https://www.civitaslearning.com/customer-success-stories/from-connection-to-completion-how-uvus-human-centered-approach-boosts-retention-at-scale/)) |
| AI assistant | **Ask Wilson** — UVU-built, in-house | Trained on course content; 44 courses, 2,000 students as of early 2026. CIO Baum wants to expand to a universitywide student digital assistant. ([Ask Wilson](https://www.uvu.edu/digitaltransformation/project_planning/projects/askwilson.html); [EdTech Magazine](https://edtechmagazine.com/higher/article/2026/02/qa-how-utah-valley-university-using-ai-help-students-succeed)) |
| Portal | MyUVU | Banner Self-Service shell. |

### Incumbent footprint across USHE (Utah System of Higher Education)
- **University of Utah** went live on EAB Navigate Aug 1, 2023, system-wide. ([@theU article](https://attheu.utah.edu/facultystaff/new-platform-aims-to-centralize-data-improve-student-success/); [Navigate U Timeline](https://navigate.utah.edu/timeline.php))
- Ellucian **DegreeWorks** is the dominant degree-audit system across USHE (USU uses it too). ([USU DegreeWorks](https://www.usu.edu/registrar/degreeworks/))
- **EAB Navigate and Civitas** are the two incumbents we are most likely to be benchmarked against in any RFP.

**Strategic read:** UVU has already paid for the "predictive retention" thesis (Civitas) and is building the "AI chatbot" thesis themselves (Ask Wilson). The unoccupied wedge is **AI-native, conversational degree planning and proactive nudge layer that sits on top of Banner + Wolverine Track + Civitas data**, not yet another retention dashboard. Position as augment, not replacement.

---

## 3. Ed-Tech Procurement at UVU — How a $1M+ Deal Actually Gets Done

### The formal path
- UVU procurement is governed by UVU Policy 241/242/243 and Utah Procurement Code (Title 63G-6a). ([UVU Procurement](https://www.uvu.edu/procurement/); [Utah Procurement Code summary](https://auditor.utah.gov/local-government/explanations-checklists-and-templates/utah-procurement-code/))
- **Anything ≥ $50,000 must be publicly posted and formally bid** (IFB or RFP). $10K–$50K requires 3 quotes via RFQ. ([U of U bid limits — same statutory regime](https://fbs.admin.utah.edu/purchasing/bid/limits/))
- Sole-source procurement is *allowed* under USHE policy but explicitly *not preferred*. Burden of justification is high.
- E&I Cooperative Services holds a national pre-negotiated Stellic contract that many institutions use to bypass full RFP — a structural advantage Stellic has and we don't. ([E&I Stellic contract](https://www.eandi.org/contracts/stellic/))

### Real sales cycle for $1M+ higher-ed SaaS
- **9–18 months is the industry-standard range** for six-figure-plus enterprise SaaS; higher-ed is at the long end because of academic calendars, board approval windows, and shared governance. ([Aexus B2B sales cycle](https://aexus.com/how-long-is-the-average-b2b-software-sales-cycle/); [Rework enterprise sales](https://resources.rework.com/libraries/saas-growth/enterprise-sales-motion))
- For UVU specifically, expect: discovery (1–2 mo) → security/FERPA review (2–3 mo) → pilot scoping (1–2 mo) → pilot (1 semester = 4 mo) → results review (1 mo) → procurement/RFP if expanding (3–6 mo) → contract & legal (1–2 mo). **Realistic floor: 12 months. Realistic median: 15–18.**

### Signatures required (best-guess routing for ~$1.3M ACV)
1. **Sponsor / champion:** Andrew Stone (AVP Enrollment Mgmt) OR a Dean willing to host a pilot (Woodbury Business or Health & Public Service are most likely — both have completion pain).
2. **Technical owner:** Christina Baum (CIO) — she will own security review and integration sign-off. She is the single most important name in this deal.
3. **Academic owner:** Provost (TBD) and/or VP Student Affairs Michelle Kearns.
4. **Final approver:** Acting President Wayne Vaught; for a contract this size, likely also requires UVU Board of Trustees notification and possibly USHE awareness.
5. **Procurement gatekeeper:** UVU Procurement & Contract Services (Director-level).

### Short-circuit playbook
- **Start with a free or sub-$50K pilot** (1 college, 1 semester) — stays below the formal-bid threshold. Use it to generate UVU-specific outcome data.
- **Anchor to an existing strategic initiative** (Completion Plan 3.0 or Vision 2030 Achieve) so the budget conversation rides an existing line item, not a new one.
- **Use Civitas integration as a *partnership* angle**, not a replacement claim — avoids triggering an immediate RFP against the incumbent.
- **Get Baum on the call early.** She's pro-AI, has direct presidential reporting, and has already shipped an AI student tool — she's the most likely internal advocate if positioned correctly (or the fastest "no" if positioned as a competitor to Ask Wilson).

---

## 4. FERPA + Utah Privacy Constraints

UVU is a federally funded, state-governed institution. Our compliance burden has three layers.

### Federal: FERPA (20 U.S.C. § 1232g)
- All education records containing PII are protected. We can only access them as a **"school official" with a legitimate educational interest** under a written contract that bars re-disclosure and requires deletion on termination. ([U.S. DoE Student Privacy](https://studentprivacy.ed.gov/ferpa); [U of U Registrar FERPA](https://registrar.utah.edu/handbook/ferpa.php))
- The institution — not the vendor — remains legally accountable. UVU will push every liability clause back onto us.
- Minimum contract terms UVU will demand: data-use limitations, breach notification SLA (typically 48–72 hrs), audit rights, sub-processor disclosure, data residency, deletion certification.

### Utah-specific
- **Utah Code Title 53E Chapter 9 (Student Data Protection)** is the primary state statute. It is K-12-anchored, but recent legislation (**SB 152, 2026 session**) has been expanding K-12/higher-ed data-sharing provisions, so the regulatory surface is moving. ([Utah Code 53E-9](https://le.utah.gov/xcode/Title53E/Chapter9/53E-9.html); [SB 152 enrolled text](https://le.utah.gov/Session/2026/bills/enrolled/SB0152.pdf))
- UVU's own procurement terms (Policy 241 + standard contract addendum) impose FERPA, data-handling, and indemnification clauses. ([UVU PO Contract Terms PDF](https://www.uvu.edu/procurement/docs/terms/uvu_po_contract_terms.pdf))

### What we need *before* outbound to make a credible response to their security review
1. SOC 2 Type II report (or active path to one with attested date).
2. **FERPA-specific data-processing addendum** drafted and ready.
3. Documented sub-processor list (OpenAI/Anthropic/AWS — whichever LLM and infra).
4. **AI-specific data-handling answer:** explicit non-training contract clause for any LLM provider we use; UVU's CIO is sophisticated on this and will ask.
5. Encryption at rest + in transit, MFA, audit logs, role-based access controls — table stakes, must be documented.
6. Data residency commitment (US-only) and deletion-on-termination process.

**If we can't credibly answer #1 and #4 today, we cannot close a $1M+ deal. We can still run a free pilot under a limited DPA — but the full deal requires this paperwork.**

---

## 5. Higher-Ed SaaS Pricing Benchmarks (what competitors actually charge)

Per-student pricing is mostly unpublished and varies wildly by enrollment, modules, and bundling. Best public estimates below — treat as ranges, not gospel.

### EAB Navigate / Navigate360
- Enterprise license; **no per-user fee**. Priced as an institutional flat fee scaling with enrollment. ([EAB Navigate](https://eab.com/products/navigate/))
- **Known data point: Austin Peay State (~9,800 students) — $278K/year.** That's roughly **$28/student/year**. ([Austin Peay contract reference](https://govstech.apsu.edu/TDClient/2071/Portal/Projects/Details/?TID=428775))
- Extrapolating naively to UVU (48,670 students): **$700K–$1.2M annual range**, but EAB typically discounts heavily at higher tiers — realistic UVU-equivalent quote probably **$500K–$900K/yr**.

### Civitas Learning
- Custom pricing; not published. ([Civitas pricing on SoftwareSuggest](https://www.softwaresuggest.com/civitas-learning))
- Industry chatter (Capterra reviews, Harvard D3 case): **6-figure annual licenses + significant upfront implementation fees.** ([Harvard D3 Civitas analysis](https://d3.harvard.edu/platform-digit/submission/civitas-learning-using-data-to-improve-student-success/))
- Estimated UVU spend (currently deployed): **$200K–$500K/yr** based on typical mid-size-public deals.

### Stellic
- Custom; available via E&I Cooperative master contract ([E&I](https://www.eandi.org/contracts/stellic/)).
- Adopted at CMU, NYU, Cornell, Columbia, UNK, Santa Monica College. NYU rolling out in fall 2026; Cornell implementation runs through 2028.
- Public pricing not disclosed; industry benchmark for AI-native degree planning **estimated at $8–$15/student/year for the core module**, more with full suite. **For UVU that would be ~$390K–$730K/yr** — directly competitive with our $25/student.

### Watermark Student Success & Engagement (formerly Aviso Retention)
- Serves 1,700+ institutions; pricing not public. ([Watermark](https://www.watermarkinsights.com/solutions/student-success/))
- G2/Capterra reviews suggest mid-market positioning; estimated **$4–$10/student/year** for community-college tier; higher for 4-year universities.

### Pricing implications for Velocity
- Our **$25/student + $100K platform** ($1.32M at 48,670 students) lands at the **top of the competitive band**. Justifiable only if we can show ROI math that beats Civitas (which UVU already has) and the AI features that Ask Wilson doesn't have.
- **Land-and-expand: lead with $0–$50K single-college pilot, then scale into multi-year enterprise.** Don't open with $1.3M.
- Consider a "completion outcome guarantee" — pricing partially tied to retention lift. Higher-ed buyers respond well to performance-linked pricing in 2026 and EAB's ROI claims have set the bar.

---

## 6. Top 3 Risks That Kill This Deal

### Risk 1: "We already have Civitas + we're building Ask Wilson — why do we need you?"
This is the single most likely first objection. UVU has *publicly committed* (via case studies and EdTech Magazine coverage) to both Civitas and Ask Wilson as their student-success and AI infrastructure. We look duplicative.

**Mitigation:**
- Don't position as a Civitas competitor. Position as the **conversational, student-facing advising layer** that consumes Civitas signals and surfaces them to students at the right moment.
- Quantify what Ask Wilson *doesn't* do today: it's per-course, trained on course content — not a degree planner, not a longitudinal advisor, not connected to Banner registration. That's our wedge.
- Bring a UVU-specific demo that shows our system layered on top of Wolverine Track + Civitas data, not in place of them.

### Risk 2: FERPA / AI data-handling review torpedoes us in security review
CIO Christina Baum is sophisticated on AI risk (she controlled Ask Wilson's data pipeline carefully — that's why it's in-house). Any answer like "we send Banner data to OpenAI" without an enterprise non-training contract will be a hard stop.

**Mitigation:**
- Have the SOC 2 (or attested path), DPA template, LLM non-training clause, and US data residency documented **before the first technical call**.
- Be ready to offer on-prem or VPC deployment if Baum requests it. If we can't, say so up front rather than discovering it 4 months in.
- Pre-emptively cite our compliance posture in the very first email — it neutralizes the biggest objection before discovery.

### Risk 3: Budget — there is no $1.3M line item for "AI advising" and won't be next fiscal cycle
UVU is a public university with state-appropriation-bounded budgets, a new acting president, and a brand identity of "most affordable." A net-new $1.3M ask in FY27 lands badly.

**Mitigation:**
- Anchor cost to Completion Plan 3.0 / Vision 2030 *Achieve* outcomes — frame as a redirect from existing retention spend (some Civitas budget, advisor hiring budget, summer-bridge spend), not a new line.
- Open with a **free or sub-$50K pilot** that stays below the formal-bid threshold and produces UVU-specific data for the FY28 budget cycle (decision in late FY27 → contract for academic year 2027–28).
- Build the business case in their math: at a 70% retention rate and ~$6K/year average tuition+fees, every +1pp of retention on a 12,000-student first-year cohort = ~$720K/year in retained tuition. Our $1.3M needs to credibly deliver +2pp to be a no-brainer ROI conversation. **Lead with this number.**

---

## What This Means for Our Outreach

1. **Lead with Christina Baum, CIO** — not with the President or Provost. She is the only cabinet-level decision-maker who is (a) shipping AI today, (b) reports to the president, and (c) can green-light a pilot without an RFP. First email should reference Ask Wilson by name, congratulate the scale-up, and pitch Velocity as the advising-layer extension she can't easily build in-house.

2. **Update the $25/student × 41K math to 48,670 students before sending anything.** Internal consistency matters; if our deck quotes the wrong enrollment, we look uninformed.

3. **Re-position the pitch from "AI advisor platform" to "AI advising layer for Banner + Wolverine Track + Civitas."** Augment, don't replace. This neutralizes the Civitas conflict, neutralizes the Ask Wilson conflict, and lets us be the AI conversation layer above their data infrastructure.

4. **Offer a free single-college pilot for Fall 2026 — Woodbury Business or Health & Public Service.** Stay below the $50K formal-bid threshold. Ship in a semester. Use real UVU outcomes (retention, advisor time saved, registration completion) to drive the FY28 enterprise conversation. Without a pilot, our sales cycle is 15–18 months. With a pilot, our enterprise close is the back half of 2027.

5. **Be FERPA-ready in the first email.** Mention SOC 2, the LLM non-training clause, US data residency, and our willingness to sign UVU's standard DPA *in the opening message*. Most ed-tech outbound buries this. Leading with it is a signal to Baum that we are serious and will not waste her security team's time — which is the difference between a 30-minute exploratory call and being routed to procurement triage.
