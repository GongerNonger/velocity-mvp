import Link from "next/link";

const PRINCIPLES = [
  {
    title: "Augment advisors, don't replace them.",
    body: "Velocity exists to give advisors time back. The product hands its best work to a human  the AI never sends a degree-changing recommendation to a student without the advisor in the loop.",
  },
  {
    title: "Layer, not replatform.",
    body: "Most universities already have a SIS, an LMS, a degree audit, and a CRM. We integrate, we don't ask you to rip-and-replace. The fastest pilots ship in 30 days because we don't require a Banner migration.",
  },
  {
    title: "FERPA-grade, day one.",
    body: "Student data is sacred. Velocity ships with FERPA-compliant data handling, SSO, audit logs, and a contractual LLM non-training clause from the first pilot.",
  },
  {
    title: "Outcomes over engagement.",
    body: "We don't optimize for screen time or notification volume. The metric we report on is graduation rate, time-to-degree, and post-graduation career match  not weekly active users.",
  },
];

const TIMELINE = [
  { year: "2026 Q1", milestone: "Velocity founded by a team of Utah Valley University students frustrated by how little advising they could get for tuition that wasn't cheap." },
  { year: "2026 Q2", milestone: "MVP shipped: student dashboard, advisor analytics, AI chat, 4-year plan, career pathway matching." },
  { year: "2026 Q3 (target)", milestone: "First paid pilot live. SOC 2 Type II audit kickoff. Lightcast partnership in motion." },
  { year: "2026 Q4 (target)", milestone: "First multi-college contract signed. Banner + Canvas integrations GA. State-system consortium pricing released." },
];

export const metadata = {
  title: "About  Velocity",
  description: "Why we built Velocity, what we believe about higher-ed advising, and where we're going.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="animate-orb-1 absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-green-900/15 blur-3xl" />
        <div className="animate-orb-2 absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full bg-emerald-900/10 blur-3xl" />
        <div className="animate-orb-3 absolute -bottom-48 left-1/4 w-[450px] h-[450px] rounded-full bg-gray-700/15 blur-3xl" />
      </div>
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
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">Pricing</Link>
            <Link href="/integrations" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">Integrations</Link>
            <Link href="/demo" className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#275D38" }}>
              See Live Demo &rarr;
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-16">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-4">
            About
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Every advisor is overloaded. Every student deserves better.
          </h1>
          <p className="text-lg text-gray-400 mt-6 leading-relaxed">
            The advisor-to-student ratio at most US universities sits between 1:300 and 1:600.
            The result is rationed advising: high-touch help for the loudest students, generic
            email blasts for everyone else, and tens of thousands of students who fall through
            the gap and don&apos;t graduate.
          </p>
          <p className="text-lg text-gray-400 mt-4 leading-relaxed">
            Velocity is an AI advising layer that sits between your SIS, LMS, and degree audit.
            It builds a personalized 4-year plan for every student the day they enroll,
            surfaces risk before midterms, and matches every graduate to a career path the
            labor market is actually hiring for.
          </p>
          <p className="text-lg text-gray-400 mt-4 leading-relaxed">
            We started Velocity as students at <span className="text-gray-200">Utah Valley University</span>  one of the largest
            and fastest-growing public universities in the country  because we lived the problem firsthand.
            Our demo runs on UVU&apos;s real course catalog and degree requirements; the product itself is built
            for every campus.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">What we believe</h2>
          <div className="space-y-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Where we are</h2>
          <div className="space-y-3">
            {TIMELINE.map((t) => (
              <div key={t.year} className="flex gap-5 items-start">
                <div className="w-32 shrink-0">
                  <span className="text-sm font-mono" style={{ color: "#4CAF50" }}>{t.year}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{t.milestone}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Want to be one of our first three customers?</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Founding pilot institutions get permanent pricing, direct access to the founders,
            and roadmap input. Open through 2026 Q4.
          </p>
          <Link
            href="/?source=about-cta#request"
            className="inline-flex items-center gap-2 px-6 py-3.5 mt-6 rounded-lg text-white font-medium transition-opacity hover:opacity-90 shadow-lg shadow-green-900/40"
            style={{ backgroundColor: "#275D38" }}
          >
            Talk to us &rarr;
          </Link>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; AI Academic Advising &middot; Built in Utah &middot; &copy; 2026</p>
      </footer>
    </div>
  );
}
