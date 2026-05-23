import Link from "next/link";
import { AmbientOrbs } from "../components/AmbientOrbs";

const ROLES = [
  {
    href: "/student",
    badge: "For Students",
    title: "I'm a Student",
    tagline: "See your degree plan, GPA, and next-semester recommendations.",
    bullets: [
      "Look up your records with your Student ID (UVID at UVU)",
      "Personalized 4-year plan & course recommendations",
      "Career-match suggestions based on your skills",
      "AI chat to ask anything about your degree",
    ],
    cta: "Enter Student ID",
    accent: "#4CAF50",
  },
  {
    href: "/counselor",
    badge: "For Advisors",
    title: "I'm a Counselor",
    tagline: "Triage your caseload and intervene before students fall off track.",
    bullets: [
      "See every student in your caseload, sorted by risk",
      "Drill into any profile with full advising context",
      "Risk alerts, credit-pace warnings, GPA drops",
      "Schedule meetings & track outreach (coming soon)",
    ],
    cta: "Open caseload",
    accent: "#4CAF50",
  },
  {
    href: "/admin",
    badge: "For Administrators",
    title: "I'm an Administrator",
    tagline: "Track retention, program performance, and workforce-readiness.",
    bullets: [
      "Institution-wide analytics & retention indicators",
      "Program-level distribution & skill-gap analysis",
      "Import Banner CSV exports to load real data",
      "FERPA-compliant — aggregate views by default",
    ],
    cta: "Open dashboard",
    accent: "#4CAF50",
  },
];

export default function PortalPage() {
  return (
    <div className="relative min-h-screen bg-gray-950">
      <AmbientOrbs />

      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm"
              style={{ backgroundColor: "#275D38" }}
            >
              V
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight">Velocity</div>
              <div className="text-[11px] text-gray-500 leading-tight">AI Academic Advisor</div>
            </div>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">&larr; Back to home</Link>
            <Link href="/demo" className="text-gray-400 hover:text-green-400 transition-colors hidden sm:inline">
              Sales demo mode
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-4">
            Choose your portal
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white animate-fade-in-up">
            Who are you signing in as?
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg animate-fade-in-up [animation-delay:120ms]">
            Velocity has three views — built around what each role actually needs to do today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ROLES.map((role, i) => (
            <Link
              key={role.href}
              href={role.href}
              className={`group bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 hover:border-green-700/60 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/20 animate-fade-in-up-delay-${i + 1}`}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: role.accent }}>
                {role.badge}
              </div>
              <h2 className="text-2xl font-bold text-white">{role.title}</h2>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{role.tagline}</p>
              <ul className="mt-5 space-y-2 flex-1">
                {role.bullets.map((b) => (
                  <li key={b} className="text-sm text-gray-300 flex items-start gap-2 leading-snug">
                    <span style={{ color: role.accent }} aria-hidden="true">&check;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all group-hover:opacity-90"
                style={{ backgroundColor: "#275D38" }}
              >
                {role.cta} &rarr;
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-12 max-w-xl mx-auto leading-relaxed">
          Demo data only. No accounts, no logins. In production, role selection is automatic from your SSO claim.
        </p>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; AI Academic Advising &middot; FERPA-compliant</p>
      </footer>
    </div>
  );
}
