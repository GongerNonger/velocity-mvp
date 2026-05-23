import Link from "next/link";
import { pricingTiers } from "../api/store";
import { AmbientOrbs } from "../components/AmbientOrbs";
import { ROICalculator } from "../components/ROICalculator";

const TIER_FEATURES = [
  { label: "Unlimited student plans", all: true },
  { label: "Personalized course recommendations", all: true },
  { label: "Risk detection &amp; alerts", all: true },
  { label: "Career pathway matching", all: true },
  { label: "AI advisor chat", all: true },
  { label: "4-year plan view", all: true },
  { label: "Admin analytics dashboard", all: true },
  { label: "SSO (Okta / Entra / Shibboleth)", all: true },
  { label: "SCIM provisioning", all: true },
  { label: "Banner / DegreeWorks integration", small: false, mid: true, large: true },
  { label: "Canvas LMS engagement signal", small: false, mid: true, large: true },
  { label: "Salesforce / Slate case sync", small: false, mid: false, large: true },
  { label: "Lightcast labor-market data", small: false, mid: true, large: true },
  { label: "Custom branding + subdomain", small: false, mid: true, large: true },
  { label: "Dedicated customer success manager", small: false, mid: false, large: true },
  { label: "Quarterly executive readouts", small: false, mid: false, large: true },
  { label: "Per-customer encryption keys", small: false, mid: false, large: true },
  { label: "On-prem / VPC option", small: false, mid: false, large: true },
];

interface FAQEntry {
  q: string;
  a: string;
}

const PRICING_FAQ: FAQEntry[] = [
  {
    q: "Is the per-student fee charged for every enrolled student or just active users?",
    a: "Per enrolled student in the contracted population (the population you scope at signing  e.g., undergraduates, a specific college). We don't meter on logins because that punishes the institution if Velocity's adoption ramp lags.",
  },
  {
    q: "Are there setup or integration fees?",
    a: "No setup fee for CSV-based pilots. Full Banner + Canvas integration is included in the platform fee at the Mid and Large tiers. Small-tier customers can opt into integration at $25K one-time.",
  },
  {
    q: "What does a multi-year contract look like?",
    a: "3-year contracts get a 10% discount on the platform fee and lock per-student pricing against inflation. 5-year contracts get 15%. State-system / consortium pricing is negotiated separately.",
  },
  {
    q: "Can we pay from grant funding?",
    a: "Yes  many of our pilot customers fund the first year from Title III, Title V, completion-grant funds, or workforce-alignment grants. We provide an SOW formatted for grant compliance.",
  },
  {
    q: "What's covered by the pilot vs. the full contract?",
    a: "The 30-day pilot is free, scoped to one college (typically ~300 students), CSV-only, and includes student dashboard + advisor admin view. The full contract adds Banner/Canvas integration, SSO, SLAs, and the support package.",
  },
  {
    q: "How do you compare to Civitas / EAB Navigate on cost?",
    a: "Velocity's $25/student is in line with EAB Navigate ($20-35/student in market) and above Advisor.AI ($10-15/student, but no career-matching or risk engine). We're priced under Civitas's typical $30-50/student fully-loaded ACV. Public references on competitive deals available under NDA.",
  },
  {
    q: "What if our enrollment grows mid-contract?",
    a: "Up to 10% enrollment growth is included. Beyond that, per-student pricing applies on the overage at the contracted rate (not list).",
  },
  {
    q: "FERPA / SOC 2 / data residency  what's the story?",
    a: "FERPA-compliant from day one (school official with legitimate educational interest under our DPA). SOC 2 Type II audit on the 2026 roadmap. US-East AWS by default; Azure Gov Cloud and VPC deployment available at the Large tier. Full details on the Integrations page.",
  },
];

