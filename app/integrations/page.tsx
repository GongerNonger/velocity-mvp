import Link from "next/link";

interface Integration {
  name: string;
  category: "SIS" | "LMS" | "Degree Audit" | "Identity" | "Labor Market" | "CRM";
  pitch: string;
  detail: string;
  status: "Available" | "Beta" | "Roadmap";
  deployTime: string;
  dataFlow: string[];
}

const INTEGRATIONS: Integration[] = [
  {
    name: "Ellucian Banner",
    category: "SIS",
    pitch: "The student record system that runs ~1,400 institutions, including UVU.",
    detail:
      "Velocity reads student demographics, enrollment status, completed courses, GPA, and degree audit data via Banner's REST APIs or a nightly delta CSV export. We never write back to Banner  it remains the source of truth. SSL + IP allowlisting on both sides.",
    status: "Available",
    deployTime: "2 weeks with Banner-admin access; 30 minutes via CSV-only pilot",
    dataFlow: ["Student demographics", "Enrollment status", "Completed courses + grades", "Degree audit (DegreeWorks/Wolverine Track)", "Major/minor history"],
  },
  {
    name: "Instructure Canvas",
    category: "LMS",
    pitch: "Real-time signal from the LMS UVU and 60% of US higher ed already use.",
    detail:
      "Canvas Live Events + REST API give Velocity engagement signal (assignment submissions, login frequency, last activity per course). We use this to refine the risk-alert engine  a student missing assignments in week 4 gets flagged before midterm grades hit.",
    status: "Available",
    deployTime: "1 week via Canvas Developer Key  no LTI install required",
    dataFlow: ["Course enrollment", "Assignment submission timing", "Course-level engagement", "Last activity timestamps", "Discussion participation (optional)"],
  },
  {
    name: "Ellucian DegreeWorks / Wolverine Track",
    category: "Degree Audit",
    pitch: "Velocity reads the same degree audit your advisors already trust.",
    detail:
      "Rather than building a parallel rules engine, Velocity ingests DegreeWorks block requirements and treats them as authoritative. Students see their plan in our UI; advisors confirm it in the system they already use. No change management.",
    status: "Available",
    deployTime: "Same engagement as Banner  shared credential",
    dataFlow: ["Block requirements per major", "Substitutions/exceptions", "Audit results per student", "What-if scenarios"],
  },
  {
    name: "Lightcast (formerly Burning Glass + EMSI)",
    category: "Labor Market",
    pitch: "Real labor-market data behind every career match  not a static table.",
    detail:
      "Velocity's career pathway feature is powered by Lightcast's occupation taxonomy + skills graph + monthly job-posting data. When a student sees \"Cloud Engineer  $135K  +30% growth,\" those numbers update with the market. Local job postings within 50 miles of campus surface to students by default.",
    status: "Available",
    deployTime: "Customer-of-customer license arrangement available",
    dataFlow: ["BLS occupation codes", "Real-time job postings by region", "Skills graph", "Wage data by metro", "Top employers per occupation"],
  },
  {
    name: "Okta / Microsoft Entra / Shibboleth",
    category: "Identity",
    pitch: "SSO from day one. SCIM provisioning. Audit-ready logs.",
    detail:
      "SAML 2.0 and OIDC are first-class. Most R1 and regional universities are on Okta, Entra ID, or Shibboleth  Velocity speaks all three. SCIM 2.0 handles provisioning so an advisor leaving HR triggers an automatic deactivation in Velocity within minutes.",
    status: "Available",
    deployTime: "1 day with IdP admin access",
    dataFlow: ["User identity + role", "Group membership (advisors, students, deans)", "Deprovisioning events"],
  },
  {
    name: "Salesforce Education Cloud / Slate",
    category: "CRM",
    pitch: "Push at-risk-student tickets directly into the system advisors live in.",
    detail:
      "When Velocity flags a student, we can create a Salesforce Case (or Slate Person Record event) so the advisor's existing inbox/queue surfaces it. Two-way sync keeps status in lockstep. Optional.",
    status: "Beta",
    deployTime: "2 weeks via Salesforce Connected App or Slate webhook config",
    dataFlow: ["Outbound: at-risk alerts, recommended actions, plan changes", "Inbound: advisor outreach status, case resolution"],
  },
  {
    name: "Civitas Learning (read-only co-existence)",
    category: "Degree Audit",
    pitch: "Already on Civitas? Velocity is the AI student-facing layer on top.",
    detail:
      "Velocity does not require ripping out Civitas. We can ingest Civitas's predicted-success scores via their REST API and use them as one input to our risk engine alongside GPA, credit pace, and engagement. Net effect: institutions get the modern student-facing UI + AI chat without a re-RFP.",
    status: "Roadmap",
    deployTime: "Pilot Q3 2026",
    dataFlow: ["Civitas predicted-success scores per student", "Intervention recommendations (read-only)"],
  },
];

const CATEGORY_ORDER: Integration["category"][] = ["SIS", "LMS", "Degree Audit", "Identity", "Labor Market", "CRM"];

const SECURITY = [
  { label: "FERPA", detail: "Student records handled under FERPA. Velocity is a school official with legitimate educational interest under the data-sharing agreement we sign at contract." },
  { label: "SOC 2 Type II", detail: "Audit on the 2026 roadmap. Pilot deployments operate under our internal control framework + a customer-supplied DPA. Status disclosed before contract." },
  { label: "Data residency", detail: "All student PII stays in US-East AWS regions. Multi-region or cloud-of-choice (Azure Gov Cloud) available for state-system contracts." },
  { label: "LLM non-training clause", detail: "If Velocity uses LLMs in your deployment, contractually no prompts or completions are used to train provider models. We use enterprise tiers with zero-retention agreements." },
  { label: "Encryption", detail: "TLS 1.2+ in transit. AES-256 at rest. KMS-managed keys; per-customer key option for Enterprise tier." },
];

