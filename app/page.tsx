"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pricingTiers } from "./api/store";
import { AmbientOrbs } from "./components/AmbientOrbs";
import { DemoRequestForm } from "./components/DemoRequestForm";
import { ROICalculator } from "./components/ROICalculator";

const TIER_FEATURES = [
  "Unlimited student plans",
  "AI advisor chat",
  "Risk detection & alerts",
  "Admin analytics dashboard",
  "Career pathway matching",
  "SSO / SIS integration",
];

const PROBLEM_STATS = [
  {
    stat: "1:300+",
    label: "advisor-to-student ratios are the norm",
    body: "NACADA's national median caseload. Most institutions are well above it. The math doesn't work.",
  },
  {
    stat: "63%",
    label: "is the US 6-year completion rate",
    body: "At non-flagship publics it's closer to 50%. Most institutions know which students are off-track  they just don't have the advising bandwidth to act on it.",
  },
  {
    stat: "$1.7T",
    label: "in US student debt",
    body: "Most of it owed by people who never finished. Advising failure has a price tag.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Personalized degree plan",
    body: "Every student gets a custom 4-year roadmap the day they enroll. Courses sequenced by prerequisite, optimized for graduation speed, aligned to their career goals.",
  },
  {
    n: "02",
    title: "Catch at-risk students early",
    body: "Velocity flags GPA drops, credit pace issues, and skill gaps before they become dropout risks. Advisors see exactly who needs a conversation this week.",
  },
  {
    n: "03",
    title: "Match skills to careers",
    body: "When students graduate, they're not guessing. Velocity matches their actual skill profile to real career paths with salary data and growth projections from Lightcast + BLS.",
  },
];

const INTEGRATIONS_TEASER = [
  { name: "Banner SIS", note: "Source-of-truth student records" },
  { name: "Canvas LMS", note: "Real-time engagement signal" },
  { name: "DegreeWorks", note: "Degree audit you already trust" },
  { name: "Okta / Entra", note: "SSO + SCIM on day one" },
  { name: "Salesforce / Slate", note: "Push at-risk alerts to advisors" },
  { name: "Lightcast", note: "Live labor-market data" },
];

interface FAQ {
  q: string;
  a: string;
}

const FAQ_ENTRIES: FAQ[] = [
  {
    q: "Do you replace our SIS or our existing advising tools?",
    a: "No. Velocity is a layer on top of Banner, Canvas, DegreeWorks, and (if you have them) Civitas or EAB. We read your authoritative records, never overwrite them. Most institutions keep their existing tools and add Velocity as the student-facing AI front end + advisor risk engine.",
  },
  {
    q: "How fast can we pilot? We can't wait 9 months for an EAB-style deployment.",
    a: "30 days, CSV-only. We don't require Banner integration to start. Give us a one-time anonymized export of one college's students and Velocity is live in your environment within 72 hours. Full Banner + Canvas integration follows on a normal procurement timeline if the pilot proves out.",
  },
  {
    q: "What about FERPA and data privacy?",
    a: "FERPA-compliant from day one. Velocity is a school official with legitimate educational interest under our DPA. US-East AWS by default; Azure Gov Cloud and VPC deployment available at the Large tier. SOC 2 Type II audit is on the 2026 roadmap. Full details on /integrations.",
  },
  {
    q: "Do you train LLMs on our student data?",
    a: "Never. Velocity's recommendations and risk scoring are deterministic algorithms  no LLM required. Where we do use LLMs (the AI chat, in a future release), they're enterprise-tier providers with zero-retention agreements and a contractual non-training clause.",
  },
  {
    q: "We already use Civitas / EAB Navigate. Why add Velocity?",
    a: "Civitas and EAB are advisor-facing analytics tools. Velocity is a student-facing AI advisor + a modern advisor risk engine. We can read Civitas's predicted-success scores as one input. The pitch isn't replacement  it's giving students a real product surface and giving advisors AI-native triage on top of the analytics they already pay for.",
  },
  {
    q: "How much does this actually cost?",
    a: "Mid-tier (5K-20K students): $100K platform + $25/student/year. Large-tier (20K+): $250K platform + $20/student/year. Multi-year discounts available; grant-fund-eligible. See /pricing for the full breakdown + ROI calculator.",
  },
  {
    q: "Who owns the data?",
    a: "You do. All student data ingested into Velocity is your institution's property under the DPA. On contract end, we return or destroy it within 30 days per your election.",
  },
  {
    q: "Can students opt out?",
    a: "Yes. Opt-out is a per-student flag in Velocity. Opted-out students aren't shown advising recommendations, but de-identified aggregate analytics remain available to advisors and administrators.",
  },
];

