"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string }
  | { status: "unconfigured"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Handles collaboration form submissions.
 *
 * Sends an email to the site owner via Resend. If RESEND_API_KEY is not set,
 * returns `unconfigured` so the client can fall back to a mailto: link.
 */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 200);
  const message = clean(formData.get("message"), 5000);
  // Honeypot: real users leave this hidden field empty.
  const honeypot = clean(formData.get("company"), 100);

  if (honeypot) {
    // Silently accept to avoid tipping off bots.
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address doesn't look valid." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "unconfigured",
      message: "Email sending isn't configured yet. Opening your email app instead.",
    };
  }

  // Sender must be a domain you've verified in Resend. The onboarding sender
  // works out of the box for testing. Override with CONTACT_FROM_EMAIL.
  const from = process.env.CONTACT_FROM_EMAIL || "AldMind Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: siteConfig.email,
      replyTo: email,
      subject: `New collaboration message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 12px">New collaboration message</h2>
          <p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return { status: "error", message: "Something went wrong sending your message. Please try again or email directly." };
    }

    return { status: "success", message: "Thanks! Your message has been sent." };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return { status: "error", message: "Couldn't reach the mail service. Please try again or email directly." };
  }
}
