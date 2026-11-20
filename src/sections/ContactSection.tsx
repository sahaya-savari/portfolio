import { useState, memo, useEffect, useRef } from "react";
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
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import { scrollToSection } from "../utils/navigation";
import HlsVideo from "../components/HlsVideo";
import { CONTACT_INFO } from "../data";

const FAQS = [
  {
    category: "OPPORTUNITIES",
    question: "What roles and opportunities are you currently seeking?",
    answer:
      "I am actively seeking Summer 2027 internships, junior software engineering, backend development, and applied AI/ML engineering roles. I specialize in designing scalable backend APIs, production machine learning pipelines, and high-performance full-stack web applications.",
  },
  {
    category: "LOCATION",
    question: "What is your availability and preferred work location?",
    answer:
      "I am available for remote opportunities worldwide, as well as on-site or hybrid roles across major tech hubs (Bengaluru, Chennai, Hyderabad, Mumbai, and internationally). I adapt quickly to distributed team workflows and different time zones.",
  },
  {
    category: "TECH STACK",
    question: "What core technologies and architectures do you work with?",
    answer:
      "My primary backend & ML stack includes Python, PyTorch, Scikit-learn, PostgreSQL, and Node.js. For web engineering, I build with TypeScript, React 19, Tailwind CSS v4, and modern SSR/SSG architectures (TanStack Start, Vite). I prioritize clean code, test coverage, and sub-second response times.",
  },
  {
    category: "HACKATHONS",
    question: "Can we collaborate on hackathons, research, or open-source projects?",
    answer:
      "Yes, absolutely! I am the AIxcelerate 2026 Overall Champion (competing against 66 university teams with NelSync AI, an agri-tech predictive grading system). I thrive under tight deadlines, rapid prototyping, and solving complex algorithmic challenges.",
  },
  {
    category: "PROCESS",
    question: "What is your typical response time for recruiters and collaborators?",
    answer:
      "I respond to all professional inquiries within 24 to 48 hours. If you are reaching out regarding an urgent interview or engineering opportunity, messaging me directly on LinkedIn (linkedin.com/in/sahaya-savari) is also welcome.",
  },
  {
    category: "VERIFICATION",
    question: "Where can I verify your academic credentials and certifications?",
    answer:
      "You can inspect my verified credentials on the /certifications page (including IBM Data Analyst, NIELIT, and NPTEL IIT Madras honors), test out live simulators in the /projects directory, or download my verified PDF resume directly from the top navigation bar.",
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
    const [turnstileToken, setTurnstileToken] = useState<string>("");
    const turnstileContainerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    // Lazily mount Cloudflare Turnstile on client without blocking initial page render
    useEffect(() => {
      if (typeof window === "undefined") return;

      const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAGKldDqh0c-LillI";

      const renderWidget = () => {
        const turnstile = (
          window as unknown as {
            turnstile?: {
              render: (el: HTMLElement, opts: Record<string, unknown>) => string;
              reset: (widgetId?: string) => void;
              remove?: (widgetId: string) => void;
            };
          }
        ).turnstile;

        if (
          turnstile &&
          turnstileContainerRef.current &&
          !turnstileContainerRef.current.hasChildNodes()
        ) {
          try {
            const id = turnstile.render(turnstileContainerRef.current, {
              sitekey: siteKey,
              theme: "dark",
              callback: (token: string) => {
                setTurnstileToken(token);
              },
              "expired-callback": () => {
                setTurnstileToken("");
              },
              "error-callback": (err: unknown) => {
                console.warn("Turnstile challenge error:", err);
                setTurnstileToken("");
              },
            });
            widgetIdRef.current = id;
          } catch (err) {
            console.error("Turnstile render error:", err);
          }
        }
      };

      const SCRIPT_ID = "cf-turnstile-script";
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => renderWidget();
        document.head.appendChild(script);
      } else if ((window as unknown as { turnstile?: unknown }).turnstile) {
        renderWidget();
      } else {
        script.addEventListener("load", renderWidget, { once: true });
      }

      return () => {
        const turnstile = (
          window as unknown as {
            turnstile?: { remove?: (widgetId: string) => void };
          }
        ).turnstile;
        if (turnstile?.remove && widgetIdRef.current) {
          try {
            turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
        }
      };
    }, []);

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
              "cf-turnstile-response": turnstileToken,
            }),
          });
          const data = await res.json();
          if (data.success) {
            setFormStatus("success");
            setStatusMessage("Message sent successfully! I will reply within 24-48 hours.");
            setFormState({ name: "", email: "", subject: "", message: "" });
            setTurnstileToken("");
            const turnstile = (
              window as unknown as {
                turnstile?: { reset: (id?: string) => void };
              }
            ).turnstile;
            if (turnstile && widgetIdRef.current) {
              try {
                turnstile.reset(widgetIdRef.current);
              } catch {
                // ignore
              }
            }
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
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-4 text-xs font-mono uppercase tracking-widest text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-3">
              Contact
            </h2>
            <p className="text-white/60 font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Looking for a dedicated developer? Let's discuss how I can contribute to your team!
            </p>
          </div>

          {/* Two-Column Contact Layout (Unified Monochrome Palette) */}
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
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                        Email
                      </div>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-sm font-body font-medium text-white hover:text-white/80 transition-colors truncate block"
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
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0">
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

              {/* What I'm Looking For Cards */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3">
                  What I'm Looking For
                </h4>
                <div className="space-y-3">
                  <div className="liquid-glass border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-white/20 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0 mt-0.5">
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
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0 mt-0.5">
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

            {/* Right Column: Send Me a Message Form (Refined Monochrome) */}
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
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-white/70 uppercase tracking-wider mb-3">
                    <User className="w-3.5 h-3.5 text-white/60" />
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
                        className="w-full bg-white/[0.03] border border-white/15 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/[0.06] transition-all"
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
                        className="w-full bg-white/[0.03] border border-white/15 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Details Group */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-white/70 uppercase tracking-wider mb-3">
                    <MessageSquare className="w-3.5 h-3.5 text-white/60" />
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
                        className="w-full bg-white/[0.03] border border-white/15 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/[0.06] transition-all"
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
                        className="w-full bg-white/[0.03] border border-white/15 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/[0.06] transition-all resize-none"
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

                {/* Cloudflare Turnstile Token Response Input */}
                <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />

                {/* Cloudflare Turnstile Verification Widget (Natural Framing, Zero Clipping) */}
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-white/70" />
                    <span>Cloudflare Turnstile Verified Protection</span>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <div ref={turnstileContainerRef} className="min-h-[65px] inline-block" />
                  </div>
                </div>

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
                  className="w-full h-12 rounded-xl bg-white text-black font-heading font-semibold text-sm hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
                >
                  {formStatus === "submitting" ? (
                    <span>Sending message...</span>
                  ) : formStatus === "success" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
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

          {/* Enhanced FAQ Section (Premium UI/UX & In-depth Content) */}
          <div className="mb-20 pt-12 border-t border-white/10 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-3 text-xs font-mono uppercase tracking-widest text-white/70">
                Answers &amp; Overview
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-sm font-body text-white/50 max-w-xl mx-auto">
                Key details regarding my engineering background, internship timeline, and
                collaboration model.
              </p>
            </div>

            <div className="space-y-3.5 text-left">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-white/30 bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="text-[10px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-white/60 shrink-0">
                          {faq.category}
                        </span>
                        <span className="font-heading font-semibold text-sm sm:text-base text-white truncate">
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-white text-black" : "text-white/60 bg-white/5"
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm font-body text-white/70 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered Modern Footer */}
          <div className="pt-10 border-t border-white/10 text-center flex flex-col items-center gap-6">
            {/* Centered Name & Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Sahaya Savari F
              </h3>
              <p className="text-xs sm:text-sm font-body text-white/60 max-w-xl mx-auto mt-2 leading-relaxed">
                AI Developer &amp; Full-Stack Engineer building production machine learning systems,
                backend APIs, and full-stack applications.
              </p>
            </div>

            {/* Horizontal Navigation Links */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-body text-white/65"
            >
              <button
                type="button"
                onClick={() => scrollToSection("about", { behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("experience", { behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Experience
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("projects", { behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Projects
              </button>
              <Link to="/resume" className="hover:text-white transition-colors">
                Resume
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("certifications", { behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Certifications
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact", { behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Copyright & Built With Care */}
            <div className="text-white/40 font-body text-xs sm:text-[13px] tracking-wide">
              © {new Date().getFullYear()} Sahaya Savari F. Made with{" "}
              <span className="text-rose-500" aria-label="love">
                🖤
              </span>{" "}
              and{" "}
              <span className="font-mono text-white/70 font-semibold" aria-label="code">
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
