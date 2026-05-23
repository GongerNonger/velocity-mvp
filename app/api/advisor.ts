// Velocity - AI Advisor Engine
// Local algorithmic advisor logic - no external APIs

import {
  Student,
  Course,
  CareerPath,
  DegreeRequirement,
  AdvisorRecommendation,
  CareerAnalysis,
  InstitutionalAnalytics,
  students,
  courses,
  careerPaths,
  degreeRequirements,
} from "./store";

// --- Graduation Progress ---

export function calculateGraduationProgress(student: Student) {
  const percentComplete = Math.round((student.completedCredits / student.requiredCredits) * 100);
  const creditsRemaining = student.requiredCredits - student.completedCredits;
  const creditsPerSemester = 15;
  const estimatedSemesters = Math.ceil(creditsRemaining / creditsPerSemester);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentSemester = now.getMonth() < 6 ? 1 : 2; // 1=Spring, 2=Fall
  let gradYear = currentYear;
  let gradSemester = currentSemester;
  for (let i = 0; i < estimatedSemesters; i++) {
    gradSemester++;
    if (gradSemester > 2) {
      gradSemester = 1;
      gradYear++;
    }
  }
  const semesterLabel = gradSemester === 1 ? "Spring" : "Fall";
  const estimatedGraduation = `${semesterLabel} ${gradYear}`;

  // Parse expected graduation for on-track check
  const expectedParts = student.expectedGraduation.split(" ");
  const expectedSem = expectedParts[0] === "Spring" ? 1 : 2;
  const expectedYear = parseInt(expectedParts[1]);
  const expectedTotal = expectedYear * 2 + expectedSem;
  const estimatedTotal = gradYear * 2 + gradSemester;
  const onTrack = estimatedTotal <= expectedTotal;

  return {
    percentComplete,
    creditsRemaining,
    creditsCompleted: student.completedCredits,
    requiredCredits: student.requiredCredits,
    estimatedSemesters,
    estimatedGraduation,
    onTrack,
  };
}

// --- Course Recommendations ---

export function recommendCourses(student: Student): { course: Course; reasoning: string }[] {
  const degree = degreeRequirements.find((d) => d.major === student.major);
  if (!degree) return [];

  const studentSkillsLower = student.skills.map((s) => s.toLowerCase());

  // Find required courses the student likely hasn't taken (based on skills overlap)
  const recommendations: { course: Course; reasoning: string; priority: number }[] = [];

  for (const courseId of degree.requiredCourses) {
    const course = courses.find((c) => c.id === courseId);
    if (!course) continue;

    // Check if student likely already took this course (has most of the skills)
    const skillsFromCourse = course.skillsTaught.map((s) => s.toLowerCase());
    const alreadyHasSkills = skillsFromCourse.filter((s) => studentSkillsLower.includes(s));
    const coverage = alreadyHasSkills.length / skillsFromCourse.length;

    if (coverage >= 0.8) continue; // Likely already completed

    // Check prerequisites met (simplified: check if student has skills from prereq courses)
    const prereqsMet = checkPrerequisitesMet(student, course);

    if (prereqsMet) {
      // Prioritize courses that align with career goals
      const careerRelevance = calculateCareerRelevance(student, course);
      const reasoning = generateCourseReasoning(student, course, careerRelevance);

      recommendations.push({
        course,
        reasoning,
        priority: careerRelevance + (coverage < 0.3 ? 2 : 0),
      });
    }
  }

  // Also add elective recommendations based on career goals
  const electiveRecs = getElectiveRecommendations(student, degree);
  recommendations.push(...electiveRecs);

  // Sort by priority and return top 4
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4)
    .map(({ course, reasoning }) => ({ course, reasoning }));
}

