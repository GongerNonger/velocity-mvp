import { NextResponse } from "next/server";
import { courses } from "../store";

export async function GET() {
  return NextResponse.json({
    courses: courses.map((c) => ({
      id: c.id,
      name: c.name,
      code: c.code,
      credits: c.credits,
      department: c.department,
      description: c.description,
      skillsTaught: c.skillsTaught,
    })),
  });
}
