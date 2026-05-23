"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AmbientOrbs } from "../../components/AmbientOrbs";

interface ColumnMatch {
  field: string;
  matchedHeader: string | null;
  required: boolean;
}

interface PreviewRow {
  rowIndex: number;
  partial: Record<string, unknown>;
  errors: string[];
  warnings: string[];
}

interface Preview {
  filename: string;
  delimiter: string;
  headers: string[];
  resolved: ColumnMatch[];
  rows: PreviewRow[];
  summary: { rows: number; valid: number; errors: number; warnings: number };
}

interface CommitResult {
  inserted: number;
  updated: number;
  skipped: number;
  totalNow: number;
  skippedDetails: { rowIndex: number; reason: string }[];
}

const PREVIEW_ROW_LIMIT = 50;

export default function ImportPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pasted, setPasted] = useState<string>("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [committed, setCommitted] = useState<CommitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  async function runPreview() {
    setError(null);
    setCommitted(null);
    setWorking(true);
    try {
      const body = await buildBody("preview");
      const res = await fetch("/api/import", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Preview failed");
      setPreview(data.preview);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Preview failed");
    } finally {
      setWorking(false);
    }
  }

  async function runCommit() {
    if (!preview) return;
    setError(null);
    setWorking(true);
    try {
      const body = await buildBody("commit");
      const res = await fetch("/api/import", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Commit failed");
      setCommitted(data.result);
      setPreview(data.preview);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Commit failed");
    } finally {
      setWorking(false);
    }
  }

  async function buildBody(mode: "preview" | "commit"): Promise<FormData | string> {
    if (file) {
      const form = new FormData();
      form.append("file", file);
      form.append("mode", mode);
      return form;
    }
    return JSON.stringify({ csv: pasted, mode });
  }

  function reset() {
    setFile(null);
    setPasted("");
    setPreview(null);
    setCommitted(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  const hasInput = file !== null || pasted.trim().length > 0;

  return (
    <div className="relative min-h-screen bg-gray-950">
      <AmbientOrbs />
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#275D38" }}>
                V
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">Velocity</h1>
                  <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "#275D38", color: "white" }}>
                    Admin
                  </span>
                </div>
                <p className="text-xs text-gray-500">CSV import &middot; SIS data ingestion</p>
              </div>
            </Link>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
            &larr; Back to analytics
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Import students from your SIS</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-3xl">
            Upload a CSV exported from Banner, DegreeWorks, Cognos, or any system that can produce a flat student-record file.
            Velocity recognizes both friendly column names (Name, Email, GPA) and Banner field codes (SPRIDEN_LAST_NAME,
            SHRTGPA_GPA). Bad rows are flagged and skipped; valid rows are merged into the demo store on commit.
          </p>
          <div className="mt-3 flex gap-3 text-sm">
            <a
              href="/api/import/template"
              className="text-green-400 hover:text-green-300 inline-flex items-center gap-1"
              download
            >
              Download sample CSV template &rarr;
            </a>
          </div>
        </div>

        {/* Input section */}
        {!preview && (
          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">1. Provide the file</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-wide text-gray-400 font-medium block mb-2">Upload a file</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-green-600/60 transition-colors duration-200">
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".csv,text/csv,text/plain"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      setFile(f);
                      if (f) setPasted("");
                    }}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-gray-100 hover:file:bg-gray-700 file:cursor-pointer"
                  />
                  {file && (
                    <div className="mt-3 text-xs text-gray-400">
                      Selected: <span className="text-white font-medium">{file.name}</span> &middot; {(file.size / 1024).toFixed(1)} KB
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide text-gray-400 font-medium block mb-2">Or paste CSV text</label>
                <textarea
                  value={pasted}
                  onChange={(e) => {
                    setPasted(e.target.value);
                    if (e.target.value) setFile(null);
                  }}
                  rows={6}
                  placeholder={"Name,Email,Major,GPA\nJane Doe,jdoe@u.edu,Computer Science,3.5"}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 font-mono focus:outline-none focus:border-green-600"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={runPreview}
                disabled={!hasInput || working}
                className="px-5 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity disabled:opacity-50"
                style={{ backgroundColor: "#275D38" }}
              >
                {working ? "Parsing..." : "Preview import"}
              </button>
              <button
                onClick={reset}
                disabled={working || !hasInput}
                className="px-5 py-2.5 rounded-lg text-gray-300 text-sm border border-gray-700 hover:border-gray-500 transition-colors disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          </section>
        )}

        {/* Commit confirmation banner */}
        {committed && (
          <section className="bg-green-950/30 border border-green-800 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl" style={{ color: "#4CAF50" }}>&check;</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Import committed</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {committed.inserted} new students inserted &middot; {committed.updated} existing records updated &middot;{" "}
                  {committed.skipped} rows skipped due to errors &middot; total population now {committed.totalNow}.
                </p>
                <div className="mt-4 flex gap-3">
                  <Link href="/admin" className="text-sm text-green-400 hover:text-green-300">View analytics &rarr;</Link>
                  <Link href="/demo" className="text-sm text-green-400 hover:text-green-300">Open the demo &rarr;</Link>
                  <button onClick={reset} className="text-sm text-gray-400 hover:text-white">Import another file</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Preview section */}
        {preview && (
          <section className="space-y-6 mb-10">
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Rows in file" value={preview.summary.rows} tone="neutral" />
              <Stat label="Valid rows" value={preview.summary.valid} tone="positive" />
              <Stat label="Errors" value={preview.summary.errors} tone={preview.summary.errors > 0 ? "negative" : "neutral"} />
              <Stat label="Warnings" value={preview.summary.warnings} tone={preview.summary.warnings > 0 ? "warn" : "neutral"} />
            </div>

            {/* Column mapping */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">2. Field mapping</h3>
              <p className="text-sm text-gray-400 mb-4">
                Velocity matched <span className="text-white">{preview.resolved.filter((r) => r.matchedHeader).length}</span> of{" "}
                <span className="text-white">{preview.resolved.length}</span> known fields from your file&apos;s headers
                (detected delimiter: <code className="text-gray-200">{prettyDelim(preview.delimiter)}</code>).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {preview.resolved.map((r) => (
                  <div
                    key={r.field}
                    className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-sm ${
                      r.matchedHeader
                        ? "border-green-900/40 bg-green-950/15"
                        : r.required
                        ? "border-red-900/50 bg-red-950/15"
                        : "border-gray-800 bg-gray-900/40"
                    }`}
                  >
                    <span className="text-gray-300">
                      <span className="text-gray-500">field:</span> {r.field}
                      {r.required && <span className="text-red-400 ml-1">*</span>}
                    </span>
                    <span className={r.matchedHeader ? "text-white font-mono text-xs" : "text-gray-500 italic text-xs"}>
                      {r.matchedHeader ? `← ${r.matchedHeader}` : "(unmapped)"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row preview table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl">
              <div className="p-6 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">3. Row preview</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Showing first {Math.min(PREVIEW_ROW_LIMIT, preview.rows.length)} of {preview.rows.length} rows. Rows with errors will be skipped on commit.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-800/80 backdrop-blur-sm sticky top-0">
                    <tr className="text-left text-gray-400 uppercase tracking-wide">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Major</th>
                      <th className="px-4 py-2">GPA</th>
                      <th className="px-4 py-2">Credits</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.rows.slice(0, PREVIEW_ROW_LIMIT).map((r) => {
                      const p = r.partial as Record<string, unknown>;
                      const bad = r.errors.length > 0;
                      const warn = r.warnings.length > 0;
                      return (
                        <tr
                          key={r.rowIndex}
                          className={`border-t border-gray-800/60 ${bad ? "bg-red-950/15" : warn ? "bg-amber-950/10" : ""}`}
                        >
                          <td className="px-4 py-2 text-gray-500 font-mono">{r.rowIndex + 2}</td>
                          <td className="px-4 py-2 text-gray-200">{(p.name as string) || <span className="text-gray-600 italic">empty</span>}</td>
                          <td className="px-4 py-2 text-gray-200 font-mono">{(p.email as string) || <span className="text-gray-600 italic">empty</span>}</td>
                          <td className="px-4 py-2 text-gray-200">{(p.major as string) || <span className="text-gray-600 italic">empty</span>}</td>
                          <td className="px-4 py-2 text-gray-200">{p.gpa !== undefined ? String(p.gpa) : "-"}</td>
                          <td className="px-4 py-2 text-gray-200">
                            {p.completedCredits !== undefined ? `${p.completedCredits} / ${p.requiredCredits ?? "?"}` : "-"}
                          </td>
                          <td className="px-4 py-2">
                            {bad ? (
                              <span className="inline-block text-red-400 text-[11px] px-1.5 py-0.5 rounded bg-red-950/30 shadow-sm shadow-red-900/30" title={r.errors.join("; ")}>
                                Error: {r.errors[0]}
                              </span>
                            ) : warn ? (
                              <span className="inline-block text-amber-400 text-[11px] px-1.5 py-0.5 rounded bg-amber-950/20 shadow-sm shadow-amber-900/20" title={r.warnings.join("; ")}>
                                Warning: {r.warnings[0]}
                              </span>
                            ) : (
                              <span className="inline-block text-green-400 text-[11px] px-1.5 py-0.5 rounded bg-green-950/20 shadow-sm shadow-green-900/20">OK</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Commit bar */}
            {!committed && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white">4. Commit to the store</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Inserts {preview.summary.valid} valid {preview.summary.valid === 1 ? "row" : "rows"} into the demo data store.
                  Existing students matched by email are updated in place.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={runCommit}
                    disabled={working || preview.summary.valid === 0}
                    className="px-5 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity disabled:opacity-50 shadow-lg shadow-green-900/40"
                    style={{ backgroundColor: "#275D38" }}
                  >
                    {working ? "Committing..." : `Commit ${preview.summary.valid} ${preview.summary.valid === 1 ? "student" : "students"}`}
                  </button>
                  <button
                    onClick={reset}
                    disabled={working}
                    className="px-5 py-2.5 rounded-lg text-gray-300 text-sm border border-gray-700 hover:border-gray-500 transition-colors"
                  >
                    Discard and start over
                  </button>
                </div>
                {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>Velocity &middot; SIS data ingestion</p>
      </footer>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "positive" | "negative" | "warn";
}) {
  const color =
    tone === "positive" ? "#4CAF50" : tone === "negative" ? "#F87171" : tone === "warn" ? "#FBBF24" : "white";
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
      <div className="text-3xl font-black mt-1" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function prettyDelim(d: string): string {
  if (d === ",") return "comma";
  if (d === "|") return "pipe";
  if (d === "\t") return "tab";
  return d;
}
