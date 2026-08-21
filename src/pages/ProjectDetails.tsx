import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { CASE_STUDIES } from '../data/caseStudies';
import { SITE_URL, createBreadcrumbSchema } from '../seo';
import NotFound from './NotFound';

export default function ProjectDetails() {
  const { projectId } = useParams();
  
  const project = useMemo(() => {
    if (!projectId) return null;
    return CASE_STUDIES[projectId] || null;
  }, [projectId]);

  const combinedSchema = useMemo(() => {
    if (!project) return undefined;
    const breadcrumb = createBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Projects', url: `${SITE_URL}/projects` },
      { name: project.title, url: `${SITE_URL}/projects/${project.id}` },
    ]);

    const codeSchema = {
      "@type": "SoftwareSourceCode",
      "name": project.title,
      "description": project.overview,
      "codeRepository": project.githubUrl,
      "programmingLanguage": project.techStack
    };

    return {
      "@context": "https://schema.org",
      "@graph": [breadcrumb, codeSchema],
    };
  }, [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <>
      <SEOHead 
        title={`${project.title} | Sahaya Savari`}
        description={project.overview}
        url={`${SITE_URL}/projects/${project.id}`}
        schema={combinedSchema}
      />
      <div className="pt-32 pb-24 px-6 max-w-screen-md mx-auto min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Link to="/projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors font-body text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-heading italic tracking-tight mb-4">{project.title}</h1>
          <p className="text-xl font-body text-white/70 mb-6">{project.tagline}</p>
          
          <div className="flex flex-wrap gap-4">
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform"
              >
                View Live Demo <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && project.githubUrl !== 'https://github.com/sahaya-savari' ? (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-full font-medium text-sm hover:bg-white/20 transition-colors"
              >
                Source Code <Github className="w-4 h-4" />
              </a>
            ) : (
              !project.demoUrl && (
                <span className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-full font-medium text-sm inline-flex items-center gap-2">
                  Status: In Development
                </span>
              )
            )}
          </div>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Overview</h2>
            <p className="text-base font-body leading-relaxed text-white/80">{project.overview}</p>
          </section>

          <section>
            <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">The Problem</h2>
            <p className="text-base font-body leading-relaxed text-white/80">{project.problem}</p>
          </section>

          <section>
            <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Goals</h2>
            <ul className="list-disc pl-5 space-y-2 text-base font-body text-white/80">
              {project.goals.map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Solution & Architecture</h2>
            <p className="text-base font-body leading-relaxed text-white/80 mb-4">{project.solution}</p>
            <p className="text-base font-body leading-relaxed text-white/80">{project.architecture}</p>
          </section>

          <section>
            <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1.5 border border-white/10 bg-white/5 rounded-full text-xs font-body text-white/70">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Challenges Faced</h2>
            <ul className="list-disc pl-5 space-y-2 text-base font-body text-white/80">
              {project.challenges.map((challenge, i) => (
                <li key={i}>{challenge}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Key Lessons Learned</h2>
            <ul className="list-disc pl-5 space-y-2 text-base font-body text-white/80">
              {project.lessons.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ul>
          </section>

          {project.relatedArticle && (
            <section className="pt-4 border-t border-white/10">
              <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Related Technical Writing</h2>
              <a
                href={project.relatedArticle.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-body text-white/90 hover:text-white underline underline-offset-4 transition-colors"
              >
                {project.relatedArticle.title} <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
