"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AmbientOrbs } from "../../../components/AmbientOrbs";

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  department: string;
  skillsTaught: string[];
  description: string;
}

interface SemesterPlan {
  label: string;
  term: "Fall" | "Spring";
  year: number;
  status: "completed" | "current" | "future";
  courses: { course: Course; reasoning: string }[];
  totalCredits: number;
}

interface FourYearPlan {
  studentId: string;
  semesters: SemesterPlan[];
  totalPlannedCredits: number;
  projectedGraduation: string;
  onTrack: boolean;
}

interface Student {
  id: string;
  name: string;
  major: string;
  college: string;
  expectedGraduation: string;
  completedCredits: number;
  requiredCredits: number;
  gpa: number;
}

export default function PlanPage() {
  const params = useParams<{ studentId: string }>();
  const studentId = params.studentId;
  const [plan, setPlan] = useState<FourYearPlan | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/students/${studentId}/plan`).then((r) => r.json()),
      fetch(`/api/students/${studentId}`).then((r) => r.json()),
    ]).then(([planRes, studentRes]) => {
      setPlan(planRes.plan);
      setStudent(studentRes.student);
      setLoading(false);
    });
  }, [studentId]);

  if (loading || !plan || !student) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-green-400 text-xl">Building your 4-year plan...</div>
      </div>
    );
  }

  const statusColor = (s: SemesterPlan["status"]) =>
    s === "completed"
      ? "bg-gray-800/50 border-gray-800"
      : s === "current"
      ? "border-green-700 ring-1 ring-green-600/50 shadow-md shadow-green-900/20"
      : "bg-gray-900 border-gray-800";

  return (
    <div className="relative min-h-screen bg-gray-950">
      <AmbientOrbs />
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#275D38" }}>
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Velocity</h1>
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "#275D38", color: "white" }}>
                  4-Year Plan
                </span>
              </div>
              <p className="text-xs text-gray-500">{student.name} &middot; {student.major}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/demo" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
              &larr; Back to dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">4-Year Degree Plan</h2>
              <p className="text-gray-400 text-sm mt-1">
                AI-generated path to graduation for {student.name}. Required courses prioritized, electives align with career goals.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{plan.semesters.length}</div>
                <div className="text-xs text-gray-500">Semesters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">{plan.projectedGraduation}</div>
                <div className="text-xs text-gray-500">Target Graduation</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${plan.onTrack ? "text-green-400" : "text-amber-400"}`}>
                  {plan.onTrack ? "On Track" : "Needs Attention"}
                </div>
                <div className="text-xs text-gray-500">Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gray-800 border border-gray-800" /> Completed
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded border-2" style={{ borderColor: "#275D38" }} /> Current
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gray-900 border border-gray-800" /> AI-planned
          </span>
        </div>

        {/* Semester grid - 2 rows x 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plan.semesters.map((sem, i) => (
            <div
              key={i}
              className={`rounded-xl border-2 p-4 min-h-[320px] flex flex-col hover:-translate-y-0.5 transition-transform duration-200 ${statusColor(sem.status)}`}
              style={sem.status === "current" ? { backgroundColor: "rgba(39, 93, 56, 0.08)" } : undefined}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className={`text-sm font-semibold ${sem.status === "completed" ? "text-gray-500" : "text-white"}`}>
                    {sem.label}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">
                    {sem.status === "current" ? "In progress" : sem.status === "completed" ? "Completed" : "Planned"}
                  </div>
                </div>
                {sem.totalCredits > 0 && (
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">{sem.totalCredits} cr</span>
                )}
              </div>

              <div className="flex-1 space-y-2">
                {sem.status === "completed" && sem.courses.length === 0 && (
                  <p className="text-xs text-gray-500 italic mt-2">Credits earned (course history hidden)</p>
                )}
                {sem.courses.map((c, j) => (
                  <div
                    key={j}
                    className="rounded-lg p-2.5 border"
                    style={{ backgroundColor: "rgba(39, 93, 56, 0.1)", borderColor: "rgba(39, 93, 56, 0.3)" }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-mono" style={{ color: "#4CAF50" }}>{c.course.code}</div>
                        <div className="text-sm text-white font-medium leading-snug truncate">{c.course.name}</div>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{c.course.credits}cr</span>
                    </div>
                  </div>
                ))}
                {sem.status !== "completed" && sem.courses.length === 0 && (
                  <p className="text-xs text-gray-600 italic mt-2">Open for electives</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer card */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">How this plan was generated</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Velocity AI analyzed {student.name}&apos;s {student.completedCredits}/{student.requiredCredits} completed
            credits, current skill profile, career goals, and {student.major} degree requirements at UVU. Required courses are
            scheduled first; electives are chosen to close skill gaps for the student&apos;s top career match. Each semester
            targets ~15 credits to graduate by {plan.projectedGraduation}.
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; AI Academic Advising</p>
      </footer>
    </div>
  );
}
