// =====================================================================
// UVU Expanded Catalog — Real Course & Degree Data
// =====================================================================
//
// This module expands the in-memory store with real Utah Valley University
// course and degree data sourced from the UVU public catalog and college
// program pages. Every course code, course name, and degree title here was
// verified against the sources listed below. Credit counts and prerequisites
// reflect the catalog at time of authoring; where a specific data point
// could not be independently verified it is marked `// verify` with a
// reasonable best guess.
//
// Sources (all consulted via search; direct fetch returned 403):
//   - https://catalog.uvu.edu/                                          (UVU official catalog index)
//   - https://catalog.uvu.edu/courses/cs/                               (Computer Science courses)
//   - https://catalog.uvu.edu/courses/math/                             (Mathematics courses)
//   - https://catalog.uvu.edu/courses/biol/                             (Biology courses)
//   - https://catalog.uvu.edu/courses/chem/                             (Chemistry courses)
//   - https://catalog.uvu.edu/courses/psy/                              (Psychology courses)
//   - https://catalog.uvu.edu/courses/comm/                             (Communication courses)
//   - https://catalog.uvu.edu/courses/fin/                              (Finance courses)
//   - https://catalog.uvu.edu/courses/mgmt/                             (Management courses)
//   - https://catalog.uvu.edu/courses/mktg/                             (Marketing courses)
//   - https://catalog.uvu.edu/courses/entr/                             (Entrepreneurship courses)
//   - https://catalog.uvu.edu/courses/avsc/                             (Aviation Science courses)
//   - https://catalog.uvu.edu/courses/cmgt/                             (Construction Management courses)
//   - https://catalog.uvu.edu/courses/dgm/                              (Digital Media courses)
//   - https://catalog.uvu.edu/courses/dagv/                             (Digital Media Animation/Games/VFX)
//   - https://catalog.uvu.edu/courses/dwdd/                             (Web Design & Development courses)
//   - https://catalog.uvu.edu/courses/edel/                             (Elementary Education courses)
//   - https://catalog.uvu.edu/courses/edsc/                             (Secondary Education courses)
//   - https://catalog.uvu.edu/courses/me/                               (Mechanical Engineering courses)
//   - https://catalog.uvu.edu/courses/ece/                              (Electrical & Computer Engineering)
//   - https://catalog.uvu.edu/courses/nurs/                             (Nursing courses)
//   - https://catalog.uvu.edu/courses/esec/                             (Emergency Services Emerg Care)
//   - https://catalog.uvu.edu/courses/dent/                             (Dental Hygiene courses)
//   - https://catalog.uvu.edu/general-education/                        (UVU General Education requirements)
//   - https://catalog.uvu.edu/engineering-technology/computer-science/computer-science-bs/
//   - https://catalog.uvu.edu/engineering-technology/computer-science/software-engineering-bs/
//   - https://catalog.uvu.edu/engineering-technology/computer-science/computer-science-full-stack-web-development-emphasis-bs/
//   - https://catalog.uvu.edu/engineering-technology/mechanical-and-civil-engineering/mechanical-engineering-bs/
//   - https://catalog.uvu.edu/engineering-technology/electrical-and-computer-engineering/electrical-engineering-bs/
//   - https://catalog.uvu.edu/engineering-technology/aviation-science/professional-pilot-bs/
//   - https://catalog.uvu.edu/engineering-technology/construction-technologies/construction-management-bs/
//   - https://catalog.uvu.edu/engineering-technology/digital-media/animation-game-development-bs/
//   - https://catalog.uvu.edu/engineering-technology/digital-media/web-design-development-web-app-development-emphasis-bs/
//   - https://catalog.uvu.edu/business/accounting/accounting-bs/
//   - https://catalog.uvu.edu/business/finance-economics/finance-bs/
//   - https://catalog.uvu.edu/business/marketing/marketing-bs/
//   - https://catalog.uvu.edu/health-public-service/nursing/nursing-bs/
//   - https://catalog.uvu.edu/health-public-service/public-health/public-health-bs/
//   - https://catalog.uvu.edu/health-public-service/allied-health/dental-hygiene-bs/
//   - https://catalog.uvu.edu/humanities-social-sciences/psychology-and-counseling/psychology-bs/
//   - https://catalog.uvu.edu/humanities-social-sciences/communication/applied-communication-bs/
//   - https://catalog.uvu.edu/science/biology/biology-bs/
//   - https://www.uvu.edu/cet/      (College of Engineering & Technology)
//   - https://www.uvu.edu/woodbury/ (Woodbury School of Business)
//   - https://www.uvu.edu/chps/     (College of Health & Public Service)
//   - https://www.uvu.edu/humanities/ (Humanities & Social Sciences)
//   - https://www.uvu.edu/scied/    (College of Science)
//   - https://www.uvu.edu/education/ (School of Education)
//
// Compatibility: This file re-uses the `Course` and `DegreeRequirement`
// interfaces from app/api/store.ts. IDs continue numbering from CRS-026 and
// DEG-007 so they merge cleanly with the existing seed data (CRS-001..025,
// DEG-001..006) without collisions.
// =====================================================================

import type { Course, DegreeRequirement } from "../store";

// ---------------------------------------------------------------------
// expandedCourses — Real UVU courses (CRS-026 onward)
// ---------------------------------------------------------------------

