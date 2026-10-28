"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "@/components/shared/navigation/sidebar";
import { Topbar } from "@/components/shared/navigation/topbar";
import shellStyles from "@/components/shared/styles/shell.module.css";

const focusAreas = [
  ["01", "Thoughtful work", "Use this space to describe the kinds of problems you enjoy solving."],
  ["02", "Clear collaboration", "Add how you work with teams, clients, or other creative people."],
  ["03", "Always learning", "Share the technology, craft, or subject you are exploring right now."],
];

export function AboutPage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2400);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Copy this page URL from your browser");
    }
  }

  return (
    <div className={shellStyles.appShell}>
      <Sidebar activeHref="/about" onNewConversation={() => router.push("/")} />
      <main className={shellStyles.main}>
        <Topbar onCopyLink={copyLink} />

        <section className="about-page" aria-labelledby="about-title">
          <div className="about-content">
            <p className="about-eyebrow">ABOUT / 01 <span>BRANDED PROFILE</span></p>
            <h1 id="about-title">Building AI & Automation<br /><em>Business Solution </em></h1>
            <p className="about-lead">I&apos;m Bren Alden. This space is for the people, ideas, and work that shape my portfolio.</p>

            <section className="about-section" aria-labelledby="about-story-title">
              <div className="about-section-label"><span>01</span><h2 id="about-story-title">My story</h2></div>
              <p>Write a short introduction here. Explain your background, what brought you into your field, and the type of work you want to create. Keep it personal, specific, and easy to scan.</p>
            </section>

            <section className="about-section" aria-labelledby="about-focus-title">
              <div className="about-section-label"><span>02</span><h2 id="about-focus-title">What guides my work</h2></div>
              <div className="about-focus-grid">
                {focusAreas.map(([number, title, description]) => (
                  <article className="about-focus-card" key={number}>
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="about-section" aria-labelledby="about-now-title">
              <div className="about-section-label"><span>03</span><h2 id="about-now-title">Currently</h2></div>
              <p>Replace this with what you are building, learning, studying, or looking for right now.</p>
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
