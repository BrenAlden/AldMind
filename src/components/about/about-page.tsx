"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/shared/navigation/sidebar";
import { Topbar } from "@/components/shared/navigation/topbar";
import shellStyles from "@/components/shared/styles/shell.module.css";
import PixelTransition from "@/components/about/library/PixelTransition";

const eyebrow = {
  label: "ABOUT / 01",
  tag: "PROFILE BRANDING",
};

const title = {
  main: "Building AI & Automation",
  accent: "Business Solution",
};

const storySection = {
  number: "01",
  heading: "Short Description",
  paragraph:
    "I’m an experienced RPA Developer and aspiring AI & Automation Engineer, passionate about building intelligent systems that learn, understand, and take work off people’s hands. My foundation is in Machine learning, Deep learning, NLP, and Computer Vision, and I’m continuously expanding my expertise in LLMs, RAG, and Agentic AI to build more intelligent and autonomous solutions. Currently completing my Computer Science degree (AI) at Bina Nusantara University and open to full-time opportunities and new professional experiences in AI & Automation.",
  highlightsLabel: "Key highlights", 
};

const keyHighlights = [
  ["ML, NLP, & Computer Vision", "Core foundation"],
  ["Python, Power Automate, & n8n", "Automation Stacks"],
  ["LLM, RAG, & Agentic AI", "Learning"],
];

const educationSection = {
  number: "02",
  heading: "Education",
};

const education = [
  {
    role: "Computer Science Student",
    company: "Bina Nusantara University",
    period: "September 2023 — Present",
    location: "Tangerang, Banten",
    points: [
      "Streaming: AI",
      "Published 2 IEEE Paper",
      "Scholarship Mentor Awardee",
    ],
    tags: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "Speech Recognition", "Software Engineering", "Object Oriented Programming", "Database Technology"],
  },
  {
    role: "Mathematic and Natural Science",
    company: "SMA Maitreyawira",
    period: "July 2020 — June 2023",
    location: "Batam, Kepulauan Riau",
    points: [],
    tags: ["Mathematic", "Science", "Logical Thinking"],
  },
];

const photo = {
  src: "/brenalden.png",
  alt: "Bren Alden",
  sizes: "(max-width: 720px) calc(100vw - 34px), 500px",
};

const focusSection = {
  number: "03",
  heading: "What guides my work",
};

const focusAreas = [
  ["01", "Separation of Concern", "Every system I build is split into clear layers, so each part is easy to test, debug, and scale."],
  ["02", "Reliable by Design", "I plan for the unexpected, so what I build keeps working under real-world conditions."],
  ["03", "Always learning", "Diving into LLMs, RAG, and Agentic AI, and turning each new skill into a working project."],
];

const techSection = {
  number: "04",
  heading: "Tech stack",
};

