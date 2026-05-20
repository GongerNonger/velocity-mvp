// Velocity  Expanded Career Paths (BLS / O*NET sourced)
// ----------------------------------------------------------------
// IDs CAR-014 onward. Do NOT renumber — CAR-001..CAR-013 live in
// app/api/store.ts and are referenced by the matching engine.
//
// Every entry is traceable to a BLS Occupational Outlook Handbook
// page (see `bls_link`). Salaries are the May 2024 OEWS median
// annual wage rounded to the nearest $1,000. Growth rates are the
// BLS 2024–2034 projected employment change (whole-percent integer,
// as published in the OOH "Job Outlook" tab).
//
// Skill lists are condensed from the O*NET "Technology Skills" and
// "Knowledge" sections for the matching SOC code, normalized to the
// vocabulary used in store.ts (so the matcher can score overlap).
//
// Pulled: 2026-05-20. Re-pull annually after each May OEWS release
// (typically published the following April).

import type { CareerPath } from "../store";

// Extended shape: base CareerPath plus the BLS citation URL the UI
// uses to surface a "Source: BLS" footnote next to wage/growth numbers.
// Kept separate from store.ts so this module can be regenerated
// (e.g. annually after each May OEWS release) without touching the
// in-memory store schema.
export interface CareerPathWithSource extends CareerPath {
  bls_link: string;
}

export const careerMetadataNotes = `# Career Path Data Sources

**Date pulled:** 2026-05-20
**Primary source:** U.S. Bureau of Labor Statistics — Occupational Outlook Handbook (OOH)
https://www.bls.gov/ooh/

**Wage figures:** May 2024 OEWS (Occupational Employment and Wage Statistics) median annual wage, rounded to the nearest $1,000. Reference: https://www.bls.gov/oes/2024/may/featured_data.htm

**Growth figures:** BLS 2024–2034 projected employment change, taken from the "Job Outlook" tab of each OOH occupation page. Reference: https://www.bls.gov/emp/

**Skill vocabulary:** Skill names harmonized to the terminology in app/api/store.ts (e.g. "Linux Administration", "Project Management", "Financial Analysis") so the career-match scoring function can compute intersection with student skill arrays. Underlying skill content is derived from O*NET Online's Technology Skills, Tools Used, and Knowledge sections for each matching SOC code (https://www.onetonline.org/).

**Notes on omissions:**
- "Aviation Pilot" mapped to BLS "Airline and Commercial Pilots" (SOC 53-2010 group; the OOH publishes wage for commercial pilots specifically — $122,670 — which is the figure used).
- "Mobile Developer", "DevOps Engineer", "SRE", "QA Engineer", and "Data Engineer" are not standalone SOC codes; they roll up into BLS "Software Developers, Quality Assurance Analysts, and Testers" (SOC 15-1250). The bls_link points to that combined page and the wage shown ($133,080) is the SOC-15-1252 median (software developers). QA Engineer uses the SOC-15-1253 testers median ($102,610) when available.
- "UX Designer" mapped to BLS "Web and Digital Interface Designers" (SOC 15-1255, median $98,090) — distinct from "Web Developers" (SOC 15-1254, median $90,930).
- "Data Analyst" is not a standalone SOC code; closest BLS occupation is "Operations Research Analysts" (SOC 15-2031) for analytical roles, though many job postings labeled "Data Analyst" map to "Data Scientists" (15-2051) too. We use Operations Research Analysts for the conservative figure.
- "Healthcare Administrator" mapped to "Medical and Health Services Managers" (SOC 11-9111).
- "Public Health Analyst" mapped to "Epidemiologists" (SOC 19-1041).
- "Public Health Educator" mapped to "Health Education Specialists" (SOC 21-1091).
- Roles where BLS publishes a separate, materially different median for sub-occupations (Web Developers vs. Digital Interface Designers; Software Developers vs. QA Testers; Database Administrators vs. Database Architects; Advertising Managers vs. Marketing Managers) are split into separate CAR entries.
`;

