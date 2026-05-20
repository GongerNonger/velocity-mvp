import Link from "next/link";
import { pricingTiers } from "./api/store";

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
    stat: "40%",
    label: "of students drop out before graduating",
    body: "One overworked advisor for every 300 students. The math doesn't work.",
  },
  {
    stat: "6.5 years",
    label: "average time to a 4-year degree",
    body: "Students take wrong courses, switch majors blind, and pay for credits that don't count.",
  },
  {
    stat: "$1.7T",
    label: "in student debt",
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
    body: "When students graduate, they're not guessing. Velocity matches their actual skill profile to real career paths with salary data and growth projections.",
  },
];

const LOGOS = ["UVU", "BYU", "USU", "WEBER STATE", "UTAH TECH"];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#275D38" }}>
              V
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight">Velocity</div>
              <div className="text-[11px] text-gray-500 leading-tight">AI Academic Advisor</div>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">How it works</Link>
            <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">Pricing</Link>
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors hidden md:inline">For Advisors</Link>
            <Link
              href="/demo"
              className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#275D38" }}
            >
              See Live Demo &rarr;
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
            Every student gets a<br className="hidden md:inline" />{" "}
            <span style={{ color: "#4CAF50" }}>Stanford-grade advisor.</span>
            <br />
            Every advisor gets superpowers.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed">
            Velocity is the AI advising platform that turns a 48,000-student university into 48,000 personalized degree plans.
            Catch at-risk students before they drop out. Match every graduate to a career they&apos;ll actually love.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
              style={{ backgroundColor: "#275D38" }}
            >
              See Live Demo &rarr;
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-medium border border-gray-700 hover:border-gray-500 transition-colors"
            >
              How It Works
            </Link>
          </div>
          <p className="text-xs text-gray-600 mt-10">
            Built for Utah Valley University &middot; 48,000 students &middot; Designed for every campus
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
              <div key={s.stat} className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
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
            <div key={s.n} className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative">
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

      {/* Product preview - styled frame */}
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
            <div className="aspect-[16/9] flex items-center justify-center relative" style={{ background: "radial-gradient(ellipse at center, rgba(39, 93, 56, 0.15), transparent 70%)" }}>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
                style={{ backgroundColor: "#275D38" }}
              >
                View Live Dashboard &rarr;
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          Live dashboard &mdash; click above to try the product, no signup required.
        </p>
      </section>

      {/* Logo bar */}
      <section className="border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center text-xs uppercase tracking-[0.25em] text-gray-500 mb-8">
            Built for universities like yours
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {LOGOS.map((logo) => (
              <div key={logo} className="font-serif text-xl md:text-2xl text-gray-600 tracking-wide">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
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
                className={`rounded-xl p-6 bg-gray-900 border ${highlight ? "border-green-700" : "border-gray-800"} relative ${highlight ? "md:scale-105" : ""}`}
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
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900/40 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to give every student an advisor that never sleeps?
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            See Velocity in action with our live UVU demo. No signup, no demo call, just the product.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-lg text-white font-medium mt-8 transition-all hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
            style={{ backgroundColor: "#275D38" }}
          >
            Launch Live Demo &rarr;
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; AI Academic Advising &middot; Built in Utah &middot; &copy; 2026</p>
        <div className="mt-2 flex justify-center gap-4 text-xs text-gray-600">
          <span>Privacy</span>
          <span>Terms</span>
          <span>hello@velocity.example</span>
        </div>
      </footer>
    </div>
  );
}
