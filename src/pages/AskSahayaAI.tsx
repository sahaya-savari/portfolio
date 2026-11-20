import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowLeft, Terminal as TerminalIcon } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { SITE_URL, createBreadcrumbSchema, askSahayaAIAppSchema } from "../seo";
import { answerQuestion } from "../lib/sahayaKnowledge";

type TerminalEntry = {
  id: string;
  command: string;
  output: string;
};

const INITIAL_TERMINAL: TerminalEntry[] = [
  {
    id: "0",
    command: "welcome",
    output:
      'Sahaya Savari F - Interactive Developer CLI v2.6.0\nType "help" to view available commands, or tap the quick-command chips below.',
  },
];

export default function AskSahayaAI() {
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>(INITIAL_TERMINAL);
  const [cliInput, setCliInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const cliInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalHistory]);

  const handleCliCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    let output = "";

    switch (cmd) {
      case "help":
        output =
          "Available commands:\n  • projects   - List production & hackathon projects\n  • nelsync    - 1st Place Champion project details (AIxcelerate 2026)\n  • vibecraft  - Top 5 Finalist project details (VibeCraft 2026, 110 teams)\n  • skills     - Technical competencies & ML stack\n  • experience - Work history & internships (HodoLabs)\n  • contact    - Email, GitHub, and LinkedIn links\n  • clear      - Clear the terminal screen\n  • help       - Show this command manual";
        break;
      case "projects":
        output =
          "1. NelSync AI - 1st Place Overall Champion at AIxcelerate 2026 (Agri-tech ML Logistics)\n2. VibeCraft 2026 (NeuraGenZers) - Top 5 Finalist (out of 110 Teams, 440 Participants) (Dual Campus Web Apps)\n3. PrepMind AI - Web-based Exam Prep & Topic Practice Platform (React / TypeScript)\n4. Daily Spark - Minimalist Offline-First Habit Tracker (React / TypeScript / IndexedDB / Capacitor)\n5. Portfolio Website - High-Performance SPA with sub-second TTI & WCAG AA accessibility";
        break;
      case "vibecraft":
        output =
          "VibeCraft 2026 (NeuraGenZers) - Top 5 Finalist (out of 110 Teams, 440 Participants) (SRM IST Trichy YUVA'26)\nTwo campus apps in one live Vercel deployment: Round 1 Attendance Predictor & Planner + Round 2 Free Class Locator & Smart Search Floor Manager.\nLive URL: https://neuragenzers.vercel.app/";
        break;
      case "nelsync":
        output =
          "NelSync AI (Overall Champion - AIxcelerate 2026, 66 teams)\nAn AI layer for paddy procurement in Tamil Nadu with four stages: predict, optimize, schedule, and monitor. Built by a team of 4 led by Jeeva Loganathan; contribution: first pitch deck, research, coordination, and Q&A prep.\nVideo Demo: https://lnkd.in/ghBUvf4P";
        break;
      case "skills":
        output =
          "• Top Skills (Verified): PostgreSQL, Node.js, React.js\n• AI & ML: Python, Machine Learning, Scikit-Learn, Predictive Modeling, Data Analytics\n• Web & Tools: TypeScript, Next.js, Vite, Tailwind CSS, Firebase, Vercel, Git & GitHub\n• Languages: Tamil (Native/Bilingual), English (Limited Working), Hindi (Elementary)";
        break;
      case "experience":
        output =
          "• Digital Marketing Intern @ HodoLabs (June 2026 - Present · Madurai, Tamil Nadu, India)\n  SEO technical audits, site architecture, PageSpeed optimization, and marketing analytics.\n• Web Development & Software Engineering Trainee @ HodoLabs (May 2026 - June 2026)\n  1-month training in modern web architecture, React.js, Node.js, and PostgreSQL.";
        break;
      case "contact":
        output =
          "• Email: contact@sahayasavari.dev\n• Phone: +91 6385648514\n• Location: Madurai, Tamil Nadu, India\n• LinkedIn: https://www.linkedin.com/in/sahaya-savari\n• GitHub: https://github.com/sahaya-savari\n• Portfolio: https://sahayasavari.dev";
        break;
      case "clear":
        setTerminalHistory([]);
        setCliInput("");
        return;
      default: {
        const knowledgeAnswer = answerQuestion(raw);
        if (knowledgeAnswer && !knowledgeAnswer.startsWith("I can help you explore")) {
          output = knowledgeAnswer.replace(/\*\*/g, "").replace(/\[(.*?)\]\((.*?)\)/g, "$1: $2");
        } else {
          output = `Command not recognized: "${raw}". Type "help" to see valid commands, or choose a chip below.`;
        }
      }
    }

    setTerminalHistory((prev) => [...prev, { id: Date.now().toString(), command: raw, output }]);
    setCliInput("");
  };

  const aiSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Ask Sahaya AI", url: `${SITE_URL}/ai` },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumb,
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/ai/#webpage`,
          url: `${SITE_URL}/ai`,
          name: "Ask Sahaya | Developer CLI Terminal",
          description:
            "Interactive Developer CLI terminal for Sahaya Savari F's engineering portfolio. Query projects, skills, hackathon wins, and experience with zero latency.",
          author: { "@id": `${SITE_URL}/#person` },
        },
        askSahayaAIAppSchema,
      ],
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Ask Sahaya | Interactive Developer CLI"
        description="Interactive Developer CLI terminal to query Sahaya Savari F's software engineering background, machine learning projects, hackathon championships, and contact details."
        url="/ai"
        schema={aiSchema}
      />
      <div className="pt-28 sm:pt-32 pb-24 px-4 sm:px-6 max-w-screen-md mx-auto min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors font-body text-sm self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <header className="mb-6 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TerminalIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight">
                Ask Sahaya AI
              </h1>
              <p className="text-xs sm:text-sm font-body text-white/50">
                Interactive Developer CLI Terminal • v2.6.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Terminal Active</span>
          </div>
        </header>

        {/* Developer CLI Terminal View */}
        <div className="flex flex-col bg-black/90 border border-emerald-500/30 rounded-2xl overflow-hidden mb-6 h-[560px] max-h-[75dvh] min-h-[360px] font-mono shadow-2xl">
          {/* Terminal Title Bar */}
          <div className="px-4 py-2.5 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-emerald-400 text-[11px] sm:text-xs">
                sahaya@portfolio: ~
              </span>
            </div>
            <span className="text-[10px] text-white/40 font-mono">bash 5.2</span>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed text-emerald-300">
            {terminalHistory.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-emerald-400 font-bold">sahaya@portfolio:~$</span>
                  <span>{item.command}</span>
                </div>
                <div className="pl-4 whitespace-pre-wrap text-emerald-200/90 font-mono">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar & Quick Chips */}
          <div className="p-3 bg-black border-t border-white/10 space-y-2">
            <div className="flex flex-wrap gap-1.5" aria-label="Terminal quick commands">
              {[
                "help",
                "projects",
                "nelsync",
                "vibecraft",
                "skills",
                "experience",
                "contact",
                "clear",
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCliCommand(cmd)}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-white/10 text-[11px] text-emerald-300 transition-colors cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCliCommand(cliInput);
              }}
              className="flex items-center gap-2"
            >
              <span className="text-emerald-400 font-bold text-xs shrink-0">
                sahaya@portfolio:~$
              </span>
              <input
                ref={cliInputRef}
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="Type a command (e.g. nelsync, projects, skills)..."
                className="flex-grow bg-transparent border-none text-xs text-white placeholder-white/30 focus:outline-none"
                autoFocus
              />
            </form>
          </div>
        </div>

        {/* Semantic Overview & Context */}
        <section
          aria-label="About Ask Sahaya AI"
          className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 font-body text-xs text-white/70 space-y-2"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/50">
            About Developer CLI
          </h2>
          <p className="leading-relaxed text-white/80">
            Interactive client-side developer CLI shell designed to rapidly inspect Sahaya Savari's
            engineering projects, machine learning research, hackathon records, and direct
            credentials with instant response time.
          </p>
          <p className="text-white/50">
            Sample commands: <span className="text-white/80 font-mono">projects</span> ·{" "}
            <span className="text-white/80 font-mono">nelsync</span> ·{" "}
            <span className="text-white/80 font-mono">skills</span> ·{" "}
            <span className="text-white/80 font-mono">contact</span>
          </p>
        </section>
      </div>
    </>
  );
}