export default function Landing() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSource, setDemoSource] = useState("landing");

  // Open the demo modal automatically if the URL has #request (deep link from /pricing etc.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#request") {
      const params = new URLSearchParams(window.location.search);
      setDemoSource(params.get("source") || "landing-deeplink");
      setDemoOpen(true);
    }
  }, []);

  function openDemo(source: string) {
    setDemoSource(source);
    setDemoOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Animated background */}
      <AmbientOrbs />
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#275D38" }}>
              V
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight">Velocity</div>
              <div className="text-[11px] text-gray-500 leading-tight">AI Academic Advisor</div>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/integrations" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">Integrations</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">Pricing</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors hidden md:inline">About</Link>
            <Link
              href="/portal"
              className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#275D38" }}
            >
              Open the app &rarr;
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(39, 93, 56, 0.18), transparent 60%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-28 text-center relative">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-8">
            AI Academic Advising &middot; Built for Higher Ed
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent animate-fade-in-up">
            Every student gets a<br className="hidden md:inline" />{" "}
            <span style={{ color: "#4CAF50" }}>Stanford-grade advisor.</span>
            <br />
            Every advisor gets superpowers.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:150ms]">
            Velocity is the AI advising platform that turns a 40,000-student university into 40,000 personalized degree plans.
            Catch at-risk students before they drop out. Match every graduate to a career they&apos;ll actually love.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up [animation-delay:300ms]">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
              style={{ backgroundColor: "#275D38" }}
            >
              Open the app &rarr;
            </Link>
            <button
              onClick={() => openDemo("landing-hero")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-medium border border-gray-700 hover:border-gray-500 transition-colors"
            >
              Request a Pilot
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-5 max-w-md mx-auto">
            Three views &mdash; <Link href="/student" className="text-green-400 hover:text-green-300">student</Link>,{" "}
            <Link href="/counselor" className="text-green-400 hover:text-green-300">counselor</Link>, and{" "}
            <Link href="/admin" className="text-green-400 hover:text-green-300">administrator</Link>. Pick one to try.
          </p>
          <p className="text-xs text-gray-600 mt-10">
            Founded by UVU students &middot; Built for every campus
          </p>
        </div>
      </section>

      {/* Problem statement */}
      <section className="border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">The advising crisis is real.</h2>
            <p className="text-gray-400 mt-3">Higher ed institutions are losing students they could have saved.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEM_STATS.map((s) => (
              <div key={s.stat} className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 rounded-xl p-8 text-center">
                <div className="text-5xl md:text-6xl font-black" style={{ color: "#4CAF50" }}>{s.stat}</div>
                <div className="text-sm text-white font-medium mt-3">{s.label}</div>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">From enrollment to career &mdash; on autopilot.</h2>
          <p className="text-gray-400 mt-3">Three things Velocity does that human advisors can&apos;t do alone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 rounded-xl p-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white mb-4"
                style={{ backgroundColor: "#275D38" }}
              >
                {s.n}
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product preview */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div
          className="rounded-2xl border border-gray-800 p-3 mx-auto max-w-4xl"
          style={{ background: "linear-gradient(180deg, rgba(39, 93, 56, 0.08), rgba(0,0,0,0))" }}
        >
          <div className="rounded-xl bg-gray-950 border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/60">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="mx-auto text-xs text-gray-500 bg-gray-800 px-3 py-0.5 rounded-full">velocity.app/demo</div>
            </div>
            <div
              className="aspect-[16/9] flex items-center justify-center relative"
              style={{ background: "radial-gradient(ellipse at center, rgba(39, 93, 56, 0.15), transparent 70%)" }}
            >
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
                style={{ backgroundColor: "#275D38" }}
              >
                Choose your view &rarr;
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          Live dashboard &mdash; click above to try the product, no signup required.
        </p>
      </section>

      {/* Integrations teaser */}
      <section id="integrations" className="border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-3">
              Integrations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Layer, not replatform.</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Velocity plugs into the systems your campus already runs. We&apos;re a read-only layer on top of your SIS, LMS, and degree audit  not a replacement.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {INTEGRATIONS_TEASER.map((i) => (
              <div key={i.name} className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 rounded-xl p-5">
                <div className="text-sm font-semibold text-white">{i.name}</div>
                <div className="text-xs text-gray-400 mt-1">{i.note}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/integrations" className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300">
              See all integrations and security details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & origin */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-3">
            Why we built this
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Honest about where we are.</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            We&apos;re early. No fabricated logos, no invented case studies. Here&apos;s the real picture.
          </p>
        </div>

        {/* Founder quote */}
        <div
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
          style={{ background: "linear-gradient(180deg, rgba(39, 93, 56, 0.08), rgba(17, 24, 39, 1))" }}
        >
          <div className="text-5xl leading-none mb-4" style={{ color: "#4CAF50" }} aria-hidden="true">&ldquo;</div>
          <blockquote className="text-lg md:text-xl text-white leading-relaxed font-medium">
            We lived this problem as students at UVU. Advising was rationed: a 15-minute slot every few months,
            generic email blasts, and a degree audit you had to decode yourself. We watched friends drop courses
            they didn&apos;t need, miss prerequisites, and walk away from degrees they were one semester from
            finishing. Velocity is the tool we wished we&apos;d had  built so every student gets the kind of
            advising the loudest students already do.
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0"
              style={{ backgroundColor: "#275D38" }}
            >
              V
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Velocity Founding Team</div>
              <div className="text-xs text-gray-500">Utah Valley University &middot; 2026</div>
            </div>
          </div>
        </div>

        {/* Trust / compliance badges */}
        <div className="mt-12">
          <div className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-5">
            Security &amp; data posture
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { label: "FERPA-compliant", sub: "School-official DPA, day one", icon: "✓" },
              { label: "SOC 2 Type II", sub: "Audit in progress  2026", icon: "○" },
              { label: "No LLM training", sub: "Contractual non-training clause", icon: "×" },
              { label: "US data residency", sub: "US-East AWS by default", icon: "■" },
            ].map((b) => (
              <div
                key={b.label}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 rounded-xl p-4 flex items-start gap-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: "rgba(39, 93, 56, 0.18)", color: "#4CAF50" }}
                  aria-hidden="true"
                >
                  {b.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white leading-tight">{b.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-snug">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilot conversations */}
        <div className="mt-12 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-4">
            In active pilot conversations with
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm md:text-base text-gray-300 max-w-3xl mx-auto">
            <span>Regional comprehensive universities</span>
            <span className="text-gray-700" aria-hidden="true">&middot;</span>
            <span>Community college systems</span>
            <span className="text-gray-700" aria-hidden="true">&middot;</span>
            <span>Workforce-development consortia</span>
            <span className="text-gray-700" aria-hidden="true">&middot;</span>
            <span>State higher-ed offices</span>
          </div>
          <p className="text-xs text-gray-600 mt-4 max-w-xl mx-auto">
            We don&apos;t list signed customer logos yet because we don&apos;t have signed contracts to point to.
            When we do, you&apos;ll see them here  named, with permission.
          </p>
        </div>
      </section>

      {/* ROI calculator */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-3">
            ROI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Worth doing the math.</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Conservative assumptions: 3 advisor-hours saved per week, 2.5 pp retention lift.
            Velocity typically pays back 4-8x in year one.
          </p>
        </div>
        <ROICalculator defaultStudents={20000} />
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Pricing scales with your institution.</h2>
            <p className="text-gray-400 mt-3">Simple platform fee + per-student. No hidden costs. Volume discounts at every tier.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => {
              const highlight = tier.name === "Mid";
              return (
                <div
                  key={tier.name}
                  className={`rounded-xl p-6 bg-gray-900/70 backdrop-blur-sm border transition-all duration-300 ${highlight ? "border-green-700 ring-1 ring-green-700/50 shadow-lg shadow-green-900/20" : "border-gray-700/60 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10"} relative ${highlight ? "md:scale-105" : ""}`}
                  style={highlight ? { boxShadow: "0 0 0 1px rgba(39, 93, 56, 0.4), 0 12px 40px rgba(39, 93, 56, 0.15)" } : undefined}
                >
                  {highlight && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#275D38", color: "white" }}
                    >
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white">{tier.name} Institution</h3>
                  <p className="text-sm text-gray-400 mt-1">{tier.label}</p>
                  <div className="mt-6">
                    <div className="text-4xl md:text-5xl font-black text-white">
                      ${(tier.platformFee / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-gray-500 mt-1">per year platform fee</div>
                  </div>
                  <div className="mt-3 text-sm text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4CAF50" }} />
                    <span>+ ${tier.perStudent} / student / year</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-4 italic">{tier.description}</p>
                  <div className="border-t border-gray-800 my-5" />
                  <ul className="space-y-2">
                    {TIER_FEATURES.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                        <span style={{ color: "#4CAF50" }}>&check;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openDemo(`pricing-${tier.name.toLowerCase()}`)}
                    className={`w-full mt-6 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                      highlight
                        ? "text-white hover:opacity-90"
                        : "text-white border border-gray-700 hover:border-gray-500"
                    }`}
                    style={highlight ? { backgroundColor: "#275D38" } : undefined}
                  >
                    Contact Sales
                  </button>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Need a deeper breakdown? Visit the <Link href="/pricing" className="text-green-400 hover:text-green-300 underline">full pricing page</Link> with feature comparison + FAQ.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently asked questions</h2>
          <p className="text-gray-400 mt-3">The objections every higher-ed buyer raises in their first call.</p>
        </div>
        <div className="space-y-3">
          {FAQ_ENTRIES.map((entry, i) => (
            <details key={i} className="group bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 hover:border-green-700/50 transition-all duration-300 rounded-xl">
              <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 hover:bg-gray-900/60 transition-colors">
                <span className="text-white font-medium text-sm md:text-base">{entry.q}</span>
                <span className="text-gray-500 group-open:rotate-45 transition-transform shrink-0 mt-0.5">&#x2b;</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{entry.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="request" className="bg-gray-900/40 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to give every student an advisor that never sleeps?
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            See Velocity in action, then request a 30-day pilot for your college. No commitment, no integration required to start.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
              style={{ backgroundColor: "#275D38" }}
            >
              Open the app &rarr;
            </Link>
            <button
              onClick={() => openDemo("landing-final")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-medium border border-gray-700 hover:border-gray-500 transition-colors"
            >
              Request a Pilot
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Product</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/portal" className="text-gray-400 hover:text-white">Open the app</Link></li>
                <li><Link href="/student" className="text-gray-400 hover:text-white">Student sign-in</Link></li>
                <li><Link href="/counselor" className="text-gray-400 hover:text-white">Counselor caseload</Link></li>
                <li><Link href="/admin" className="text-gray-400 hover:text-white">Admin dashboard</Link></li>
                <li><Link href="/integrations" className="text-gray-400 hover:text-white">Integrations</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Company</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><span className="text-gray-600">Careers (soon)</span></li>
                <li><span className="text-gray-600">Press (soon)</span></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/integrations#security" className="text-gray-400 hover:text-white">Security &amp; FERPA</Link></li>
                <li><Link href="/one-pager" className="text-gray-400 hover:text-white">Download our one-pager &rarr;</Link></li>
                <li><span className="text-gray-600">Documentation (soon)</span></li>
                <li><span className="text-gray-600">Case studies (soon)</span></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Contact</div>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-400">hello@velocity.example</span></li>
                <li>
                  <button onClick={() => openDemo("footer")} className="text-green-400 hover:text-green-300">
                    Request a pilot &rarr;
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>Velocity &middot; AI Academic Advising &middot; Built in Utah &middot; &copy; 2026</p>
          </div>
        </div>
      </footer>

      <DemoRequestForm open={demoOpen} onClose={() => setDemoOpen(false)} source={demoSource} />
    </div>
  );
}
