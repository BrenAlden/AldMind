import "@/components/projects/styles/projects.css";
import { ProjectsPage } from "@/components/projects/projects-page";
import { getProjects } from "@/lib/projects";

// Projects are fetched fresh at request time (public read-only data).
export const dynamic = "force-dynamic";

export default async function Projects() {
  const projects = await getProjects();
  return <ProjectsPage projects={projects} />;
}