function checkPrerequisitesMet(student: Student, course: Course): boolean {
  if (course.prerequisites.length === 0) return true;

  // Simplified: check if student has skills that prerequisite courses teach
  for (const prereqCode of course.prerequisites) {
    const prereqCourse = courses.find((c) => c.code === prereqCode || c.id === prereqCode);
    if (!prereqCourse) continue;

    const prereqSkills = prereqCourse.skillsTaught.map((s) => s.toLowerCase());
    const studentSkills = student.skills.map((s) => s.toLowerCase());
    const hasPrereqSkills = prereqSkills.some((s) => studentSkills.includes(s));

    if (!hasPrereqSkills) return false;
  }
  return true;
}

function calculateCareerRelevance(student: Student, course: Course): number {
  let relevance = 0;
  const goalCareers = careerPaths.filter((cp) =>
    student.careerGoals.some((g) => cp.title.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(cp.title.toLowerCase()))
  );

  for (const career of goalCareers) {
    const neededSkills = career.requiredSkills.map((s) => s.toLowerCase());
    const courseTeaches = course.skillsTaught.map((s) => s.toLowerCase());
    const overlap = courseTeaches.filter((s) => neededSkills.includes(s));
    relevance += overlap.length * 2;
  }

  return relevance;
}

function generateCourseReasoning(student: Student, course: Course, careerRelevance: number): string {
  const reasons: string[] = [];

  if (careerRelevance > 0) {
    const relevantGoals = student.careerGoals.filter((goal) => {
      const career = careerPaths.find(
        (cp) => cp.title.toLowerCase().includes(goal.toLowerCase()) || goal.toLowerCase().includes(cp.title.toLowerCase())
      );
      if (!career) return false;
      return course.skillsTaught.some((s) => career.requiredSkills.map((r) => r.toLowerCase()).includes(s.toLowerCase()));
    });
    if (relevantGoals.length > 0) {
      reasons.push(`Directly supports your goal of becoming a ${relevantGoals[0]}`);
    }
  }

  const newSkills = course.skillsTaught.filter((s) => !student.skills.map((sk) => sk.toLowerCase()).includes(s.toLowerCase()));
  if (newSkills.length > 0) {
    reasons.push(`Develops new skills: ${newSkills.slice(0, 3).join(", ")}`);
  }

  reasons.push(`Required for ${student.major} degree (${course.credits} credits)`);

  return reasons.join(". ") + ".";
}

function getElectiveRecommendations(
  student: Student,
  _degree: DegreeRequirement
): { course: Course; reasoning: string; priority: number }[] {
  const recs: { course: Course; reasoning: string; priority: number }[] = [];

  // Find courses outside the major that align with career goals
  const goalCareers = careerPaths.filter((cp) =>
    student.careerGoals.some((g) => cp.title.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(cp.title.toLowerCase()))
  );

  for (const course of courses) {
    if (course.department === student.major) continue;

    for (const career of goalCareers) {
      const neededSkills = career.requiredSkills.map((s) => s.toLowerCase());
      const courseTeaches = course.skillsTaught.map((s) => s.toLowerCase());
      const studentSkills = student.skills.map((s) => s.toLowerCase());

      const gapSkillsTaught = courseTeaches.filter((s) => neededSkills.includes(s) && !studentSkills.includes(s));

      if (gapSkillsTaught.length > 0 && checkPrerequisitesMet(student, course)) {
        recs.push({
          course,
          reasoning: `Elective that fills skill gaps for ${career.title}: teaches ${gapSkillsTaught.join(", ")}.`,
          priority: gapSkillsTaught.length,
        });
        break;
      }
    }
  }

  return recs;
}

// --- Risk Alerts ---

