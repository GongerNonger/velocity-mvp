import { NextRequest, NextResponse } from "next/server";
import { leads, recordLead } from "./store";

const REQUIRED = ["name", "workEmail", "institution", "role", "enrollmentRange"] as const;

export async function GET() {
  // For demo + admin overview: ordered newest first.
  return NextResponse.json({
    leads: [...leads].reverse(),
    total: leads.length,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  for (const field of REQUIRED) {
    if (!body[field] || typeof body[field] !== "string") {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  // Trivial email format check  do not pretend this is real validation.
  if (!String(body.workEmail).includes("@")) {
    return NextResponse.json({ error: "workEmail must be a valid email address" }, { status: 400 });
  }

  const lead = recordLead({
    name: String(body.name).trim(),
    workEmail: String(body.workEmail).trim().toLowerCase(),
    institution: String(body.institution).trim(),
    role: String(body.role).trim(),
    enrollmentRange: String(body.enrollmentRange).trim(),
    message: body.message ? String(body.message).trim() : null,
    source: typeof body.source === "string" ? body.source : "landing",
  });

  return NextResponse.json({ lead, created: true }, { status: 201 });
}
