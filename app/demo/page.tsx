"use client";

import { useState, useEffect, useRef } from "react";
import { AIChat } from "../components/AIChat";
import { AmbientOrbs } from "../components/AmbientOrbs";

interface Student {
  id: string;
  name: string;
  email: string;
  uvid: string;
  major: string;
  minor: string | null;
  college: string;
  gpa: number;
  completedCredits: number;
  requiredCredits: number;
  expectedGraduation: string;
  skills: string[];
  careerGoals: string[];
}

interface CourseItem {
  id: string;
  name: string;
  code: string;
  credits: number;
  department: string;
  skillsTaught: string[];
  description: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  department: string;
  skillsTaught: string[];
  description: string;
}

interface Recommendation {
  recommendedCourses: { course: Course; reasoning: string }[];
  graduationTimeline: {
    estimatedSemesters: number;
    estimatedGraduation: string;
    onTrack: boolean;
  };
  riskAlerts: { type: string; severity: string; message: string }[];
  progressSummary: {
    percentComplete: number;
    creditsRemaining: number;
    creditsCompleted: number;
    requiredCredits: number;
  };
}

interface CareerMatch {
  career: {
    id: string;
    title: string;
    averageSalary: number;
    growthRate: number;
    requiredSkills: string[];
  };
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

interface CareerAnalysis {
  matchedPaths: CareerMatch[];
  skillGapAnalysis: {
    currentSkills: string[];
    neededSkills: string[];
    gaps: string[];
  };
}

const SKILL_DESCRIPTIONS: Record<string, string> = {
  "Python": "A general-purpose programming language widely used in data science, AI, web development, and automation. Known for readable syntax and a vast library ecosystem.",
  "Java": "An object-oriented, platform-independent language used in enterprise software, Android apps, and large-scale systems. Known for strong typing and reliability.",
  "JavaScript": "The language of the web — runs in every browser and on servers via Node.js. Essential for frontend development and increasingly popular for full-stack work.",
  "HTML/CSS": "The foundational languages of the web. HTML structures content; CSS styles and lays it out. Required for any web-facing role.",
  "SQL": "The standard language for querying and managing relational databases. Used in nearly every data, backend, and analytics role.",
  "Git": "The industry-standard version control system. Every software team uses it to track changes, collaborate, and deploy code.",
  "React": "A JavaScript library for building user interfaces, maintained by Meta. The most in-demand frontend framework for web applications.",
  "Linux": "An open-source operating system used by most servers, cloud infrastructure, and developer workstations. Core knowledge for any backend, DevOps, or systems role.",
  "C++": "A high-performance, systems-level language used in game development, embedded systems, operating systems, and competitive programming.",
  "Data Structures": "The fundamental building blocks of efficient programs — arrays, linked lists, trees, graphs, hash maps. Core to any CS interview and to writing scalable code.",
  "Algorithms": "Step-by-step procedures for solving computational problems — sorting, searching, graph traversal, dynamic programming. Central to CS theory and technical interviews.",
  "Problem Solving": "Structured approaches to breaking down complex problems, designing solutions, and debugging. The meta-skill that makes all other technical skills useful.",
  "Machine Learning": "A subfield of AI that enables systems to learn from data without explicit programming. Includes supervised, unsupervised, and reinforcement learning methods.",
  "AI Fundamentals": "Core concepts in artificial intelligence — search algorithms, knowledge representation, planning, and the basics of machine learning.",
  "Neural Networks": "Computational models loosely inspired by the brain. The backbone of modern deep learning and the foundation of large language models.",
  "Agile": "An iterative software development framework that delivers working software in short cycles (sprints). Used by the vast majority of tech companies.",
  "System Design": "The discipline of designing large-scale distributed systems — databases, APIs, caching, load balancing. Critical for senior engineering roles.",
  "Testing": "Writing automated tests (unit, integration, end-to-end) to verify software correctness and prevent regressions. Required in any production engineering environment.",
  "Design Patterns": "Reusable solutions to commonly recurring software design problems (e.g. Factory, Observer, Singleton). Make code more maintainable and extensible.",
  "Database Design": "Modeling data relationships, choosing between relational and NoSQL databases, normalization, and indexing for performance.",
  "NoSQL": "Non-relational databases (MongoDB, DynamoDB, Redis) that offer flexibility and scale for specific use cases like document storage or key-value caching.",
  "Data Modeling": "The process of defining how data is structured, related, and stored — the blueprint for any database schema or API.",
  "Systems Programming": "Writing software that interacts directly with hardware or the OS — memory management, concurrency, device drivers. Used in embedded systems and OS development.",
  "Concurrency": "Managing multiple computations happening simultaneously — threads, locks, async/await, and the patterns for avoiding race conditions.",
  "Memory Management": "Understanding how programs allocate and free memory. Critical in C/C++ and for understanding performance characteristics of any language.",
  "Networking": "How computers communicate — IP addressing, TCP/UDP, DNS, HTTP, and the protocols that underpin the internet and every networked application.",
  "TCP/IP": "The foundational protocol suite of the internet. Understanding it is required for network engineering, backend development, and security roles.",
  "Network Security": "Techniques for protecting networked systems from unauthorized access, attacks, and data breaches — firewalls, VPNs, TLS, intrusion detection.",
  "AWS": "Amazon Web Services — the leading cloud platform. Proficiency in AWS (EC2, S3, Lambda, RDS) is one of the most in-demand infrastructure skills.",
  "Cloud Architecture": "Designing systems that run on cloud infrastructure — scalability, availability, cost optimization, and cloud-native patterns like microservices and serverless.",
  "DevOps": "The practice of combining software development and IT operations to shorten delivery cycles — CI/CD pipelines, infrastructure as code, monitoring.",
  "Docker": "A platform for packaging and running applications in containers, ensuring consistency across development, staging, and production environments.",
  "Kubernetes": "An open-source system for automating deployment, scaling, and management of containerized applications. The standard for container orchestration at scale.",
  "Linux Administration": "Managing Linux servers — user management, file permissions, process control, package management, and service configuration.",
  "Windows Server": "Administering Microsoft Windows Server environments — Active Directory, Group Policy, IIS, and enterprise IT infrastructure.",
  "Shell Scripting": "Writing Bash or PowerShell scripts to automate repetitive system administration tasks, deployments, and data processing pipelines.",
  "Automation": "Using scripts, tools (Ansible, Terraform), and APIs to eliminate manual repetitive tasks in infrastructure, testing, and deployment.",
  "Cisco": "Networking equipment and certifications (CCNA, CCNP) from the dominant enterprise networking vendor. Core for network engineering careers.",
  "Cybersecurity Basics": "Foundational security concepts — CIA triad, threat modeling, common attack types (phishing, SQL injection, XSS), and defense principles.",
  "Cybersecurity": "Protecting computer systems and networks from digital attacks. Encompasses network security, application security, identity management, and incident response.",
  "Risk Assessment": "Identifying, analyzing, and prioritizing security and business risks. Core to GRC (governance, risk, compliance) and security architecture roles.",
  "Wireshark": "A network protocol analyzer used to capture and inspect network traffic. Standard tool for network troubleshooting, security analysis, and forensics.",
  "Firewalls": "Hardware or software systems that monitor and control network traffic based on security rules. Foundational component of any network security architecture.",
  "Penetration Testing": "Authorized simulated attacks on systems to find vulnerabilities before malicious actors do. The core skill of offensive security / ethical hacking.",
  "Digital Forensics": "Collecting, preserving, and analyzing digital evidence from computers and networks — used in incident response and legal investigations.",
  "Excel": "Microsoft Excel proficiency — formulas, pivot tables, data analysis, and financial modeling. Expected in every business, finance, and operations role.",
  "Financial Analysis": "Interpreting financial statements, ratios, and cash flows to evaluate business health and make investment or operational decisions.",
  "Leadership": "The ability to guide teams, make decisions, resolve conflicts, and drive outcomes. Required for management tracks in every industry.",
  "Public Speaking": "Communicating clearly and persuasively in front of an audience — presentations, pitches, meetings. Highly valued in client-facing and leadership roles.",
  "Business Writing": "Writing clear, professional business documents — emails, reports, proposals, memos. Expected in any corporate environment.",
  "Project Management": "Planning, executing, and closing projects on time and budget. Includes Agile, Scrum, Kanban, and traditional waterfall methodologies.",
  "Social Media Marketing": "Using platforms (Instagram, LinkedIn, TikTok, X) to build brand awareness, grow audiences, and drive conversions.",
  "Content Strategy": "Planning, creating, and distributing content to attract and retain a target audience. Core to inbound marketing and brand-building.",
  "Google Analytics": "Web analytics platform used to track website traffic, user behavior, and campaign performance. Required for any digital marketing role.",
  "SEO": "Search Engine Optimization — techniques to improve a website's visibility in organic search results. Combines technical, content, and link-building skills.",
  "Copywriting": "Writing persuasive text for ads, emails, landing pages, and product descriptions. One of the highest-leverage marketing skills.",
  "Brand Strategy": "Defining a brand's positioning, voice, values, and visual identity to differentiate it in the market.",
  "Communication": "Expressing ideas clearly in writing and speech, listening actively, and adapting style to the audience. The top soft skill across every profession.",
  "Critical Thinking": "Analyzing information objectively, evaluating arguments, and making reasoned decisions. Valued in every role that involves non-routine problem solving.",
  "Statistics": "Collecting, analyzing, and interpreting data. Foundational for data science, research, business analytics, and any evidence-based decision making.",
  "Linear Algebra": "The mathematics of vectors, matrices, and linear transformations. Essential for machine learning, computer graphics, and data science.",
  "IT Project Management": "Managing technology projects including software deployments, infrastructure upgrades, and system migrations — often using ITIL or PMI frameworks.",
  "Patient Care": "Providing direct medical or nursing care to patients — assessment, procedures, monitoring, and compassionate communication.",
  "Anatomy": "The study of the structure of the human body — essential foundation for all clinical healthcare roles.",
  "Pharmacology": "The science of drugs — how they work, their effects, dosages, and interactions. Required for nursing, pharmacy, and medical roles.",
  "Clinical Skills": "Hands-on healthcare competencies — taking vitals, administering medications, wound care, and clinical assessment.",
  "SEO Basics": "Foundational knowledge of how search engines rank content and the techniques to optimize for better visibility.",
  "Data Analysis": "Examining, cleaning, transforming, and modeling data to discover useful information and support decision-making.",
  "Canva": "A graphic design tool widely used for creating marketing materials, social posts, presentations, and visual content without deep design expertise.",
  "Routing": "Configuring network routers to direct traffic between networks — core networking and Cisco certification skill.",
  "Switching": "Managing network switches to control traffic within a local area network (LAN) — foundational for network engineering.",
  "Network Design": "Planning and architecting network infrastructure for performance, reliability, and security.",
  "Node.js": "A JavaScript runtime for building server-side and API applications. Lets developers use JavaScript across the full stack.",
  "Bilingual (Spanish/English)": "Fluency in both Spanish and English — a significant professional asset in customer-facing, healthcare, education, and social service roles.",
  "Customer Service": "Skills for supporting customers — active listening, problem resolution, empathy, and communication across phone, email, and chat.",
  "Accounting": "Recording, classifying, and summarizing financial transactions. Foundation for finance, audit, tax, and business operations careers.",
  "Security Architecture": "Designing the security infrastructure of an organization — access controls, encryption, network segmentation, and zero-trust principles.",
};

export default function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [careerAnalysis, setCareerAnalysis] = useState<CareerAnalysis | null>(null);
  const [allCourses, setAllCourses] = useState<CourseItem[]>([]);
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"progress" | "courses" | "career" | "skills">("progress");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"student" | "counselor" | "demo">("demo");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("role");
    if (r === "student" || r === "counselor") setRole(r);
    fetch("/api/students")
      .then((r) => r.json())
      .then((data) => {
        setStudents(data.students);
        if (data.students.length > 0) {
          const paramId = params.get("student");
          const match = paramId && data.students.find((s: Student) => s.id === paramId);
          loadStudentData(match ? paramId! : data.students[0].id);
        }
        setLoading(false);
      });
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => setAllCourses(data.courses || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!openSkill) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenSkill(null);
    }
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenSkill(null);
      }
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [openSkill]);

  async function loadStudentData(id: string) {
    setLoading(true);
    setError(null);
    try {
      const [studentRes, adviseRes, careerRes] = await Promise.all([
        fetch(`/api/students/${id}`).then((r) => r.json()),
        fetch("/api/advise", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: id }),
        }).then((r) => r.json()),
        fetch("/api/career-path", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: id }),
        }).then((r) => r.json()),
      ]);
      setSelectedStudent(studentRes.student);
      setRecommendation(adviseRes.recommendation);
      setCareerAnalysis(careerRes.analysis);
    } catch {
      setError("Could not load student data. The server may have restarted — please refresh.");
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestion(text: string) {
    if (
      text === "Show me my 4-year plan" ||
      text === "Help me build a 4-year plan" ||
      text === "Am I on track to graduate?" ||
      text === "Show 4-year plan"
    ) {
      if (selectedStudent) {
        window.location.href = `/demo/plan/${selectedStudent.id}`;
      }
    } else if (text === "Show my career matches" || text === "Show all career matches") {
      setActiveTab("career");
    } else if (
      text === "What should I take next semester?" ||
      text === "Show recommended courses"
    ) {
      setActiveTab("courses");
    }
  }

  if (loading && !selectedStudent) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading Velocity...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-900 border border-red-800 rounded-xl p-8 max-w-md w-full text-center">
          <p className="text-red-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: "#275D38" }}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
      <AmbientOrbs />
      {/* UVU-branded Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#275D38" }}>
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Velocity</h1>
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "#275D38", color: "white" }}>
                  {role === "student" ? "Student" : role === "counselor" ? "Counselor" : "Demo"}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {role === "student"
                  ? "Your degree plan & recommendations"
                  : role === "counselor"
                  ? "Student profile (counselor view)"
                  : "AI Academic Advisor · Sample data · FERPA-compliant"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {selectedStudent && (
              <a
                href={`/demo/plan/${selectedStudent.id}`}
                className="text-sm text-gray-400 hover:text-green-400 transition-colors hidden md:inline"
              >
                4-Year Plan
              </a>
            )}
            {role === "student" ? (
              <>
                <a href="/student" className="text-sm text-gray-400 hover:text-green-400 transition-colors hidden sm:inline">
                  Use a different ID
                </a>
                <a href="/portal" className="text-sm text-gray-400 hover:text-white transition-colors">
                  &larr; Switch role
                </a>
              </>
            ) : role === "counselor" ? (
              <>
                <a href="/counselor" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  &larr; Back to caseload
                </a>
                {selectedStudent && (
                  <select
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:ring-1"
                    style={{ borderColor: "#275D38" }}
                    value={selectedStudent.id}
                    onChange={(e) => loadStudentData(e.target.value)}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.major}
                      </option>
                    ))}
                  </select>
                )}
              </>
            ) : (
              <>
                <a href="/admin" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  Admin Dashboard
                </a>
                <a href="/portal" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:inline">
                  Switch role
                </a>
                {selectedStudent && (
                  <select
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:ring-1"
                    style={{ borderColor: "#275D38" }}
                    value={selectedStudent.id}
                    onChange={(e) => loadStudentData(e.target.value)}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.major}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {selectedStudent && recommendation && (
          <>
            {/* Student Info Bar */}
            <div className="animate-fade-in-up bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 mb-8 shadow-lg shadow-black/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
                  <p className="text-gray-400 mt-1">
                    {selectedStudent.major}
                    {selectedStudent.minor ? ` / Minor: ${selectedStudent.minor}` : ""}
                  </p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {selectedStudent.college} &middot; UVID: {selectedStudent.uvid} &middot; Expected {selectedStudent.expectedGraduation}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "#4CAF50" }}>{selectedStudent.gpa}</div>
                    <div className="text-xs text-gray-500">GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{recommendation.progressSummary.percentComplete}%</div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${recommendation.graduationTimeline.onTrack ? "text-green-400" : "text-amber-400"}`}>
                      {recommendation.graduationTimeline.onTrack ? "On Track" : "Behind"}
                    </div>
                    <div className="text-xs text-gray-500">Status</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">
                    {recommendation.progressSummary.creditsCompleted} / {recommendation.progressSummary.requiredCredits} credits
                  </span>
                  <span className="text-gray-400">
                    {recommendation.progressSummary.creditsRemaining} remaining
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${recommendation.progressSummary.percentComplete}%`, backgroundColor: "#275D38" }}
                  />
                  <span className="animate-shimmer absolute inset-0 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Risk Alerts */}
            {recommendation.riskAlerts.length > 0 && (
              <div className="animate-fade-in-up-delay-1 mb-8 space-y-3">
                {recommendation.riskAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`border-l-4 rounded-lg p-4 ${
                      alert.severity === "high"
                        ? "bg-red-950/30 border-l-red-500/60 text-red-300"
                        : alert.severity === "medium"
                        ? "bg-amber-950/30 border-l-amber-500/60 text-amber-300"
                        : "bg-green-950/30 border-l-green-500/60 text-green-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium uppercase px-2 py-0.5 rounded ${
                        alert.severity === "high" ? "bg-red-900 text-red-200" :
                        alert.severity === "medium" ? "bg-amber-900 text-amber-200" :
                        "bg-green-900 text-green-200"
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="font-semibold text-sm">{alert.type}</span>
                    </div>
                    <p className="text-sm opacity-90">{alert.message}</p>
                    {alert.severity === "high" && (
                      <p className="text-xs mt-2 opacity-70 font-medium">
                        Example workflow (customizable per institution): advisor outreach &rarr; course-load review &rarr; tutoring referral.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Institution Impact — qualitative framing of the cost of a delayed graduation */}
            {recommendation.riskAlerts.some((a) => a.severity === "high") && (
              <div className="mb-8 rounded-xl border border-amber-800/40 bg-amber-950/20 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Cost of a delayed graduation</p>
                    <p className="text-sm text-gray-300 max-w-2xl">
                      When a student like {selectedStudent.name.split(" ")[0]} misses their target graduation by a semester, the institution typically absorbs
                      one extra semester of advising load, financial aid, and tuition assistance, and a tuition seat for the next cohort is delayed.
                      Surfacing the signal earlier gives advisors more time to plan an intervention.
                    </p>
                  </div>
                  <a
                    href="/admin"
                    className="shrink-0 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "#275D38" }}
                  >
                    See institution-wide view
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            )}

            {/* Tab Navigation - UVU green */}
            <div className="flex gap-1 mb-6 bg-gray-900 p-1 rounded-lg border border-gray-800 w-fit">
              {(["progress", "courses", "career", "skills"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "text-white shadow-md shadow-green-900/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                  style={activeTab === tab ? { backgroundColor: "#275D38" } : undefined}
                >
                  {tab === "progress" ? "Graduation Progress" : tab === "courses" ? "Recommended Courses" : tab === "career" ? "Career Pathways" : "Skills Tracker"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "progress" && (
              <div className="animate-fade-in-up-delay-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Graduation Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Graduation</span>
                      <span className="text-white font-medium">{recommendation.graduationTimeline.estimatedGraduation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Semesters Remaining</span>
                      <span className="text-white font-medium">{recommendation.graduationTimeline.estimatedSemesters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Credits Completed</span>
                      <span className="text-white font-medium">{recommendation.progressSummary.creditsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Credits Remaining</span>
                      <span className="text-white font-medium">{recommendation.progressSummary.creditsRemaining}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className={`font-medium ${recommendation.graduationTimeline.onTrack ? "text-green-400" : "text-amber-400"}`}>
                        {recommendation.graduationTimeline.onTrack ? "On Track" : "Needs Attention"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">AI Advisor Insights</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg p-4 border" style={{ backgroundColor: "rgba(39, 93, 56, 0.1)", borderColor: "rgba(39, 93, 56, 0.3)" }}>
                      <p className="text-sm text-gray-300">
                        {recommendation.graduationTimeline.onTrack
                          ? `Great progress, ${selectedStudent.name.split(" ")[0]}! You are on track to graduate by ${recommendation.graduationTimeline.estimatedGraduation}. Keep maintaining your course load of 15 credits per semester.`
                          : `${selectedStudent.name.split(" ")[0]}, you are currently behind schedule. Consider taking summer courses or increasing your semester course load to get back on track for your ${selectedStudent.expectedGraduation} target.`}
                      </p>
                    </div>
                    <div className="rounded-lg p-4 border" style={{ backgroundColor: "rgba(39, 93, 56, 0.1)", borderColor: "rgba(39, 93, 56, 0.3)" }}>
                      <p className="text-sm text-gray-300">
                        With a GPA of {selectedStudent.gpa},{" "}
                        {selectedStudent.gpa >= 3.5
                          ? "you are in excellent academic standing. Consider applying for Honors or undergraduate research opportunities."
                          : selectedStudent.gpa >= 3.0
                          ? "you have solid academic standing. Focus on maintaining this while building practical skills through experiential learning programs."
                          : "consider utilizing the Student Success Center and tutoring services to strengthen your academic performance."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="animate-fade-in-up-delay-2 space-y-4">
                <h3 className="text-lg font-semibold text-white">Recommended Next Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendation.recommendedCourses.map((rec, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-700/50 hover:shadow-md hover:shadow-green-900/10 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-mono" style={{ color: "#4CAF50" }}>{rec.course.code}</span>
                          <h4 className="text-white font-semibold mt-1">{rec.course.name}</h4>
                        </div>
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{rec.course.credits} cr</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{rec.reasoning}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.course.skillsTaught.map((skill) => (
                          <span key={skill} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(39, 93, 56, 0.2)", color: "#81C784", border: "1px solid rgba(39, 93, 56, 0.4)" }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "career" && careerAnalysis && (
              <div className="animate-fade-in-up-delay-2 space-y-6">
                <h3 className="text-lg font-semibold text-white">Career Pathway Matches</h3>
                <div className="space-y-4">
                  {careerAnalysis.matchedPaths.map((match, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-700/50 hover:shadow-md hover:shadow-green-900/10 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h4 className="text-white font-semibold text-lg">{match.career.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">
                            Avg. Salary: ${match.career.averageSalary.toLocaleString()} &middot; Growth: {match.career.growthRate}%
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className={`text-2xl font-bold ${match.matchScore >= 70 ? "text-green-400" : match.matchScore >= 40 ? "text-amber-400" : "text-red-400"}`}>
                            {match.matchScore}%
                          </div>
                          <div className="text-xs text-gray-500">Match Score</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full ${match.matchScore >= 70 ? "bg-green-500" : match.matchScore >= 40 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${match.matchScore}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Skills You Have</p>
                          <div className="flex flex-wrap gap-1.5">
                            {match.matchedSkills.map((skill) => (
                              <button key={skill} onClick={() => setOpenSkill(skill)} className="text-xs bg-green-950/50 text-green-300 border border-green-800/50 px-2 py-0.5 rounded hover:bg-green-900/60 hover:border-green-600 transition-colors cursor-pointer">
                                {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Skills to Develop <span className="text-gray-600 normal-case font-normal">(click any)</span></p>
                          <div className="flex flex-wrap gap-1.5">
                            {match.missingSkills.map((skill) => (
                              <button key={skill} onClick={() => setOpenSkill(skill)} className="text-xs bg-red-950/50 text-red-300 border border-red-800/50 px-2 py-0.5 rounded hover:bg-red-900/60 hover:border-red-600 transition-colors cursor-pointer">
                                {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills" && careerAnalysis && selectedStudent && (
              <div className="animate-fade-in-up-delay-2 space-y-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">Current Skills</h3>
                  <p className="text-xs text-gray-500 mb-4">Click any skill to see what it is and which courses build it.</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill) => (
                      <button key={skill} onClick={() => setOpenSkill(skill)} className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-md hover:shadow-green-900/30 cursor-pointer" style={{ backgroundColor: "rgba(39, 93, 56, 0.2)", color: "#81C784", border: "1px solid rgba(39, 93, 56, 0.4)" }}>
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">Skill Gaps for Career Goals</h3>
                  <p className="text-xs text-gray-500 mb-4">Click any gap to see what it is and which courses help you build it.</p>
                  <div className="flex flex-wrap gap-2">
                    {careerAnalysis.skillGapAnalysis.gaps.map((skill) => (
                      <button key={skill} onClick={() => setOpenSkill(skill)} className="bg-amber-950/50 text-amber-300 border border-amber-800/50 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-900/60 hover:border-amber-600 transition-all hover:scale-105 cursor-pointer">
                        {skill}
                      </button>
                    ))}
                  </div>
                  {careerAnalysis.skillGapAnalysis.gaps.length === 0 && (
                    <p className="text-gray-400 text-sm">No significant skill gaps identified. You are well-prepared for your career goals!</p>
                  )}
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Career Goals</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.careerGoals.map((goal) => (
                      <span key={goal} className="bg-gray-800 text-gray-200 border border-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <p className="text-gray-400 mb-2">
          Ready to see this with your students?{" "}
          <a href="/pricing" className="underline text-green-400 hover:text-green-300">Request a pilot &rarr;</a>
        </p>
        <p>Velocity &middot; AI Academic Advising &middot; FERPA-compliant</p>
        <p className="mt-1 text-gray-600">Demo uses a public course catalog; sample student profiles are fictional.</p>
      </footer>

      {selectedStudent && (
        <AIChat
          studentId={selectedStudent.id}
          studentName={selectedStudent.name}
          onSuggestion={handleSuggestion}
        />
      )}

      {/* Skill detail panel */}
      {openSkill && (() => {
        const relatedCourses = allCourses.filter((c) =>
          c.skillsTaught.some((s) => s.toLowerCase() === openSkill.toLowerCase())
        );
        const description = SKILL_DESCRIPTIONS[openSkill];
        return (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />
            <div
              ref={panelRef}
              role="dialog"
              aria-label={`Skill detail: ${openSkill}`}
              className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col bg-gray-950 border-l border-gray-800 shadow-2xl animate-fade-in-up"
              style={{ animationDuration: "200ms" }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: "#4CAF50" }}>
                    Skill detail
                  </div>
                  <h2 className="text-xl font-bold text-white">{openSkill}</h2>
                </div>
                <button
                  onClick={() => setOpenSkill(null)}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">What is this?</h3>
                  {description ? (
                    <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No description available for this skill yet.</p>
                  )}
                </div>

                {/* Related courses */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Courses that build this skill
                    {relatedCourses.length > 0 && (
                      <span className="ml-2 text-gray-600 normal-case font-normal">({relatedCourses.length} found)</span>
                    )}
                  </h3>
                  {relatedCourses.length > 0 ? (
                    <div className="space-y-3">
                      {relatedCourses.map((course) => (
                        <div
                          key={course.id}
                          className="bg-gray-900 border border-gray-700/60 rounded-xl p-4 hover:border-green-700/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <span className="text-sm font-semibold text-white leading-snug">{course.name}</span>
                            <span className="text-xs text-gray-500 shrink-0 tabular-nums">{course.credits} cr</span>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">{course.code} &middot; {course.department}</div>
                          <p className="text-xs text-gray-400 leading-relaxed">{course.description}</p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {course.skillsTaught.map((s) => (
                              <button
                                key={s}
                                onClick={() => setOpenSkill(s)}
                                className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                                  s.toLowerCase() === openSkill.toLowerCase()
                                    ? "bg-green-900/50 text-green-300 border-green-700/60"
                                    : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-300"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm text-gray-500">
                      No courses in the current catalog directly teach this skill. It may be developed through project work, internships, or electives not yet in the catalog.
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-800">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Courses shown are from the loaded sample catalog. Your institution may offer additional courses that develop this skill.
                </p>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