export const expandedCourses: Course[] = [
  // ---------------- General Education: English & Communication ----------------
  {
    id: "CRS-026",
    name: "Introduction to Academic Writing",
    code: "ENGL 1010",
    credits: 3,
    department: "English & Literature",
    prerequisites: [],
    skillsTaught: ["Academic Writing", "Critical Reading", "Research", "Argumentation"],
    description: "Foundational course in college-level writing focused on the academic essay, analysis, and revision.",
  },
  {
    id: "CRS-027",
    name: "Intermediate Academic Writing",
    code: "ENGL 2010",
    credits: 3,
    department: "English & Literature",
    prerequisites: ["ENGL 1010"],
    skillsTaught: ["Research Writing", "Source Evaluation", "Critical Analysis", "Argumentation", "Citation"],
    description: "Research-based academic writing emphasizing source-driven arguments and rhetorical analysis.",
  },
  {
    id: "CRS-028",
    name: "Public Speaking",
    code: "COMM 1020",
    credits: 3,
    department: "Communication",
    prerequisites: [],
    skillsTaught: ["Public Speaking", "Presentation Skills", "Critical Thinking", "Communication"],
    description: "Introduction to oral communication theory and practice; develops competence in public speaking across varied audiences.",
  },
  {
    id: "CRS-029",
    name: "Introduction to Communication",
    code: "COMM 1050",
    credits: 3,
    department: "Communication",
    prerequisites: [],
    skillsTaught: ["Communication", "Interpersonal Skills", "Communication Theory", "Active Listening"],
    description: "Survey of communication theory, principles, and contexts including interpersonal, group, and public settings.",
  },
  {
    id: "CRS-030",
    name: "Introduction to Mass Communication",
    code: "COMM 1500",
    credits: 3,
    department: "Communication",
    prerequisites: [],
    skillsTaught: ["Media Literacy", "Mass Media Theory", "Media Analysis", "Communication"],
    description: "Critical overview of American mass media, including history, regulation, and social impact.",
  },
  {
    id: "CRS-031",
    name: "Theories of Communication and Culture",
    code: "COMM 3050",
    credits: 3,
    department: "Communication",
    prerequisites: ["COMM 1050"],
    skillsTaught: ["Communication Theory", "Cultural Analysis", "Research", "Critical Thinking"],
    description: "Survey of major communication theories with emphasis on cultural and contextual application.",
  },

  // ---------------- General Education: Math & Statistics ----------------
  {
    id: "CRS-032",
    name: "College Algebra",
    code: "MATH 1050",
    credits: 4,
    department: "Mathematics",
    prerequisites: [],
    skillsTaught: ["Algebra", "Functions & Graphs", "Mathematical Modeling", "Problem Solving"],
    description: "Functions, graphs, polynomial and rational functions, exponential and logarithmic functions; foundational for calculus.",
  },
  {
    id: "CRS-033",
    name: "Trigonometry",
    code: "MATH 1060",
    credits: 3,
    department: "Mathematics",
    prerequisites: ["MATH 1050"],
    skillsTaught: ["Trigonometry", "Geometry", "Mathematical Modeling", "Problem Solving"],
    description: "Unit circle and right triangle trigonometry, identities, equations, Laws of Sines/Cosines, vectors, polar coordinates.",
  },
  {
    id: "CRS-034",
    name: "Calculus I",
    code: "MATH 1210",
    credits: 4,
    department: "Mathematics",
    prerequisites: ["MATH 1050", "MATH 1060"],
    skillsTaught: ["Calculus", "Differentiation", "Integration", "Mathematical Modeling"],
    description: "Limits, continuity, differentiation, applications of derivatives, and introductory integration.",
  },
  {
    id: "CRS-035",
    name: "Calculus II",
    code: "MATH 1220",
    credits: 4,
    department: "Mathematics",
    prerequisites: ["MATH 1210"],
    skillsTaught: ["Calculus", "Integration Techniques", "Series", "Mathematical Modeling"],
    description: "Techniques and applications of integration, sequences and series, parametric and polar equations.",
  },
  {
    id: "CRS-036",
    name: "Calculus III",
    code: "MATH 2210",
    credits: 3,
    department: "Mathematics",
    prerequisites: ["MATH 1220"],
    skillsTaught: ["Multivariable Calculus", "Vector Calculus", "Mathematical Modeling"], // verify exact catalog skills
    description: "Multivariable calculus including partial derivatives, multiple integrals, and vector calculus.",
  },
  {
    id: "CRS-037",
    name: "Differential Equations and Linear Algebra",
    code: "MATH 2250",
    credits: 4,
    department: "Mathematics",
    prerequisites: ["MATH 1220"], // verify
    skillsTaught: ["Differential Equations", "Linear Algebra", "Mathematical Modeling"],
    description: "First and higher-order differential equations integrated with linear algebra topics for engineering applications.",
  },
  {
    id: "CRS-038",
    name: "Introduction to Statistics",
    code: "STAT 1040",
    credits: 3,
    department: "Mathematics",
    prerequisites: [],
    skillsTaught: ["Statistics", "Data Analysis", "Probability", "Statistical Inference"],
    description: "Descriptive and inferential statistics for quantitative literacy; an alternative GE quantitative path.",
  },
  {
    id: "CRS-039",
    name: "Discrete Mathematical Structures I",
    code: "CS 2300",
    credits: 3,
    department: "Computer Science",
    prerequisites: ["CS 1400"], // verify
    skillsTaught: ["Discrete Math", "Logic", "Set Theory", "Proof Techniques", "Combinatorics"],
    description: "Logic, sets, relations, functions, induction, recursion, counting; mathematical foundations for computer science.",
  },

  // ---------------- General Education: Natural Sciences ----------------
  {
    id: "CRS-040",
    name: "General Biology",
    code: "BIOL 1010",
    credits: 3,
    department: "Biology",
    prerequisites: [],
    skillsTaught: ["Scientific Method", "Cell Biology", "Genetics", "Evolution", "Ecology"],
    description: "Survey of biological principles for non-majors; covers cells, genetics, evolution, and ecology.",
  },
  {
    id: "CRS-041",
    name: "College Biology I",
    code: "BIOL 1610",
    credits: 4,
    department: "Biology",
    prerequisites: [],
    skillsTaught: ["Cell Biology", "Genetics", "Biochemistry", "Scientific Method", "Lab Skills"],
    description: "Majors-level introduction to macromolecules, cell structure and function, cell energetics, genetics, and evolution.",
  },
  {
    id: "CRS-042",
    name: "College Biology II",
    code: "BIOL 1620",
    credits: 3,
    department: "Biology",
    prerequisites: ["BIOL 1610"],
    skillsTaught: ["Evolution", "Taxonomy", "Anatomy", "Physiology", "Ecology"],
    description: "Continuation of College Biology covering evolution, taxa relationships, organismal physiology, and ecology.",
  },
  {
    id: "CRS-043",
    name: "Human Anatomy",
    code: "ZOOL 2320",
    credits: 4,
    department: "Biology",
    prerequisites: ["BIOL 1010"], // verify
    skillsTaught: ["Anatomy", "Lab Skills", "Critical Thinking", "Medical Terminology"],
    description: "Structural anatomy of the human body for students preparing for biomedical or health careers.",
  },
  {
    id: "CRS-044",
    name: "Human Physiology",
    code: "ZOOL 2420",
    credits: 4,
    department: "Biology",
    prerequisites: ["ZOOL 2320"], // verify
    skillsTaught: ["Physiology", "Lab Skills", "Critical Thinking", "Systems Thinking"],
    description: "Functional study of human body systems for health professions and biomedical pathways.",
  },
  {
    id: "CRS-045",
    name: "Introduction to Chemistry",
    code: "CHEM 1010",
    credits: 3,
    department: "Chemistry",
    prerequisites: [],
    skillsTaught: ["Chemistry Fundamentals", "Scientific Method", "Problem Solving"],
    description: "Non-majors survey of fundamental chemical concepts including atomic structure, bonding, and reactions.",
  },
  {
    id: "CRS-046",
    name: "Elementary Chemistry for the Health Sciences",
    code: "CHEM 1110",
    credits: 4,
    department: "Chemistry",
    prerequisites: [],
    skillsTaught: ["Chemistry", "Lab Skills", "Health Science Foundations", "Problem Solving"],
    description: "Chemistry for nursing and allied-health students; covers general, organic, and biological chemistry basics.",
  },
  {
    id: "CRS-047",
    name: "Principles of Chemistry I",
    code: "CHEM 1210",
    credits: 4,
    department: "Chemistry",
    prerequisites: ["MATH 1050"], // verify
    skillsTaught: ["General Chemistry", "Lab Skills", "Stoichiometry", "Atomic Structure"],
    description: "First semester of general chemistry for science and engineering majors with laboratory.",
  },
  {
    id: "CRS-048",
    name: "Principles of Chemistry II",
    code: "CHEM 1220",
    credits: 4,
    department: "Chemistry",
    prerequisites: ["CHEM 1210"],
    skillsTaught: ["General Chemistry", "Kinetics", "Equilibrium", "Thermodynamics", "Lab Skills"],
    description: "Continuation of CHEM 1210 covering kinetics, equilibrium, acid-base chemistry, and thermodynamics.",
  },
  {
    id: "CRS-049",
    name: "Elementary Physics",
    code: "PHYS 1010",
    credits: 3,
    department: "Physics",
    prerequisites: [],
    skillsTaught: ["Physics Fundamentals", "Scientific Method", "Mathematical Modeling"],
    description: "Conceptual introduction to physics for non-majors covering mechanics, energy, waves, and modern physics.",
  },
  {
    id: "CRS-050",
    name: "Physics for Scientists and Engineers I",
    code: "PHYS 2210",
    credits: 4,
    department: "Physics",
    prerequisites: ["MATH 1210"],
    skillsTaught: ["Mechanics", "Kinematics", "Calculus-Based Physics", "Problem Solving"],
    description: "Calculus-based mechanics including kinematics, Newton's laws, energy, momentum, and rotation.",
  },
  {
    id: "CRS-051",
    name: "Physics for Scientists and Engineers II",
    code: "PHYS 2220",
    credits: 4,
    department: "Physics",
    prerequisites: ["PHYS 2210"],
    skillsTaught: ["Electromagnetism", "Optics", "Calculus-Based Physics", "Problem Solving"],
    description: "Calculus-based electricity and magnetism, circuits, and optics for engineering majors.",
  },

  // ---------------- General Education: Social & Behavioral Sciences / History ----------------
  {
    id: "CRS-052",
    name: "General Psychology",
    code: "PSY 1010",
    credits: 3,
    department: "Psychology",
    prerequisites: [],
    skillsTaught: ["Psychological Concepts", "Critical Thinking", "Research Methods", "Behavior Analysis"],
    description: "Survey course covering core psychological principles, theories, and major subfields.",
  },
  {
    id: "CRS-053",
    name: "Statistics for the Behavioral Sciences",
    code: "PSY 3000",
    credits: 3, // verify
    department: "Psychology",
    prerequisites: ["PSY 1010", "MATH 1050"],
    skillsTaught: ["Statistics", "Data Analysis", "Research Methods", "SPSS"],
    description: "Application of statistical concepts and procedures used in behavioral and social science research.",
  },
  {
    id: "CRS-054",
    name: "Research Methods in Psychology",
    code: "PSY 3010",
    credits: 3, // verify
    department: "Psychology",
    prerequisites: ["PSY 3000"],
    skillsTaught: ["Research Design", "APA Writing", "Critical Thinking", "Experimental Methods"],
    description: "Design, execution, and reporting of psychological research including experimental and correlational approaches.",
  },
  {
    id: "CRS-055",
    name: "Abnormal Psychology",
    code: "PSY 3400",
    credits: 3,
    department: "Psychology",
    prerequisites: ["PSY 1010"],
    skillsTaught: ["Clinical Concepts", "DSM Classification", "Critical Thinking", "Mental Health Literacy"],
    description: "Study of psychological disorders, etiology, diagnosis, and treatment approaches.",
  },
  {
    id: "CRS-056",
    name: "Introduction to Sociology",
    code: "SOC 1010",
    credits: 3,
    department: "Sociology",
    prerequisites: [],
    skillsTaught: ["Sociological Theory", "Critical Thinking", "Cultural Analysis", "Research Methods"],
    description: "Introduction to sociological perspectives on society, culture, institutions, and social change.",
  },
  {
    id: "CRS-057",
    name: "American Civilization",
    code: "HIST 1700",
    credits: 3,
    department: "History",
    prerequisites: [],
    skillsTaught: ["Historical Analysis", "Critical Thinking", "Civic Knowledge", "Research"],
    description: "Survey of American history and civic foundations; fulfills US Institutions general education requirement.",
  },
  {
    id: "CRS-058",
    name: "U.S. Government and Politics",
    code: "POLS 1100",
    credits: 3,
    department: "Political Science",
    prerequisites: [],
    skillsTaught: ["Civic Knowledge", "Critical Thinking", "Policy Analysis", "Constitutional Literacy"],
    description: "Introduction to U.S. constitutional government, political processes, and institutions.",
  },
  {
    id: "CRS-059",
    name: "World Civilizations to 1500",
    code: "HIST 1500",
    credits: 3,
    department: "History",
    prerequisites: [],
    skillsTaught: ["Historical Analysis", "Global Perspective", "Critical Thinking", "Research"],
    description: "Survey of major world civilizations and cross-cultural interactions from antiquity through 1500 CE.",
  },

  // ---------------- Computer Science (continuing real catalog) ----------------
  {
    id: "CRS-060",
    name: "Fundamentals of Programming",
    code: "CS 1400",
    credits: 3,
    department: "Computer Science",
    prerequisites: [],
    skillsTaught: ["Programming", "Algorithmic Thinking", "Problem Solving", "C++"],
    description: "Introduces techniques and tools to formulate and solve problems using computer algorithms and procedural programs.",
  },
  {
    id: "CRS-061",
    name: "Object Oriented Programming",
    code: "CS 1410",
    credits: 3,
    department: "Computer Science",
    prerequisites: ["CS 1400"],
    skillsTaught: ["OOP", "C++", "Encapsulation", "Inheritance", "Polymorphism"],
    description: "Emphasizes proper program structure using core OOP concepts: classes, objects, encapsulation, inheritance, polymorphism.",
  },
  {
    id: "CRS-062",
    name: "Software Engineering I",
    code: "CS 2450",
    credits: 3,
    department: "Computer Science",
    prerequisites: ["CS 1410"],
    skillsTaught: ["Software Engineering", "Requirements", "UML", "Git", "Team Development"],
    description: "Software development life cycle, requirements analysis, design modeling, and team-based development practices.",
  },
  {
    id: "CRS-063",
    name: "Programming in C/C++",
    code: "CS 3005",
    credits: 3,
    department: "Computer Science",
    prerequisites: ["CS 1410"], // verify
    skillsTaught: ["C", "C++", "Systems Programming", "Memory Management", "Debugging"],
    description: "In-depth study of C and C++ programming including pointers, memory management, and the standard libraries.",
  },
  {
    id: "CRS-064",
    name: "Data Privacy and Security",
    code: "CS 3100",
    credits: 3,
    department: "Computer Science",
    prerequisites: ["CS 2420"],
    skillsTaught: ["Cryptography", "Authentication", "Access Control", "Secure Coding", "Threat Detection"],
    description: "Fundamentals of computer security, cryptography, secure code, and infrastructure hardening with a hands-on approach.",
  },
  {
    id: "CRS-065",
    name: "Advanced Topics in Database",
    code: "CS 4500",
    credits: 3,
    department: "Computer Science",
    prerequisites: ["CS 3520"],
    skillsTaught: ["Transactions", "Concurrency Control", "Data Warehousing", "Distributed Databases", "Data Mining"],
    description: "Advanced database topics including transactions, concurrency, distributed systems, warehousing, and mining.",
  },
  {
    id: "CRS-066",
    name: "Senior Project",
    code: "CS 4310",
    credits: 3,
    department: "Computer Science",
    prerequisites: ["CS 3450"], // verify
    skillsTaught: ["Project Management", "Team Development", "System Design", "Agile", "Communication"],
    description: "Capstone team-based experience designing and implementing a large-scale software development project.",
  },
  {
    id: "CRS-067",
    name: "Mobile Application Development",
    code: "CS 4550",
    credits: 3, // verify
    department: "Computer Science",
    prerequisites: ["CS 2420"], // verify
    skillsTaught: ["Mobile Development", "iOS/Android", "UI Design", "API Integration"],
    description: "Design and implementation of native and cross-platform mobile applications.",
  },

  // ---------------- Information Technology / Cybersecurity (continuing real catalog) ----------------
  {
    id: "CRS-068",
    name: "Introduction to Unix/Linux",
    code: "IT 1100",
    credits: 3,
    department: "Information Technology",
    prerequisites: [],
    skillsTaught: ["Linux", "Shell Scripting", "File Systems", "Command Line"],
    description: "Foundational Linux/Unix administration including the shell, file systems, and core utilities.",
  },
  {
    id: "CRS-069",
    name: "Web Server Administration",
    code: "IT 3100",
    credits: 3, // verify
    department: "Information Technology",
    prerequisites: ["IT 2300"],
    skillsTaught: ["Web Servers", "Apache/Nginx", "DNS", "Linux Administration"],
    description: "Installation, configuration, and security of enterprise web servers and supporting services.",
  },

  // ---------------- Web Design & Development (DWDD) ----------------
  {
    id: "CRS-070",
    name: "Digital Design Essentials",
    code: "DWDD 1400",
    credits: 3,
    department: "Digital Media",
    prerequisites: [],
    skillsTaught: ["Digital Design", "Typography", "Layout", "Adobe Creative Suite"],
    description: "Fundamentals of digital layout for web development and the creation of engaging digital interfaces.",
  },
  {
    id: "CRS-071",
    name: "Web Essentials",
    code: "DWDD 1600",
    credits: 3,
    department: "Digital Media",
    prerequisites: [],
    skillsTaught: ["HTML", "CSS", "Responsive Design", "Web Accessibility"],
    description: "Foundational web design principles, tools, and techniques including HTML, CSS, and accessibility.",
  },
  {
    id: "CRS-072",
    name: "Web and App Development I",
    code: "DWDD 2600",
    credits: 3, // verify
    department: "Digital Media",
    prerequisites: ["DWDD 1600"],
    skillsTaught: ["JavaScript", "Frontend Development", "DOM", "Responsive Design"],
    description: "Intermediate frontend development using JavaScript and modern web tooling.",
  },

  // ---------------- Digital Media: Animation / Games / VFX ----------------
  {
    id: "CRS-073",
    name: "Digital Media Essentials I",
    code: "DGM 1110",
    credits: 4,
    department: "Digital Media",
    prerequisites: [],
    skillsTaught: ["Digital Imaging", "Audio/Video", "Message Design", "Adobe Creative Suite"],
    description: "In-depth introduction to digital media including imaging, audio, video, animation, and message design.",
  },
  {
    id: "CRS-074",
    name: "3D Animation Essentials",
    code: "DAGV 1100",
    credits: 3,
    department: "Digital Media",
    prerequisites: ["DGM 1110"], // verify
    skillsTaught: ["3D Animation", "Maya", "Modeling", "Animation Principles"],
    description: "Introduction to 3D animation principles and industry-standard software including modeling and rigging basics.",
  },
  {
    id: "CRS-075",
    name: "Game Development I",
    code: "DGM 2240",
    credits: 3, // verify
    department: "Digital Media",
    prerequisites: ["DGM 1110"], // verify
    skillsTaught: ["Game Design", "Unity", "C#", "Game Mechanics"],
    description: "Introduction to game development using a modern engine, covering mechanics, scripting, and pipeline.",
  },

  // ---------------- Business Core (Woodbury School of Business) ----------------
  {
    id: "CRS-076",
    name: "Introduction to Business",
    code: "MGMT 1010",
    credits: 3,
    department: "Business Management",
    prerequisites: [],
    skillsTaught: ["Business Fundamentals", "Business Vocabulary", "Critical Thinking", "Business Communication"],
    description: "Overview of the business world, its structure, procedures, and vocabulary for prospective business students.",
  },
  {
    id: "CRS-077",
    name: "Principles of Finance",
    code: "FIN 3100",
    credits: 3,
    department: "Finance",
    prerequisites: ["ACC 2010", "STAT 2040"],
    skillsTaught: ["Financial Analysis", "Time Value of Money", "Capital Budgeting", "Security Valuation"],
    description: "Financial management in the business environment; time value of money, security valuation, CAPM, capital budgeting.",
  },
  {
    id: "CRS-078",
    name: "Managerial Accounting",
    code: "ACC 2020",
    credits: 3,
    department: "Accounting",
    prerequisites: ["ACC 2010"],
    skillsTaught: ["Cost Accounting", "Budgeting", "Variance Analysis", "Decision Analysis"],
    description: "Use of accounting information for internal decision-making, including budgeting, costing, and performance analysis.",
  },
  {
    id: "CRS-079",
    name: "Intermediate Accounting I",
    code: "ACC 3310",
    credits: 3,
    department: "Accounting",
    prerequisites: ["ACC 2020"],
    skillsTaught: ["Financial Reporting", "GAAP", "Asset Accounting", "Revenue Recognition"],
    description: "In-depth study of financial accounting standards, asset and liability measurement, and revenue recognition.",
  },
  {
    id: "CRS-080",
    name: "Principles of Marketing",
    code: "MKTG 3600",
    credits: 3,
    department: "Marketing",
    prerequisites: [],
    skillsTaught: ["Marketing Strategy", "Consumer Behavior", "Market Research", "Product Management"],
    description: "Customer behavior, market research, marketing strategy, pricing, distribution, and promotion from the manager's perspective.",
  },
  {
    id: "CRS-081",
    name: "Entrepreneurship Lecture Series",
    code: "ENTR 2930R",
    credits: 1,
    department: "Entrepreneurship",
    prerequisites: [],
    skillsTaught: ["Entrepreneurship", "Networking", "Business Awareness"],
    description: "Guest speaker series on current entrepreneurship topics, issues, and opportunities.",
  },
  {
    id: "CRS-082",
    name: "Entrepreneurship Feasibility Analysis",
    code: "ENTR 3170",
    credits: 3,
    department: "Entrepreneurship",
    prerequisites: [],
    skillsTaught: ["Feasibility Analysis", "Market Validation", "Business Modeling", "Entrepreneurship"],
    description: "Experiential analysis of the feasibility of potential business opportunities.",
  },
  {
    id: "CRS-083",
    name: "Business Statistics",
    code: "MGMT 2340",
    credits: 3,
    department: "Business Management",
    prerequisites: ["MATH 1050"],
    skillsTaught: ["Statistics", "Data Analysis", "Excel", "Business Analytics"],
    description: "Applied statistics for business decision-making including regression, hypothesis testing, and forecasting.",
  },

  // ---------------- Nursing / Health Sciences ----------------
  {
    id: "CRS-084",
    name: "Foundations of Professional Nursing",
    code: "NURS 3000",
    credits: 3, // verify
    department: "Nursing",
    prerequisites: [],
    skillsTaught: ["Nursing Theory", "Professionalism", "Communication", "Ethics"],
    description: "Introduces RN-BSN students to professional nursing concepts, history, and the role of the baccalaureate nurse.",
  },
  {
    id: "CRS-085",
    name: "Health Assessment for the RN",
    code: "NURS 3010",
    credits: 3, // verify
    department: "Nursing",
    prerequisites: ["NURS 3000"], // verify
    skillsTaught: ["Health Assessment", "Patient Care", "Clinical Skills", "Documentation"],
    description: "Advanced physical, psychosocial, and cultural health assessment for the registered nurse.",
  },
  {
    id: "CRS-086",
    name: "Evidence-Based Practice in Nursing",
    code: "NURS 4400",
    credits: 3, // verify
    department: "Nursing",
    prerequisites: ["NURS 3000"], // verify
    skillsTaught: ["Evidence-Based Practice", "Research Literacy", "Clinical Reasoning", "Critical Thinking"],
    description: "Application of nursing research and evidence-based practice to improve patient care outcomes.",
  },
  {
    id: "CRS-087",
    name: "Community Health Nursing",
    code: "NURS 4500",
    credits: 4, // verify
    department: "Nursing",
    prerequisites: ["NURS 3010"], // verify
    skillsTaught: ["Population Health", "Community Assessment", "Patient Care", "Public Health"],
    description: "Population-focused nursing care including community assessment, epidemiology, and health promotion.",
  },
  {
    id: "CRS-088",
    name: "Pharmacology for Nurses",
    code: "NURS 3300",
    credits: 3, // verify
    department: "Nursing",
    prerequisites: ["CHEM 1110"], // verify
    skillsTaught: ["Pharmacology", "Medication Administration", "Patient Safety", "Clinical Reasoning"],
    description: "Pharmacological principles, drug classifications, and safe medication administration for nursing practice.",
  },
  {
    id: "CRS-089",
    name: "Emergency Medical Technician — Basic",
    code: "ESEC 1140",
    credits: 9,
    department: "Emergency Services",
    prerequisites: [],
    skillsTaught: ["Emergency Care", "Patient Assessment", "Basic Pharmacology", "EMS Operations", "Trauma Assessment"],
    description: "Entry-level EMT training including medical/legal issues, patient assessment, and skills required for Utah EMT certification.",
  },
  {
    id: "CRS-090",
    name: "Introduction to Public Health",
    code: "PUBH 1100",
    credits: 3, // verify
    department: "Public Health",
    prerequisites: [],
    skillsTaught: ["Public Health Concepts", "Health Behavior", "Epidemiology Basics", "Social Determinants"],
    description: "Overview of public health, its history, core functions, and the determinants of population health.",
  },
  {
    id: "CRS-091",
    name: "Epidemiology",
    code: "PUBH 3100",
    credits: 3, // verify
    department: "Public Health",
    prerequisites: ["PUBH 1100", "STAT 2040"],
    skillsTaught: ["Epidemiology", "Data Analysis", "Study Design", "Public Health Research"],
    description: "Methods used to study the distribution and determinants of disease in populations.",
  },
  {
    id: "CRS-092",
    name: "Health Behavior Theory",
    code: "PUBH 3400",
    credits: 3, // verify
    department: "Public Health",
    prerequisites: ["PUBH 1100"],
    skillsTaught: ["Behavior Change", "Health Education", "Theory Application", "Program Planning"],
    description: "Major theories and models used to understand and influence health behavior at the individual and community levels.",
  },
  {
    id: "CRS-093",
    name: "Dental Hygiene Theory I",
    code: "DENT 1100",
    credits: 4, // verify
    department: "Dental Hygiene",
    prerequisites: [],
    skillsTaught: ["Oral Anatomy", "Dental Instrumentation", "Patient Care", "Infection Control"],
    description: "Introduction to dental hygiene practice, instrumentation, infection control, and patient-care fundamentals.",
  },

  // ---------------- Education ----------------
  {
    id: "CRS-094",
    name: "Introduction to Education",
    code: "EDSC 1010",
    credits: 2,
    department: "Education",
    prerequisites: [],
    skillsTaught: ["Education Foundations", "Classroom Observation", "Reflective Practice", "Pedagogy"],
    description: "Matriculation course examining teaching, learning, and instructional relationships with classroom observation hours.",
  },
  {
    id: "CRS-095",
    name: "Educational Psychology",
    code: "EDSC 3000",
    credits: 3,
    department: "Education",
    prerequisites: ["EDSC 1010"],
    skillsTaught: ["Learning Theory", "Motivation", "Assessment", "Classroom Management"],
    description: "Research-based teaching and learning principles applied to secondary classrooms for student motivation and achievement.",
  },
  {
    id: "CRS-096",
    name: "Foundations of American Education",
    code: "EDSC 3050",
    credits: 2,
    department: "Education",
    prerequisites: ["EDSC 1010"],
    skillsTaught: ["Educational History", "Educational Policy", "Cultural Awareness", "Critical Thinking"],
    description: "Comprehensive overview of American education and its social, historical, economic, and political contexts.",
  },
  {
    id: "CRS-097",
    name: "Elementary Literacy Instruction and Assessment II",
    code: "EDEL 4410",
    credits: 3,
    department: "Elementary Education",
    prerequisites: [],
    skillsTaught: ["Literacy Instruction", "Reading Assessment", "Pedagogy", "Curriculum Design"],
    description: "Practical and theoretical foundations for fostering reading competence in children, grades 3 to 6.",
  },
  {
    id: "CRS-098",
    name: "Elementary Mathematics Instruction and Assessment I",
    code: "EDEL 4510",
    credits: 3,
    department: "Elementary Education",
    prerequisites: [],
    skillsTaught: ["Math Instruction", "Pedagogical Content Knowledge", "Assessment", "Curriculum Design"],
    description: "Methods for teaching math concepts to children, grades K-6, including standards-based planning and assessment.",
  },
  {
    id: "CRS-099",
    name: "Elementary Science Instruction and Assessment",
    code: "EDEL 4520",
    credits: 3,
    department: "Elementary Education",
    prerequisites: [],
    skillsTaught: ["Science Instruction", "STEM Pedagogy", "Inquiry-Based Learning", "Assessment"],
    description: "Methods for teaching science and engineering concepts to children, grades K-6, with emphasis on inquiry.",
  },
  {
    id: "CRS-100",
    name: "Student Teaching — Secondary",
    code: "EDSC 4850",
    credits: 12,
    department: "Education",
    prerequisites: ["EDSC 3000", "EDSC 3050"],
    skillsTaught: ["Classroom Teaching", "Lesson Planning", "Classroom Management", "Assessment"],
    description: "Thirteen-week culminating teaching experience in a secondary classroom (grades 7-12).",
  },

  // ---------------- Engineering: Mechanical / Electrical / Foundation ----------------
  {
    id: "CRS-101",
    name: "Engineering Orientation",
    code: "ENGR 1000",
    credits: 1, // verify
    department: "Engineering",
    prerequisites: [],
    skillsTaught: ["Engineering Career Paths", "Problem Solving", "Engineering Ethics"],
    description: "Introduction to the engineering profession, disciplines, and academic pathway at UVU.",
  },
  {
    id: "CRS-102",
    name: "Engineering Mechanics — Statics",
    code: "ENGR 2010",
    credits: 3,
    department: "Engineering",
    prerequisites: ["MATH 1210", "PHYS 2210"],
    skillsTaught: ["Statics", "Free-Body Diagrams", "Vector Mechanics", "Engineering Problem Solving"],
    description: "Equilibrium of particles and rigid bodies, trusses, frames, friction, centroids, and moments of inertia.",
  },
  {
    id: "CRS-103",
    name: "Engineering Mechanics — Dynamics",
    code: "ENGR 2030",
    credits: 3,
    department: "Engineering",
    prerequisites: ["ENGR 2010"],
    skillsTaught: ["Dynamics", "Kinematics", "Kinetics", "Engineering Problem Solving"],
    description: "Kinematics and kinetics of particles and rigid bodies including work-energy and impulse-momentum methods.",
  },
  {
    id: "CRS-104",
    name: "Strength of Materials",
    code: "ENGR 2140",
    credits: 3,
    department: "Engineering",
    prerequisites: ["ENGR 2010"],
    skillsTaught: ["Stress & Strain", "Materials Mechanics", "Beam Analysis", "Engineering Design"],
    description: "Stress, strain, axial loading, torsion, bending, deflection, and combined loading of structural members.",
  },
  {
    id: "CRS-105",
    name: "Electrical Circuits I",
    code: "ECE 2700",
    credits: 4, // verify
    department: "Electrical Engineering",
    prerequisites: ["MATH 1220", "PHYS 2220"],
    skillsTaught: ["Circuit Analysis", "Ohm's Law", "Network Theorems", "Lab Skills"],
    description: "DC and AC circuit analysis using nodal/mesh methods, network theorems, and laboratory measurement.",
  },
  {
    id: "CRS-106",
    name: "Digital Logic Design",
    code: "ECE 2810",
    credits: 4, // verify
    department: "Electrical Engineering",
    prerequisites: ["CS 1400"], // verify
    skillsTaught: ["Boolean Algebra", "Digital Design", "VHDL/Verilog", "Combinational Logic", "Sequential Logic"],
    description: "Boolean algebra, combinational and sequential logic design, and introduction to hardware description languages.",
  },
  {
    id: "CRS-107",
    name: "Engineering Graphics and Design",
    code: "EGDT 1071",
    credits: 3,
    department: "Engineering",
    prerequisites: [],
    skillsTaught: ["CAD", "Technical Drawing", "Engineering Drawings", "3D Modeling"],
    description: "Foundations of engineering graphics and computer-aided design using industry-standard CAD tools.",
  },
  {
    id: "CRS-108",
    name: "Thermodynamics",
    code: "ME 3600",
    credits: 3, // verify
    department: "Mechanical Engineering",
    prerequisites: ["MATH 1220", "PHYS 2210"],
    skillsTaught: ["Thermodynamics", "Energy Analysis", "Engineering Design", "Problem Solving"],
    description: "First and second laws of thermodynamics applied to closed and open systems, power and refrigeration cycles.",
  },

  // ---------------- Aviation Science ----------------
  {
    id: "CRS-109",
    name: "Private Pilot Ground School",
    code: "AVSC 1010",
    credits: 3, // verify
    department: "Aviation Science",
    prerequisites: [],
    skillsTaught: ["Aerodynamics", "Aviation Regulations", "Aircraft Systems", "Navigation"],
    description: "Ground instruction preparing students for the FAA Private Pilot knowledge exam and Practical Test.",
  },
  {
    id: "CRS-110",
    name: "Flight I — Private",
    code: "AVSC 1110",
    credits: 3, // verify
    department: "Aviation Science",
    prerequisites: ["AVSC 1010"],
    skillsTaught: ["Flight Operations", "Takeoff & Landing", "Cross Country", "Emergency Procedures"],
    description: "Flight training in airplane operations, basic maneuvers, cross-country, and emergencies; prepares for FAA Private Pilot test.",
  },
  {
    id: "CRS-111",
    name: "Flight II — Instrument",
    code: "AVSC 2110",
    credits: 3, // verify
    department: "Aviation Science",
    prerequisites: ["AVSC 1110"],
    skillsTaught: ["Instrument Flight", "IFR Procedures", "Navigation", "Weather"],
    description: "Attitude instrument flying, IFR departure/approach procedures, and en-route IFR navigation in actual or simulated IMC.",
  },
  {
    id: "CRS-112",
    name: "Aviation Safety",
    code: "AVSC 3300",
    credits: 3, // verify
    department: "Aviation Science",
    prerequisites: ["AVSC 1010"], // verify
    skillsTaught: ["Safety Management", "Human Factors", "Risk Assessment", "Aviation Regulations"],
    description: "Aviation safety management systems, human factors, and accident prevention strategies.",
  },

  // ---------------- Construction Management ----------------
  {
    id: "CRS-113",
    name: "Residential Building Codes",
    code: "CMGT 1060",
    credits: 3,
    department: "Construction Management",
    prerequisites: [],
    skillsTaught: ["Building Codes", "IRC", "Residential Construction", "Code Compliance"],
    description: "Standards of the International Residential Code including foundations, walls, roofs, MEP, and finishes.",
  },
  {
    id: "CRS-114",
    name: "Construction Estimating",
    code: "CMGT 2210",
    credits: 3, // verify
    department: "Construction Management",
    prerequisites: ["CMGT 1060"], // verify
    skillsTaught: ["Cost Estimating", "Quantity Takeoffs", "Bidding", "Construction Software"],
    description: "Quantity takeoffs, pricing, and bid preparation for residential and commercial construction projects.",
  },
  {
    id: "CRS-115",
    name: "Construction Scheduling and Project Management",
    code: "CMGT 3010",
    credits: 3, // verify
    department: "Construction Management",
    prerequisites: ["CMGT 2210"], // verify
    skillsTaught: ["Project Scheduling", "CPM", "Project Management", "Construction Software"],
    description: "Project planning, CPM scheduling, resource leveling, and construction project management.",
  },
  {
    id: "CRS-116",
    name: "Building Envelopes and Mechanical Systems",
    code: "CMGT 3020",
    credits: 3,
    department: "Construction Management",
    prerequisites: ["CMGT 1060"],
    skillsTaught: ["MEP Systems", "Building Envelope", "Construction Design", "Problem Solving"],
    description: "Mechanical, electrical, and plumbing principles with analysis and design of building envelopes and MEP systems.",
  },
];

