"use client";

import { useEffect, useMemo, useState } from "react";
import { AmbientOrbs } from "../../components/AmbientOrbs";

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
  // Transparent heuristic: low GPA flags at-risk; modest GPA + low progress flags watch.
  if (s.gpa < 2.5) return "at-risk";
  if (s.gpa < 3.0 && pct < 50) return "at-risk";
  if (s.gpa < 3.0 || pct < 40) return "watch";
  return "on-track";
}

const RISK_ORDER: Record<RiskLevel, number> = { "at-risk": 0, watch: 1, "on-track": 2 };

export default function StudentsListPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | RiskLevel>("all");

  useEffect(() => {
    fetch("/api/students")
      .then((r) => r.json())
      .then((data) => {
        setStudents(data.students || []);
        setLoading(false);
      });
  }, []);

  const sorted = useMemo(() => {
    const withRisk = students.map((s) => ({ ...s, risk: classifyRisk(s) }));
    const filtered = filter === "all" ? withRisk : withRisk.filter((s) => s.risk === filter);
    return filtered.sort((a, b) => {
      const r = RISK_ORDER[a.risk] - RISK_ORDER[b.risk];
      if (r !== 0) return r;
      return a.gpa - b.gpa;
    });
  }, [students, filter]);

  const counts = useMemo(() => {
    const c = { "at-risk": 0, watch: 0, "on-track": 0 } as Record<RiskLevel, number>;
    students.forEach((s) => {
      c[classifyRisk(s)] += 1;
    });
    return c;
  }, [students]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
      <AmbientOrbs />
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm"
              style={{ backgroundColor: "#275D38" }}
            >
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Velocity</h1>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#275D38", color: "white" }}
                >
                  Admin
                </span>
              </div>
              <p className="text-xs text-gray-500">Student roster &middot; Sample data &middot; FERPA-compliant</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="/admin" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
              &larr; Back to analytics
            </a>
            <a href="/demo" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
              Student View
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Student Roster</h2>
            <p className="text-gray-500 text-sm">
              {students.length} students in the loaded sample. At-risk students are sorted to the top.
            </p>
          </div>
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-150 ${
                    active
                      ? "text-white border-transparent shadow-md shadow-green-900/30"
                      : "text-gray-300 border-gray-700 bg-gray-900 hover:border-gray-500"
                  }`}
                  style={active ? { backgroundColor: "#275D38" } : undefined}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-900/80 border-b border-gray-800 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
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
                      className="border-b border-gray-800/70 last:border-0 hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-150"
                    >
                      <td className="px-4 py-3">
                        <a href={`/demo?student=${s.id}`} className="text-white font-medium hover:text-green-300">
                          {s.name}
                        </a>
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
                      <td className="px-4 py-3 text-right">
                        <a
                          href={`/demo?student=${s.id}`}
                          className="text-xs font-medium text-green-400 hover:text-green-300"
                        >
                          Open &rarr;
                        </a>
                      </td>
                    </tr>
                  );
                })}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No students match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          Risk classification is a transparent heuristic on this sample (GPA and credit-pace).
          Production deployments use the institution&apos;s own retention model.
        </p>
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; Advisor &amp; institution analytics &middot; FERPA-compliant</p>
        <p className="mt-1 text-gray-600">Demo uses sample student data. No real student records are stored.</p>
      </footer>
    </div>
  );
}
