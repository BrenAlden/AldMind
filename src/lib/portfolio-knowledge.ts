import { getAchievements } from "@/lib/achievements";
import { aboutContent, experienceContent } from "@/lib/portfolio-content";
import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export type KnowledgeSource = {
  id: string;
  title: string;
  href: string;
  content: string;
};

function formatList(items: readonly string[]) {
  return items.join(", ");
}

export async function getPortfolioKnowledge(): Promise<KnowledgeSource[]> {
  const [projects, achievements] = await Promise.all([getProjects(), getAchievements()]);
  const about = aboutContent;
  const experience = experienceContent;

  return [
    {
      id: "about-profile",
      title: "About — profil Bren Alden",
      href: "/about",
      content: [
        about.title.main,
        about.title.accent,
        about.storySection.paragraph,
        ...about.keyHighlights.map(([highlight, label]) => `${highlight} (${label})`),
        ...about.education.map((item) =>
          `${item.role} at ${item.company}, ${item.period}, ${item.location}. ${formatList(item.points)}. Skills: ${formatList(item.tags)}.`,
        ),
        ...about.focusAreas.map(([, title, description]) => `${title}: ${description}`),
        ...about.techGroups.map((group) => `${group.label}: ${formatList(group.items.map((item) => item.name))}`),
      ].join("\n"),
    },
    ...[
      ...experience.professionalExperience.map((item) => ({ ...item, section: "Professional Experience" })),
      ...experience.organizationalExperience.map((item) => ({ ...item, section: "Organizational Experience" })),
    ].map((item, index) => ({
      id: `experience-${index + 1}`,
      title: `Experience — ${item.role} at ${item.company}`,
      href: "/experience",
      content: [
        item.section,
        item.role,
        item.company,
        item.period,
        item.location,
        ...item.points,
        `Skills: ${formatList(item.tags)}`,
      ].join("\n"),
    })),
    ...projects
      .filter((project) => project.id !== "sample-1" && !project.title.startsWith("Connect Supabase"))
      .map((project) => ({
        id: `project-${project.id}`,
        title: `Project — ${project.title}`,
        href: "/projects",
        content: [
          project.title,
          project.description,
          project.category,
          project.role,
          project.contributor,
          project.year,
          `Skills: ${formatList(project.tags)}`,
          project.link ? `Link: ${project.link}` : "",
        ].filter(Boolean).join("\n"),
      })),
    ...achievements
      .filter((achievement) => achievement.id !== "sample-1" && !achievement.title.startsWith("Connect Supabase"))
      .map((achievement) => ({
        id: `achievement-${achievement.id}`,
        title: `Achievement — ${achievement.title}`,
        href: "/achievement",
        content: [
          achievement.title,
          achievement.issuer,
          achievement.description,
          achievement.category,
          achievement.dateLabel,
          achievement.link ? `Link: ${achievement.link}` : "",
        ].filter(Boolean).join("\n"),
      })),
    {
      id: "contact",
      title: "Contact Bren Alden",
      href: "/contact",
      content: [
        "The Contact page is open to full-time roles, freelance builds, and research collaborations in AI & Automation.",
        `Email: ${siteConfig.email}`,
        `GitHub: ${siteConfig.socials.github}`,
        `LinkedIn: ${siteConfig.socials.linkedin}`,
      ].join("\n"),
    },
  ];
}
