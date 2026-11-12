"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/shared/navigation/sidebar";
import { Topbar } from "@/components/shared/navigation/topbar";
import shellStyles from "@/components/shared/styles/shell.module.css";
import { sendContactMessage, type ContactState } from "@/app/contact/actions";
import { siteConfig } from "@/lib/site-config";

const eyebrow = {
  label: "CONTACT / 06",
  tag: "LET'S BUILD SOMETHING",
};

const title = {
  main: "Have an idea?",
  accent: "Let's collaborate.",
};

const intro =
  "Open to full-time roles, freelance builds, and research collaborations in AI & Automation. Drop a message below or reach me directly.";

const initialState: ContactState = { status: "idle" };

function githubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function linkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.05V21h-4v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9z" />
    </svg>
  );
}

export function ContactPage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    } else if (state.status === "unconfigured") {
      const form = formRef.current;
      const name = (form?.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
      const email = (form?.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
      const message = (form?.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "";
      const subject = encodeURIComponent(`Collaboration — ${name || "Hello"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    }
  }, [state]);

  return (
    <div className={shellStyles.appShell}>
      <Sidebar activeHref="/contact" onNewConversation={() => router.push("/")} />
      <main className={shellStyles.main}>
        <Topbar onCopyLink={copyLink} />

        <section className="ct-page" aria-labelledby="ct-title">
          <div className="ct-content">
            <p className="ct-eyebrow">{eyebrow.label} <span>{eyebrow.tag}</span></p>
            <h1 id="ct-title">{title.main}<br /><em>{title.accent}</em></h1>
            <p className="ct-intro">{intro}</p>

            <div className="ct-layout">
              {/* Direct channels */}
              <aside className="ct-channels" aria-label="Direct links">
                <a className="ct-channel" href={siteConfig.socials.github} target="_blank" rel="noreferrer noopener">
                  <span className="ct-channel-icon">{githubIcon()}</span>
                  <span className="ct-channel-text">
                    <strong>GitHub</strong>
                    <small>Code & open source</small>
                  </span>
                  <span className="ct-channel-arrow" aria-hidden="true">↗</span>
                </a>

                <a className="ct-channel" href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer noopener">
                  <span className="ct-channel-icon">{linkedinIcon()}</span>
                  <span className="ct-channel-text">
                    <strong>LinkedIn</strong>
                    <small>Career & network</small>
                  </span>
                  <span className="ct-channel-arrow" aria-hidden="true">↗</span>
                </a>

                <a className="ct-channel" href={`mailto:${siteConfig.email}`}>
                  <span className="ct-channel-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span className="ct-channel-text">
                    <strong>Email</strong>
                    <small>{siteConfig.email}</small>
                  </span>
                  <span className="ct-channel-arrow" aria-hidden="true">↗</span>
                </a>
              </aside>

              {/* Collaboration form */}
              <form ref={formRef} className="ct-form" action={formAction} noValidate>
                <div className="ct-field">
                  <label htmlFor="ct-name">Name</label>
                  <input id="ct-name" name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={120} />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-email">Email</label>
                  <input id="ct-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required maxLength={200} />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-message">Message</label>
                  <textarea id="ct-message" name="message" rows={5} placeholder="Tell me about the project or collaboration you have in mind..." required maxLength={5000} />
                </div>

                <div className="ct-honeypot" aria-hidden="true">
                  <label htmlFor="ct-company">Company</label>
                  <input id="ct-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <button className="ct-submit" type="submit" disabled={isPending}>
                  {isPending ? "Sending..." : "Send message"}
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4z" /></svg>
                </button>

                {state.status !== "idle" ? (
                  <p
                    className={`ct-status ${state.status === "error" ? "is-error" : "is-ok"}`}
                    role="status"
                    aria-live="polite"
                  >
                    {state.message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      <output className={`${shellStyles.toast} ${toastMessage ? shellStyles.toastVisible : ""}`} aria-live="polite">
        {toastMessage}
      </output>
    </div>
  );
}
