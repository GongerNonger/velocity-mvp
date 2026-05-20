"use client";

import { useEffect, useRef, useState } from "react";

interface ChatResponse {
  answer: string;
  suggestions: string[];
  followUpPrompts: string[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

const STARTERS = [
  "What should I take next semester?",
  "Am I on track to graduate?",
  "Show my career matches",
  "What skills should I focus on?",
];

export function AIChat({ studentId, studentName }: { studentId: string; studentName: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Reset thread when switching students
  useEffect(() => {
    setMessages([]);
  }, [studentId]);

  async function send(text: string) {
    const message = text.trim();
    if (!message) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: message }]);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, message }),
      });
      const data: { response: ChatResponse } = await res.json();
      // Simulate a brief thinking delay so it feels conversational
      await new Promise((r) => setTimeout(r, 450));
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.response.answer, suggestions: data.response.suggestions },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry — I couldn't reach the advisor service. Try again in a moment." },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* Trigger button (fixed bottom-right) */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-30 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg shadow-green-900/40 text-white font-medium text-sm transition-all hover:scale-105 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ backgroundColor: "#275D38" }}
        aria-label="Open Velocity AI advisor"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-200"></span>
        </span>
        Ask Velocity AI
      </button>

      {/* Slide-out panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-[420px] bg-gray-900 border-l border-gray-800 shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800" style={{ backgroundColor: "rgba(39, 93, 56, 0.12)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#275D38" }}>
              V
            </div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">Velocity AI</div>
              <div className="text-xs text-gray-400 leading-tight">Advising for {studentName}</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white text-xl leading-none px-2"
            aria-label="Close chat"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center mt-8">
              <div className="text-gray-300 text-sm font-medium mb-1">Hi {studentName.split(" ")[0]} &mdash; I&apos;m your AI advisor.</div>
              <div className="text-gray-500 text-xs mb-6">Ask me anything about your degree, career, or next steps.</div>
              <div className="flex flex-col gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-sm text-gray-200 bg-gray-800/60 hover:bg-gray-800 border border-gray-700 hover:border-green-700 rounded-lg px-3 py-2 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i}>
              <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gray-800 text-gray-100 rounded-br-md"
                      : "text-gray-100 rounded-bl-md"
                  }`}
                  style={m.role === "assistant" ? { backgroundColor: "rgba(39, 93, 56, 0.18)", border: "1px solid rgba(39, 93, 56, 0.4)" } : undefined}
                  dangerouslySetInnerHTML={{ __html: m.role === "assistant" ? formatMarkdownLite(m.content) : escapeHtml(m.content) }}
                />
              </div>
              {m.role === "assistant" && m.suggestions && m.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                  {m.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs text-green-300 bg-green-950/40 hover:bg-green-900/40 border border-green-800/50 rounded-full px-3 py-1 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md px-4 py-3" style={{ backgroundColor: "rgba(39, 93, 56, 0.18)", border: "1px solid rgba(39, 93, 56, 0.4)" }}>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "120ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-gray-800 p-3 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about courses, careers, GPA, graduation..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-green-600"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50 transition-opacity"
            style={{ backgroundColor: "#275D38" }}
          >
            Send
          </button>
        </form>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

// Minimal markdown: **bold** and newlines → <br/>
function formatMarkdownLite(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\n/g, "<br/>");
}
