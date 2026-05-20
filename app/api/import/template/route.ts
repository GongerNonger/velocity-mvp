import { NextResponse } from "next/server";

// A sample CSV using the friendliest column names Velocity recognizes.
// Matches a typical flat export from Banner via DegreeWorks / Cognos /
// Argos at most institutions. Aliases for SPRIDEN_*, SGBSTDN_* etc. are
// documented in app/api/import/mapping.ts.
const TEMPLATE = `Name,Email,Banner ID,Major,Minor,College,Enrollment Year,Expected Graduation,Completed Credits,Required Credits,GPA,Skills,Career Goals
Jane Example,jane.example@university.edu,12345678,Computer Science,Mathematics,College of Engineering,2023,Spring 2027,72,120,3.65,"Python; Java; SQL; Git; Linux","Software Engineer; Machine Learning Engineer"
John Sample,john.sample@university.edu,12345679,Business Management,,Business School,2022,Spring 2026,95,120,3.4,"Excel; Financial Analysis; Communication","Product Manager"
Alex Demo,alex.demo@university.edu,12345680,Cybersecurity,,College of Engineering,2024,Spring 2028,30,120,3.8,"Linux; Python; Networking","Cybersecurity Analyst"
`;

export async function GET() {
  return new NextResponse(TEMPLATE, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="velocity-import-template.csv"',
    },
  });
}
