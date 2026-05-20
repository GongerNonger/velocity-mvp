// Minimal CSV parser  RFC 4180-ish. Handles:
//   - Comma or pipe delimiters (auto-detected from header line)
//   - Double-quoted fields containing the delimiter or newlines
//   - Escaped quotes ("")
//   - Empty fields
//   - Trailing newlines
//
// Not a substitute for papaparse for hostile input. Used here because
// Banner-style flat exports are well-behaved and we want zero deps.

export interface ParsedCSV {
  delimiter: "," | "|" | "\t";
  headers: string[];
  rows: Record<string, string>[];
  rawRowCount: number;
}

export function parseCSV(text: string): ParsedCSV {
  // Strip BOM
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  // Normalize line endings
  text = text.replace(/\r\n?/g, "\n");

  // Detect delimiter from first non-empty line  whichever of `,`, `|`, `\t`
  // appears most often in the header is the winner.
  const firstLine = text.split("\n").find((l) => l.trim().length > 0) || "";
  const counts = { ",": (firstLine.match(/,/g) || []).length, "|": (firstLine.match(/\|/g) || []).length, "\t": (firstLine.match(/\t/g) || []).length };
  const delimiter = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] || ",") as "," | "|" | "\t";

  const allRows = parseRows(text, delimiter);
  if (allRows.length === 0) {
    return { delimiter, headers: [], rows: [], rawRowCount: 0 };
  }

  const headers = allRows[0].map((h) => h.trim());
  const bodyRows = allRows.slice(1).filter((r) => r.some((v) => v.length > 0));

  const rows: Record<string, string>[] = bodyRows.map((cells) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = (cells[i] ?? "").trim();
    }
    return obj;
  });

  return { delimiter, headers, rows, rawRowCount: bodyRows.length };
}

function parseRows(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === delimiter) {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  // Flush final field/row if not empty
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
