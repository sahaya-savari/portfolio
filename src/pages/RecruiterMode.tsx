import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router-compat";
import {
  ArrowLeft,
  Download,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Phone,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { SITE_URL, createBreadcrumbSchema } from "../seo";
import {
  EXPERIENCES,
  HONORS_AND_AWARDS,
  EDUCATION_HISTORY,
  PROJECTS,
  CONTACT_INFO,
  TOP_SKILLS,
  LANGUAGES,
} from "../data";

export default function RecruiterMode() {
  const [copiedAts, setCopiedAts] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyAts = () => {
    const atsText = [
      "# Sahaya Savari F - Student AI/ML Engineer",
      `Email: ${CONTACT_INFO.primaryEmail} | Phone: ${CONTACT_INFO.phone} | Portfolio: ${CONTACT_INFO.website} | GitHub: ${CONTACT_INFO.github} | LinkedIn: ${CONTACT_INFO.linkedin}`,
      "Availability: Summer 2027 | Target Roles: Software Engineering, Backend Development, Applied AI | Location: Madurai, Tamil Nadu, India (Open to Remote / Relocation)",
      "",
      "## Professional Summary",
      "M.Sc. Artificial Intelligence student at St. Joseph's College (Autonomous), Tiruchirappalli, and B.Sc. Data science graduate from Thiagarajar College, Madurai. Digital Marketing Intern at HodoLabs with practical expertise in technical SEO, PageSpeed optimization, and web architecture. 2x Hackathon achiever (Overall Champion out of 66 teams at AIxcelerate 2026, Top 5 Finalist out of 110 teams at VibeCraft 2026). Strong hands-on foundation across PostgreSQL, Node.js, React.js, Python, and Machine Learning.",
      "",
      "## Top Skills & Competencies",
      `- Top Verified Skills: ${TOP_SKILLS.join(", ")}`,
      `- Languages: Python, TypeScript, JavaScript, SQL, HTML/CSS`,
      `- AI & Machine Learning: Scikit-learn, Regression, Classification, Model Evaluation, Prompt Engineering, Data Analytics`,
      `- Web & Backend: React.js, Next.js, Node.js, PostgreSQL, Tailwind CSS, Vite, Firebase, Vercel, REST APIs`,
      `- Languages Spoken: ${LANGUAGES.map((l) => `${l.language} (${l.proficiency})`).join(", ")}`,
      "",
      "## Work Experience",
      "- Digital Marketing Intern - HodoLabs, Madurai, Tamil Nadu, India (June 2026 – Present)",
      "  * Conduct in-depth technical SEO audits, site architecture reviews, and PageSpeed optimizations across client web properties.",
      "  * Analyze organic search visibility, crawlability, and conversion metrics to optimize digital acquisition funnels.",
      "  * Manage Google Business Profiles and marketing analytics reporting.",
      "- Web Development & Software Engineering Trainee - HodoLabs, Madurai, Tamil Nadu, India (May 2026 – June 2026)",
      "  * Completed intensive 1-month software engineering and web development training covering modern web architecture.",
      "  * Built responsive full-stack features with React.js, Node.js, PostgreSQL, and REST APIs with Git version control.",
      "",
      "## Top Projects",
      "- NelSync AI: Overall Champion at AIxcelerate 2026 Hackathon (66 teams). 4-stage AI optimization layer for paddy procurement in Tamil Nadu: predict, optimize, schedule, monitor.",
      "- VibeCraft 2026 (NeuraGenZers): Top 5 Finalist (out of 110 teams) at SRM IST Trichy YUVA'26. Dual campus web suite: Attendance Predictor & Smart Room Locator.",
      "- PrepMind AI: Live web-based exam prep platform with topic-based MCQ practice, interactive study tools, AI tutoring, and fallback question banks.",
      "- Daily Spark: Offline-first PWA habit tracker built with React, TypeScript, and IndexedDB with Capacitor Android support.",
      "- Portfolio Website: High-performance SPA with sub-second TTI, manual Vite chunk splitting, and WCAG AA accessibility.",
      "",
      "## Honors & Awards",
      "- AIxcelerate 2026 - Overall Champion (Dhanalakshmi Srinivasan University, 66 teams)",
      "- Top 5 Finalist (Out of 110 Teams) - VibeCraft 2026 Hackathon (SRM IST Trichy)",
      "- BOOTFEST 2K26 - Quiz Winner, CTF Runner-up & Overall Runner-up (Bishop Heber College)",
      "- Achievers Day - Interdepartmental Contest Winner (Certificate of Merit) (St. Joseph's College)",
      "- AION 2K26 – Event In-Charge (Treasure Titans) (St. Joseph's College)",
      "",
      "## Education",
      "- M.Sc. Artificial Intelligence (July 2025 – May 2027) - St. Joseph's College (Autonomous), Tiruchirappalli",
      "- B.Sc. Data science (August 2022 – May 2025) - Thiagarajar College, Madurai",
      "- HSC, BIO-MATHS (Maths Physics Chemistry Biology) (June 2020 – July 2022) - St. Mary's Higher Secondary School, Madurai",
    ].join("\n");

    navigator.clipboard.writeText(atsText);
    setCopiedAts(true);
    setTimeout(() => setCopiedAts(false), 2500);
  };

  const recruiterSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Recruiter Summary", url: `${SITE_URL}/recruiter` },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumb,
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL}/recruiter/#webpage`,
          url: `${SITE_URL}/recruiter`,
          name: "Recruiter Summary | Sahaya Savari",
          mainEntity: { "@id": `${SITE_URL}/#person` },
        },
      ],
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Recruiter Summary & Technical Profile | Sahaya Savari"
        description="ATS-friendly recruiter summary for Sahaya Savari F, a Student AI/ML Engineer and M.Sc. Artificial Intelligence student seeking Summer 2027 internships in software engineering, backend, and applied AI."
        url={`${SITE_URL}/recruiter`}
        schema={recruiterSchema}
      />
      <div className="pt-32 pb-24 px-6 max-w-screen-md mx-auto min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors font-body text-sm no-print"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <header className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-2">
              Sahaya Savari F
            </h1>
            <p className="text-lg sm:text-xl font-body text-white/70 mb-4">
              Student AI/ML Engineer
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm font-body text-white/60">
              <a
                href={`mailto:${CONTACT_INFO.primaryEmail}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" /> {CONTACT_INFO.primaryEmail}
              </a>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" /> {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> github.com/sahaya-savari
              </a>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> linkedin.com/in/sahaya-savari
              </a>
            </div>
          </div>
          <div className="no-print flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyAts}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                copiedAts
                  ? "bg-emerald-400 text-black font-semibold"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
              title="Copy formatted candidate summary for ATS / hiring managers"
            >
              {copiedAts ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAts ? "ATS Copied!" : "Copy ATS Summary"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-xs sm:text-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Save as PDF
            </button>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">
            Professional Summary
          </h2>
          <p className="text-base font-body leading-relaxed text-white/80">
            M.Sc. Artificial Intelligence student at St. Joseph's College (Autonomous),
            Tiruchirappalli, and B.Sc. Data science graduate from Thiagarajar College, Madurai.
            Digital Marketing Intern at HodoLabs with practical expertise in technical SEO,
            PageSpeed optimization, and web architecture. 2x Hackathon achiever (Overall Champion
            out of 66 teams at AIxcelerate 2026, Top 5 Finalist out of 110 teams at VibeCraft 2026).
            Strong hands-on foundation in PostgreSQL, Node.js, React.js, Python, and Machine
            Learning.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">
            Work Experience
          </h2>
          <div className="space-y-6">
            {EXPERIENCES.map((exp) => (
              <div key={exp.company + exp.role} className="border-l-2 border-white/20 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h3 className="text-lg font-heading font-bold text-white">{exp.role}</h3>
                  <span className="text-xs font-mono text-white/50">{exp.period}</span>
                </div>
                <p className="text-sm font-body text-cyan-400 mb-2">
                  {exp.company} · {exp.location}
                </p>
                <ul className="text-sm font-body text-white/70 space-y-1 list-disc list-inside">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-body text-sm text-white/80">
            <div>
              <strong className="block text-white mb-2">Languages & AI</strong>
              <ul className="space-y-1 text-white/80">
                <li>Python</li>
                <li>TypeScript / JavaScript</li>
                <li>Machine Learning / NLP</li>
                <li>SQL</li>
              </ul>
            </div>
            <div>
              <strong className="block text-white mb-2">Frontend</strong>
              <ul className="space-y-1 text-white/80">
                <li>React / Vite</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>Semantic HTML / SEO</li>
              </ul>
            </div>
            <div>
              <strong className="block text-white mb-2">Backend &amp; Tools</strong>
              <ul className="space-y-1 text-white/80">
                <li>Node.js / SQL / PostgreSQL</li>
                <li>Firebase / Vercel</li>
                <li>Git / GitHub</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest">
              Top Projects
            </h2>
            <div className="no-print flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-mono text-white/50 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Match:
              </span>
              {[
                "All",
                "Python",
                "Machine Learning",
                "React",
                "TypeScript",
                "Next.js",
                "IndexedDB",
              ].map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                    selectedSkill === skill
                      ? "bg-white text-black font-semibold"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            {PROJECTS.filter(
              (p) =>
                selectedSkill === "All" ||
                p.stack.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                p.techStack.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase())),
            ).map((project) => (
              <div key={project.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-heading font-bold text-white">{project.title}</h3>
                    {project.status.includes("Champion") ||
                    project.tag.includes("Champion") ||
                    project.tag.includes("1st Place") ? (
                      <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                        🏆 1st Place Champion
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 border border-white/20 px-2 py-0.5 rounded-full">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-body text-white/50 border border-white/10 px-2 py-1 rounded-full mt-1 sm:mt-0">
                    {project.stack}
                  </span>
                </div>
                <p className="text-sm font-body text-white/70 leading-relaxed">
                  {project.longDesc || project.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">
            Honors &amp; Awards
          </h2>
          <div className="space-y-3 font-body text-sm">
            {HONORS_AND_AWARDS.map((award) => (
              <div
                key={award.title + award.event}
                className="flex justify-between items-baseline border-b border-white/10 pb-2"
              >
                <div>
                  <span className="font-semibold text-white">
                    {award.badge} {award.title}
                  </span>{" "}
                  - {award.event} ({award.organizer})
                </div>
                <span className="text-xs text-white/50">{award.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {EDUCATION_HISTORY.map((edu) => (
              <div key={edu.degree}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold font-body text-white">{edu.degree}</h3>
                  <span className="text-sm font-body text-white/50">
                    {edu.period} {edu.grade ? `(${edu.grade})` : ""}
                  </span>
                </div>
                <p className="text-sm font-body text-white/70">{edu.institution}</p>
                <p className="text-xs font-mono text-white/50 mt-0.5">{edu.focus}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
