import { memo } from 'react';
import { ArrowUpRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { ARTICLES, Article, BLOG_URL } from '../data';
import SectionBadge from '../components/ui/SectionBadge';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/90 bg-black/50 backdrop-blur-md border border-white/10">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{article.readingTime} min read</span>
          </div>
        </div>
        <h3 className="font-heading text-xl text-white mb-2 group-hover:text-purple-300 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm font-body font-light text-white/60 mb-6 flex-1 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
          <span className="text-xs font-body font-medium text-white/80 group-hover:text-white transition-colors">
            Read Article
          </span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
};

const BlogSection = memo(() => {
  return (
    <section aria-label="Featured Articles" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <SectionBadge>Writings</SectionBadge>
            <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9]">Featured <br/> Articles.</h2>
          </div>
          <p className="text-white/60 font-body font-light max-w-xs md:text-right">
            Insights on software engineering, web performance, and AI integration.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-white text-black font-body font-medium text-sm overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              View All Articles
            </span>
            <div className="absolute inset-0 bg-white/80 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <ArrowUpRight className="relative z-10 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

      </div>
    </section>
  );
});

export default BlogSection;