export const metadata = {
  title: "Pricing  Velocity",
  description: "Transparent platform fee + per-student. Three tiers. No hidden integration costs.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Animated background */}
      <AmbientOrbs />
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
            <Link href="/pricing" className="text-white border-b border-green-700 hidden sm:inline">Pricing</Link>
            <Link href="/integrations" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">Integrations</Link>
            <Link href="/demo" className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#275D38" }}>
              See Live Demo &rarr;
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="text-center mb-14">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-4">
            Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Pricing that scales with enrollment.
          </h1>
          <p className="text-lg text-gray-400 mt-5 max-w-2xl mx-auto">
            One platform fee. A per-student fee. Volume discounts at every tier. No five-figure setup invoice.
          </p>
        </section>

        {/* Tier cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pricingTiers.map((tier) => {
            const highlight = tier.name === "Mid";
            return (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 bg-gray-900/70 backdrop-blur-sm border transition-all duration-300 ${highlight ? "border-green-700 ring-1 ring-green-700/50 shadow-lg shadow-green-900/20" : "border-gray-700/60 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10"} relative ${highlight ? "md:scale-105" : ""}`}
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
                  <div className="text-5xl font-black text-white">${(tier.platformFee / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-500 mt-1">per year platform fee</div>
                </div>
                <div className="mt-3 text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4CAF50" }} />
                  <span>+ ${tier.perStudent} / student / year</span>
                </div>
                <p className="text-sm text-gray-400 mt-4 italic">{tier.description}</p>
                <Link
                  href={`/?source=pricing-${tier.name.toLowerCase()}#request`}
                  className={`block text-center w-full mt-6 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    highlight
                      ? "text-white hover:opacity-90"
                      : "text-white border border-gray-700 hover:border-gray-500"
                  }`}
                  style={highlight ? { backgroundColor: "#275D38" } : undefined}
                >
                  Request a pilot
                </Link>
              </div>
            );
          })}
        </section>

        {/* ROI Calculator */}
        <section className="mb-16">
          <ROICalculator defaultStudents={20000} />
        </section>

        {/* Feature comparison table */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What&apos;s in each tier</h2>
          <p className="text-sm text-gray-400 mb-6">Every tier gets the core product. Larger tiers add integrations, support, and security options.</p>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-900">
                <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-5 py-3 font-medium">Feature</th>
                  <th className="px-5 py-3 font-medium text-center">Small</th>
                  <th className="px-5 py-3 font-medium text-center" style={{ color: "#4CAF50" }}>Mid</th>
                  <th className="px-5 py-3 font-medium text-center">Large</th>
                </tr>
              </thead>
              <tbody>
                {TIER_FEATURES.map((f, i) => {
                  const small = f.all || f.small;
                  const mid = f.all || f.mid;
                  const large = f.all || f.large;
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-950" : "bg-gray-900/40"}>
                      <td className="px-5 py-3 text-gray-200" dangerouslySetInnerHTML={{ __html: f.label }} />
                      <td className="px-5 py-3 text-center">{small ? <Check /> : <Dash />}</td>
                      <td className="px-5 py-3 text-center">{mid ? <Check /> : <Dash />}</td>
                      <td className="px-5 py-3 text-center">{large ? <Check /> : <Dash />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Pricing FAQ</h2>
          <div className="space-y-3">
            {PRICING_FAQ.map((entry, i) => (
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

        {/* CTA */}
        <section className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Request a 30-day pilot.</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            One college. One CSV. 72 hours to live. We&apos;ll send a scoping doc tailored to your institution within 1 business day.
          </p>
          <Link
            href="/?source=pricing-cta#request"
            className="inline-flex items-center gap-2 px-7 py-4 mt-8 rounded-lg text-white font-medium transition-opacity hover:opacity-90 shadow-lg shadow-green-900/40"
            style={{ backgroundColor: "#275D38" }}
          >
            Request a pilot &rarr;
          </Link>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm space-y-2">
        <p>
          <Link href="/one-pager" className="text-green-400 hover:text-green-300">
            Download our one-pager &rarr;
          </Link>
        </p>
        <p>Velocity &middot; AI Academic Advising &middot; Built in Utah &middot; &copy; 2026</p>
      </footer>
    </div>
  );
}

function Check() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ backgroundColor: "rgba(39, 93, 56, 0.3)", color: "#4CAF50" }}>
      <span className="text-xs">&check;</span>
    </span>
  );
}
function Dash() {
  return <span className="text-gray-700">&ndash;</span>;
}
