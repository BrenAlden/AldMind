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

const photo = {
  src: "/brenalden.png",
  alt: "Bren Alden",
  sizes: "(max-width: 720px) calc(100vw - 34px), 500px",
};

const focusSection = {
  number: "02",
  heading: "What guides my work",
};

const focusAreas = [
  ["01", "Separation of Concern", "Every system I build is split into clear layers, so each part is easy to test, debug, and scale."],
  ["02", "Reliable by Design", "I plan for the unexpected, so what I build keeps working under real-world conditions."],
  ["03", "Always learning", "Diving into LLMs, RAG, and Agentic AI, and turning each new skill into a working project."],
];

const techSection = {
  number: "03",
  heading: "Tech stack",
};

const techGroups = [
  {
    label: "Languages & Core",
    items: [
      { icon: "python/python-original", name: "Python" },
      { icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original", name: "C" },
      { icon: "java/java-original", name: "Java" },
      { icon: "typescript/typescript-original", name: "TypeScript" },
      { icon: "javascript/javascript-original", name: "JavaScript" },
      { icon: "sql/sql-original", name: "SQL"}
    ],
  },
  {
    label: "AI & Data",
    items: [
      { icon: "pytorch/pytorch-original", name: "PyTorch" },
      { icon: "tensorflow/tensorflow-original", name: "TensorFlow" },
      { icon: "scikitlearn/scikitlearn-original", name: "scikit-learn" },
      { icon: "pandas/pandas-original", name: "pandas" },
      { icon: "numpy/numpy-original", name: "NumPy" },
    ],
  },
  {
    label: "Automation & Tools",
    items: [
      { icon: "python/python-original", name: "Python RPA" },
      { icon: "n8n/n8n-original", name: "n8n" },
      { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-power-automate.svg", name: "Power Automate" },
    ],
  },
];

function techIconUrl(icon: string) {
  return icon.startsWith("http")
    ? icon
    : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`;
}

const nowSection = {
  number: "04",
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
                          <img className="about-tech-logo" src={techIconUrl(tool.icon)} alt={`${tool.name} logo`} width={22} height={22} loading="lazy" />
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