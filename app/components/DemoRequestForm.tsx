"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Provost / Academic Affairs",
  "VP / AVP Enrollment",
  "VP / AVP Student Affairs",
  "Chief Information Officer",
  "Dean / Associate Dean",
  "Director of Advising",
  "Faculty",
  "Other",
];

const ENROLLMENT_RANGES = [
  "Under 5,000 students",
  "5,000 – 10,000 students",
  "10,000 – 20,000 students",
  "20,000 – 40,000 students",
  "40,000+ students",
];

export function DemoRequestForm({
  open,
  onClose,
  source = "landing",
  presetInstitution,
}: {
  open: boolean;
  onClose: () => void;
  source?: string;
  presetInstitution?: string;
}) {
  const [name, setName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [institution, setInstitution] = useState(presetInstitution || "");
  const [role, setRole] = useState(ROLES[0]);
  const [enrollmentRange, setEnrollmentRange] = useState(ENROLLMENT_RANGES[2]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes (so it's fresh on next open)
      setTimeout(() => {
        setDone(false);
        setError(null);
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, workEmail, institution, role, enrollmentRange, message, source }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Try again.");
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#275D38" }}>
              V
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{done ? "Thanks  we'll be in touch" : "Request a pilot"}</div>
              <div className="text-xs text-gray-400">{done ? "" : "30-day free pilot. No integration required to start."}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none px-2" aria-label="Close">
            &times;
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(39, 93, 56, 0.25)", border: "1px solid rgba(39, 93, 56, 0.5)" }}
            >
              <span className="text-2xl" style={{ color: "#4CAF50" }}>&check;</span>
            </div>
            <p className="text-white text-base font-medium">Your pilot request is in.</p>
            <p className="text-gray-400 text-sm mt-2">
              We&apos;ll reach out within 1 business day with a 30-day pilot scoping document tailored to {institution || "your institution"}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: "#275D38" }}
            >
              Back to demo
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" required>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Christina Baum"
                />
              </Field>
              <Field label="Work email" required>
                <input
                  type="email"
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@uvu.edu"
                />
              </Field>
            </div>

            <Field label="Institution" required>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className={inputClass}
                placeholder="Utah Valley University"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Your role" required>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputClass}
                >
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <Field label="Enrollment" required>
                <select
                  value={enrollmentRange}
                  onChange={(e) => setEnrollmentRange(e.target.value)}
                  className={inputClass}
                >
                  {ENROLLMENT_RANGES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="What's the biggest advising problem at your institution?" required={false}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Optional  helps us scope the pilot."
              />
            </Field>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-5 py-3 rounded-lg text-white font-medium text-sm transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#275D38" }}
            >
              {submitting ? "Sending..." : "Request 30-day pilot"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              We&apos;ll never sell your contact info. FERPA-aware data handling from day one.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-green-600 placeholder-gray-600";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide block mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
