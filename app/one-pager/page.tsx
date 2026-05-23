import Link from "next/link";
import { PrintButton } from "./PrintButton";

export const metadata = {
  title: "One-pager  Velocity",
  description:
    "Velocity AI Academic Advisor  one-page leave-behind. More students, fewer barriers, faster degrees.",
};

interface Feature {
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    title: "Personalized pathway engine",
    body: "Every student sees the fastest credible route to graduation given their completed courses, declared major, and Utah workforce demand signals.",
  },
  {
    title: "Advisor caseload dashboard",
    body: "One screen ranks every advisee by risk, flags missing prerequisites, and pre-writes the meeting prep so 30-minute appointments start with insight, not data entry.",
  },
  {
    title: "AI chat trained on the institution's catalog",
    body: "Students get instant answers at 11 p.m.  when most should I drop this class? decisions actually get made  with full audit trail visible to advisors.",
  },
];

interface ProofPoint {
  heading: string;
  body: string;
  refs: number[];
}

const PROOF_POINTS: ProofPoint[] = [
  {
    heading: "UVU hit its 2025 completion goal a year early",
    body: "46% in May 2024 and is now targeting 50% by 2030. Advising capacity is the constraint.",
    refs: [3, 4],
  },
  {
    heading: "Adjacent benchmarks",
    body: "AI copilots saving 10+ hours per advisor per week, with one firm logging 700 saved hours in a single 28-day case study.",
    refs: [5, 6],
  },
  {
    heading: "Advisor retention research",
    body: "Tyton Partners via NACADA shows advisor 5-year retention rises above 50% only when caseloads dip below 300  Velocity makes existing advisors functionally equivalent to a larger team.",
    refs: [1],
  },
  {
    heading: "Built for Utah",
    body: "Pathway recommendations weight Utah Department of Workforce Services demand data, directly answering HB 265's workforce-alignment requirement.",
    refs: [2],
  },
];

const PILOT_BULLETS: { label: string; body: string }[] = [
  {
    label: "Scope",
    body: "~300 students, one college (recommended: UVU College of Engineering and Technology, ~5,200 students across 7 departments).",
  },
  {
    label: "We deliver",
    body: "Branded UVU instance, student-facing demo, advisor admin view, weekly metrics, Day-30 readout.",
  },
  {
    label: "UVU provides",
    body: "One executive sponsor, anonymized CSV data (or we'll use simulated), five advisors for feedback.",
  },
  {
    label: "Success metrics",
    body: "Public, falsifiable: student activation greater than or equal to 60%, recommendation engagement greater than or equal to 45%, advisor NPS greater than or equal to +30, at least 3 hours saved per advisor per week, at least 10 newly-identified off-track students.",
  },
  {
    label: "Conversion",
    body: "If we hit 4 of 5, UVU converts to a 12-month contract: $100K platform + $25/student/year (~$1.1M ARR at 41,000 students). If we miss, we walk.",
  },
];

interface Source {
  n: number;
  text: string;
  href: string;
}

const SOURCES: Source[] = [
  {
    n: 1,
    text: "NACADA  Advisor to Student Ratio / Caseload Resources",
    href: "https://nacada.ksu.edu/Resources/Clearinghouse/View-Articles/Advisor-to-Student-Ratio-Caseload-Resources.aspx",
  },
  {
    n: 2,
    text: "HB 265 / UVU Strategic Reinvestment",
    href: "https://www.uvu.edu/news/2025/ushe-2025-strategic-reinvestment.html",
  },
  {
    n: 3,
    text: "UVU Reaches 2025 Graduation Goal Early  UVU News, Feb 2024",
    href: "https://www.uvu.edu/news/2024/02/2024_02_14_graduation.html",
  },
  {
    n: 4,
    text: "UVU Fall 2024 Enrollment  UVU News, Oct 2024",
    href: "https://www.uvu.edu/news/2024/10/uvu-enrollment-for-fall-2024.html",
  },
  {
    n: 5,
    text: "How AI Saves Advisors 10+ Hours per Week  Zocks",
    href: "https://www.zocks.io/blog/how-ai-saves-financial-advisors-10-hours-per-week",
  },
  {
    n: 6,
    text: "Plancorp Saves 700 Hours a Month  WealthManagement.com",
    href: "https://www.wealthmanagement.com/advisor-support-platforms/plancorp-saves-700-hours-with-ai-advisor-copilot",
  },
  {
    n: 7,
    text: "UVU College of Engineering and Technology  Student Success",
    href: "https://www.uvu.edu/cet/engineeringbuilding/success.html",
  },
  {
    n: 8,
    text: "President Tuminez on Digital Transformation  EDUCAUSE Review",
    href: "https://er.educause.edu/articles/2021/11/how-a-president-prioritizes--digital-transformation-on-campus--an-interview-with-astrid-s-tuminez",
  },
];

