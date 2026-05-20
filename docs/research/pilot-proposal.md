# Velocity x UVU: 30-Day No-Risk Pilot Proposal

**Prepared for:** Utah Valley University, Office of the Provost & College of Engineering and Technology
**Prepared by:** Velocity (AI Academic Advisor)
**Document version:** 1.0 — May 2026

---

## 1. Executive summary

UVU set a public goal to reach a 50% eight-year completion rate by 2030, up from 46% in May 2024 — a goal that requires reducing barriers in advising, curricular pathways, and student services at the same time HB 265 forces every Utah public institution to reallocate dollars toward workforce-aligned, timely completion.[^1][^2][^3] Velocity is purpose-built for exactly this moment: an AI academic advisor that reduces advisor workload, surfaces at-risk students earlier, and recommends the fastest credible path to a degree that maps to in-demand Utah jobs.

We are proposing a **30-day, no-cost, no-integration pilot** with UVU's College of Engineering and Technology (CET — ~5,200 students across 7 departments and 25+ majors).[^4] If the pilot hits the metrics defined in Section 4, UVU converts to a full $1.1M annual contract covering all 41,000+ enrolled students. If it doesn't, we walk away and UVU keeps the data and the insights.

## 2. Pilot scope

**Target population:** College of Engineering and Technology, scoped to **300 students** drawn from two majors with the highest combined enrollment and advising load (recommended: Computer Science BS and Mechanical Engineering BS). Five CET advisors and one associate dean serve as our day-to-day partners.

Why CET, why these majors:
- CET sits squarely in the workforce-aligned, high-ROI category HB 265 is pushing institutions to fund.[^3]
- ~5,200 students is large enough to be statistically meaningful, small enough to move quickly.[^4]
- STEM majors carry dense prerequisite chains where advising decisions compound — Velocity's recommendation engine has the most upside here.
- One-third of UVU students are pursuing STEM degrees, so CET-validated results read directly to the broader population.[^5]

**Out of scope for 30 days:** Banner SIS integration, Canvas LMS sync, mobile app, parent/family portal, full FERPA review beyond the pilot DPA.

## 3. What we deliver in 30 days

| Deliverable | Detail |
|---|---|
| Branded UVU instance | velocity.uvu.edu (subdomain or vendor-hosted), UVU colors and CET logo |
| CSV ingest pipeline | UVU exports anonymized student records (major, completed courses, GPA bucket, term) — we ingest nightly, no Banner read access |
| Student-facing demo | Logged-in web app: degree progress, AI-recommended next-term schedule, "what if I switched majors" simulator, chat advisor trained on UVU's CET catalog |
| Advisor admin view | Caseload dashboard, flagged-student queue (off-track, prerequisite gap, low engagement), one-click meeting prep notes |
| Weekly data summary | Friday email to UVU exec sponsor with logins, recommendations viewed, advisor activity |
| Final readout | Day 30 written report + 45-min presentation to UVU cabinet |

**What we do not deliver in 30 days:** direct write-back to Banner, automated registration, financial aid recommendations, predictive risk model trained on UVU's historical cohort data (that requires the 60-day extension).

## 4. Success metrics

We commit to public, falsifiable targets. Conversion to the $1.1M annual contract is contingent on hitting at least **four of the five**:

| Metric | Target (Day 30) | How measured |
|---|---|---|
| Student activation | ≥ 60% of 300 invited students log in at least once | Auth logs |
| Recommendation engagement | ≥ 45% of activated students view a personalized course recommendation | Product analytics |
| Advisor NPS | ≥ +30 across the 5 pilot advisors | End-of-pilot survey |
| Advisor hours saved | ≥ 3 hours/week/advisor on routine scheduling and prerequisite-checking tasks | Weekly time-diary survey, baselined Week 1 |
| Off-track student identification | Velocity surfaces ≥ 10 students CET advisors agree are at risk and were not previously on the manual watchlist | Joint review session, Day 25 |

**Why these targets are defensible.** Financial-advisor AI copilots routinely report 10+ hours saved per advisor per week and one 28-day case study documented 700 hours saved across one firm.[^6][^7] Academic advising workflows are different — more catalog lookup, fewer compliance tasks — so we are deliberately conservative at 3 hours. The NACADA national median caseload is 296:1 and advisor retention drops sharply above 300 students per caseload,[^8] which means even modest time savings have real workforce and retention impact for UVU advising staff.

## 5. Pricing

| Phase | Duration | Price | Conditions |
|---|---|---|---|
| Phase 1 — Pilot | 30 days | **$0** | Free. No commitment. UVU owns the data. |
| Phase 2 — Optional extension | 60 days | **$15,000** | Adds predictive risk model trained on UVU historical data, Banner read-only integration, expands to all of CET (~5,200 students) |
| Phase 3 — Full contract | 12 months | **$100,000 platform + $25/student/year** = ~**$1,125,000 ARR** at 41,000 students | Triggered only if Phase 1 hits 4 of 5 metrics |

UVU is never obligated to advance to the next phase. There are no auto-renew clauses, no early-termination fees, and no minimum users.

## 6. What we need from UVU