export function generateRiskAlerts(student: Student): { type: string; severity: "low" | "medium" | "high"; message: string }[] {
  const alerts: { type: string; severity: "low" | "medium" | "high"; message: string }[] = [];
  const progress = calculateGraduationProgress(student);

  // GPA alerts
  if (student.gpa < 2.0) {
    alerts.push({
      type: "Academic Standing",
      severity: "high",
      message: `GPA of ${student.gpa} is below 2.0. Student is at risk of academic probation. Immediate intervention recommended.`,
    });
  } else if (student.gpa < 2.5) {
    alerts.push({
      type: "GPA Warning",
      severity: "medium",
      message: `GPA of ${student.gpa} is approaching academic concern threshold. Consider lighter course load or tutoring resources.`,
    });
  } else if (student.gpa < 3.0) {
    alerts.push({
      type: "GPA Advisory",
      severity: "low",
      message: `GPA of ${student.gpa} is adequate but may limit graduate school or competitive career options.`,
    });
  }

  // Schedule alerts
  if (!progress.onTrack) {
    alerts.push({
      type: "Graduation Delay",
      severity: "high",
      message: `Currently projected to graduate ${progress.estimatedGraduation}, which is later than the expected ${student.expectedGraduation}. Consider increasing course load.`,
    });
  }

  // Credit pace
  const yearsEnrolled = 2026 - student.enrollmentYear;
  const expectedCredits = yearsEnrolled * 30; // 30 credits per year
  if (student.completedCredits < expectedCredits * 0.85) {
    alerts.push({
      type: "Credit Pace",
      severity: "medium",
      message: `Completed ${student.completedCredits} credits, but expected approximately ${expectedCredits} by this point. May need to take summer courses.`,
    });
  }

  // Skill gap alerts
  const goalCareers = careerPaths.filter((cp) =>
    student.careerGoals.some((g) => cp.title.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(cp.title.toLowerCase()))
  );
  for (const career of goalCareers) {
    const neededSkills = career.requiredSkills;
    const studentSkills = student.skills.map((s) => s.toLowerCase());
    const missing = neededSkills.filter((s) => !studentSkills.includes(s.toLowerCase()));
    if (missing.length > neededSkills.length * 0.5) {
      alerts.push({
        type: "Skill Gap",
        severity: "medium",
        message: `Significant skill gaps for ${career.title} career path. Missing ${missing.length} of ${neededSkills.length} required skills.`,
      });
    }
  }

  return alerts;
}

// --- Career Pathway Analysis ---

