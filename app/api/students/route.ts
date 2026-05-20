import { NextRequest, NextResponse } from "next/server";
import { students, Student } from "../store";

export async function GET() {
  return NextResponse.json({
    students: students.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      major: s.major,
      minor: s.minor,
      gpa: s.gpa,
      completedCredits: s.completedCredits,
      requiredCredits: s.requiredCredits,
      expectedGraduation: s.expectedGraduation,
    })),
    total: students.length,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, email, uvid, college, major, minor, enrollmentYear, expectedGraduation, completedCredits, requiredCredits, gpa, skills, careerGoals } = body;

  if (!name || !email || !major) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, major" },
      { status: 400 }
    );
  }

  // Check if student already exists by email (update case)
  const existingIndex = students.findIndex((s) => s.email === email);

  const student: Student = {
    id: existingIndex >= 0 ? students[existingIndex].id : `STU-${String(students.length + 1).padStart(3, "0")}`,
    name,
    email,
    uvid: uvid || (existingIndex >= 0 ? students[existingIndex].uvid : `108${String(Math.floor(Math.random() * 90000) + 10000)}`),
    college: college || (existingIndex >= 0 ? students[existingIndex].college : "Scott M. Smith College of Engineering & Technology"),
    major,
    minor: minor || null,
    enrollmentYear: enrollmentYear || 2024,
    expectedGraduation: expectedGraduation || "Spring 2028",
    completedCredits: completedCredits || 0,
    requiredCredits: requiredCredits || 120,
    gpa: gpa || 0,
    skills: skills || [],
    careerGoals: careerGoals || [],
  };

  if (existingIndex >= 0) {
    students[existingIndex] = student;
    return NextResponse.json({ student, updated: true });
  } else {
    students.push(student);
    return NextResponse.json({ student, created: true }, { status: 201 });
  }
}
