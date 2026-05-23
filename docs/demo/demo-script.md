# Velocity — 30-Minute Discovery & Demo Script

**For:** VP of Student Success, CIO, Provost, or Dean of Students
**Goal of call:** Understand their retention problem → show Velocity solving it with Sarah Chen → land a pilot ask
**Deck:** Not required. Run the live demo. Browser tabs should be pre-loaded before the call.

**Pre-call browser tabs to open:**
1. `/demo` — Student dashboard, Sarah Chen selected
2. `/demo/plan/[sarah-id]` — 4-year kanban plan
3. `/admin` — Admin analytics dashboard
4. Landing page ROI calculator (scroll to it)

---

## 0:00–5:00 — Discovery (Ask before showing anything)

> "Before I show you anything, I want to make sure I'm showing you the right things. Can I ask you a few questions about where you are right now?"

**Ask these in order. Listen hard. Their answers power the ROI calc in minute 22.**

---

**[DISCOVERY Q1 — Enrollment]**
> "How many students are enrolled right now, roughly? And is that up, flat, or down from three years ago?"

*Why you're asking:* You need the enrollment number for the ROI calculator. The trend tells you whether they're in growth mode or fighting attrition.

---

**[DISCOVERY Q2 — Completion rate]**
> "What's your current six-year completion rate, and where do you need it to be? Is there a board goal, an accreditor target, something in your strategic plan?"

*Why you're asking:* This is the number your ROI hangs on. The national average for non-flagship publics is around 50%. If they're below that, completion is their pain. If they're above it, pivot to advisor burnout.

*If they don't know the number:* "Totally fine — we can work from national benchmarks. The reason I ask is the ROI calc I'll show you at the end is much more powerful when it's your actual number."

---

**[DISCOVERY Q3 — Advisor caseload]**
> "What's your advisor-to-student ratio today? And when you think about your advising team, what are they spending most of their time on — the routine stuff or the high-stakes conversations?"

*Why you're asking:* NACADA median is 296:1. If they're above 300, they know it's broken. You want them to say "prerequisite-checking" or "degree audits" — that's exactly what Velocity automates.

