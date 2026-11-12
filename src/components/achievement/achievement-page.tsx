"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar } from "@/components/shared/navigation/sidebar";
import { Topbar } from "@/components/shared/navigation/topbar";
import shellStyles from "@/components/shared/styles/shell.module.css";
import type { Achievement } from "@/lib/achievements";

const eyebrow = {
  label: "ACHIEVEMENT / 05",
  tag: "MILESTONES & RECOGNITION",
};

const title = {
  main: "Moments worth",
  accent: "being proud of.",
};

const ALL = "All";

const toastMessages = {
  copied: "Link copied to clipboard",
  copyFailed: "Copy this page URL from your browser",
};

type AchievementPageProps = { achievements: Achievement[] };

export function AchievementPage({ achievements }: AchievementPageProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLElement>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    achievements.forEach((a) => a.category && unique.add(a.category));
    return [ALL, ...Array.from(unique)];
  }, [achievements]);

  const visibleAchievements = useMemo(() => {
    if (activeCategory === ALL) return achievements;
    return achievements.filter((a) => a.category === activeCategory);
  }, [achievements, activeCategory]);

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

    const targets = root.querySelectorAll<HTMLElement>(".ach-reveal:not(.is-visible)");
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
  }, [visibleAchievements]);

  return (
    <div className={shellStyles.appShell}>
      <Sidebar activeHref="/achievement" onNewConversation={() => router.push("/")} />
      <main className={shellStyles.main}>
        <Topbar onCopyLink={copyLink} />

        <section ref={scrollRef} className="ach-page" aria-labelledby="ach-title">
          <div className="ach-content">
            <p className="ach-eyebrow ach-reveal">{eyebrow.label} <span>{eyebrow.tag}</span></p>
            <h1 id="ach-title" className="ach-reveal">{title.main}<br /><em>{title.accent}</em></h1>

            {categories.length > 1 ? (
              <div className="ach-filters ach-reveal" role="tablist" aria-label="Filter achievements by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={category === activeCategory}
                    className={`ach-filter${category === activeCategory ? " is-active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            ) : null}

            {visibleAchievements.length === 0 ? (
              <p className="ach-empty ach-reveal">No achievements to show yet.</p>
            ) : (
              <ul className="ach-grid">
                {visibleAchievements.map((achievement) => (
                  <li className="ach-card ach-reveal" key={achievement.id}>
                    {achievement.imageUrl ? (
                      <div className="ach-media">
                        <Image
                          src={achievement.imageUrl}
                          alt={`${achievement.title} certificate`}
                          fill
                          sizes="(max-width: 720px) calc(100vw - 34px), 330px"
                          className="ach-media-img"
                        />
                        {achievement.dateLabel ? <span className="ach-date">{achievement.dateLabel}</span> : null}
                      </div>
                    ) : (
                      <div className="ach-media ach-media--empty" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5" /><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" /></svg>
                        {achievement.dateLabel ? <span className="ach-date">{achievement.dateLabel}</span> : null}
                      </div>
                    )}

                    <div className="ach-body">
                      <h2 className="ach-name">{achievement.title}</h2>
                      {achievement.issuer ? <p className="ach-issuer">{achievement.issuer}</p> : null}

                      {achievement.category ? (
                        <span className="ach-cat">{achievement.category}</span>
                      ) : null}

                      {achievement.description ? (
                        <p className="ach-desc">{achievement.description}</p>
                      ) : null}

                      {achievement.link ? (
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="ach-link"
                        >
                          View credential
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                        </a>
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
