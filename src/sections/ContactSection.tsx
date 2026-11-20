import { useState, memo } from "react";
import {
  Check,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Search,
  ArrowUpRight,
  ExternalLink,
  Send,
} from "lucide-react";
import HlsVideo from "../components/HlsVideo";
import Dock from "../components/Dock";
import { CONTACT_INFO } from "../data";

const RESUME_URL = `${import.meta.env.BASE_URL}sahaya_savari_resume.pdf?v=${typeof __RESUME_HASH__ !== "undefined" ? __RESUME_HASH__ : Date.now()}`;

interface ContactSectionProps {
  setShowCommandPalette: (v: boolean) => void;
}

const ContactSection = memo(({ setShowCommandPalette }: ContactSectionProps) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);

  // Contact Form state (Item 8)
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(text);
      setCopyError(false);
      window.setTimeout(() => setCopiedEmail(null), 2000);
    } catch {
      setCopyError(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }
    setFormStatus("submitting");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: formState.name,
              reply_to: formState.email,
              message: formState.message,
            },
          }),
        });
        if (res.ok) {
          setFormStatus("success");
          setStatusMessage("Message sent successfully! I will reply within 24-48 hours.");
          setFormState({ name: "", email: "", message: "" });
          return;
        }
        throw new Error(`EmailJS responded with ${res.status}`);
      } catch (err) {
        console.error("EmailJS dispatch failed:", err);
      }
    }

    // Graceful direct fallback: open user's mail client with filled details
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(`Portfolio Message from ${formState.name}`)}&body=${encodeURIComponent(formState.message + "\n\nReply To: " + formState.email)}`;
    window.open(mailtoUrl, "_blank");
    setFormStatus("success");
    setStatusMessage("Message prepared! Opened your mail client to send.");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <footer
      className="relative pt-16 pb-16 px-4 md:px-6 overflow-hidden bg-black"
      aria-label="Contact information"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HlsVideo
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          className="w-full h-full object-cover opacity-50"
          poster="https://image.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q/thumbnail.webp?time=0&width=960"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-fluid-contact-heading font-heading font-bold text-white tracking-tight leading-[0.8] mb-8 md:mb-12">
            Let's Build <br /> Something.
          </h2>
          <p className="text-white/60 font-body font-light text-base sm:text-xl max-w-2xl mx-auto mb-10 md:mb-14">
            Seeking Summer 2027 internships, engineering projects, and collaborations in software
            engineering, backend development, and applied AI.
          </p>

          {/* Interactive Contact Form (Item 8) */}
          <div className="max-w-xl mx-auto mb-12 px-2 sm:px-0">
            <form
              onSubmit={handleFormSubmit}
              className="liquid-glass-strong rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-left space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs font-body text-white/50">
                    Direct delivery to Sahaya Savari's inbox
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Jane Doe or Organization"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Details on project scope, opportunities, or questions..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors resize-none"
                />
              </div>

              {/* Captcha Slot Container */}
              <div
                id="turnstile-container"
                className="min-h-[50px] rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-2 text-center"
                data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY || ""}
              >
                <span className="text-[11px] font-mono text-white/40">
                  Security verification container (Cloudflare Turnstile / Captcha ready)
                </span>
              </div>

              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-body ${
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
                className="w-full h-11 rounded-xl bg-white text-black font-heading font-semibold text-sm hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {formStatus === "submitting" ? (
                  <span>Sending...</span>
                ) : formStatus === "success" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Message Sent</span>
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

          {/* Contact Actions Grid - Harmonized Equal Height (Item 3) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {/* Primary Domain Email Pill */}
            <div className="h-12 sm:h-13 px-3 sm:px-4 liquid-glass-strong rounded-full font-body flex items-center border border-white/15 hover:border-white/30 transition-all shadow-lg backdrop-blur-xl gap-2 max-w-full">
              <button
                type="button"
                onClick={() => copyToClipboard(CONTACT_INFO.email)}
                className="h-full flex items-center gap-2 sm:gap-2.5 px-2 rounded-full hover:bg-white/10 text-white font-medium text-xs sm:text-sm md:text-base transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 touch-manipulation"
                aria-label={
                  copiedEmail === CONTACT_INFO.email
                    ? "Email copied to clipboard"
                    : `Copy ${CONTACT_INFO.email} to clipboard`
                }
                title="Click to copy email address"
              >
                {copiedEmail === CONTACT_INFO.email ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-emerald-400" />
                ) : (
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-emerald-400 group-hover:text-emerald-300" />
                )}
                <span className="text-white group-hover:text-white/90 break-all sm:break-normal">
                  {CONTACT_INFO.email}
                </span>
                {copiedEmail === CONTACT_INFO.email && (
                  <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-1">
                    Copied
                  </span>
                )}
              </button>

              <div className="w-[1px] h-5 bg-white/20 shrink-0" aria-hidden="true" />

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/15 text-white/70 hover:text-white transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0 touch-manipulation"
                aria-label={`Open email client (mailto:${CONTACT_INFO.email})`}
                title="Open mail client"
              >
                <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Location Pill - Perfectly matched h-12/h-13 and border */}
            <a
              href="https://www.google.com/maps/search/Madurai,+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 sm:h-13 px-5 sm:px-6 liquid-glass-strong rounded-full font-body font-medium text-xs sm:text-sm md:text-base flex items-center gap-2.5 hover:scale-[1.02] transition-transform text-white/80 hover:text-white border border-white/15 hover:border-white/30 shadow-lg backdrop-blur-xl"
              aria-label={`View location: ${CONTACT_INFO.location} on Google Maps`}
            >
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
              <span>{CONTACT_INFO.location}</span>
            </a>
          </div>
        </div>

        {/* Polished Balanced Footer Grid */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 w-full text-center md:text-left">
          {/* Left Column: Logo, Name & Role */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div
              className="w-8 h-8 liquid-glass rounded-full flex items-center justify-center border border-white/20"
              aria-hidden="true"
            >
              <span className="font-heading text-sm font-bold">S</span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-white">
                Sahaya Savari F
              </span>
              <span className="text-[11px] font-body text-white/50 tracking-wider">
                Full-Stack & Applied AI Engineer
              </span>
            </div>
          </div>

          {/* Middle Column: Social Links Dock */}
          <div className="flex justify-center items-center min-w-0">
            <Dock
              panelHeight={64}
              baseItemSize={46}
              magnification={66}
              items={[
                {
                  icon: <Linkedin size={18} aria-hidden="true" />,
                  label: "LinkedIn",
                  onClick: () => window.open(CONTACT_INFO.linkedin, "_blank"),
                  ariaLabel: "Visit LinkedIn profile",
                },
                {
                  icon: <Github size={18} aria-hidden="true" />,
                  label: "GitHub",
                  onClick: () => window.open(CONTACT_INFO.github, "_blank"),
                  ariaLabel: "Visit GitHub profile",
                },
                {
                  icon: <Search size={18} aria-hidden="true" />,
                  label: "Search",
                  onClick: () => setShowCommandPalette(true),
                  ariaLabel: "Open spotlight search command palette",
                },
                {
                  icon: <ExternalLink size={18} aria-hidden="true" />,
                  label: "Resume",
                  onClick: () => window.open(RESUME_URL, "_blank"),
                  ariaLabel: "Open resume PDF in new tab",
                },
                {
                  icon: <Mail size={18} aria-hidden="true" />,
                  label: "Email",
                  onClick: () => window.open(`mailto:${CONTACT_INFO.primaryEmail}`),
                  ariaLabel: "Send email to Sahaya Savari",
                },
              ]}
            />
          </div>

          {/* Right Column: Copyright & Portfolio Terms */}
          <div className="flex flex-col items-center md:items-end text-white/40 font-body text-[11px] leading-relaxed tracking-wider">
            <span>© {new Date().getFullYear()} Sahaya Savari F • All Rights Reserved</span>
            <span className="text-white/30 text-[10px]">Portfolio & Engineering Terms apply</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default ContactSection;