*If they say advisors are fine:* "Got it. Is that a recent hire or have you always been well-staffed?" (Often they've hired to a crisis and the pain is still fresh.)

---

**[DISCOVERY Q4 — Current tech stack]**
> "What are you using today for advising support? Banner? DegreeWorks? EAB Navigate, Civitas, something else?"

*Why you're asking:* You need to know the objection before it hits you. If they say EAB Navigate, you have a ready answer. If they say nothing, that's your opening. Write it down — reference it later.

---

**[DISCOVERY Q5 — The pain moment]**
> "Last question before I show you the product. Think about a student who dropped out in the last year or two — someone who probably could have made it if someone had caught them earlier. How many of those stories do you have? And do you have a way to see them coming?"

*Why you're asking:* This is the emotional center of gravity for the whole call. Their answer is the story you will echo back to them when you show the risk alerts. Let them sit in it for a second. Don't rush past it.

*Transition out of discovery:*
> "Okay — that's exactly the problem we built this for. Let me show you what we're doing about it."

---

## 5:00–8:00 — Framing / Why We Built This

**[Keep this to 90 seconds. No slides. Just talk.]**

> "Quick context on where this came from. We started at Utah Valley University — 46,000 students, 41% first-generation, advising ratios above 300 to one. The advisors there are genuinely excellent people who are underwater. They know which students need help. They just can't get to all of them."

> "What we found is that the bottleneck isn't the advisor's skill — it's bandwidth. An advisor spending 40% of their time answering 'can I take this class next semester?' is an advisor who isn't having the conversation with the student who's about to drop out. That's the math we're trying to fix."

> "Velocity is not a chatbot that replaces advisors. It's a layer that handles the routine questions so advisors can do the human work. And it surfaces, proactively, the students who need that human conversation before they disappear."

> "What I'm about to show you is a live demo — real code, real AI, fake student data. I want you to imagine [their institution name] on it. Ready?"

---

## 8:00–15:00 — Student Dashboard Demo (Sarah Chen)

**[You're on the `/demo` tab. Sarah Chen should be selected in the student picker.]**

**Open with the student bar at the top:**

> "This is Sarah Chen. Computer Science junior, 3.2 GPA, 67% through her degree. On the surface she looks fine. But here's what the system sees."

**[Point to the risk alerts section.]**

> "Velocity is flagging two things for Sarah right now. Her credit pace is slightly behind — she's on track to need a fifth year if she doesn't pick up one extra course. And she's got a prerequisite gap that's going to block her from the upper-division courses she needs in the spring. An advisor looking at a caseload of 300 students in a spreadsheet is not going to catch that. Velocity catches it automatically, every week, the moment the enrollment data updates."

**[Buyer will often say something here. See objection handling below. Most common: "How do you get the data?"]**

*If they ask about data:*
> "Great question — Banner API integration is on our roadmap for Q3, but most pilots run the entire semester on a weekly CSV export. No API access needed. Your registrar already generates this export — we're just ingesting it. I'll come back to integration in a few minutes."

**[Click to the "Courses" tab.]**

> "Based on Sarah's completed courses, her declared major, and labor market demand data from Lightcast and BLS, Velocity is recommending three courses for next semester. Each one has a reason attached — not just 'take this,' but 'take this because it closes the gap to your career goal and you meet all the prerequisites.' An advisor can review this in about 30 seconds and confirm or adjust."

> "The advisor still makes the call. They always make the call. But instead of starting with a blank degree audit, they're starting with a recommendation they can approve or push back on. That meeting goes from 45 minutes to 15."

**[Click to the "Career" tab.]**

> "This is where it gets interesting for students. Velocity is matching Sarah's actual skill profile — based on the courses she's completed — to real career paths. Top match is Software Engineer at 91%, with a $95K median salary. But it also shows her the skills she's missing and which courses would close that gap. Students who see this early make better decisions about their major, their electives, their internships. That has a retention effect we can actually measure."

**[Click to the AI chat panel on the right side.]**

> "And then there's this. Students have questions at 11 p.m. when no advisor is available. That's exactly when someone decides to drop a class, take the wrong course, or just give up. The chat is trained on your institution's catalog — it knows your specific requirements, your policies, your prerequisites. It doesn't hallucinate an answer from some other school's handbook. And every conversation is logged and visible to the advisor. No black box."

*Type or show a pre-typed question:* "Am I on track to graduate?"

> "Watch what happens. It answers the question and gives her an action. And the advisor sees this conversation thread. If a student asks the chat 'I'm thinking about dropping out,' that's a flag that goes to the advisor immediately."

**[Common buyer question here: "What about students who won't use it?"]**
> "Fair point. Our pilot data shows 60%+ activation when the invite comes from an official university email — students trust it more when it comes from their institution. The students who don't use it are still covered, because the advisor admin view flags them regardless of whether they've logged in."

---

## 15:00–18:00 — 4-Year Plan Kanban View

**[Click the "4-Year Plan" link in the nav or open the pre-loaded tab for `/demo/plan/[sarah-id]`.]**

> "This is what a student sees when they click into their full degree plan. It's a kanban board — semesters as columns, courses as cards. Completed courses in green, planned courses in the upcoming semesters, elective slots still to fill."

> "Every card shows the course, the credits, the prerequisites it satisfies, and how it maps to her career goal. If Sarah wants to see what happens if she switches to Information Systems, she can run a 'what if' right here and see how many credits transfer, what she'd need to add, and how it affects her graduation date."

> "The advisor sees the same view. So when Sarah comes in for her appointment, they're literally looking at the same screen. That shared view cuts the first ten minutes of every advising session — you know, the 'let me pull up your record' part."

**[Watch-out: Don't linger here more than 3 minutes. The admin view and ROI calc are where the buyer's budget conversation happens.]**

*Transition:*
> "Let me flip over to what your advising team and your VP of Student Success would actually live in day to day."

---

## 18:00–22:00 — Admin Analytics → At-Risk List → CSV Import

**[Switch to the `/admin` tab.]**

> "This is the admin dashboard. This is what you'd see as a VP of Student Success or a dean, not a student. Three things I want to show you here."

**[Point to the at-risk queue / caseload view.]**

> "First — the at-risk list. Velocity ranks every student by risk level, updated each time you push a new data file. Not just GPA — it's GPA trend, credit pace, prerequisite gaps, and engagement signals. An advisor opens their Monday morning and sees: these are the five students I need to call today, here's why, and here's the talking-point sheet for each call. That's a fundamentally different way to run an advising operation."

> "Second — the aggregate view. At a glance, how many students are on track? Which colleges or majors have the highest concentration of risk? If Engineering has a spike in off-track students in week six of the semester, you can see that and act on it before it becomes a drop-rate number in your annual report."

**[Navigate to or describe the CSV import flow.]**

> "Third — getting data in. I promised I'd come back to this. Here's the import. You export a CSV from Banner — the same export your registrar already runs for reporting. You drag it here, Velocity parses it, and within a few minutes the risk scores are updated. No API key. No IT ticket. No Banner read access. One of our pilot institutions had their first cohort onboarded in 8 days, not the 9 months they'd budgeted for a typical enterprise implementation."

**[Buyer watch-out: "Our IT team will need to be involved."]**
> "Totally — and that's actually one of the things IT teams like about this. Because there's no API integration, there's no network exposure, no authentication handshake, no firewall rule. IT reviews the DPA, signs off on data handling, and that's essentially the whole IT engagement for the pilot. We're not asking for a production system connection."

---

## 22:00–26:00 — ROI Calculator

**[Navigate to the landing page and scroll to the ROI calculator, or open a pre-built version with their numbers already plugged in if you set it up before the call.]**

> "Okay — let's make this concrete with your numbers. You said [their enrollment number]. Let me plug that in."

**[Enter their enrollment number. Walk through the math out loud.]**

> "The model has three inputs: enrollment, your current completion rate, and average advisor caseload. It outputs two things: advisor time savings and retention value."

> "On advisor time — if each of your advisors saves three hours a week on routine scheduling and prerequisite questions, that's [X hours] per year across your advising team. At the average academic advisor salary of about $52K, that's [Y dollars] in recovered capacity. That's not headcount reduction — that's the same people being able to carry a bigger caseload or have deeper conversations with the students who need it."

> "On retention — this is where the number gets real. One percentage point of improvement in your retention rate, at [their enrollment] students and a [their tuition] average net tuition, is worth [Z]. We're not promising you a specific lift, but we have falsifiable pilot metrics. If we surface 10 students your advisors weren't previously watching, and even two of them stay enrolled, the pilot pays for itself before we invoice a dollar."

> "The pilots we've run show 6 to 8x ROI in year one. That number is the CFO conversation, not the 'do we have budget' conversation. Those are different conversations."

**[Common buyer response: "Our numbers are different." ]**
> "Absolutely — use your numbers. That's why the calculator takes inputs. If your tuition is lower or your retention is already high, the curve shifts. What I'd encourage you to do is run this with your CFO's assumptions, not mine. The model is transparent — you can audit every line."

---

## 26:00–30:00 — Pilot Ask + Next Steps

**[This is the close. Be direct. Don't soften it.]**

> "Here's what I want to propose. A 30-day pilot. Three hundred students, one college or department — the one with the highest advising load or the most complex prerequisite chain. Zero dollars. Zero integration risk. You own the data."

> "What we deliver: a branded instance on your subdomain, the student-facing dashboard you just saw, the advisor admin view, weekly metrics reports, and a Day-30 readout to your cabinet or whoever the right audience is."

> "What we need from you: one executive sponsor, anonymized student CSV — or we can run on simulated data if the export takes time — and five advisors who will give us 30 minutes at the kickoff and three short feedback sessions. That's a total of maybe three hours per advisor over the month."

> "We set five public, falsifiable success metrics upfront: student activation above 60%, recommendation engagement above 45%, advisor NPS above 30, at least three hours saved per advisor per week, and at least ten at-risk students your team agrees were not previously on the watchlist. If we hit four of five, we have a pricing conversation about scaling to your full enrollment. If we miss, we walk away and you keep the data and the insights. No auto-renew, no termination fee."

**[Pause. Let them respond. The two most common responses:]**

**If they say "sounds interesting, what are next steps":**
> "I'd want to get a Data Processing Agreement in front of your general counsel — it's a short-form pilot DPA, usually a one-week turnaround. Simultaneously, we identify the pilot population together — you tell me which college and which majors make sense. Can we get a 30-minute call with you and whoever owns the data decision — your registrar or your CIO — in the next week?"

**If they go quiet or hedge:**
> "What would need to be true for a 30-day, no-cost pilot to be worth trying? I want to understand the blocker."

**[Leave-behind: offer to send the one-pager and pilot proposal before they end the call. Don't ask for it — offer it.]**
> "I'll send you our one-pager and our pilot proposal doc right after this call. The proposal has the five success metrics written out and the pricing structure for phases two and three. Takes about ten minutes to read."

---

## Objection Handling Reference

These will come up at different moments in the call. Have the responses internalized, not memorized.

---

**"We already have EAB Navigate."**

> "Navigate is great — it's the scheduling layer, and your advisors probably rely on it for appointments and alerts. We're not replacing it. We're the layer underneath that tells the advisor which students most need that meeting this week, and why. Navigate tells you the appointment happened. Velocity tells you the student who didn't make an appointment is three credits behind and has a prerequisite gap that will block them in the spring. Those are different problems. Most of our conversations are with schools that have Navigate and still have retention challenges, because Navigate doesn't do proactive risk triage."

---

**"We don't have budget."**

> "A 30-day pilot is priced at zero — there's no budget conversation for phase one. The reason I showed you the ROI calc is that the budget conversation happens after the pilot, when you have real data, not before. Most institutions that run our pilot show 6 to 8x ROI in year one. That's a $1M platform investment that returns $6 to $8M in retained tuition. That's not an IT budget conversation — that's a CFO conversation, and it's a very different one. Can we get to the pilot and let the data make the argument?"

---

**"What about FERPA?"**

> "We take FERPA seriously and we've built around it deliberately. No student PII leaves your network. The pilot runs on anonymized data — student ID hash, major, completed courses, GPA bucket. No names, no SSNs, no contact info. We provide a short-form DPA your general counsel can review in a day. US data residency, no LLM training on student data — your students' records are never used to train or improve our models. If your general counsel wants to go line by line on the DPA, we welcome it. We've done that with three institutions and have never had a pilot blocked on FERPA."

---

**"Can you integrate with Canvas / Banner?"**

> "CSV import now, Banner read-only API in Q3. Canvas LMS sync is also on the Q3 roadmap. Here's the honest answer on why that's fine for a pilot: most institutions run the full semester on a weekly CSV export, because that's the export your registrar already produces for every reporting cycle. You're not creating new work — you're redirecting an existing workflow. The institutions that have asked hardest about API integration are usually the ones with the most to gain from it, and they've all run successful pilots on CSV first. We'd rather show you results and then talk about deeper integration than ask you to connect a production system before you've seen the value."

---

**"What if your AI gives students bad advice?"**

> "The advisor always has final say — Velocity makes recommendations, not decisions. Every recommendation the AI makes is visible to the advisor, and students are clearly told they should confirm course selections with their advisor before registering. The chat is also scoped to your catalog — it can only answer questions about courses, requirements, and degree plans at your institution. It won't give financial aid advice or academic policy rulings. If the student asks something outside that scope, it routes them to the right human. And every chat conversation is logged and reviewable by the advisor, so there's a full audit trail."

---

**"We tried an AI thing before and it didn't stick."**

> "That's probably the most useful objection you can raise. What was it? [Let them answer.] A lot of the tools that didn't stick had an adoption problem — they were built for administrators, not students, or they required advisors to change their entire workflow to use it. Velocity is designed to fit into what advisors already do: they open their caseload view, they see who needs a call, they make the call. The AI is invisible to them until they need it. And on the student side, activation is driven by the institution sending the invite — students don't find it on their own. When it comes from a uvu.edu or [their domain] address, they treat it like an official tool, not another app."

---

## Quick Reference — Numbers to Know

| Stat | Source / Use |
|---|---|
| 296:1 | NACADA national median advisor-to-student ratio |
| 50% | US 6-year completion rate for non-flagship publics |
| $1.7T | Total US student debt — most owed by non-completers |
| 3 hrs/wk | Conservative pilot target for advisor time saved per advisor |
| 700 hrs/month | Benchmark from financial advisor AI copilot case study (Plancorp) |
| 60% | Pilot activation target (students logging in at least once) |
| 8 days | Time to onboard first pilot cohort (vs. typical 9-month enterprise impl) |
| 30 students | Minimum meaningful pilot size; 300 is the standard ask |
| 6–8x | Typical year-one ROI range seen in pilot models |
| $100K + $25/student/yr | Full-contract pricing (~$1.1M ARR at 41K students) |
| Q3 | Banner API + Canvas LMS sync target date |

---

## Call Debrief Checklist (fill out within 30 minutes of hanging up)

- [ ] Enrollment number captured
- [ ] Current completion rate captured (or "unknown")
- [ ] Advisor-to-student ratio captured
- [ ] Current tech stack noted (Navigate? Civitas? DegreeWorks? Banner?)
- [ ] Executive sponsor identified or named
- [ ] Main objection on this call
- [ ] Agreed next step (DPA, follow-up call, intro to IT/registrar, or dead)
- [ ] Sent one-pager and pilot proposal
