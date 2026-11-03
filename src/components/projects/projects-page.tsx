"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar } from "@/components/shared/navigation/sidebar";
import { Topbar } from "@/components/shared/navigation/topbar";
import shellStyles from "@/components/shared/styles/shell.module.css";
import type { Project } from "@/lib/projects";

const eyebrow = {
  label: "PROJECTS / 04",
  tag: "SELECTED WORK",
};

const title = {
  main: "Things I have",
  accent: "designed & shipped.",
};

const ALL = "All";

const toastMessages = {
  copied: "Link copied to clipboard",
  copyFailed: "Copy this page URL from your browser",
};

type ProjectsPageProps = { projects: Project[] };

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLElement>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    projects.forEach((p) => p.category && unique.add(p.category));
    return [ALL, ...Array.from(unique)];
  }, [projects]);

  const visibleProjects = useMemo(() => {
    if (activeCategory === ALL) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2400);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(toastMessages.copied);
    } catch {
      showToast(toastMessages.copyFailed);
    }
  }

  // Blur-to-clear reveal as cards enter the viewport. Re-runs when the filter
  // changes so freshly shown cards animate in too.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(".proj-reveal:not(.is-visible)");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { root, rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [visibleProjects]);

  return (
    <div className={shellStyles.appShell}>
      <Sidebar activeHref="/projects" onNewConversation={() => router.push("/")} />
      <main className={shellStyles.main}>
        <Topbar onCopyLink={copyLink} />

        <section ref={scrollRef} className="proj-page" aria-labelledby="proj-title">
          <div className="proj-content">
            <p className="proj-eyebrow proj-reveal">{eyebrow.label} <span>{eyebrow.tag}</span></p>
            <h1 id="proj-title" className="proj-reveal">{title.main}<br /><em>{title.accent}</em></h1>

            {categories.length > 1 ? (
              <div className="proj-filters proj-reveal" role="tablist" aria-label="Filter projects by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={category === activeCategory}
                    className={`proj-filter${category === activeCategory ? " is-active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            ) : null}

            {visibleProjects.length === 0 ? (
              <p className="proj-empty proj-reveal">No projects to show yet.</p>
            ) : (
              <ul className="proj-grid">
                {visibleProjects.map((project) => (
                  <li className="proj-card proj-reveal" key={project.id}>
                    {project.imageUrl ? (
                      <div className="proj-media">
                        <Image
                          src={project.imageUrl}
                          alt={`${project.title} preview`}
                          fill
                          sizes="(max-width: 720px) calc(100vw - 34px), 380px"
                          className="proj-media-img"
                        />
                      </div>
                    ) : (
                      <div className="proj-media proj-media--empty" aria-hidden="true">
                        <span>{project.title.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}

                    <div className="proj-body">
                      <div className="proj-card-head">
                        <h2 className="proj-name">{project.title}</h2>
                        {project.year ? <span className="proj-year">{project.year}</span> : null}
                      </div>

                      {project.category || project.role ? (
                        <p className="proj-meta">
                          {project.category ? <span className="proj-cat">{project.category}</span> : null}
                          {project.role ? <span className="proj-status">{project.role}</span> : null}
                        </p>
                      ) : null}

                      {project.description ? <p className="proj-desc">{project.description}</p> : null}

                      {project.tags.length ? (
                        <ul className="proj-tags" aria-label="Skills and tools">
                          {project.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      ) : null}

                      {project.contributor ? (
                        <p className="proj-contributor">
                          <span>Contributors</span> {project.contributor}
                        </p>
                      ) : null}

                      {project.link ? (
                        <div className="proj-links">
                          <a href={project.link} target="_blank" rel="noreferrer noopener" className="proj-link proj-link--primary">
                            Visit project
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <output className={`${shellStyles.toast} ${toastMessage ? shellStyles.toastVisible : ""}`} aria-live="polite">
        {toastMessage}
      </output>
    </div>
  );
}
