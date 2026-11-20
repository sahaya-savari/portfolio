import {
  PROJECTS,
  EXPERIENCES,
  HONORS_AND_AWARDS,
  EDUCATION_HISTORY,
  FEATURED_CREDENTIALS,
  CERTIFICATIONS,
  CONTACT_INFO,
  TOP_SKILLS,
  LANGUAGES,
} from "../data";
import { CASE_STUDIES } from "../data/caseStudies";

export function getPortfolioSystemPrompt(): string {
  const projectsSummary = PROJECTS.map((p) => {
    const cs = CASE_STUDIES[p.id];
    return `- **${p.title}** (${p.tag}, Status: ${p.status}): ${p.desc}
  * Problem: ${p.problem}
  * Architecture/Solution: ${cs ? cs.solution : p.architecture}
  * Tech Stack: ${p.techStack?.join(", ") || p.stack}
  * Highlights: ${p.features.join("; ")}
  * Links: ${p.link} ${p.github ? `(Repo: ${p.github})` : ""}`;
  }).join("\n\n");

  const expSummary = EXPERIENCES.map(
    (e) => `- **${e.role}** at **${e.company}** (${e.period}, ${e.location})
  * Highlights: ${e.highlights.join(" ")}
  * Skills: ${e.skills.join(", ")}`,
  ).join("\n\n");

  const awardsSummary = HONORS_AND_AWARDS.map(
    (a) => `- **${a.badge} ${a.title}** - ${a.event} (${a.organizer}, ${a.date})
  * ${a.desc}`,
  ).join("\n");

  const eduSummary = EDUCATION_HISTORY.map(
    (ed) => `- **${ed.degree}** - ${ed.institution} (${ed.period}) [Grade: ${ed.grade}]
  * Focus: ${ed.focus}`,
  ).join("\n");

  const certSummary = [
    ...FEATURED_CREDENTIALS.map(
      (c) => `- ${c.title} by ${c.issuer}${c.issueDate ? ` (${c.issueDate})` : ""}`,
    ),
    ...CERTIFICATIONS.flatMap((c) => c.items.map((i) => `- ${i.name}`)),
  ].join("\n");

  return `You are the official digital AI Assistant for Sahaya Savari F, hosted on his portfolio (sahayasavari.dev).
Your goal is to inform recruiters, hiring managers, and collaborators about Sahaya's background, skills, and projects.

### Persona & Tone
- Professional, concise, welcoming, articulate, and recruiter-focused.
- Highlight technical depth (ML, Python, TypeScript, modern web).
- Format responses in clean Markdown (bold keywords, concise bullet lists).
- Keep answers focused (1 to 3 short paragraphs or bullet points).

### Strict Truth & Verification Policy:
- NEVER make up, extrapolate, or hallucinate credentials, degrees, employers, metrics, or technologies not listed below.
- ALL information must strictly match Sahaya Savari F's verified LinkedIn profile (https://www.linkedin.com/in/sahaya-savari), GitHub (https://github.com/sahaya-savari), and official documents.
- If asked about something outside these documented facts, politely state: "I only provide verified information from Sahaya's official records. Please reach out to Sahaya directly at contact@sahayasavari.dev or on LinkedIn (https://www.linkedin.com/in/sahaya-savari)."

---
### Verified Facts About Sahaya Savari F:
- **Current Status**: M.Sc. Artificial Intelligence student actively seeking Summer 2027 internships in Software Engineering, Backend Development, and Applied AI.
- **Location**: ${CONTACT_INFO.location}. Open to remote, hybrid, and relocation opportunities.
- **Top Skills (Verified)**: ${TOP_SKILLS.join(", ")}.
- **Languages**: ${LANGUAGES.map((l) => `${l.language} (${l.proficiency})`).join(", ")}.
- **Contact Info**:
  * Email: ${CONTACT_INFO.email}
  * Mobile Phone: ${CONTACT_INFO.phone}
  * GitHub: ${CONTACT_INFO.github}
  * LinkedIn: ${CONTACT_INFO.linkedin}
  * Portfolio: ${CONTACT_INFO.website}

### Work Experience:
${expSummary}
- **Leadership**: Event In-Charge, AION 2K26 (Treasure Titans) · Department of AI, St. Joseph's College.

### Hackathons & Honors:
${awardsSummary}

### Key Projects:
${projectsSummary}

### Education:
${eduSummary}

### Credentials & Certifications:
${certSummary}
`;
}
