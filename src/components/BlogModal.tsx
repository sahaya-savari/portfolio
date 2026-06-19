import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { m as motion, AnimatePresence  } from 'framer-motion';
import { X, Search, Calendar, Clock, ArrowLeft, Tag, BookOpen } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../blogData';

interface BlogModalProps {
  onClose: () => void;
}

function renderContent(content: string) {
  return content.split('\n\n').map((block, idx) => {
    if (block.startsWith('### ')) {
      return <h4 key={idx} className="text-xl font-heading italic text-white mt-6 mb-3">{block.replace('### ', '')}</h4>;
    }
    if (block.startsWith('## ')) {
      return <h3 key={idx} className="text-2xl font-heading italic text-white mt-8 mb-4">{block.replace('## ', '')}</h3>;
    }
    if (block.startsWith('1. ') || block.startsWith('- ')) {
      const isOrdered = block.startsWith('1. ');
      const lines = block.split('\n');
      const items = lines.map(line => line.replace(/^\d+\.\s+|-\s+/, ''));
      if (isOrdered) {
        return (
          <ol key={idx} className="list-decimal pl-6 space-y-2 text-white/70 font-body font-light my-4">
            {items.map((it, i) => <li key={i}>{it}</li>)}
          </ol>
        );
      } else {
        return (
          <ul key={idx} className="list-disc pl-6 space-y-2 text-white/70 font-body font-light my-4">
            {items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        );
      }
    }
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const code = lines.slice(1, -1).join('\n');
      return (
        <pre key={idx} className="p-4 rounded-xl bg-black/60 border border-white/10 overflow-x-auto text-xs font-mono text-white/80 my-4">
          <code>{code}</code>
        </pre>
      );
    }
    
    // Parse inline code blocks marked by `
    const parts = block.split(/(`[^`]+`)/g);
    return (
      <p key={idx} className="text-white/70 font-body font-light leading-relaxed my-3">
        {parts.map((part, pidx) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={pidx} className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs text-white/90">{part.slice(1, -1)}</code>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default function BlogModal({ onClose }: BlogModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Focus trap and accessibility
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    setTimeout(() => closeButtonRef.current?.focus(), 100);
    return () => previouslyFocusedRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePost) {
          setActivePost(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, activePost]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  // Filter categories and tags lists
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
  }, []);

  const tags = useMemo(() => {
    const allTags = BLOG_POSTS.flatMap(p => p.tags);
    return ['All', ...Array.from(new Set(allTags))];
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  return (
    <div 
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      ref={modalRef}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl" 
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl h-[85vh] overflow-hidden rounded-3xl border border-white/10 flex flex-col"
        style={{
          background: 'rgba(15, 23, 42, 0.7)',
          boxShadow: '0 0 80px -20px rgba(59,130,246,0.15)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-white/10"
             style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            {activePost && (
              <button 
                ref={backButtonRef}
                onClick={() => setActivePost(null)}
                className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Back to article list"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 id="blog-modal-title" className="text-2xl md:text-3xl font-heading italic text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                {activePost ? 'Reading Log' : 'Technical Logs'}
              </h2>
            </div>
          </div>
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close blog viewer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6 md:p-8">
          <AnimatePresence mode="wait">
            {activePost ? (
              <motion.article 
                key="active-post"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                {/* Meta details */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/50">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-blue-300 border border-white/10">
                      {activePost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {activePost.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activePost.readTime}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-tight">
                    {activePost.title}
                  </h1>
                </div>

                <div className="border-b border-white/10 pb-6 text-white/80 font-body font-light text-lg leading-relaxed italic">
                  {activePost.excerpt}
                </div>

                {/* Body Content */}
                <div className="prose prose-invert max-w-none text-white/70 font-body">
                  {renderContent(activePost.content)}
                </div>

                {/* Tags bottom list */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap gap-2">
                  {activePost.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ) : (
              <motion.div 
                key="list-posts"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input 
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  {/* Filter Selects */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/40">Category:</span>
                      <select 
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="bg-slate-900 border border-white/10 text-white font-body text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-white/30 cursor-pointer"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/40">Tag:</span>
                      <select 
                        value={selectedTag}
                        onChange={e => setSelectedTag(e.target.value)}
                        className="bg-slate-900 border border-white/10 text-white font-body text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-white/30 cursor-pointer"
                      >
                        {tags.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Article Grid / List */}
                {filteredPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredPosts.map(post => (
                      <div 
                        key={post.id}
                        onClick={() => setActivePost(post)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePost(post); } }}
                        className="liquid-glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-blue-300">
                              {post.category}
                            </span>
                            <span className="text-[10px] font-mono text-white/40">{post.publishDate}</span>
                          </div>
                          <h3 className="font-heading italic text-xl text-white group-hover:text-blue-300 transition-colors leading-tight mb-2">
                            {post.title}
                          </h3>
                          <p className="text-white/60 font-body font-light text-sm line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
                          <span>{post.readTime}</span>
                          <span className="text-white/60 group-hover:translate-x-1 transition-transform">Read article &rarr;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/40 font-body">
                    No articles found matching filters.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
