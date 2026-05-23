"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AmbientOrbs } from "../components/AmbientOrbs";

interface StudentRow {
  id: string;
  name: string;
  email: string;
  major: string;
  minor: string | null;
  gpa: number;
  completedCredits: number;
  requiredCredits: number;
  expectedGraduation: string;
}

type RiskLevel = "at-risk" | "watch" | "on-track";

function classifyRisk(s: StudentRow): RiskLevel {
  const pct = s.requiredCredits > 0 ? (s.completedCredits / s.requiredCredits) * 100 : 0;
  if (s.gpa < 2.5) return "at-risk";
  if (s.gpa < 3.0 && pct < 50) return "at-risk";
  if (s.gpa < 3.0 || pct < 40) return "watch";
  return "on-track";
}

const RISK_ORDER: Record<RiskLevel, number> = { "at-risk": 0, watch: 1, "on-track": 2 };

export default function CounselorPortalPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | RiskLevel>("at-risk");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/students")
      .then((r) => r.json())
      .then((data) => {
        setStudents(data.students || []);
        setLoading(false);
      });
  }, []);

  const counts = useMemo(() => {
    const c: Record<RiskLevel, number> = { "at-risk": 0, watch: 0, "on-track": 0 };
    students.forEach((s) => {
      c[classifyRisk(s)] += 1;
    });
    return c;
  }, [students]);

  const sorted = useMemo(() => {
    const withRisk = students.map((s) => ({ ...s, risk: classifyRisk(s) }));
    const byFilter = filter === "all" ? withRisk : withRisk.filter((s) => s.risk === filter);
    const q = query.trim().toLowerCase();
    const byQuery = q
      ? byFilter.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q) ||
            s.major.toLowerCase().includes(q) ||
            s.id.toLowerCase().includes(q)
        )
      : byFilter;
    return byQuery.sort((a, b) => {
      const r = RISK_ORDER[a.risk] - RISK_ORDER[b.risk];
      if (r !== 0) return r;
      return a.gpa - b.gpa;
    });
  }, [students, filter, query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading your caseload...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
      <AmbientOrbs />

      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm"
              style={{ backgroundColor: "#275D38" }}
            >
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">Velocity</span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#275D38", color: "white" }}
                >
                  Counselor
                </span>
              </div>
              <p className="text-xs text-gray-500">Caseload triage &middot; Sample data &middot; FERPA-compliant</p>
            </div>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/portal" className="text-gray-400 hover:text-white transition-colors">
              &larr; Switch role
            </Link>
            <Link href="/admin" className="text-gray-400 hover:text-green-400 transition-colors hidden sm:inline">
              Institution view
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Good morning. Here&apos;s your caseload.</h2>
          <p className="text-gray-500 text-sm mt-1">
            {students.length} students assigned to you. Start with the {counts["at-risk"]} flagged at-risk below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setFilter("at-risk")}
            className={`text-left bg-gray-900/70 backdrop-blur-sm border rounded-xl p-5 transition-all hover:-translate-y-0.5 ${
              filter === "at-risk"
                ? "border-red-700/70 shadow-lg shadow-red-900/20"
                : "border-gray-700/60 hover:border-red-700/40"
            }`}
          >
            <div className="text-3xl font-bold text-red-400">{counts["at-risk"]}</div>
            <div className="text-sm font-medium text-white mt-1">At-risk students</div>
            <div className="text-xs text-gray-500 mt-1">GPA &lt; 2.5 or low credit pace + low GPA</div>
          </button>
          <button
            onClick={() => setFilter("watch")}
            className={`text-left bg-gray-900/70 backdrop-blur-sm border rounded-xl p-5 transition-all hover:-translate-y-0.5 ${
              filter === "watch"
                ? "border-amber-700/70 shadow-lg shadow-amber-900/20"
                : "border-gray-700/60 hover:border-amber-700/40"
            }`}
          >
            <div className="text-3xl font-bold text-amber-400">{counts.watch}</div>
            <div className="text-sm font-medium text-white mt-1">On the watch list</div>
            <div className="text-xs text-gray-500 mt-1">Modest GPA or behind on credits</div>
          </button>
          <button
            onClick={() => setFilter("on-track")}
            className={`text-left bg-gray-900/70 backdrop-blur-sm border rounded-xl p-5 transition-all hover:-translate-y-0.5 ${
              filter === "on-track"
                ? "border-green-700/70 shadow-lg shadow-green-900/20"
                : "border-gray-700/60 hover:border-green-700/40"
            }`}
          >
            <div className="text-3xl font-bold text-green-400">{counts["on-track"]}</div>
            <div className="text-sm font-medium text-white mt-1">On track</div>
            <div className="text-xs text-gray-500 mt-1">No immediate intervention needed</div>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            {(["all", "at-risk", "watch", "on-track"] as const).map((f) => {
              const label =
                f === "all"
                  ? `All (${students.length})`
                  : f === "at-risk"
                  ? `At-risk (${counts["at-risk"]})`
                  : f === "watch"
                  ? `Watch (${counts.watch})`
                  : `On-track (${counts["on-track"]})`;
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                    active
                      ? "text-white border-transparent shadow-md shadow-green-900/30"
                      : "text-gray-300 border-gray-700 bg-gray-900/60 hover:border-gray-500"
                  }`}
                  style={active ? { backgroundColor: "#275D38" } : undefined}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, or major..."
            className="bg-gray-900/70 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 w-full sm:w-64"
          />
        </div>

        <div className="w-full overflow-x-auto bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-900/80 border-b border-gray-800 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Major</th>
                <th className="px-4 py-3 font-medium text-right">GPA</th>
                <th className="px-4 py-3 font-medium text-right">% Complete</th>
                <th className="px-4 py-3 font-medium">Expected grad.</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => {
                const pct =
                  s.requiredCredits > 0
                    ? Math.round((s.completedCredits / s.requiredCredits) * 100)
                    : 0;
                const badgeClass =
                  s.risk === "at-risk"
                    ? "bg-red-900/50 text-red-300 border-red-800/50 shadow-sm shadow-red-900/30"
                    : s.risk === "watch"
                    ? "bg-amber-900/50 text-amber-300 border-amber-800/50"
                    : "bg-green-900/40 text-green-300 border-green-800/50 shadow-sm shadow-green-900/30";
                const label =
                  s.risk === "at-risk" ? "At-risk" : s.risk === "watch" ? "Watch" : "On-track";
                return (
                  <tr
                    key={s.id}
                    className="border-b border-gray-800/70 last:border-0 hover:bg-gray-800/60 transition-all"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/demo?student=${s.id}&role=counselor`}
                        className="text-white font-medium hover:text-green-300"
                      >
                        {s.name}
                      </Link>
                      <div className="text-xs text-gray-500">{s.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {s.major}
                      {s.minor ? <span className="text-gray-500"> &middot; {s.minor}</span> : null}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-200 tabular-nums">
                      {s.gpa.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-200 tabular-nums">{pct}%</td>
                    <td className="px-4 py-3 text-gray-400">{s.expectedGraduation}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded border ${badgeClass}`}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Link
                        href={`/demo?student=${s.id}&role=counselor`}
                        className="text-xs font-medium text-green-400 hover:text-green-300"
                      >
                        Open profile &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                    No students match this filter or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-600 mt-4 leading-relaxed">
          Risk classification is a transparent heuristic on this sample (GPA + credit-pace).
          Production deployments use your institution&apos;s own retention model — Civitas predicted-success scores, EAB Navigate flags, or a custom rule set.
        </p>
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; Counselor caseload &middot; FERPA-compliant</p>
        <p className="mt-1 text-gray-600">Sample data only. No real student records are stored.</p>
      </footer>
    </div>
  );
}
