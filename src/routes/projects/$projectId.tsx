import { createFileRoute } from "@tanstack/react-router";
import ProjectDetails from "@/pages/ProjectDetails";
import { CASE_STUDIES } from "@/data/caseStudies";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ params }) => {
    const project = CASE_STUDIES[params.projectId];
    if (!project) {
      return buildSeoHead({
        title: "404 Not Found | Sahaya Savari F Portfolio",
        description: "The page you are looking for does not exist.",
        url: `${SITE_URL}/404`,
        robots: "noindex, nofollow",
      });
    }
    return buildSeoHead({
      title: project.seoTitle || `${project.title} - ${project.tagline} | Sahaya Savari`,
      description: project.overview,
      url: `${SITE_URL}/projects/${project.id}`,
    });
  },
  component: ProjectDetails,
});