const techGroups = [
  {
    label: "RPA",
    items: [
      { icon: "https://cdn.simpleicons.org/robotframework/5E50A9", name: "RPA Framework" },
      { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-excel.svg", name: "OpenPyXL" },
      { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/windows-11.svg", name: "Win32 COM" },
      { icon: "selenium/selenium-original", name: "Selenium" },
      { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-power-automate.svg", name: "Power Automate" },
      { icon: "n8n/n8n-original", name: "n8n" },
    ],
  },
  {
    label: "AI / Machine Learning",
    items: [
      { icon: "python/python-original", name: "Python" },
      { icon: "tensorflow/tensorflow-original", name: "TensorFlow" },
      { icon: "keras/keras-original", name: "Keras" },
      { icon: "pytorch/pytorch-original", name: "PyTorch" },
      { icon: "scikitlearn/scikitlearn-original", name: "scikit-learn" },
      { icon: "numpy/numpy-original", name: "NumPy" },
      { icon: "pandas/pandas-original", name: "pandas" },
      { icon: "matplotlib/matplotlib-original", name: "Matplotlib" },
      { icon: "https://raw.githubusercontent.com/mlflow/mlflow/master/assets/icon.svg", name: "MLflow" },
      { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg", name: "LLM" },
      { icon: "https://cdn.simpleicons.org/langchain/5CC8C8", name: "RAG" },
      { icon: "https://cdn.simpleicons.org/langgraph/B79CFF", name: "AI Agent" },
    ],
  },
  {
    label: "Front End",
    items: [
      { icon: "html5/html5-original", name: "HTML5" },
      { icon: "css3/css3-original", name: "CSS3" },
      { icon: "javascript/javascript-original", name: "JavaScript" },
      { icon: "react/react-original", name: "React" },
      { icon: "nextjs/nextjs-original", name: "Next.js", invert: true },
      { icon: "vitejs/vitejs-original", name: "Vite" },
    ],
  },
  {
    label: "Back End",
    items: [
      { icon: "c/c-original", name: "C"},
      { icon: "java/java-original", name: "Java" },
      { icon: "supabase/supabase-original", name: "Supabase" },
      { icon: "https://cdn.jsdelivr.net/gh/get-icon/geticon/icons/xampp.svg", name: "XAMPP" },
    ],
  },
  {
    label: "Tools",
    items: [
      { icon: "git/git-original", name: "Git" },
      { icon: "github/github-original", name: "GitHub", invert: true },
      { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vercel.svg", name: "Vercel", invert: true },
      { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/notion.svg", name: "Notion", invert: true },
    ],
  },
];

function techIconUrl(icon: string) {
  return icon.startsWith("http")
    ? icon
    : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`;
}

const nowSection = {
  number: "05",
  heading: "Currently",
  text: "Replace this with what you are building, learning, studying, or looking for right now.",
};

const toastMessages = {
  copied: "Link copied to clipboard",
  copyFailed: "Copy this page URL from your browser",
};

/* ========================================================= */

export function AboutPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLElement>(null);
  const [toastMessage, setToastMessage] = useState("");

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

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(".about-reveal");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { root, rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={shellStyles.appShell}>
      <Sidebar activeHref="/about" onNewConversation={() => router.push("/")} />
      <main className={shellStyles.main}>
        <Topbar onCopyLink={copyLink} />

        <section ref={scrollRef} className="about-page" aria-labelledby="about-title">
          <div className="about-content">
            <p className="about-eyebrow about-reveal">{eyebrow.label} <span>{eyebrow.tag}</span></p>
            <h1 id="about-title" className="about-reveal">{title.main}<br /><em>{title.accent}</em></h1>

            <section className="about-section about-reveal" aria-labelledby="about-story-title">
              <div className="about-section-label"><span>{storySection.number}</span><h2 id="about-story-title">{storySection.heading}</h2></div>
              <div className="about-story-content">
                <div className="about-story-text">
                  <p>{storySection.paragraph}</p>

                  <ul className="about-highlights" aria-label={storySection.highlightsLabel}>
                    {keyHighlights.map(([value, label]) => (
                      <li key={label}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="about-photo">
                  <PixelTransition
                    aspectRatio="auto"
                    pattern="dither"
                    gridSize={12}
                    pixelColor="#d8d8dd"
                    animationStepDuration={0.35}
                    firstContent={
                      <Image src={photo.src} alt={photo.alt} fill priority sizes={photo.sizes} className="about-photo-img--mono" />
                    }
                    secondContent={
                      <Image src={photo.src} alt="" aria-hidden="true" fill sizes={photo.sizes} />
                    }
                  />
                </div>
              </div>
            </section>

            <section className="about-section about-reveal" aria-labelledby="about-edu-title">
              <div className="about-section-label"><span>{educationSection.number}</span><h2 id="about-edu-title">{educationSection.heading}</h2></div>
              <ol className="about-edu">
                {education.map((item, index) => (
                  <li className="about-edu-item" key={`${item.company}-${index}`}>
                    <span className="about-edu-marker" aria-hidden="true" />
                    <div className="about-edu-card">
                      <div className="about-edu-head">
                        <h3 className="about-edu-role">{item.company}</h3>
                        <span className="about-edu-period">{item.period}</span>
                      </div>
                      <p className="about-edu-meta">
                        <strong>{item.role}</strong>
                        {item.location ? <span> · {item.location}</span> : null}
                      </p>
                      {item.points.length ? (
                        <ul className="about-edu-points">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      ) : null}
                      {item.tags?.length ? (
                        <ul className="about-edu-tags" aria-label="Focus areas">
                          {item.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="about-section about-reveal" aria-labelledby="about-focus-title">
              <div className="about-section-label"><span>{focusSection.number}</span><h2 id="about-focus-title">{focusSection.heading}</h2></div>
              <div className="about-focus-grid">
                {focusAreas.map(([number, cardTitle, description]) => (
                  <article className="about-focus-card" key={number}>
                    <span>{number}</span>
                    <h3>{cardTitle}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="about-section about-reveal" aria-labelledby="about-tech-title">
              <div className="about-section-label"><span>{techSection.number}</span><h2 id="about-tech-title">{techSection.heading}</h2></div>
              <div className="about-tech">
                {techGroups.map((group) => (
                  <div className="about-tech-group" key={group.label}>
                    <p className="about-tech-label">{group.label}</p>
                    <ul className="about-tech-grid">
                      {group.items.map((tool) => (
                        <li className="about-tech-item" key={tool.name}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className={`about-tech-logo${"invert" in tool && tool.invert ? " about-tech-logo--invert" : ""}`} src={techIconUrl(tool.icon)} alt={`${tool.name} logo`} width={22} height={22} loading="lazy" />
                          <span>{tool.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </section>
      </main>

      <output className={`${shellStyles.toast} ${toastMessage ? shellStyles.toastVisible : ""}`} aria-live="polite">
        {toastMessage}
      </output>
    </div>
  );
}