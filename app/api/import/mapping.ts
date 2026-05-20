// Column-alias mapping for SIS exports.
//
// Real-world Banner exports use SPRIDEN_ID / SPRIDEN_LAST_NAME / SGBSTDN_PROGRAM
// etc. We accept those, plus the common friendlier aliases most institutions
// use when they export a flat CSV from Banner / DegreeWorks / Wolverine Track.
//
// Match is case-insensitive on the trimmed column name. First alias wins.

import { Student } from "../store";

export type StudentField = keyof Omit<Student, "id">;

interface FieldMap {
  field: StudentField;
  aliases: string[];
  required: boolean;
  parse?: (raw: string) => unknown;
}

function splitMulti(raw: string): string[] {
  if (!raw) return [];
  // Accept commas, semicolons, pipes inside the field as separators for arrays.
  return raw
    .split(/[;|]|, /)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseNum(raw: string): number {
  const n = Number(raw.replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const FIELD_MAP: FieldMap[] = [
  {
    field: "name",
    aliases: ["name", "full name", "fullname", "student name", "studentname", "spriden_first_last", "preferred_name"],
    required: true,
  },
  {
    field: "email",
    aliases: ["email", "e-mail", "email address", "spriden_email", "preferred_email", "uvu_email", "student_email"],
    required: true,
  },
  {
    field: "uvid",
    aliases: ["uvid", "banner id", "banner_id", "spriden_id", "student id", "student_id", "pidm", "sis id", "sis_id"],
    required: false,
  },
  {
    field: "major",
    aliases: ["major", "program", "primary program", "sgbstdn_program_1", "degree program", "degree_program", "primary_major"],
    required: true,
  },
  {
    field: "minor",
    aliases: ["minor", "secondary program", "sgbstdn_program_2", "secondary major"],
    required: false,
  },
  {
    field: "college",
    aliases: ["college", "school", "college_descr", "sgbstdn_coll_code_1", "academic college"],
    required: false,
  },
  {
    field: "enrollmentYear",
    aliases: ["enrollment year", "enrollmentyear", "matric year", "entry term", "shrtgpa_initial_term", "matriculation_year", "first_term"],
    required: false,
    parse: parseNum,
  },
  {
    field: "expectedGraduation",
    aliases: ["expected graduation", "expectedgraduation", "graduation term", "anticipated_grad", "expected grad term", "sgbstdn_exp_grad_date"],
    required: false,
  },
  {
    field: "completedCredits",
    aliases: ["completed credits", "credits earned", "credits completed", "earned credits", "shrtgpa_hours_earned", "completedcredits"],
    required: false,
    parse: parseNum,
  },
  {
    field: "requiredCredits",
    aliases: ["required credits", "credits required", "degree credits", "degree_credits_required", "requiredcredits"],
    required: false,
    parse: parseNum,
  },
  {
    field: "gpa",
    aliases: ["gpa", "cumulative gpa", "shrtgpa_gpa", "cum_gpa"],
    required: false,
    parse: parseNum,
  },
  {
    field: "skills",
    aliases: ["skills", "self-reported skills", "skill_tags", "student_skills"],
    required: false,
    parse: splitMulti,
  },
  {
    field: "careerGoals",
    aliases: ["career goals", "careergoals", "intended career", "career_aspirations", "occupational_goals"],
    required: false,
    parse: splitMulti,
  },
];

export interface ColumnMatch {
  field: StudentField;
  matchedHeader: string | null;
  required: boolean;
}

// Normalize a header or alias to a comparable form: lowercase, trimmed,
// collapse runs of underscores/whitespace/dashes into a single space.
function normalizeKey(s: string): string {
  return s.toLowerCase().trim().replace(/[\s_\-]+/g, " ");
}

// Given the parsed CSV headers, return the alias resolution table.
// Both headers and aliases run through the same normalizer so that
// `SPRIDEN_LAST_NAME`, `spriden last name`, and `spriden-last-name` all match.
export function resolveColumns(headers: string[]): ColumnMatch[] {
  const normHeaders = headers.map(normalizeKey);
  return FIELD_MAP.map(({ field, aliases, required }) => {
    let matchedHeader: string | null = null;
    for (const alias of aliases) {
      const idx = normHeaders.indexOf(normalizeKey(alias));
      if (idx !== -1) {
        matchedHeader = headers[idx];
        break;
      }
    }
    return { field, matchedHeader, required };
  });
}

export interface MappedRow {
  rowIndex: number;
  partial: Partial<Student>;
  errors: string[];
  warnings: string[];
}

// Look up a raw cell value by trying any of several alternate header names.
// Case-insensitive; tolerates underscores/spaces/dashes.
function pickRaw(raw: Record<string, string>, aliases: string[]): string {
  const normRaw: Record<string, string> = {};
  for (const k of Object.keys(raw)) normRaw[k.toLowerCase().trim().replace(/[\s_\-]+/g, " ")] = raw[k];
  for (const alias of aliases) {
    const v = normRaw[alias.toLowerCase().trim().replace(/[\s_\-]+/g, " ")];
    if (v) return v;
  }
  return "";
}

// Map a single parsed CSV row to a partial Student plus row-level
// validation issues.
export function mapRow(rowIndex: number, raw: Record<string, string>, resolved: ColumnMatch[]): MappedRow {
  const partial: Partial<Student> = {};
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const { field, matchedHeader, required } of resolved) {
    const rawValue = matchedHeader ? raw[matchedHeader] : "";
    if (!rawValue) {
      if (required) errors.push(`Missing required field "${field}"`);
      continue;
    }
    const spec = FIELD_MAP.find((f) => f.field === field)!;
    const parsed = spec.parse ? spec.parse(rawValue) : rawValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (partial as any)[field] = parsed;
  }

  // Banner exports usually have first/last in separate columns. If `name`
  // is still missing but the row has first+last, synthesize.
  if (!partial.name) {
    const first = pickRaw(raw, ["spriden_first_name", "first name", "firstname", "given name"]);
    const last = pickRaw(raw, ["spriden_last_name", "last name", "lastname", "surname", "family name"]);
    const combined = [first, last].filter(Boolean).join(" ").trim();
    if (combined) {
      partial.name = combined;
      // Strip the "missing required" error for name we may have just added.
      const idx = errors.indexOf('Missing required field "name"');
      if (idx !== -1) errors.splice(idx, 1);
    }
  }

  // Field-specific validation
  if (partial.email && !String(partial.email).includes("@")) {
    errors.push(`Invalid email: ${partial.email}`);
  }
  if (partial.gpa !== undefined && (Number(partial.gpa) < 0 || Number(partial.gpa) > 4.5)) {
    errors.push(`GPA out of range: ${partial.gpa}`);
  }
  if (
    partial.completedCredits !== undefined &&
    partial.requiredCredits !== undefined &&
    Number(partial.completedCredits) > Number(partial.requiredCredits)
  ) {
    warnings.push(`Completed credits (${partial.completedCredits}) exceeds required credits (${partial.requiredCredits})`);
  }

  return { rowIndex, partial, errors, warnings };
}

// Fill in defaults for fields the export didn't include  matches the
// defaulting logic already used by POST /api/students.
export function applyDefaults(partial: Partial<Student>): Student {
  return {
    id: partial.id ?? "",
    name: partial.name ?? "",
    email: partial.email ?? "",
    uvid: partial.uvid ?? `${Math.floor(Math.random() * 90000000) + 10000000}`,
    college: partial.college ?? "Unspecified College",
    major: partial.major ?? "Undeclared",
    minor: partial.minor ?? null,
    enrollmentYear: Number(partial.enrollmentYear ?? new Date().getFullYear()),
    expectedGraduation: partial.expectedGraduation ?? `Spring ${new Date().getFullYear() + 4}`,
    completedCredits: Number(partial.completedCredits ?? 0),
    requiredCredits: Number(partial.requiredCredits ?? 120),
    gpa: Number(partial.gpa ?? 0),
    skills: (partial.skills as string[] | undefined) ?? [],
    careerGoals: (partial.careerGoals as string[] | undefined) ?? [],
  };
}

// Used by both preview and commit: walk the parsed rows, map them, and
// return mapped + summary stats.
export function mapAll(
  headers: string[],
  rows: Record<string, string>[]
): { resolved: ColumnMatch[]; mapped: MappedRow[]; summary: { rows: number; valid: number; errors: number; warnings: number } } {
  const resolved = resolveColumns(headers);
  const mapped = rows.map((r, i) => mapRow(i, r, resolved));
  const summary = {
    rows: mapped.length,
    valid: mapped.filter((m) => m.errors.length === 0).length,
    errors: mapped.reduce((sum, m) => sum + m.errors.length, 0),
    warnings: mapped.reduce((sum, m) => sum + m.warnings.length, 0),
  };
  return { resolved, mapped, summary };
}
