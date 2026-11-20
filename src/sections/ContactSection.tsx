import { useState, memo } from "react";
import {
  Check,
  Mail,
  MapPin,
  Copy,
  Send,
  User,
  MessageSquare,
  Briefcase,
  Sparkles,
  ChevronDown,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import HlsVideo from "../components/HlsVideo";
import { CONTACT_INFO } from "../data";

const FAQS = [
  {
    question: "What roles and opportunities are you currently seeking?",
    answer:
      "I am actively seeking Summer 2027 internships, software engineering, backend development, and applied AI/ML engineering roles. I love building production-grade software and scalable machine learning workflows.",
  },
  {
    question: "What is your availability and preferred work location?",
    answer:
      "I am available for remote opportunities worldwide, as well as on-site and hybrid positions across major tech hubs in India and internationally.",
  },
  {
    question: "What is your typical response time?",
    answer:
      "I typically respond to inquiries within 24 to 48 hours. For urgent opportunities, reaching out on LinkedIn is also warmly welcomed.",
  },
  {
    question: "Are you open to hackathons and open-source collaborations?",
    answer:
      "Absolutely! As the AIXcelerate 2026 Overall Champion (NelSync AI), I thrive in high-velocity engineering environments, turning complex algorithmic ideas into usable products.",
  },
  {
    question: "Where can I review your resume and verified credentials?",
    answer:
      "You can explore my interactive resume on the /resume page, download the official verified PDF directly from the navigation bar, and review verified credentials on the /certifications page.",
  },
];

interface ContactSectionProps {
  setShowCommandPalette?: (v: boolean) => void;
}

const ContactSection = memo(
  ({ setShowCommandPalette: _setShowCommandPalette }: ContactSectionProps) => {
    const [copiedItem, setCopiedItem] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Contact Form state with Subject
    const [formState, setFormState] = useState<{
      name: string;
      email: string;
      subject: string;
      message: string;
    }>({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">(
      "idle",
    );
    const [statusMessage, setStatusMessage] = useState<string>("");

    const copyToClipboard = async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedItem(label);
        window.setTimeout(() => setCopiedItem(null), 2000);
      } catch {
        setCopiedItem(null);
      }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
        return;
      }
      setFormStatus("submitting");

      const accessKey =
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "642d50c7-2c43-4e70-a954-a111831c8f9b";

      if (accessKey) {
        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: accessKey,
              name: formState.name,
              email: formState.email,
              subject: formState.subject.trim() || `Portfolio Inquiry from ${formState.name}`,
              message: formState.message,
              from_name: "Sahaya Savari Portfolio",
              botcheck: "",
            }),
          });
          const data = await res.json();
          if (data.success) {
            setFormStatus("success");
            setStatusMessage("Message sent successfully! I will reply within 24-48 hours.");
            setFormState({ name: "", email: "", subject: "", message: "" });
            return;
          }
          throw new Error(data.message || `Web3Forms responded with status ${res.status}`);
        } catch (err) {
          console.error("Web3Forms dispatch failed, using mailto fallback:", err);
        }
      }

      // Graceful direct fallback: open user's mail client with filled details
      const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
        formState.subject.trim() || `Portfolio Message from ${formState.name}`,
      )}&body=${encodeURIComponent(
        formState.message + "\n\nReply To: " + formState.name + " <" + formState.email + ">",
      )}`;
      window.open(mailtoUrl, "_blank");
      setFormStatus("success");
      setStatusMessage("Message prepared! Opened your mail client to send.");
      setFormState({ name: "", email: "", subject: "", message: "" });
    };

    return (
      <footer
        className="relative pt-16 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden bg-black text-white"
        aria-label="Contact information and footer"
      >
        {/* Background ambient video */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <HlsVideo
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="w-full h-full object-cover opacity-40"
            poster="https://image.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q/thumbnail.webp?time=0&width=960"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header (Reference Image 1) */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-4 text-xs font-mono uppercase tracking-widest text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-3">
              Contact
            </h2>
            <p className="text-white/60 font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Looking for a dedicated developer? Let's discuss how I can contribute to your team!
            </p>
          </div>

          {/* Two-Column Contact Layout (Reference Image 1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-20">
            {/* Left Column: Let's Connect & Opportunities */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                  Let's Connect
                </h3>
                <p className="text-white/60 font-body text-sm leading-relaxed">
                  I'm always open to discussing new opportunities, innovative projects, or just
                  having a conversation about technology.
                </p>
              </div>

              {/* Direct Contact Cards */}
              <div className="space-y-3">
                {/* Email Card */}
                <div className="liquid-glass-strong border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-white/25 transition-all">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                        Email
                      </div>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-sm font-body font-medium text-white hover:text-cyan-300 transition-colors truncate block"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(CONTACT_INFO.email, "email")}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                      title="Copy email to clipboard"
                      aria-label="Copy email"
                    >
                      {copiedItem === "email" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                      title="Open mail client"
                      aria-label="Open email client"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="liquid-glass-strong border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-white/25 transition-all">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                        Location
                      </div>
                      <div className="text-sm font-body font-medium text-white truncate">
                        {CONTACT_INFO.location}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(CONTACT_INFO.location, "location")}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy location to clipboard"
                    aria-label="Copy location"
                  >
                    {copiedItem === "location" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* What I'm Looking For Cards (Reference Image 1) */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3">
                  What I'm Looking For
                </h4>
                <div className="space-y-3">
                  <div className="liquid-glass border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-white/20 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-sm text-white">
                        Internship / Full-Time
                      </h5>
                      <p className="text-xs font-body text-white/60 mt-0.5 leading-relaxed">
                        Software Developer, Full-Stack, or AI/ML roles
                      </p>
                    </div>
                  </div>

                  <div className="liquid-glass border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-white/20 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-sm text-white">
                        Collaborations
                      </h5>
                      <p className="text-xs font-body text-white/60 mt-0.5 leading-relaxed">
                        Open source, hackathons, innovative projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Send Me a Message Form (Reference Image 1) */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                className="liquid-glass-strong rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-left space-y-5"
              >
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    Send Me a Message
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-white/50 mt-1">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                {/* Personal Information Group */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs font-heading font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                    <User className="w-3.5 h-3.5" />
                    <span>Personal Information</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-body text-white/70 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Enter your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.08] transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-body text-white/70 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="your.email@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.08] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Details Group */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-heading font-semibold text-purple-400 uppercase tracking-wider mb-3">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Details</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-body text-white/70 mb-1.5"
                      >
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        placeholder="What's this about?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-purple-400/60 focus:bg-white/[0.08] transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-body text-white/70 mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Tell me about your project, opportunity, or just say hello! I'd love to hear from you."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-purple-400/60 focus:bg-white/[0.08] transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Hidden Botcheck Honeypot for Automated Spam Prevention */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {statusMessage && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-body ${
                      formStatus === "success"
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-heading font-semibold text-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                >
                  {formStatus === "submitting" ? (
                    <span>Sending message...</span>
                  ) : formStatus === "success" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Message Sent Successfully</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-sm font-body text-white/50 max-w-xl mx-auto">
                Common questions about my availability, work setup, and collaborative process.
              </p>
            </div>

            <div className="space-y-3 text-left">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="liquid-glass border border-white/10 rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/20"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading font-semibold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-white/60 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-4 pt-1 text-xs sm:text-sm font-body text-white/70 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Redesigned Centered Footer (Reference Image 2) */}
          <div className="pt-10 border-t border-white/10 text-center flex flex-col items-center gap-6">
            {/* Centered Name & Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Sahaya Savari F
              </h3>
              <p className="text-xs sm:text-sm font-body text-white/60 max-w-xl mx-auto mt-2 leading-relaxed">
                AI Developer & Full-Stack Engineer building production machine learning systems,
                backend APIs, and full-stack applications.
              </p>
            </div>

            {/* Horizontal Navigation Links */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-body text-white/65"
            >
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link to="/experience" className="hover:text-white transition-colors">
                Experience
              </Link>
              <Link to="/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
              <Link to="/resume" className="hover:text-white transition-colors">
                Resume
              </Link>
              <Link to="/certifications" className="hover:text-white transition-colors">
                Certifications
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </nav>

            {/* Copyright & Built With Love */}
            <div className="text-white/40 font-body text-xs sm:text-[13px] tracking-wide">
              © {new Date().getFullYear()} Sahaya Savari F. Made with{" "}
              <span className="text-rose-500" aria-label="love">
                ❤️
              </span>{" "}
              and{" "}
              <span className="font-mono text-cyan-400 font-semibold" aria-label="code">
                &lt; / &gt;
              </span>
            </div>

            {/* Back to Top Action */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 text-xs font-body text-white/50 hover:text-white transition-colors cursor-pointer group mt-1"
            >
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>
    );
  },
);

export default ContactSection;
