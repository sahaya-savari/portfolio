import { useState, useEffect, useRef, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { Search, FileText, BookOpen, ExternalLink, FolderGit, Command, CornerDownLeft } from 'lucide-react';
import { PROJECTS } from '../data';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Actions' | 'Projects' | 'Articles' | 'Links';
  icon: any;
  action: () => void;
}

export default function CommandPalette({ onClose, onOpenResume }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
    
    // Lock scroll
    lockScroll();
    return () => unlockScroll();
  }, []);

  // Build items dynamically
  const items = useMemo(() => {
    const list: CommandItem[] = [];

    // Core actions
    list.push({
      id: 'action-resume',
      title: 'View Resume',
      subtitle: 'Open the interactive PDF viewer',
      category: 'Actions',
      icon: FileText,
      action: () => {
        onOpenResume();
        onClose();
      }
    });

    list.push({
      id: 'action-blog',
      title: 'Sahaya Savari Blog',
      subtitle: 'A personal learning blog sharing practical guides on AI, Web Development, and Tech.',
      category: 'Actions',
      icon: BookOpen,
      action: () => {
        if (window.location.pathname !== '/') {
          navigate('/#blog');
        } else {
          window.location.hash = 'blog';
        }
        onClose();
      }
    });

    // Projects
    PROJECTS.forEach(project => {
      list.push({
        id: `project-${project.title.toLowerCase()}`,
        title: project.title,
        subtitle: project.desc,
        category: 'Projects',
        icon: FolderGit,
        action: () => {
          const id = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          navigate(`/projects/${id}`);
          onClose();
        }
      });
    });

    // Social & Nav links
    const links: { title: string; url: string; sub: string }[] = [
      { title: 'Home Section', url: '#home', sub: 'Scroll to Hero & Top' },
      { title: 'About Section', url: '#about', sub: 'Scroll to Biography & Stats' },
      { title: 'Skills Section', url: '#skills', sub: 'Scroll to Core Skill Accordions' },
      { title: 'Projects Gallery', url: '#projects', sub: 'Scroll to Major Applications' },
      { title: 'Certifications & Courses', url: '#certifications', sub: 'Scroll to IBM, NPTEL & NIELIT Certs' },
      { title: 'Contact / Socials', url: '#contact', sub: 'Scroll to Email and Location details' },
      { title: 'GitHub Profile', url: 'https://github.com/sahaya-savari', sub: 'Open GitHub in new tab' },
      { title: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/sahaya-savari', sub: 'Open LinkedIn profile in new tab' },
      { title: 'LeetCode Profile', url: 'https://leetcode.com/u/sahaya_savari/', sub: 'Open LeetCode in new tab' },
      { title: 'Portfolio Website', url: 'https://sahayasavari.me', sub: 'sahayasavari.me' },
      { title: 'Email Contact', url: 'mailto:contact@sahayasavari.me', sub: 'contact@sahayasavari.me' }
    ];

    links.forEach(lnk => {
      list.push({
        id: `link-${lnk.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: lnk.title,
        subtitle: lnk.sub,
        category: 'Links',
        icon: ExternalLink,
        action: () => {
          if (lnk.url.startsWith('#')) {
            const el = document.querySelector(lnk.url);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            window.open(lnk.url, '_blank', 'noopener,noreferrer');
          }
          onClose();
        }
      });
    });

    return list;
  }, [navigate, onOpenResume, onClose]);

  // Filter items
  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(
      item => 
        item.title.toLowerCase().includes(q) || 
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [search, items]);

  // Handle arrow key selection
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.querySelector('[data-selected="true"]');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [filtered, selectedIndex, onClose]);

  // Category display info
  const categoryMeta: Record<string, { label: string; }> = {
    Actions: { label: 'Quick Actions' },
    Projects: { label: 'Projects' },
    Articles: { label: 'Articles' },
    Links: { label: 'Navigation & Links' },
  };

  return (
    <div 
      className="fixed inset-0 z-[500] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Overlay — matches portfolio's modal overlay style */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
      />

      {/* Palette container */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-[640px] flex flex-col overflow-hidden max-h-[min(70vh,520px)] rounded-2xl border border-white/[0.08]"
        style={{
          background: 'rgba(10, 10, 14, 0.85)',
          backdropFilter: 'blur(24px) saturate(1.2)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 68px rgba(0,0,0,0.55), 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Search input bar */}
        <div className="relative flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
          <Search className="w-[18px] h-[18px] text-white/30 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, projects, articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-0 text-white font-body text-[15px] placeholder:text-white/25 focus:outline-none"
            aria-label="Search commands"
          />
          <button
            onClick={onClose}
            className="flex items-center gap-0.5 text-[10px] font-mono font-medium text-white/30 border border-white/[0.08] px-1.5 py-[3px] rounded-md bg-white/[0.03] hover:bg-white/[0.06] hover:text-white/50 transition-colors shrink-0"
            aria-label="Close command palette"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div ref={listRef} className="flex-1 overflow-y-auto py-2 hide-scrollbar" role="listbox" aria-label="Search results">
          {filtered.length > 0 ? (
            <>
              {(['Actions', 'Projects', 'Articles', 'Links'] as const).map(cat => {
                const catItems = filtered.filter(it => it.category === cat);
                if (catItems.length === 0) return null;
                
                return (
                  <div key={cat} className="mb-1">
                    {/* Category header */}
                    <div className="px-5 pt-3 pb-1.5">
                      <span className="text-[11px] font-body font-medium tracking-wide uppercase text-white/20">
                        {categoryMeta[cat]?.label || cat}
                      </span>
                    </div>
                    
                    {/* Items */}
                    {catItems.map(item => {
                      const globalIdx = filtered.indexOf(item);
                      const isSelected = globalIdx === selectedIndex;
                      const Icon = item.icon;
                      
                      return (
                        <div
                          key={item.id}
                          role="option"
                          aria-selected={isSelected}
                          data-selected={isSelected}
                          onClick={item.action}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`
                            flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl cursor-pointer select-none transition-colors duration-100
                            ${isSelected 
                              ? 'bg-white/[0.07]' 
                              : 'hover:bg-white/[0.04]'
                            }
                          `}
                        >
                          {/* Icon */}
                          <div className={`
                            w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-100
                            ${isSelected 
                              ? 'bg-white/[0.08] text-white/80' 
                              : 'bg-white/[0.03] text-white/30'
                            }
                          `}>
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </div>
                          
                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <span className={`block text-[13px] font-body font-medium truncate transition-colors duration-100 ${isSelected ? 'text-white' : 'text-white/70'}`}>
                              {item.title}
                            </span>
                            {item.subtitle && (
                              <span className="block text-[11px] font-body font-light text-white/25 truncate mt-0.5">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                          
                          {/* Enter hint on selected */}
                          {isSelected && (
                            <div className="flex items-center gap-1 shrink-0">
                              <CornerDownLeft className="w-3 h-3 text-white/20" aria-hidden="true" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Search className="w-8 h-8 text-white/10" aria-hidden="true" />
              <p className="text-sm text-white/30 font-body font-light">
                No results for "<span className="text-white/50">{search}</span>"
              </p>
            </div>
          )}
        </div>

        {/* Footer bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] text-[11px] font-body text-white/20">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-white/30">↑</kbd>
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-white/30">↓</kbd>
              <span className="ml-0.5">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center h-5 px-1 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-white/30">↵</kbd>
              <span className="ml-0.5">Open</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" aria-hidden="true" />
            <span>Spotlight</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
