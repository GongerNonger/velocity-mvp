import { NextRequest, NextResponse } from "next/server";
import { students } from "../store";
import { answerStudentQuestion } from "../advisor";

export async function POST(req: NextRequest) {
  const { studentId, message } = await req.json();
  if (!studentId || typeof message !== "string") {
    return NextResponse.json({ error: "studentId and message required" }, { status: 400 });
  }
  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }
  const response = answerStudentQuestion(student, message);
  return NextResponse.json({ response });
}