export function analyzeCareerPathways(student: Student): CareerAnalysis {
  const studentSkillsLower = student.skills.map((s) => s.toLowerCase());

  const matchedPaths = careerPaths
    .filter(
      (cp) =>
        cp.relatedMajors.includes(student.major) ||
        student.careerGoals.some((g) => cp.title.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(cp.title.toLowerCase()))
    )
    .map((career) => {
      const requiredLower = career.requiredSkills.map((s) => s.toLowerCase());
      const matchedSkills = career.requiredSkills.filter((s) => studentSkillsLower.includes(s.toLowerCase()));
      const missingSkills = career.requiredSkills.filter((s) => !studentSkillsLower.includes(s.toLowerCase()));
      const matchScore = Math.round((matchedSkills.length / requiredLower.length) * 100);

      return {
        career,
        matchScore,
        matchedSkills,
        missingSkills,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  // Aggregate all needed skills from goal careers
  const allNeededSkills = new Set<string>();
  matchedPaths.forEach((mp) => mp.career.requiredSkills.forEach((s) => allNeededSkills.add(s)));

  const gaps = [...allNeededSkills].filter((s) => !studentSkillsLower.includes(s.toLowerCase()));

  return {
    matchedPaths,
    skillGapAnalysis: {
      currentSkills: student.skills,
      neededSkills: [...allNeededSkills],
      gaps,
    },
  };
}

// --- 4-Year Plan Generation ---

export interface SemesterPlan {
  label: string;
  term: "Fall" | "Spring";
  year: number;
  status: "completed" | "current" | "future";
  courses: { course: Course; reasoning: string }[];
  totalCredits: number;
}

export interface FourYearPlan {
  studentId: string;
  semesters: SemesterPlan[];
  totalPlannedCredits: number;
  projectedGraduation: string;
  onTrack: boolean;
}

export function generateFourYearPlan(student: Student): FourYearPlan {
  const degree = degreeRequirements.find((d) => d.major === student.major);
  const progress = calculateGraduationProgress(student);

  // Required courses still needed (those whose skills the student lacks)
  const studentSkillsLower = student.skills.map((s) => s.toLowerCase());
  const remainingRequired: Course[] = [];
  if (degree) {
    for (const courseId of degree.requiredCourses) {
      const course = courses.find((c) => c.id === courseId);
      if (!course) continue;
      const skillsFromCourse = course.skillsTaught.map((s) => s.toLowerCase());
      const alreadyHasSkills = skillsFromCourse.filter((s) => studentSkillsLower.includes(s));
      const coverage = alreadyHasSkills.length / skillsFromCourse.length;
      if (coverage < 0.8) remainingRequired.push(course);
    }
  }

  // Elective recommendations to round out career goals
  const electiveRecs = degree ? getElectiveRecommendations(student, degree).map((r) => r.course) : [];
  const seenIds = new Set(remainingRequired.map((c) => c.id));
  const electives = electiveRecs.filter((c) => !seenIds.has(c.id));

  // Build the queue, prioritizing required then electives
  const courseQueue: Course[] = [...remainingRequired, ...electives];

  // Past semesters (completed). 4 years = 8 semesters total.
  const enrollment = student.enrollmentYear;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentTermIsSpring = now.getMonth() < 6;
  const totalSemestersUsed = (currentYear - enrollment) * 2 + (currentTermIsSpring ? 1 : 2);

  const semesters: SemesterPlan[] = [];
  let year = enrollment;
  let isFall = true; // start each academic year in Fall
  const totalSems = 8;

  const creditsPerSemester = 15;
  let queueIdx = 0;

  for (let i = 0; i < totalSems; i++) {
    const term: "Fall" | "Spring" = isFall ? "Fall" : "Spring";
    const semYear = isFall ? year : year + 1;
    const label = `${term} ${semYear}`;
    let status: "completed" | "current" | "future" = "future";
    if (i < totalSemestersUsed - 1) status = "completed";
    else if (i === totalSemestersUsed - 1) status = "current";

    const sem: SemesterPlan = {
      label,
      term,
      year: semYear,
      status,
      courses: [],
      totalCredits: 0,
    };

    // Only populate current and future semesters with plan items
    if (status !== "completed") {
      while (sem.totalCredits < creditsPerSemester && queueIdx < courseQueue.length) {
        const next = courseQueue[queueIdx];
        if (sem.totalCredits + next.credits > creditsPerSemester + 1) break;
        sem.courses.push({
          course: next,
          reasoning:
            remainingRequired.includes(next)
              ? `Required for ${student.major}`
              : `Elective aligned with ${student.careerGoals[0] || "career goals"}`,
        });
        sem.totalCredits += next.credits;
        queueIdx++;
      }
    }

    semesters.push(sem);

    // Advance term
    if (isFall) {
      isFall = false;
    } else {
      isFall = true;
      year++;
    }
  }

  const totalPlannedCredits = semesters.reduce((sum, s) => sum + s.totalCredits, 0);

  return {
    studentId: student.id,
    semesters,
    totalPlannedCredits,
    projectedGraduation: progress.estimatedGraduation,
    onTrack: progress.onTrack,
  };
}

// --- Conversational Advisor (no LLM — pattern routing) ---

export interface ChatResponse {
  answer: string;
  suggestions: string[];
  followUpPrompts: string[];
  context?: {
    type: "courses" | "career" | "progress" | "skills" | "general";
    data?: unknown;
  };
}

export function answerStudentQuestion(student: Student, question: string): ChatResponse {
  const q = question.toLowerCase().trim();
  const firstName = student.name.split(" ")[0];

  // Normalise intent — strip filler words so pattern matching is more robust
  const tokens = q.replace(/[^\w\s]/g, " ").split(/\s+/);
  const has = (...words: string[]) => words.some((w) => tokens.includes(w) || q.includes(w));

  // Course recommendations
  if (
    has("course", "class", "classes", "courses", "register", "enroll", "sign") ||
    q.match(/what.*(take|next|semester)/) ||
    q.match(/recommend.*(course|class)/) ||
    q.match(/which.*course/) ||
    q.match(/(next semester|this semester|fall|spring).*(take|register)/)
  ) {
    const recs = recommendCourses(student);
    const top = recs.slice(0, 3);
    const list = top.map((r, i) => `${i + 1}. **${r.course.code} — ${r.course.name}** (${r.course.credits} cr): ${r.reasoning}`).join("\n");
    return {
      answer: `Hey ${firstName}, based on your ${student.major} degree progress and your goal of ${student.careerGoals[0] || "your career"}, here are the three courses I'd register for next:\n\n${list}\n\nWant me to draft a full 4-year plan?`,
      suggestions: ["Show me my 4-year plan", "Why these courses?", "Show electives instead"],
      followUpPrompts: ["What courses fill my biggest skill gap?", "When can I take CS 4470?"],
      context: { type: "courses", data: top },
    };
  }

  // Compare majors side-by-side (placed before generic career intent so it isn't shadowed)
  if (
    has("compare majors", "different major", "another major", "change major", "switch major", "switched to", "switch to", "should i switch", "would be better", "be better") ||
    q.match(/compare\s+.+\s+(vs|versus|or|to|with|and)\s+.+/) ||
    q.match(/\bwhat if i (switched|changed|moved)\b/) ||
    q.match(/\bwould\s+.+\s+be better\b/) ||
    (q.includes(" vs ") && (q.includes("major") || q.includes("compare"))) ||
    (q.includes(" versus ") && (q.includes("major") || q.includes("compare")))
  ) {
    // Find any major names mentioned in the question (case-insensitive substring; longest-match first)
    const qLower = q;
    const sortedDegrees = [...degreeRequirements].sort((a, b) => b.major.length - a.major.length);
    const matched: DegreeRequirement[] = [];
    const claimedSpans: Array<[number, number]> = [];
    for (const deg of sortedDegrees) {
      // Try full name first, then individual significant tokens / common short aliases
      const aliases = new Set<string>([deg.major.toLowerCase()]);
      // Last word alias (e.g. "Computer Science — Full Stack Web Development Emphasis" → "computer science")
      const baseName = deg.major.split("—")[0].trim().toLowerCase();
      if (baseName) aliases.add(baseName);
      // Common short aliases
      const shortMap: Record<string, string> = {
        "computer science": "cs",
        "information technology": "it",
        "software engineering": "se",
        "mechanical engineering": "me",
        "electrical engineering": "ee",
      };
      if (shortMap[baseName]) aliases.add(shortMap[baseName]);

      let hit: { idx: number; len: number } | null = null;
      for (const alias of aliases) {
        // Word-boundary search to avoid matching "it" inside other words
        const pattern = new RegExp(`(^|[^a-z0-9])${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`, "i");
        const m = pattern.exec(qLower);
        if (m && m.index !== undefined) {
          const start = m.index + (m[1] ? m[1].length : 0);
          const end = start + alias.length;
          // Skip if span overlaps an already-claimed major
          if (claimedSpans.some(([s, e]) => start < e && end > s)) continue;
          hit = { idx: start, len: alias.length };
          break;
        }
      }
      if (hit && !matched.find((d) => d.id === deg.id)) {
        matched.push(deg);
        claimedSpans.push([hit.idx, hit.idx + hit.len]);
        if (matched.length === 2) break;
      }
    }

    const popularMajors = ["Computer Science", "Business Management", "Nursing"];

    if (matched.length < 2) {
      const identified = matched[0] ? ` I spotted **${matched[0].major}** but need a second to compare against.` : "";
      return {
        answer: `I can compare any two majors side-by-side, ${firstName}.${identified} Try: *"Compare Computer Science vs Data Analysis"* or *"What if I switched to Finance vs Marketing?"*`,
        suggestions: popularMajors.map((m) => `Compare ${student.major} vs ${m}`),
        followUpPrompts: ["List all available majors", "Which major has the highest salary?"],
        context: { type: "general" },
      };
    }

    // Compute per-major snapshot
    const studentSkillsLower = student.skills.map((s) => s.toLowerCase());
    const snapshots = matched.map((deg) => {
      // Avg credits already completed by students declared in this major
      const cohort = students.filter((s) => s.major === deg.major);
      const avgCredits = cohort.length > 0 ? Math.round(cohort.reduce((sum, s) => sum + s.completedCredits, 0) / cohort.length) : 0;

      // Top career match: best career among those listing this major as related
      const relatedCareers = careerPaths.filter((cp) => cp.relatedMajors.includes(deg.major));
      let topCareer: CareerPath | null = null;
      let topScore = 0;
      for (const cp of relatedCareers) {
        const matchedCount = cp.requiredSkills.filter((s) => studentSkillsLower.includes(s.toLowerCase())).length;
        const score = cp.requiredSkills.length > 0 ? Math.round((matchedCount / cp.requiredSkills.length) * 100) : 0;
        if (score >= topScore) {
          topScore = score;
          topCareer = cp;
        }
      }

      return {
        major: deg.major,
        totalCredits: deg.totalCredits,
        avgCompleted: avgCredits,
        topCareer: topCareer ? topCareer.title : "—",
        topScore,
        topSalary: topCareer ? topCareer.averageSalary : 0,
      };
    });

    const lines = snapshots.map((s) => `**${s.major}**: ${s.totalCredits} cr required, cohort avg ${s.avgCompleted} cr done. Top match: ${s.topCareer} (${s.topScore}%, $${s.topSalary.toLocaleString()})`);

    return {
      answer: `Here's how **${snapshots[0].major}** stacks up against **${snapshots[1].major}** for you, ${firstName}:\n\n${lines.join("\n")}\n\nWant me to map out a 4-year plan in either one?`,
      suggestions: [`Switch me to ${snapshots[0].major}`, `Switch me to ${snapshots[1].major}`, "Show transferable credits"],
      followUpPrompts: [`What courses would I lose switching to ${snapshots[1].major}?`, "Which has the better job outlook?"],
      context: { type: "career", data: snapshots },
    };
  }

  // Career questions
  if (has("career", "job", "jobs", "salary", "work", "industry", "hire", "hired", "employment", "profession", "occupation") || q.includes("after graduation") || q.includes("what can i do") || q.includes("make money") || q.includes("earn")) {
    const analysis = analyzeCareerPathways(student);
    const top = analysis.matchedPaths[0];
    if (top) {
      const matchedSkills = top.matchedSkills.slice(0, 4).join(", ");
      const missing = top.missingSkills.slice(0, 3).join(", ");
      return {
        answer: `Your strongest career match right now is **${top.career.title}** at ${top.matchScore}% (avg salary $${top.career.averageSalary.toLocaleString()}, growth ${top.career.growthRate}%/yr).\n\nYou already have: ${matchedSkills}.\n${top.missingSkills.length > 0 ? `Skills to develop: ${missing}.` : "You're well-prepared!"}\n\nWant me to find courses that close those gaps?`,
        suggestions: ["Close the skill gaps", "Show all career matches", "What if I pivot to ML?"],
        followUpPrompts: ["Compare top 3 careers side by side", "Internships near me"],
        context: { type: "career", data: analysis.matchedPaths.slice(0, 3) },
      };
    }
  }

  // Graduation / progress
  if (has("graduate", "graduation", "finish", "done", "behind", "track", "progress", "timeline", "semester", "credits", "remaining", "complete") || q.includes("catch up") || q.includes("on time") || q.includes("when will i")) {
    const progress = calculateGraduationProgress(student);
    return {
      answer: `You're at **${progress.percentComplete}%** of your degree (${progress.creditsCompleted}/${progress.requiredCredits} credits). At 15 credits/semester you'll graduate ${progress.estimatedGraduation} — ${progress.onTrack ? `that's on track with your target of ${student.expectedGraduation}.` : `that's later than your ${student.expectedGraduation} target. Want to look at summer courses to catch up?`}`,
      suggestions: progress.onTrack ? ["Show 4-year plan", "Can I graduate earlier?"] : ["Find summer courses", "Increase course load", "Show 4-year plan"],
      followUpPrompts: ["What if I overload to 18 credits?", "How does this compare to my cohort?"],
      context: { type: "progress", data: progress },
    };
  }

  // Skills
  if (has("skill", "skills", "learn", "gap", "gaps", "missing", "need", "lacking", "develop", "build", "improve", "strengthen") || q.includes("what should i know") || q.includes("what do i need")) {
    const analysis = analyzeCareerPathways(student);
    const gaps = analysis.skillGapAnalysis.gaps.slice(0, 5);
    return {
      answer: gaps.length === 0
        ? `Looking great, ${firstName} — no significant skill gaps across your target careers. Strong position.`
        : `Your top skill gaps for your career goals: **${gaps.join(", ")}**. I can recommend specific courses that teach each of these.`,
      suggestions: ["Courses to close gaps", "Show all my skills", "Add a skill to my profile"],
      followUpPrompts: ["What's the highest-ROI skill to learn next?", "Which internships need these skills?"],
      context: { type: "skills", data: gaps },
    };
  }

  // 4-year plan
  if (has("plan", "planning", "roadmap", "four", "4", "year", "schedule", "map") && (q.includes("plan") || q.includes("roadmap") || q.includes("year"))) {
    const progress = calculateGraduationProgress(student);
    return {
      answer: `Your personalized 4-year plan maps out every semester from now through ${progress.estimatedGraduation}. It's built around your ${student.major} requirements and career goals — prioritizing courses that fill your biggest skill gaps first.\n\nHead to the **4-Year Plan** tab above to see the full Kanban view. Want a quick summary of your remaining semesters instead?`,
      suggestions: ["Show remaining courses", "How many semesters left?", "Show my career matches"],
      followUpPrompts: ["Can I graduate in 3 years instead?", "What happens if I change my major?"],
      context: { type: "progress", data: progress },
    };
  }

  // GPA
  if (has("gpa", "grade", "grades", "standing", "academic", "honor", "honors", "probation", "cumulative") || q.includes("my grades")) {
    return {
      answer: `Your current GPA is **${student.gpa}**. ${student.gpa >= 3.5 ? `Excellent — you qualify for Honors consideration and most competitive grad programs.` : student.gpa >= 3.0 ? `Solid academic standing. Maintain this while building practical experience.` : `Below 3.0 — let's look at lighter course loads, tutoring through your Student Success Center, or retaking key courses.`}`,
      suggestions: ["How do I raise my GPA?", "Honors program requirements", "Show grade trend"],
      followUpPrompts: ["What if I retake a course?", "Which classes are 'GPA boosters'?"],
      context: { type: "progress" },
    };
  }

  // Default
  return {
    answer: `I'm your Velocity AI advisor, ${firstName}. I can help with course planning, career pathways, skill gaps, graduation timing, and GPA strategy. What's on your mind?`,
    suggestions: ["What should I take next semester?", "Show my career matches", "Am I on track to graduate?", "What skills should I focus on?"],
    followUpPrompts: ["Help me build a 4-year plan", "Compare my top careers"],
    context: { type: "general" },
  };
}

// --- Full Advisor Recommendation ---

export function getAdvisorRecommendation(student: Student): AdvisorRecommendation {
  const progress = calculateGraduationProgress(student);
  const recommendedCourses = recommendCourses(student);
  const riskAlerts = generateRiskAlerts(student);

  return {
    recommendedCourses,
    graduationTimeline: {
      estimatedSemesters: progress.estimatedSemesters,
      estimatedGraduation: progress.estimatedGraduation,
      onTrack: progress.onTrack,
    },
    riskAlerts,
    progressSummary: {
      percentComplete: progress.percentComplete,
      creditsRemaining: progress.creditsRemaining,
      creditsCompleted: progress.creditsCompleted,
      requiredCredits: progress.requiredCredits,
    },
  };
}

// --- Institutional Analytics ---

export function getInstitutionalAnalytics(): InstitutionalAnalytics {
  const totalStudents = students.length;
  if (totalStudents === 0) {
    return {
      totalStudents: 0, averageGPA: 0, averageProgress: 0, averageCreditsCompleted: 0,
      retentionIndicators: [], popularCareerPaths: [], commonSkillGaps: [], departmentBreakdown: [],
    };
  }
  const averageGPA = Math.round((students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents) * 100) / 100;
  const averageCreditsCompleted = Math.round(students.reduce((sum, s) => sum + s.completedCredits, 0) / totalStudents);
  const averageProgress = Math.round(
    students.reduce((sum, s) => sum + (s.completedCredits / s.requiredCredits) * 100, 0) / totalStudents
  );

  // Retention indicators
  const onTrackCount = students.filter((s) => calculateGraduationProgress(s).onTrack).length;
  const highGPACount = students.filter((s) => s.gpa >= 3.0).length;

  const retentionIndicators = [
    {
      metric: "On-Track Graduation Rate",
      value: `${Math.round((onTrackCount / totalStudents) * 100)}%`,
      status: (onTrackCount / totalStudents >= 0.8 ? "good" : onTrackCount / totalStudents >= 0.6 ? "warning" : "critical") as
        | "good"
        | "warning"
        | "critical",
    },
    {
      metric: "Good Academic Standing",
      value: `${Math.round((highGPACount / totalStudents) * 100)}%`,
      status: (highGPACount / totalStudents >= 0.8 ? "good" : highGPACount / totalStudents >= 0.6 ? "warning" : "critical") as
        | "good"
        | "warning"
        | "critical",
    },
    {
      metric: "Average GPA",
      value: averageGPA.toFixed(2),
      status: (averageGPA >= 3.0 ? "good" : averageGPA >= 2.5 ? "warning" : "critical") as "good" | "warning" | "critical",
    },
  ];

  // Popular career paths
  const careerCounts: Record<string, number> = {};
  students.forEach((s) => {
    s.careerGoals.forEach((g) => {
      careerCounts[g] = (careerCounts[g] || 0) + 1;
    });
  });
  const popularCareerPaths = Object.entries(careerCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);

  // Common skill gaps
  const allGaps = new Set<string>();
  students.forEach((s) => {
    const analysis = analyzeCareerPathways(s);
    analysis.skillGapAnalysis.gaps.forEach((g) => allGaps.add(g));
  });

  // Department breakdown
  const deptCounts: Record<string, number> = {};
  students.forEach((s) => {
    deptCounts[s.major] = (deptCounts[s.major] || 0) + 1;
  });
  const departmentBreakdown = Object.entries(deptCounts).map(([department, studentCount]) => ({
    department,
    students: studentCount,
  }));

  return {
    totalStudents,
    averageGPA,
    averageProgress,
    averageCreditsCompleted,
    retentionIndicators,
    popularCareerPaths,
    commonSkillGaps: [...allGaps].slice(0, 8),
    departmentBreakdown,
  };
}
