"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/shared/navigation/sidebar";
import { Topbar } from "@/components/shared/navigation/topbar";
import shellStyles from "@/components/shared/styles/shell.module.css";

/* =========================================================
   KONTEN HALAMAN EXPERIENCE: ganti teks cukup di bagian ini
   ========================================================= */

const eyebrow = {
  label: "EXPERIENCE / 02",
  tag: "CAREER TIMELINE",
};

const title = {
  main: "Where I have",
  accent: "worked & grown.",
};

const professionalExperience = [
  {
    role: "RPA Developer Intern",
    company: "PT Astra Daihatsu Motor",
    period: "March 2026 — Present",
    location: "North Jakarta, Indonesia · On-site",
    points: [
      "Developed and delivered 20+ end-to-end RPA projects using Python, with selected solutions integrating Microsoft Power Automate; conducted User Requirement gathering and User Acceptance Testing (UAT), reducing average manual work hours by 90%.",
      "Resolved major bugs in existing RPA solutions, improving processing stability, reducing execution time and manual work hours, and ensuring reliable laptop performance during automation runs.",
      "Entrusted to lead 5 RPA Workshops for ADM employees within a 3-month internship, delivering hands-on training on Python-based RPA development for Email, Excel, SAP, and Website automation.",
      "Served as the Project Progress PIC for the department, monitoring mandays, project requirements, and deliverables for reporting to the BR team; ensured timely responses and rapid issue resolution while maintaining stable project progress throughout the current Fiscal Year.",
    ],
    tags: ["Python", "Power Automate", "Project Analysis", "Excel", "BRD" ,"UAT"],
  },
];

const education = [
  {
    role: "Computer Science Student (AI)",
    company: "Bina Nusantara University",
    period: "2022 — Present",
    location: "Tangerang, Indonesia",
    points: [
      "Scholarship Mentor Awardee",
      "Research Paper Author (Analyzing Deep Learning in Quick, Draw!: A Case Study on Hand-drawn Sketch Recognition)",
    ],
    tags: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "Speech Recognition", "Software Engineering", "Object Oriented Programming", "Database Technology"],
  },
  {
    role: "Highschool Diploma (Mathematics and Science)",
    company: "SMA Maitreyawira",
    period: "2022 — Present",
    location: "Batam, Indonesia",
    points: [
    ],
    tags: ["Mathematic", "Logical Thinking"],
  },
];

const organizationalExperience = [
  {
    role: "Mentor Scholarship Awardee",
    company: "SASC Binus University",
    period: "September 2025 —  January 2026",
    location: "Hybrid",
    points: [
      "Selected as a Student Mentor after meeting academic eligibility criteria, maintaining a GPA above 3.5 with no course grades below B-.",
      "Awarded a full scholarship covering 16 credits for one semester in recognition of contribution and performance in the mentoring program.",
      "Mentored 3 students from different cohorts across 7 courses, providing academic guidance and personalized support based on their learning needs.",
      "Successfully maintained and improved mentees' academic performance through structured guidance, study strategies, and course-specific assistance across subjects including Artificial Intelligence, Algorithm Design, Program Design, Network Security, Compilation Techniques, Database Technology, and Computer Networks."
    ],
    tags: ["Mentoring", "Time Management"],
  },
  {
    role: "Staff",
    company: "Keluarga Mahasiswa Buddhis Dhammavaddhana",
    period: "September 2025 —  January 2026",
    location: "Onsite",
    points: [
      "Project Manager of Malam Keakraban 2025",
      ""
    ],
    tags: [],
  },
];

const sections = [
  { number: "01", heading: "Professional Experience", items: professionalExperience },
  { number: "02", heading: "Education", items: education },
  { number: "03", heading: "Organizational Experience", items: organizationalExperience },
];

const toastMessages = {
  copied: "Link copied to clipboard",
  copyFailed: "Copy this page URL from your browser",
};

export function ExperiencePage() {
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

  // Blur-to-clear tiap elemen `.exp-reveal` saat masuk area scroll Experience.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(".exp-reveal");
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
      <Sidebar activeHref="/experience" onNewConversation={() => router.push("/")} />
      <main className={shellStyles.main}>
        <Topbar onCopyLink={copyLink} />

        <section ref={scrollRef} className="exp-page" aria-labelledby="exp-title">
          <div className="exp-content">
            <p className="exp-eyebrow exp-reveal">{eyebrow.label} <span>{eyebrow.tag}</span></p>
            <h1 id="exp-title" className="exp-reveal">{title.main}<br /><em>{title.accent}</em></h1>

            {sections.map((section) => (
              <section className="exp-section" key={section.heading} aria-label={section.heading}>
                <div className="exp-section-label exp-reveal">
                  <span>{section.number}</span>
                  <h2>{section.heading}</h2>
                </div>

                <ol className="exp-timeline">
                  {section.items.map((item, index) => (
                    <li className="exp-item exp-reveal" key={`${item.company}-${index}`}>
                      <span className="exp-marker" aria-hidden="true" />
                      <div className="exp-card">
                        <div className="exp-card-head">
                          <h3 className="exp-role">{item.role}</h3>
                          <span className="exp-period">{item.period}</span>
                        </div>
                        <p className="exp-meta">
                          <strong>{item.company}</strong>
                          {item.location ? <span> · {item.location}</span> : null}
                        </p>
                        <ul className="exp-points">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                        {item.tags?.length ? (
                          <ul className="exp-tags" aria-label="Tools and skills">
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
            ))}
          </div>
        </section>
      </main>

      <output className={`${shellStyles.toast} ${toastMessage ? shellStyles.toastVisible : ""}`} aria-live="polite">
        {toastMessage}
      </output>
    </div>
  );
}