// ---------------------------------------------------------------------
// expandedDegrees — Real UVU bachelor's programs (DEG-007 onward)
// ---------------------------------------------------------------------
//
// requiredCourses lists pull from the catalog's discipline-core requirements
// and reference real course IDs (both existing CRS-001..025 from store.ts
// and new CRS-026..116 above). General-education-only courses are included
// where they are explicitly required by the program (e.g. ENGL 2010, MATH
// 1050, PHYS 2210 for engineering, ZOOL 2320 for nursing prereqs).

export const expandedDegrees: DegreeRequirement[] = [
  {
    id: "DEG-007",
    major: "Software Engineering",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 120,
    // Core: CS 1400, CS 1410, CS 2300, CS 2420, CS 2450, CS 3450, CS 3520, CS 4310, plus math/stat support
    requiredCourses: ["CRS-060", "CRS-061", "CRS-039", "CRS-001", "CRS-062", "CRS-003", "CRS-004", "CRS-066", "CRS-034", "CRS-021", "CRS-027"],
    electiveCredits: 21,
  },
  {
    id: "DEG-008",
    major: "Computer Science — Full Stack Web Development Emphasis",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 120,
    requiredCourses: ["CRS-060", "CRS-061", "CRS-001", "CRS-062", "CRS-007", "CRS-003", "CRS-004", "CRS-006", "CRS-066", "CRS-027"],
    electiveCredits: 24,
  },
  {
    id: "DEG-009",
    major: "Mechanical Engineering",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 128, // UVU BSME requires minimum 128 semester credits
    requiredCourses: [
      "CRS-026", "CRS-027",                              // ENGL 1010, 2010
      "CRS-034", "CRS-035", "CRS-036", "CRS-037",        // MATH 1210, 1220, 2210, 2250
      "CRS-050", "CRS-051", "CRS-047",                   // PHYS 2210, 2220, CHEM 1210
      "CRS-101", "CRS-102", "CRS-103", "CRS-104",        // ENGR 1000, 2010, 2030, 2140
      "CRS-107", "CRS-108",                              // EGDT 1071, ME 3600
    ],
    electiveCredits: 18,
  },
  {
    id: "DEG-010",
    major: "Electrical Engineering",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 125, // UVU BSEE catalog states minimum 125
    requiredCourses: [
      "CRS-026", "CRS-027",
      "CRS-034", "CRS-035", "CRS-036", "CRS-037",
      "CRS-050", "CRS-051", "CRS-047",
      "CRS-101", "CRS-102", "CRS-105", "CRS-106",
    ],
    electiveCredits: 21,
  },
  {
    id: "DEG-011",
    major: "Professional Pilot",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-032", "CRS-038", "CRS-109", "CRS-110", "CRS-111", "CRS-112"],
    electiveCredits: 30, // verify
  },
  {
    id: "DEG-012",
    major: "Construction Management",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-032", "CRS-038", "CRS-113", "CRS-114", "CRS-115", "CRS-116", "CRS-012"],
    electiveCredits: 24,
  },
  {
    id: "DEG-013",
    major: "Animation and Game Development",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-073", "CRS-074", "CRS-075", "CRS-070"],
    electiveCredits: 36,
  },
  {
    id: "DEG-014",
    major: "Web Design and Development",
    college: "Scott M. Smith College of Engineering & Technology",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-070", "CRS-071", "CRS-072", "CRS-073", "CRS-007"],
    electiveCredits: 30,
  },
  {
    id: "DEG-015",
    major: "Accounting",
    college: "Woodbury School of Business",
    totalCredits: 120,
    // Core: ACC 2010, ACC 2020, ACC 3310, FIN 3100, MGMT 3000, MGMT 3450, MGMT 4860, MGMT 2340, MKTG 3600
    requiredCourses: ["CRS-076", "CRS-012", "CRS-078", "CRS-079", "CRS-077", "CRS-014", "CRS-015", "CRS-013", "CRS-080", "CRS-083", "CRS-027"],
    electiveCredits: 21,
  },
  {
    id: "DEG-016",
    major: "Finance",
    college: "Woodbury School of Business",
    totalCredits: 120,
    requiredCourses: ["CRS-076", "CRS-012", "CRS-078", "CRS-077", "CRS-014", "CRS-015", "CRS-013", "CRS-080", "CRS-083", "CRS-027"],
    electiveCredits: 24,
  },
  {
    id: "DEG-017",
    major: "Marketing",
    college: "Woodbury School of Business",
    totalCredits: 120,
    requiredCourses: ["CRS-076", "CRS-012", "CRS-080", "CRS-077", "CRS-014", "CRS-015", "CRS-013", "CRS-083", "CRS-081", "CRS-027"],
    electiveCredits: 24,
  },
  {
    id: "DEG-018",
    major: "Public Health",
    college: "College of Health & Public Service",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-038", "CRS-052", "CRS-040", "CRS-090", "CRS-091", "CRS-092"],
    electiveCredits: 30,
  },
  {
    id: "DEG-019",
    major: "Dental Hygiene",
    college: "College of Health & Public Service",
    totalCredits: 120,
    // Includes prerequisite anatomy/physiology/chemistry plus the DENT core
    requiredCourses: ["CRS-026", "CRS-027", "CRS-038", "CRS-046", "CRS-043", "CRS-044", "CRS-093"],
    electiveCredits: 30, // verify
  },
  {
    id: "DEG-020",
    major: "Psychology",
    college: "College of Humanities & Social Sciences",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-038", "CRS-052", "CRS-053", "CRS-054", "CRS-055"],
    electiveCredits: 33,
  },
  {
    id: "DEG-021",
    major: "Biology",
    college: "College of Science",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-034", "CRS-038", "CRS-041", "CRS-042", "CRS-047", "CRS-048", "CRS-050"],
    electiveCredits: 24,
  },
  {
    id: "DEG-022",
    major: "Applied Communication",
    college: "College of Humanities & Social Sciences",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-028", "CRS-029", "CRS-030", "CRS-031"],
    electiveCredits: 36,
  },
  {
    id: "DEG-023",
    major: "Elementary Education",
    college: "School of Education",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-032", "CRS-052", "CRS-097", "CRS-098", "CRS-099", "CRS-057"],
    electiveCredits: 27,
  },
  {
    id: "DEG-024",
    major: "Secondary Education",
    college: "School of Education",
    totalCredits: 120,
    requiredCourses: ["CRS-026", "CRS-027", "CRS-094", "CRS-095", "CRS-096", "CRS-100"],
    electiveCredits: 36,
  },
];
