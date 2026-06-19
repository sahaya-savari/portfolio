import React, { useState, memo } from 'react';
import { Check, Mail, MapPin, Linkedin, Github, BookOpen, Search, ExternalLink } from 'lucide-react';
import HlsVideo from '../components/HlsVideo';
import Dock from '../components/Dock';

interface ContactSectionProps {
  setShowBlog: (v: boolean) => void;
  setShowCommandPalette: (v: boolean) => void;
}

const ContactSection = memo(({ setShowBlog, setShowCommandPalette }: ContactSectionProps) => {
  const [copied, setCopied] = useState(false);

  return (
    <footer id="contact" className="relative pt-16 md:pt-24 lg:pt-32 pb-16 px-6 overflow-hidden bg-black" aria-label="Contact information">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HlsVideo 
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" 
          className="w-full h-full object-cover opacity-50"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="text-center mb-16 md:mb-24 lg:mb-32">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-heading italic text-white tracking-tight leading-[0.8] mb-8 md:mb-12">Let's Build <br/> Something.</h2>
          <p className="text-white/60 font-body font-light text-xl max-w-2xl mx-auto mb-10 md:mb-16">I'm open to new projects, internships, and collaborations — especially where AI and machine learning can create real-world impact.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => { navigator.clipboard.writeText('sahayasavari@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="liquid-glass-strong px-8 py-5 rounded-full font-body font-medium text-lg flex items-center gap-3 hover:scale-105 transition-transform group cursor-pointer min-h-[48px]" aria-label="Copy email address to clipboard">
              {copied ? <Check className="w-5 h-5 text-green-400" aria-hidden="true" /> : <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />} 
              <span aria-hidden="true">{copied ? 'Copied to Clipboard!' : 'sahayasavari@gmail.com'}</span>
            </button>
            <span className="sr-only" aria-live="polite">{copied ? 'Email copied to clipboard' : ''}</span>
            <a href="https://www.google.com/maps/search/Madurai,+Tamil+Nadu" target="_blank" rel="noopener noreferrer" className="liquid-glass px-8 py-5 rounded-full font-body font-medium text-lg flex items-center gap-3 hover:scale-105 transition-transform min-h-[48px]" aria-label="View location: Madurai, Tamil Nadu on Google Maps">
              <MapPin className="w-5 h-5" aria-hidden="true" /> Madurai, Tamil Nadu
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 md:pt-12 border-t border-white/10 gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 liquid-glass rounded-full flex items-center justify-center border border-white/20" aria-hidden="true">
              <span className="font-heading text-sm italic">S</span>
            </div>
            <span className="font-heading italic text-lg tracking-tight">Sahaya Savari F</span>
          </div>
          <Dock
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
            items={[
              { icon: <Linkedin size={20} aria-hidden="true" />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/sahayasavari', '_blank'), ariaLabel: 'Visit LinkedIn profile' },
              { icon: <Github size={20} aria-hidden="true" />, label: 'GitHub', onClick: () => window.open('https://github.com/sahaya-savari', '_blank'), ariaLabel: 'Visit GitHub profile' },
              { icon: <BookOpen size={20} aria-hidden="true" />, label: 'Blog', onClick: () => setShowBlog(true), ariaLabel: 'Open technical blog' },
              { icon: <Search size={20} aria-hidden="true" />, label: 'Search', onClick: () => setShowCommandPalette(true), ariaLabel: 'Open spotlight search command palette' },
              { icon: <ExternalLink size={20} aria-hidden="true" />, label: 'Resume', onClick: () => window.open('/resume.pdf', '_blank'), ariaLabel: 'Open resume PDF in new tab' },
              { icon: <Mail size={20} aria-hidden="true" />, label: 'Email', onClick: () => window.open('mailto:sahayasavari@gmail.com'), ariaLabel: 'Send email to Sahaya Savari' },
            ]}
          />
          <div className="text-white/20 font-body text-[10px] uppercase tracking-widest">© {new Date().getFullYear()} Sahaya Savari F — Built with AI</div>
        </div>
      </div>
    </footer>
  );
});

export default ContactSection;
