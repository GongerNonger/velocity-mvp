"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium border border-gray-700 hover:border-gray-500 transition-colors no-print"
    >
      <span aria-hidden>&#x1f5a8;</span>
      <span>Print / Save as PDF</span>
    </button>
  );
}