export const metadata = {
  title: "Integrations  Velocity",
  description: "Banner, Canvas, DegreeWorks, Lightcast, Okta, Salesforce  the systems Velocity speaks to.",
};

export default function IntegrationsPage() {
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
            <Link href="/integrations" className="text-white border-b border-green-700 hidden sm:inline">Integrations</Link>
            <Link href="/demo" className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#275D38" }}>
              See Live Demo &rarr;
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-4">
            Integrations
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Plugs into the stack your campus already runs.
          </h1>
          <p className="text-lg text-gray-400 mt-5 max-w-2xl mx-auto">
            Banner, Canvas, DegreeWorks, Okta, Salesforce, Lightcast  Velocity is a layer, not a replacement.
            Most pilots start with a CSV export and reach full Banner integration inside 30 days.
          </p>
        </section>

        {/* Architecture diagram */}
        <section className="mb-16">
          <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-10">
            <h2 className="text-xl font-bold text-white mb-6 text-center">How data flows on a typical campus</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              <ArchColumn
                title="Source systems"
                items={["Banner SIS", "Canvas LMS", "DegreeWorks", "Okta / Entra", "Lightcast"]}
                color="rgba(75, 85, 99, 0.4)"
                border="rgb(55 65 81)"
              />
              <ArchColumn
                title="Velocity engine"
                items={["Ingest + normalize", "Risk + progress scoring", "Course + career matching", "AI chat", "Advisor analytics"]}
                color="rgba(39, 93, 56, 0.18)"
                border="rgba(39, 93, 56, 0.6)"
                highlight
              />
              <ArchColumn
                title="Destinations"
                items={["Student dashboard", "Advisor inbox", "Salesforce / Slate cases", "Weekly exec report", "API for downstream tools"]}
                color="rgba(75, 85, 99, 0.4)"
                border="rgb(55 65 81)"
              />
            </div>
            <p className="text-xs text-gray-500 mt-6 text-center">
              Read-only against your SIS by default. Velocity never overwrites student records.
            </p>
          </div>
        </section>

        {/* Integration cards */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Every integration, in detail</h2>
          {CATEGORY_ORDER.map((category) => (
            <div key={category} className="mb-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {INTEGRATIONS.filter((i) => i.category === category).map((i) => (
                  <article key={i.name} className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 rounded-xl p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="text-lg font-semibold text-white">{i.name}</h4>
                      <StatusPill status={i.status} />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3 italic">{i.pitch}</p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{i.detail}</p>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Typical data flow</div>
                    <ul className="text-xs text-gray-400 space-y-1 mb-4">
                      {i.dataFlow.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="text-green-400 mt-1">&bull;</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-800 pt-3">
                      <div className="text-xs text-gray-500">
                        <span className="text-gray-400">Deploy time:</span> {i.deployTime}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Security & compliance */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Security &amp; compliance</h2>
          <p className="text-gray-400 mb-8 max-w-2xl">
            Higher ed buyers ask these five questions before any pilot. Here&apos;s where we stand today.
          </p>
          <div className="space-y-3">
            {SECURITY.map((s) => (
              <div key={s.label} className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 hover:border-green-700/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 rounded-xl p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="md:w-48 shrink-0">
                    <span className="text-sm font-semibold text-white">{s.label}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pilot path */}
        <section className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            The fastest path to value: a 30-day CSV pilot.
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            We don&apos;t require Banner integration to start. Give us a one-time anonymized CSV of one
            college&apos;s students and Velocity is live in your environment within 72 hours.
            Full SIS integration follows on a normal procurement timeline if the pilot proves out.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-7 py-4 mt-8 rounded-lg text-white font-medium transition-opacity hover:opacity-90 shadow-lg shadow-green-900/40"
            style={{ backgroundColor: "#275D38" }}
          >
            See the live demo &rarr;
          </Link>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; AI Academic Advising &middot; Built in Utah &middot; &copy; 2026</p>
      </footer>
    </div>
  );
}

function StatusPill({ status }: { status: Integration["status"] }) {
  const styles =
    status === "Available"
      ? { bg: "rgba(39, 93, 56, 0.2)", color: "#81C784", border: "rgba(39, 93, 56, 0.5)" }
      : status === "Beta"
      ? { bg: "rgba(180, 130, 0, 0.2)", color: "#FBBF24", border: "rgba(180, 130, 0, 0.5)" }
      : { bg: "rgba(55, 65, 81, 0.5)", color: "rgb(156 163 175)", border: "rgb(75 85 99)" };
  return (
    <span
      className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border shrink-0"
      style={{ backgroundColor: styles.bg, color: styles.color, borderColor: styles.border }}
    >
      {status}
    </span>
  );
}

function ArchColumn({
  title,
  items,
  color,
  border,
  highlight,
}: {
  title: string;
  items: string[];
  color: string;
  border: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-xl border-2 p-5"
      style={{ backgroundColor: color, borderColor: border }}
    >
      <div className={`text-xs uppercase tracking-wider font-semibold mb-3 ${highlight ? "text-green-300" : "text-gray-400"}`}>
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={`text-sm rounded-md px-3 py-2 ${highlight ? "bg-gray-950/40 border border-green-900/40 text-white font-medium" : "bg-gray-950/40 border border-gray-800 text-gray-300"}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