export const expandedCareerPaths: CareerPathWithSource[] = [
  // ---------- TECH ----------
  {
    id: "CAR-014",
    title: "Data Scientist",
    requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Analysis", "Linear Algebra", "Neural Networks"],
    averageSalary: 113000,
    growthRate: 34,
    relatedMajors: ["Computer Science", "Information Technology"],
    // BLS OOH Data Scientists — $112,590 median (May 2024); +34% 2024–34
    // https://www.bls.gov/ooh/math/data-scientists.htm
    bls_link: "https://www.bls.gov/ooh/math/data-scientists.htm",
  },
  {
    id: "CAR-015",
    title: "Data Engineer",
    requiredSkills: ["Python", "SQL", "Data Structures", "Cloud Architecture", "Database Design", "Linux", "Automation"],
    averageSalary: 133000,
    growthRate: 15,
    relatedMajors: ["Computer Science", "Information Technology"],
    // BLS rolls Data Engineers into "Software Developers, QA Analysts, and Testers"
    // SOC 15-1252 software developer median = $133,080 (May 2024); +15% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  },
  {
    id: "CAR-016",
    title: "Data Analyst",
    requiredSkills: ["SQL", "Statistics", "Data Analysis", "Python", "Excel", "Tableau", "Communication"],
    averageSalary: 91000,
    growthRate: 21,
    relatedMajors: ["Computer Science", "Information Technology", "Business Management"],
    // Mapped to BLS Operations Research Analysts — $91,290 median (May 2024); +21% 2024–34
    // https://www.bls.gov/ooh/math/operations-research-analysts.htm
    bls_link: "https://www.bls.gov/ooh/math/operations-research-analysts.htm",
  },
  {
    id: "CAR-017",
    title: "DevOps Engineer",
    requiredSkills: ["Linux Administration", "AWS", "Docker", "Kubernetes", "Shell Scripting", "Automation", "Python", "Networking"],
    averageSalary: 133000,
    growthRate: 15,
    relatedMajors: ["Information Technology", "Computer Science"],
    // BLS rolls DevOps into Software Developers — $133,080 (May 2024); +15% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  },
  {
    id: "CAR-018",
    title: "Site Reliability Engineer",
    requiredSkills: ["Linux Administration", "Python", "Cloud Architecture", "Networking", "Automation", "Shell Scripting", "Kubernetes"],
    averageSalary: 133000,
    growthRate: 15,
    relatedMajors: ["Computer Science", "Information Technology"],
    // BLS rolls SRE into Software Developers (15-1252) — $133,080 (May 2024); +15% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  },
  {
    id: "CAR-019",
    title: "QA Engineer",
    requiredSkills: ["Testing", "Python", "Java", "Git", "Communication", "Agile", "Problem Solving"],
    averageSalary: 103000,
    growthRate: 15,
    relatedMajors: ["Computer Science", "Information Technology"],
    // BLS Software Developers, QA Analysts, and Testers (testers SOC 15-1253) — testers median ~$102,610 (May 2024); +15% 2024–34 overall group
    // https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  },
  {
    id: "CAR-020",
    title: "Mobile Developer",
    requiredSkills: ["Java", "JavaScript", "Git", "Testing", "HTML/CSS", "Algorithms", "Design Patterns"],
    averageSalary: 133000,
    growthRate: 15,
    relatedMajors: ["Computer Science", "Software Engineering"],
    // BLS Software Developers — $133,080 (May 2024); +15% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  },
  {
    id: "CAR-021",
    title: "UX Designer",
    requiredSkills: ["HTML/CSS", "JavaScript", "Communication", "Consumer Psychology", "Design Patterns", "Content Strategy", "A/B Testing"],
    averageSalary: 98000,
    growthRate: 7,
    relatedMajors: ["Web Design & Development", "Digital Marketing", "Computer Science"],
    // BLS Web and Digital Interface Designers (SOC 15-1255) — $98,090 (May 2024); group +7% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm",
  },
  {
    id: "CAR-022",
    title: "Information Security Analyst",
    requiredSkills: ["Cybersecurity Basics", "Networking", "Risk Assessment", "SIEM", "Incident Response", "Firewalls", "Linux", "Python"],
    averageSalary: 125000,
    growthRate: 29,
    relatedMajors: ["Cybersecurity", "Information Technology"],
    // BLS Information Security Analysts — $124,910 (May 2024); +29% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm",
  },
  {
    id: "CAR-023",
    title: "Computer Systems Analyst",
    requiredSkills: ["SQL", "Business Analysis", "Communication", "System Design", "Project Management", "Data Analysis"],
    averageSalary: 104000,
    growthRate: 9,
    relatedMajors: ["Information Technology", "Computer Science", "Business Management"],
    // BLS Computer Systems Analysts — $103,790 (May 2024); +9% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm",
  },
  {
    id: "CAR-024",
    title: "Database Administrator",
    requiredSkills: ["SQL", "Database Design", "NoSQL", "Linux Administration", "Python", "Data Modeling", "Automation"],
    averageSalary: 105000,
    growthRate: 4,
    relatedMajors: ["Computer Science", "Information Technology"],
    // BLS Database Administrators and Architects (DBAs $104,620 / Architects $135,980, May 2024); +4% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/database-administrators.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/database-administrators.htm",
  },
  {
    id: "CAR-025",
    title: "Computer Network Architect",
    requiredSkills: ["Networking", "Cisco", "Cloud Architecture", "Linux Administration", "Network Security", "System Design", "Automation"],
    averageSalary: 130000,
    growthRate: 12,
    relatedMajors: ["Information Technology", "Computer Science"],
    // BLS Computer Network Architects — $130,390 (May 2024); +12% 2024–34
    // https://www.bls.gov/ooh/computer-and-information-technology/computer-network-architects.htm
    bls_link: "https://www.bls.gov/ooh/computer-and-information-technology/computer-network-architects.htm",
  },

  // ---------- BUSINESS / FINANCE ----------
  {
    id: "CAR-026",
    title: "Financial Analyst",
    requiredSkills: ["Financial Analysis", "Excel", "Statistics", "Communication", "Accounting", "Data Analysis", "Business Writing"],
    averageSalary: 101000,
    growthRate: 6,
    relatedMajors: ["Finance", "Accounting", "Business Management"],
    // BLS Financial and Investment Analysts — $101,350 (May 2024); +6% 2024–34
    // https://www.bls.gov/ooh/business-and-financial/financial-analysts.htm
    bls_link: "https://www.bls.gov/ooh/business-and-financial/financial-analysts.htm",
  },
  {
    id: "CAR-027",
    title: "Accountant",
    requiredSkills: ["Accounting", "Financial Analysis", "Excel", "Financial Statements", "Business Writing", "Communication"],
    averageSalary: 82000,
    growthRate: 5,
    relatedMajors: ["Accounting", "Business Management", "Finance"],
    // BLS Accountants and Auditors — $81,680 (May 2024); +5% 2024–34
    // https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm
    bls_link: "https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm",
  },
  {
    id: "CAR-028",
    title: "Market Research Analyst",
    requiredSkills: ["Market Research", "Data Analysis", "Statistics", "Consumer Psychology", "Excel", "Communication", "Segmentation"],
    averageSalary: 77000,
    growthRate: 7,
    relatedMajors: ["Digital Marketing", "Business Management", "Communication"],
    // BLS Market Research Analysts — $76,950 (May 2024); +7% 2024–34
    // https://www.bls.gov/ooh/business-and-financial/market-research-analysts.htm
    bls_link: "https://www.bls.gov/ooh/business-and-financial/market-research-analysts.htm",
  },
  {
    id: "CAR-029",
    title: "Human Resources Manager",
    requiredSkills: ["Leadership", "Communication", "Organizational Design", "Business Writing", "Project Management", "Team Management"],
    averageSalary: 140000,
    growthRate: 5,
    relatedMajors: ["Business Management", "Psychology", "Communication"],
    // BLS Human Resources Managers — $140,030 (May 2024); +5% 2024–34
    // https://www.bls.gov/ooh/management/human-resources-managers.htm
    bls_link: "https://www.bls.gov/ooh/management/human-resources-managers.htm",
  },
  {
    id: "CAR-030",
    title: "Marketing Specialist",
    requiredSkills: ["Market Research", "Data Analysis", "Communication", "Content Strategy", "Google Analytics", "Segmentation", "Excel"],
    averageSalary: 77000,
    growthRate: 7,
    relatedMajors: ["Digital Marketing", "Business Management", "Communication"],
    // Marketing Specialist mapped to BLS Market Research Analysts (15-1141 / 13-1161) — $76,950 (May 2024); +7% 2024–34
    // https://www.bls.gov/ooh/business-and-financial/market-research-analysts.htm
    bls_link: "https://www.bls.gov/ooh/business-and-financial/market-research-analysts.htm",
  },
  {
    id: "CAR-031",
    title: "Marketing Manager",
    requiredSkills: ["Brand Strategy", "Leadership", "Data Analysis", "Strategic Planning", "Communication", "Campaign Management", "Market Research"],
    averageSalary: 161000,
    growthRate: 6,
    relatedMajors: ["Digital Marketing", "Business Management"],
    // BLS Marketing Managers — $161,030 (May 2024); +6% 2024–34 (group: advertising, promotions, marketing managers)
    // https://www.bls.gov/ooh/management/advertising-promotions-and-marketing-managers.htm
    bls_link: "https://www.bls.gov/ooh/management/advertising-promotions-and-marketing-managers.htm",
  },
  {
    id: "CAR-032",
    title: "Operations Manager",
    requiredSkills: ["Leadership", "Operations", "Strategic Planning", "Project Management", "Communication", "Team Management", "Excel"],
    averageSalary: 103000,
    growthRate: 4,
    relatedMajors: ["Business Management"],
    // BLS General and Operations Managers — $102,950 (May 2024); ~4% 2024–34 (per Management Occupations group)
    // https://www.bls.gov/ooh/management/
    bls_link: "https://www.bls.gov/ooh/management/",
  },
  {
    id: "CAR-033",
    title: "Project Management Specialist",
    requiredSkills: ["Project Management", "Communication", "Leadership", "Agile", "Excel", "Strategic Planning", "Team Management"],
    averageSalary: 101000,
    growthRate: 6,
    relatedMajors: ["Business Management", "Information Technology", "Construction Management"],
    // BLS Project Management Specialists — $100,750 (May 2024); +6% 2024–34
    // https://www.bls.gov/ooh/business-and-financial/project-management-specialists.htm
    bls_link: "https://www.bls.gov/ooh/business-and-financial/project-management-specialists.htm",
  },
  {
    id: "CAR-034",
    title: "Management Analyst",
    requiredSkills: ["Business Analysis", "Strategic Planning", "Financial Analysis", "Communication", "Excel", "Project Management", "Public Speaking"],
    averageSalary: 101000,
    growthRate: 9,
    relatedMajors: ["Business Management", "Finance"],
    // BLS Management Analysts — $101,190 (May 2024); +9% 2024–34
    // https://www.bls.gov/ooh/business-and-financial/management-analysts.htm
    bls_link: "https://www.bls.gov/ooh/business-and-financial/management-analysts.htm",
  },
  {
    id: "CAR-035",
    title: "Actuary",
    requiredSkills: ["Statistics", "Financial Analysis", "Linear Algebra", "Probability", "Excel", "Communication", "Data Analysis"],
    averageSalary: 126000,
    growthRate: 22,
    relatedMajors: ["Finance", "Business Management"],
    // BLS Actuaries — $125,770 (May 2024); +22% 2024–34
    // https://www.bls.gov/ooh/math/actuaries.htm
    bls_link: "https://www.bls.gov/ooh/math/actuaries.htm",
  },
  {
    id: "CAR-036",
    title: "Logistician",
    requiredSkills: ["Operations", "Supply Chain", "Process Optimization", "Communication", "Excel", "Project Management", "Data Analysis"],
    averageSalary: 81000,
    growthRate: 17,
    relatedMajors: ["Business Management"],
    // BLS Logisticians — $80,880 (May 2024); +17% 2024–34
    // https://www.bls.gov/ooh/business-and-financial/logisticians.htm
    bls_link: "https://www.bls.gov/ooh/business-and-financial/logisticians.htm",
  },

  // ---------- HEALTH ----------
  {
    id: "CAR-037",
    title: "Healthcare Administrator",
    requiredSkills: ["Leadership", "Communication", "Operations", "Strategic Planning", "Project Management", "Business Writing", "Team Management"],
    averageSalary: 118000,
    growthRate: 23,
    relatedMajors: ["Public Health", "Business Management"],
    // BLS Medical and Health Services Managers — $117,960 (May 2024); +23% 2024–34
    // https://www.bls.gov/ooh/management/medical-and-health-services-managers.htm
    bls_link: "https://www.bls.gov/ooh/management/medical-and-health-services-managers.htm",
  },
  {
    id: "CAR-038",
    title: "Physician Assistant",
    requiredSkills: ["Patient Care", "Clinical Skills", "Pharmacology", "Diagnostics", "Anatomy", "Critical Thinking", "Communication"],
    averageSalary: 133000,
    growthRate: 20,
    relatedMajors: ["Nursing", "Public Health"],
    // BLS Physician Assistants — $133,260 (May 2024); +20% 2024–34
    // https://www.bls.gov/ooh/healthcare/physician-assistants.htm
    bls_link: "https://www.bls.gov/ooh/healthcare/physician-assistants.htm",
  },
  {
    id: "CAR-039",
    title: "Dental Hygienist",
    requiredSkills: ["Patient Care", "Clinical Skills", "Anatomy", "Communication", "Critical Thinking"],
    averageSalary: 94000,
    growthRate: 7,
    relatedMajors: ["Nursing", "Public Health"],
    // BLS Dental Hygienists — $94,260 (May 2024); +7% 2024–34
    // https://www.bls.gov/ooh/healthcare/dental-hygienists.htm
    bls_link: "https://www.bls.gov/ooh/healthcare/dental-hygienists.htm",
  },
  {
    id: "CAR-040",
    title: "Paramedic",
    requiredSkills: ["Patient Care", "Clinical Skills", "Anatomy", "Critical Thinking", "Communication", "Pharmacology"],
    averageSalary: 58000,
    growthRate: 5,
    relatedMajors: ["Nursing", "Public Health"],
    // BLS EMTs and Paramedics — Paramedics $58,410 (May 2024); +5% 2024–34
    // https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm
    bls_link: "https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm",
  },
  {
    id: "CAR-041",
    title: "Respiratory Therapist",
    requiredSkills: ["Patient Care", "Clinical Skills", "Anatomy", "Pharmacology", "Communication", "Critical Thinking"],
    averageSalary: 80000,
    growthRate: 12,
    relatedMajors: ["Nursing", "Public Health"],
    // BLS Respiratory Therapists — $80,450 (May 2024); +12% 2024–34
    // https://www.bls.gov/ooh/healthcare/respiratory-therapists.htm
    bls_link: "https://www.bls.gov/ooh/healthcare/respiratory-therapists.htm",
  },
  {
    id: "CAR-042",
    title: "Public Health Analyst",
    requiredSkills: ["Statistics", "Data Analysis", "Communication", "Risk Assessment", "Research", "Business Writing", "Critical Thinking"],
    averageSalary: 84000,
    growthRate: 16,
    relatedMajors: ["Public Health"],
    // BLS Epidemiologists — $83,980 (May 2024); +16% 2024–34
    // https://www.bls.gov/ooh/life-physical-and-social-science/epidemiologists.htm
    bls_link: "https://www.bls.gov/ooh/life-physical-and-social-science/epidemiologists.htm",
  },
  {
    id: "CAR-043",
    title: "Health Education Specialist",
    requiredSkills: ["Communication", "Public Speaking", "Research", "Community Outreach", "Business Writing", "Project Management"],
    averageSalary: 63000,
    growthRate: 7,
    relatedMajors: ["Public Health", "Education", "Communication"],
    // BLS Health Education Specialists — $63,000 (May 2024); +7% 2024–34 (group avg; OOH page)
    // https://www.bls.gov/ooh/community-and-social-service/health-educators.htm
    bls_link: "https://www.bls.gov/ooh/community-and-social-service/health-educators.htm",
  },

  // ---------- EDUCATION ----------
  {
    id: "CAR-044",
    title: "Elementary School Teacher",
    requiredSkills: ["Communication", "Public Speaking", "Patience", "Curriculum Development", "Critical Thinking", "Team Management"],
    averageSalary: 61000,
    growthRate: -2,
    relatedMajors: ["Education"],
    // BLS Kindergarten and Elementary School Teachers — $61,430 (May 2024); -2% 2024–34 (declining)
    // https://www.bls.gov/ooh/education-training-and-library/kindergarten-and-elementary-school-teachers.htm
    bls_link: "https://www.bls.gov/ooh/education-training-and-library/kindergarten-and-elementary-school-teachers.htm",
  },
  {
    id: "CAR-045",
    title: "Secondary School Teacher",
    requiredSkills: ["Communication", "Public Speaking", "Curriculum Development", "Critical Thinking", "Subject Expertise", "Team Management"],
    averageSalary: 65000,
    growthRate: -2,
    relatedMajors: ["Education"],
    // BLS High School Teachers — $64,580 (May 2024); -2% 2024–34
    // https://www.bls.gov/ooh/education-training-and-library/high-school-teachers.htm
    bls_link: "https://www.bls.gov/ooh/education-training-and-library/high-school-teachers.htm",
  },
  {
    id: "CAR-046",
    title: "Special Education Teacher",
    requiredSkills: ["Communication", "Patience", "Curriculum Development", "Critical Thinking", "Individualized Instruction", "Team Management"],
    averageSalary: 64000,
    growthRate: -1,
    relatedMajors: ["Education", "Psychology"],
    // BLS Special Education Teachers — $64,270 (May 2024); -1% 2024–34
    // https://www.bls.gov/ooh/education-training-and-library/special-education-teachers.htm
    bls_link: "https://www.bls.gov/ooh/education-training-and-library/special-education-teachers.htm",
  },
  {
    id: "CAR-047",
    title: "School Counselor",
    requiredSkills: ["Communication", "Active Listening", "Critical Thinking", "Patience", "Public Speaking", "Community Outreach"],
    averageSalary: 65000,
    growthRate: 4,
    relatedMajors: ["Psychology", "Education", "Communication"],
    // BLS School and Career Counselors and Advisors — $65,140 (May 2024); +4% 2024–34
    // https://www.bls.gov/ooh/community-and-social-service/school-and-career-counselors.htm
    bls_link: "https://www.bls.gov/ooh/community-and-social-service/school-and-career-counselors.htm",
  },

  // ---------- ENGINEERING ----------
  {
    id: "CAR-048",
    title: "Mechanical Engineer",
    requiredSkills: ["Mathematical Modeling", "CAD", "Problem Solving", "Statistics", "Project Management", "Communication", "Linear Algebra"],
    averageSalary: 102000,
    growthRate: 9,
    relatedMajors: ["Mechanical Engineering"],
    // BLS Mechanical Engineers — $102,320 (May 2024); +9% 2024–34
    // https://www.bls.gov/ooh/architecture-and-engineering/mechanical-engineers.htm
    bls_link: "https://www.bls.gov/ooh/architecture-and-engineering/mechanical-engineers.htm",
  },
  {
    id: "CAR-049",
    title: "Civil Engineer",
    requiredSkills: ["Mathematical Modeling", "CAD", "Project Management", "Communication", "Problem Solving", "Statistics", "Linear Algebra"],
    averageSalary: 100000,
    growthRate: 5,
    relatedMajors: ["Construction Management", "Mechanical Engineering"],
    // BLS Civil Engineers — $99,590 (May 2024); +5% 2024–34
    // https://www.bls.gov/ooh/architecture-and-engineering/civil-engineers.htm
    bls_link: "https://www.bls.gov/ooh/architecture-and-engineering/civil-engineers.htm",
  },
  {
    id: "CAR-050",
    title: "Electrical Engineer",
    requiredSkills: ["Mathematical Modeling", "Linear Algebra", "Problem Solving", "Statistics", "Communication", "CAD", "Project Management"],
    averageSalary: 112000,
    growthRate: 7,
    relatedMajors: ["Mechanical Engineering"],
    // BLS Electrical and Electronics Engineers — Electrical $111,910 (May 2024); +7% 2024–34
    // https://www.bls.gov/ooh/architecture-and-engineering/electrical-and-electronics-engineers.htm
    bls_link: "https://www.bls.gov/ooh/architecture-and-engineering/electrical-and-electronics-engineers.htm",
  },
  {
    id: "CAR-051",
    title: "Industrial Engineer",
    requiredSkills: ["Operations", "Process Optimization", "Statistics", "Lean Six Sigma", "Project Management", "Communication", "Data Analysis"],
    averageSalary: 101000,
    growthRate: 11,
    relatedMajors: ["Mechanical Engineering", "Business Management"],
    // BLS Industrial Engineers — $101,140 (May 2024); +11% 2024–34
    // https://www.bls.gov/ooh/architecture-and-engineering/industrial-engineers.htm
    bls_link: "https://www.bls.gov/ooh/architecture-and-engineering/industrial-engineers.htm",
  },
  {
    id: "CAR-052",
    title: "Manufacturing Engineer",
    requiredSkills: ["Operations", "Process Optimization", "Lean Six Sigma", "CAD", "Project Management", "Statistics", "Problem Solving"],
    averageSalary: 101000,
    growthRate: 11,
    relatedMajors: ["Mechanical Engineering"],
    // BLS rolls manufacturing engineers into Industrial Engineers (SOC 17-2112) — $101,140 (May 2024); +11% 2024–34
    // https://www.bls.gov/ooh/architecture-and-engineering/industrial-engineers.htm
    bls_link: "https://www.bls.gov/ooh/architecture-and-engineering/industrial-engineers.htm",
  },

  // ---------- TRADES-ADJACENT / TRANSPORT ----------
  {
    id: "CAR-053",
    title: "Construction Manager",
    requiredSkills: ["Project Management", "Leadership", "Communication", "Operations", "Budgeting", "Team Management", "Strategic Planning"],
    averageSalary: 105000,
    growthRate: 9,
    relatedMajors: ["Construction Management", "Business Management"],
    // BLS Construction Managers — $104,530 (May 2024); +9% 2024–34
    // https://www.bls.gov/ooh/management/construction-managers.htm
    bls_link: "https://www.bls.gov/ooh/management/construction-managers.htm",
  },
  {
    id: "CAR-054",
    title: "Commercial Pilot",
    requiredSkills: ["Aviation", "Critical Thinking", "Communication", "Decision Making", "Situational Awareness", "Navigation"],
    averageSalary: 123000,
    growthRate: 4,
    relatedMajors: ["Aviation Science"],
    // BLS Airline and Commercial Pilots — Commercial pilots $122,670 (May 2024); +4% 2024–34
    // https://www.bls.gov/ooh/transportation-and-material-moving/airline-and-commercial-pilots.htm
    bls_link: "https://www.bls.gov/ooh/transportation-and-material-moving/airline-and-commercial-pilots.htm",
  },
  {
    id: "CAR-055",
    title: "Air Traffic Controller",
    requiredSkills: ["Aviation", "Critical Thinking", "Communication", "Decision Making", "Situational Awareness", "Active Listening"],
    averageSalary: 145000,
    growthRate: 1,
    relatedMajors: ["Aviation Science"],
    // BLS Air Traffic Controllers — $144,580 (May 2024); +1% 2024–34
    // https://www.bls.gov/ooh/transportation-and-material-moving/air-traffic-controllers.htm
    bls_link: "https://www.bls.gov/ooh/transportation-and-material-moving/air-traffic-controllers.htm",
  },
];
