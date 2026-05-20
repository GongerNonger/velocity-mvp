import { NextRequest, NextResponse } from "next/server";
import { parseCSV } from "./csv";
import { mapAll, applyDefaults } from "./mapping";
import { students, Student } from "../store";

// Multipart-friendly: POST a multipart form with file=<csv> + mode=preview|commit
// or POST JSON with {csv: string, mode: "preview"|"commit"} for programmatic use.
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  let csvText = "";
  let mode: "preview" | "commit" = "preview";
  let filename = "upload.csv";

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      if (!(file instanceof File)) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }
      csvText = await file.text();
      filename = file.name || filename;
      mode = (form.get("mode") as "preview" | "commit") || "preview";
    } else {
      const body = await req.json();
      csvText = String(body.csv || "");
      mode = body.mode === "commit" ? "commit" : "preview";
    }
  } catch {
    return NextResponse.json({ error: "Could not read request body" }, { status: 400 });
  }

  if (!csvText.trim()) {
    return NextResponse.json({ error: "CSV is empty" }, { status: 400 });
  }

  const parsed = parseCSV(csvText);
  if (parsed.headers.length === 0) {
    return NextResponse.json({ error: "Could not parse CSV header row" }, { status: 400 });
  }

  const { resolved, mapped, summary } = mapAll(parsed.headers, parsed.rows);

  // Always return the preview shape; on commit we additionally persist.
  const preview = {
    filename,
    delimiter: parsed.delimiter,
    headers: parsed.headers,
    resolved,
    rows: mapped.map((m) => ({
      rowIndex: m.rowIndex,
      partial: m.partial,
      errors: m.errors,
      warnings: m.warnings,
    })),
    summary,
  };

  if (mode === "preview") {
    return NextResponse.json({ preview, committed: false });
  }

  // Commit: only valid rows are inserted. Existing students matched by email
  // are updated in place; new emails get a fresh STU-NNN id.
  const inserted: Student[] = [];
  const updated: Student[] = [];
  const skipped: { rowIndex: number; reason: string }[] = [];

  for (const m of mapped) {
    if (m.errors.length > 0) {
      skipped.push({ rowIndex: m.rowIndex, reason: m.errors.join("; ") });
      continue;
    }
    const draft = applyDefaults(m.partial);
    const existingIdx = students.findIndex((s) => s.email === draft.email);
    if (existingIdx >= 0) {
      const existing = students[existingIdx];
      const merged: Student = { ...existing, ...draft, id: existing.id };
      students[existingIdx] = merged;
      updated.push(merged);
    } else {
      const newStudent: Student = {
        ...draft,
        id: `STU-${String(students.length + 1).padStart(3, "0")}`,
      };
      students.push(newStudent);
      inserted.push(newStudent);
    }
  }

  return NextResponse.json({
    preview,
    committed: true,
    result: {
      inserted: inserted.length,
      updated: updated.length,
      skipped: skipped.length,
      totalNow: students.length,
      skippedDetails: skipped,
    },
  });
}