1. **One executive sponsor** — ideally the Provost's office (Dr. Wayne Vaught currently serves as Provost / Sr. VP Academic Affairs) or Deputy Provost Kathren Brown, plus a CET delegate (associate dean level).[^9]
2. **Anonymized student data** — CSV export covering the 300 pilot students: student ID hash, major code, completed courses with grades, term standing, declared minor. No PII required for the pilot. If a clean export is impossible inside 30 days, Velocity will run on simulated data generated from UVU's published catalog.
3. **5 CET advisors** — committed to a 30-minute kickoff, three 30-minute mid-pilot feedback sessions, and a 45-minute closeout. Total time commitment ≤ 3 hours per advisor over 30 days.
4. **Data Processing Agreement (DPA)** — short-form, pilot-scoped. We provide the template; UVU General Counsel reviews. Target: signed by Day 5.
5. **Communications channel** — UVU sends the pilot invitation email to the 300 students from a uvu.edu address. Velocity drafts the copy.

## 7. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Banner data export is delayed by IT queue | High | Pre-built simulated-data fallback derived from UVU's public catalog; pilot runs on Day 1 regardless |
| Low student opt-in (<60% logins) | Medium | UVU sends invite from official channel; we provide reminder cadence; CET advisors mention in scheduled meetings |
| FERPA / DPA review extends past Day 5 | Medium | Pilot uses anonymized data only, removing most FERPA exposure; backup is fully simulated data |
| Advisor skepticism / change resistance | Medium | Frame as "Velocity assists advisors, never replaces them." Five advisors self-select in, are credited in the final report, and keep all decision authority |
| HB 265 reorg pulls sponsor's attention | High | Tie the pilot directly to HB 265 workforce-alignment language; provide UVU with a 1-page artifact they can use in their HB 265 three-year plan submission[^3] |
| Pilot succeeds but no procurement path for $1.1M | Medium | Surface procurement vehicle early — Sourcewell, NASPO ValuePoint, or USHE-wide MSA. Confirm by Day 15. |

## 8. 30-day timeline

| Week | Milestone | Owner |
|---|---|---|
| **Week 1** (Days 1–7) | DPA signed; subdomain stood up; CSV schema agreed; 5 advisors onboarded; kickoff held | Velocity + UVU sponsor |
| **Week 2** (Days 8–14) | Student data loaded (or simulated); invitations sent to 300 students; advisor admin view live; first weekly summary delivered | Velocity |
| **Week 3** (Days 15–21) | Mid-pilot advisor feedback session #1; product iterations shipped on Friday; procurement-path conversation with UVU Purchasing | Velocity + UVU advisors |
| **Week 4** (Days 22–28) | Off-track student joint review (Day 25); time-diary survey closes (Day 26); final data pulled (Day 28) | UVU advisors + Velocity |
| **Day 30** | Written readout delivered; 45-min presentation to UVU cabinet; go/no-go decision on Phase 2 | Velocity |

## 9. Why this works for UVU's specific moment

- **Vision 2030's "Achieve" pillar** targets a 50% completion rate. Velocity directly attacks the advising bottleneck inside that pillar.[^1][^2]
- **HB 265** requires UVU to submit a three-year plan reallocating dollars toward workforce-aligned completion. A successful Velocity pilot becomes a citable artifact inside that plan.[^3]
- **President Tuminez's digital transformation agenda** explicitly calls for technology to "drive and enhance every aspect of the student experience, from recruitment to graduation."[^10] Velocity is a clean fit.
- **Record enrollment of 46,809 students, 41% of whom are first-generation**, means UVU advisors are stretched — exactly the population where AI augmentation produces the largest measurable lift.[^5]

---

## Sources

[^1]: [Vision 2030 — Utah Valley University](https://www.uvu.edu/vision2030/)
[^2]: [Utah Valley University Reaches 2025 Graduation Goal Early — UVU News, Feb 2024](https://www.uvu.edu/news/2024/02/2024_02_14_graduation.html)
[^3]: [2025 UVU Strategic Reinvestment Updates / HB 265 — UVU News](https://www.uvu.edu/news/2025/ushe-2025-strategic-reinvestment.html)
[^4]: [Student Success — UVU College of Engineering and Technology](https://www.uvu.edu/cet/engineeringbuilding/success.html)
[^5]: [UVU Fall 2024 Enrollment of 46,809 — UVU News, Oct 2024](https://www.uvu.edu/news/2024/10/uvu-enrollment-for-fall-2024.html)
[^6]: [How AI Saves Financial Advisors 10+ Hours Per Week — Zocks](https://www.zocks.io/blog/how-ai-saves-financial-advisors-10-hours-per-week)
[^7]: [Plancorp Saves 700 Hours a Month With AI — WealthManagement.com](https://www.wealthmanagement.com/advisor-support-platforms/plancorp-saves-700-hours-with-ai-advisor-copilot)
[^8]: [Advisor to Student Ratio / Caseload Resources — NACADA](https://nacada.ksu.edu/Resources/Clearinghouse/View-Articles/Advisor-to-Student-Ratio-Caseload-Resources.aspx)
[^9]: [UVU Leadership and Organization Charts](https://www.uvu.edu/president/leadership/)
[^10]: [How a President Prioritizes Digital Transformation — EDUCAUSE Review interview with Astrid S. Tuminez](https://er.educause.edu/articles/2021/11/how-a-president-prioritizes--digital-transformation-on-campus--an-interview-with-astrid-s-tuminez)
