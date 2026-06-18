import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, FileText, BookOpen, ExternalLink, Moon, Sparkles, FolderGit } from 'lucide-react';
import { PROJECTS } from '../data';
import { BLOG_POSTS } from '../blogData';

interface CommandPaletteProps {
  onClose: () => void;
  onSelectProject: (project: any) => void;
  onOpenBlog: () => void;
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

export default function CommandPalette({ onClose, onSelectProject, onOpenBlog, onOpenResume }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
    
    // Lock scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Build items dynamically
  const items = useMemo(() => {
    const list: CommandItem[] = [];

    // Core actions
    list.push({
      id: 'action-resume',
      title: 'View Resume',
      subtitle: 'Open the interactive PDF viewer and download options',
      category: 'Actions',
      icon: FileText,
      action: () => {
        onOpenResume();
        onClose();
      }
    });

    list.push({
      id: 'action-blog',
      title: 'Open Technical Blog',
      subtitle: 'Read learning logs and engineering journals',
      category: 'Actions',
      icon: BookOpen,
      action: () => {
        onOpenBlog();
        onClose();
      }
    });

    // Projects
    PROJECTS.forEach(proj => {
      list.push({
        id: `project-${proj.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: `Project: ${proj.title}`,
        subtitle: proj.desc,
        category: 'Projects',
        icon: FolderGit,
        action: () => {
          onSelectProject(proj);
          onClose();
        }
      });
    });

    // Blog articles
    BLOG_POSTS.forEach(post => {
      list.push({
        id: `article-${post.id}`,
        title: `Article: ${post.title}`,
        subtitle: `${post.category} · ${post.readTime}`,
        category: 'Articles',
        icon: BookOpen,
        action: () => {
          // Open blog modal and select this post
          onOpenBlog();
          // We can handle selecting this post by passing an event or state trigger
          // For simplicity, we trigger the blog modal
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
      { title: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/sahayasavari', sub: 'Open LinkedIn profile in new tab' }
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
  }, [onSelectProject, onOpenBlog, onOpenResume, onClose]);

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

  return (
    <div 
      className="fixed inset-0 z-[500] flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/85 backdrop-blur-md" 
      />

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-slate-900/90 border border-white/10 rounded-2xl flex flex-col overflow-hidden max-h-[60vh] shadow-2xl"
      >
        {/* Search input bar */}
        <div className="relative flex items-center border-b border-white/10 px-4 py-3">
          <Search className="w-5 h-5 text-white/40 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, or section name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent border-0 text-white font-body text-base placeholder:text-white/30 focus:outline-none"
          />
          <div className="flex items-center gap-1 text-[10px] font-mono text-white/30 border border-white/15 px-1.5 py-0.5 rounded bg-white/5">
            ESC
          </div>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-2 hide-scrollbar">
          {filtered.length > 0 ? (
            <div className="space-y-4 pb-2">
              {/* Group items by category */}
              {['Actions', 'Projects', 'Articles', 'Links'].map(cat => {
                const catItems = filtered.filter(it => it.category === cat);
                if (catItems.length === 0) return null;
                
                return (
                  <div key={cat} className="space-y-1">
                    <h3 className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-white/30">
                      {cat}
                    </h3>
                    {catItems.map(item => {
                      const globalIdx = filtered.indexOf(item);
                      const isSelected = globalIdx === selectedIndex;
                      const Icon = item.icon;
                      
                      return (
                        <div
                          key={item.id}
                          onClick={item.action}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer select-none ${
                            isSelected ? 'bg-white/10 text-white border-l-2 border-blue-400 pl-2.5' : 'text-white/70 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-blue-400' : 'text-white/40'}`} />
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-body font-medium">{item.title}</span>
                            {item.subtitle && (
                              <span className="block text-xs font-body font-light text-white/40 truncate">{item.subtitle}</span>
                            )}
                          </div>
                          {isSelected && (
                            <div className="text-[10px] font-mono text-white/30 bg-white/5 border border-white/10 px-1 rounded">
                              Enter
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-white/40 font-body">
              No matches found.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
