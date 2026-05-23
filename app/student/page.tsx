"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AmbientOrbs } from "../components/AmbientOrbs";

interface MinimalStudent {
  id: string;
  name: string;
  email: string;
  uvid?: string;
}

const SAMPLE_HINT = "10847231";

export default function StudentLookupPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [students, setStudents] = useState<MinimalStudent[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    fetch("/api/students")
      .then((r) => r.json())
      .then((data) => setStudents(data.students || []))
      .catch(() => {});
  }, []);

  function findStudent(raw: string): MinimalStudent | null {
    const q = raw.trim().toLowerCase();
    if (!q) return null;
    return (
      students.find((s) => s.uvid && s.uvid.toLowerCase() === q) ||
      students.find((s) => s.id.toLowerCase() === q) ||
      students.find((s) => s.email.toLowerCase() === q) ||
      students.find((s) => s.name.toLowerCase() === q) ||
      null
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSearching(true);
    const match = findStudent(input);
    if (match) {
      window.location.href = `/demo?student=${match.id}&role=student`;
      return;
    }
    setSearching(false);
    setError(
      `No student found for "${input}". Try a UVID like ${SAMPLE_HINT}, or use sample data below.`
    );
  }

  function useSample() {
    const sample = students.find((s) => s.id === "STU-001") || students[0];
    if (sample) {
      window.location.href = `/demo?student=${sample.id}&role=student`;
    }
  }

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
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white leading-tight">Velocity</span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#275D38", color: "white" }}
                >
                  Student
                </span>
              </div>
              <div className="text-[11px] text-gray-500 leading-tight">Your AI academic advisor</div>
            </div>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/portal" className="text-gray-400 hover:text-white transition-colors">
              &larr; Switch role
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 relative">
        <div className="text-center mb-10">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-green-400 mb-4">
            Student Sign-in
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up">
            Enter your Student ID
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:120ms]">
            We&apos;ll look up your degree plan, GPA, course recommendations, and career matches.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-6 md:p-8 animate-fade-in-up-delay-1"
        >
          <label htmlFor="student-id" className="block text-sm font-medium text-gray-300 mb-2">
            Student ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={inputRef}
              id="student-id"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 10847231"
              autoComplete="off"
              className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white text-base placeholder-gray-600 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors"
            />
            <button
              type="submit"
              disabled={searching || !input.trim()}
              className="px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#275D38" }}
            >
              {searching ? "Looking up..." : "Continue"}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            <span className="text-gray-400 font-medium">UVID</span> at UVU.{" "}
            <span className="text-gray-400 font-medium">Banner ID</span> at most other institutions.{" "}
            <span className="text-gray-400 font-medium">Star ID</span> in the Minnesota State system.
            Velocity matches the field your registrar uses.
          </p>

          {error && (
            <div className="mt-4 bg-red-950/40 border-l-4 border-red-700 rounded-r-md px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </form>

        <div className="mt-6 bg-gray-900/40 border border-gray-800 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an ID handy?{" "}
            <button
              onClick={useSample}
              className="text-green-400 hover:text-green-300 font-medium underline-offset-2 hover:underline"
            >
              Try with sample student data &rarr;
            </button>
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { t: "Your 4-year plan", d: "Sequenced by prereqs, optimized for graduation" },
            { t: "Course recommendations", d: "What to register for next semester" },
            { t: "Career matches", d: "Skills mapped to live labor-market data" },
          ].map((f) => (
            <div key={f.t} className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-semibold text-white">{f.t}</div>
              <div className="text-xs text-gray-500 mt-1 leading-snug">{f.d}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-12 leading-relaxed max-w-lg mx-auto">
          FERPA-compliant. In production, Velocity authenticates students via your institution&apos;s SSO
          (Okta, Entra, Shibboleth) — this demo uses a direct ID lookup for evaluation purposes only.
        </p>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; AI Academic Advising &middot; FERPA-compliant</p>
      </footer>
    </div>
  );
}