function Refs({ ns }: { ns: number[] }) {
  return (
    <sup className="ml-1 text-[10px] text-green-400 print:text-black">
      {ns.map((n, i) => (
        <span key={n}>
          {i > 0 ? "," : ""}
          <a href={`#src-${n}`} className="hover:underline">
            [{n}]
          </a>
        </span>
      ))}
    </sup>
  );
}

export default function OnePagerPage() {
  return (
    <div className="min-h-screen bg-gray-950 print:bg-white">
      {/* Animated background (screen only) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none no-print" aria-hidden="true">
        <div className="animate-orb-1 absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-green-900/15 blur-3xl" />
        <div className="animate-orb-2 absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full bg-emerald-900/10 blur-3xl" />
        <div className="animate-orb-3 absolute -bottom-48 left-1/4 w-[450px] h-[450px] rounded-full bg-gray-700/15 blur-3xl" />
      </div>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          html, body { background: #ffffff !important; color: #000000 !important; }
          a { color: #000000 !important; text-decoration: none; }
          .print-text-black, .print-text-black * { color: #000000 !important; }
          .print-bg-white { background: #ffffff !important; }
          .print-border-black { border-color: #000000 !important; }
          .print-no-bg { background: transparent !important; box-shadow: none !important; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
          @page { margin: 0.6in; }
        }
      `}</style>

      {/* Header (hidden on print) */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10 no-print">
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
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span aria-hidden>&larr;</span> Back to Velocity
            </Link>
            <PrintButton />
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 print:py-0 print-page">
        {/* Action row (above the paper) */}
        <div className="flex items-center justify-between mb-6 no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white"
          >
            <span aria-hidden>&larr;</span> Back to Velocity
          </Link>
          <PrintButton />
        </div>

        {/* "Paper" surface */}
        <article
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 print:bg-white print:border-0 print:p-0 print:rounded-none print-no-bg print-text-black"
        >
          {/* Title block */}
          <header className="mb-8 print:mb-4">
            <div
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-3 print:text-black"
            >
              Velocity  AI Academic Advisor
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight print:text-black">
              More students, fewer barriers, faster degrees.
            </h1>
            <p className="text-sm text-gray-500 mt-3 print:text-gray-700">
              One-page leave-behind / deal sheet &middot; May 2026
            </p>
            <p className="text-base text-gray-300 mt-5 leading-relaxed print:text-black">
              Velocity is an AI academic advisor that helps universities lift completion rates
              and give advisors their week back.
            </p>
          </header>

          <hr className="border-gray-800 print:border-gray-300 my-6" />

          {/* Problem */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-white mb-2 print:text-black">The problem</h2>
            <p className="text-sm text-gray-300 leading-relaxed print:text-black">
              The national median academic advisor carries{" "}
              <strong className="text-white print:text-black">296 students</strong>; at large
              public universities the load runs higher.
              <Refs ns={[1]} /> Routine work  prerequisite-checking, degree-audit reading,
              can I take this next?  crowds out the human conversations that actually move
              retention. Meanwhile, every dollar in Utah's public higher-ed system is being
              reallocated under HB 265 toward workforce-aligned, timely-completion outcomes.
              <Refs ns={[2]} /> Advising is the leverage point. Hiring more advisors at scale
              isn't realistic.
            </p>
          </section>

          {/* Solution */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-white mb-2 print:text-black">The solution</h2>
            <p className="text-sm text-gray-300 leading-relaxed print:text-black">
              Velocity sits beside the advisor, not in front of the student alone. It ingests a
              course catalog and a student record (CSV is enough  no SIS integration required
              to start), and within minutes produces a personalized degree path, flags off-track
              students, and answers the routine prerequisite and scheduling questions that
              consume most advisor hours.
            </p>
          </section>

          {/* Three features */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-white mb-3 print:text-black">
              Three key features
            </h2>
            <ol className="space-y-3">
              {FEATURES.map((f, i) => (
                <li key={f.title} className="flex gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white print-text-black print-border-black print:border print:bg-white"
                    style={{ backgroundColor: "#275D38" }}
                  >
                    {i + 1}
                  </span>
                  <div className="text-sm leading-relaxed">
                    <span className="font-semibold text-white print:text-black">
                      {f.title}.
                    </span>{" "}
                    <span className="text-gray-300 print:text-black">{f.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Proof points */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-white mb-3 print:text-black">Proof points</h2>
            <ul className="space-y-2.5">
              {PROOF_POINTS.map((p) => (
                <li key={p.heading} className="text-sm leading-relaxed flex gap-2">
                  <span
                    className="text-green-400 print:text-black mt-1 shrink-0"
                    aria-hidden
                  >
                    &bull;
                  </span>
                  <div>
                    <span className="font-semibold text-white print:text-black">
                      {p.heading}.
                    </span>{" "}
                    <span className="text-gray-300 print:text-black">{p.body}</span>
                    <Refs ns={p.refs} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Pilot ask */}
          <section
            className="mb-6 rounded-xl p-5 border border-green-900/50 bg-green-950/20 print-no-bg print:border print:border-gray-300"
          >
            <h2 className="text-lg font-bold text-white mb-1 print:text-black">The pilot ask</h2>
            <p
              className="text-sm font-semibold mb-3 print:text-black"
              style={{ color: "#4CAF50" }}
            >
              30 days. Zero dollars. Zero integration risk.
            </p>
            <dl className="space-y-2">
              {PILOT_BULLETS.map((b) => (
                <div key={b.label} className="text-sm leading-relaxed">
                  <dt className="inline font-semibold text-white print:text-black">
                    {b.label}:
                  </dt>{" "}
                  <dd className="inline text-gray-300 print:text-black">{b.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Why now */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-white mb-2 print:text-black">Why now</h2>
            <p className="text-sm text-gray-300 leading-relaxed print:text-black">
              UVU is the inflection institution: record 46,809-student enrollment, 41%
              first-generation, president publicly committed to digital transformation, and a
              legislature actively rewarding measurable workforce alignment.
              <Refs ns={[4, 8]} /> The institution that wins a public, defensible AI-advising
              rollout in 2026 sets the template for the rest of USHE and the country.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-white mb-2 print:text-black">Contact</h2>
            <p className="text-sm text-gray-300 leading-relaxed print:text-black">
              [Founder name], CEO &middot; Velocity
              <br />
              [email] &middot; [phone] &middot; velocity.ai
            </p>
            <p className="text-xs text-gray-500 mt-3 italic print:text-gray-700">
              Velocity is built for higher education. We are SOC 2 in progress, FERPA-aligned,
              and contract-ready via Sourcewell.
            </p>
          </section>

          <hr className="border-gray-800 print:border-gray-300 my-6" />

          {/* Sources */}
          <section className="mb-2">
            <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider print:text-black">
              Sources
            </h2>
            <ol className="space-y-1.5 text-xs text-gray-400 print:text-black list-none">
              {SOURCES.map((s) => (
                <li key={s.n} id={`src-${s.n}`} className="leading-snug">
                  <span className="text-gray-500 print:text-black mr-1">[{s.n}]</span>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline print:text-black break-words"
                  >
                    {s.text}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </article>

        {/* CTA (hidden on print) */}
        <section className="mt-10 text-center no-print">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg text-white font-medium transition-opacity hover:opacity-90 shadow-lg shadow-green-900/40"
            style={{ backgroundColor: "#275D38" }}
          >
            Request a pilot &rarr;
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            Pricing, tiers, and the full pilot scope on the{" "}
            <Link href="/pricing" className="text-green-400 hover:text-green-300 underline">
              pricing page
            </Link>
            .
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm no-print">
        <p>Velocity &middot; AI Academic Advising &middot; Built in Utah &middot; &copy; 2026</p>
      </footer>
    </div>
  );
}
