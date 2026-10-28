"use client";

import { useEffect, useState } from "react";
import { ChatComposer } from "../chat/chat-composer";
import { ChatMessage } from "../chat/chat-message";
import { QuickPrompts } from "../chat/quick-prompts";
import { Sidebar } from "../navigation/sidebar";
import { StatusIndicator } from "../shared/status-indicator";
import { Topbar } from "../navigation/topbar";
import styles from "../portfolio.module.css";

type UserMessage = { id: number; text: string };

export function PortfolioApp() {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2400);
  }

  function sendMessage(text: string) {
    setMessages((currentMessages) => [...currentMessages, { id: Date.now(), text }]);
    showToast("AI replies will be connected soon.");
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
    function focusComposer(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector<HTMLInputElement>("[aria-label='Ask AldMind a question']")?.focus();
      }
    }
    document.addEventListener("keydown", focusComposer);
    return () => document.removeEventListener("keydown", focusComposer);
  }, []);

  return (
    <div className={styles.appShell}>
      <Sidebar onNewConversation={() => showToast("Ready for a new conversation")} />
      <main id="home" className={styles.main}>
        <Topbar onCopyLink={copyLink} />
        <section className={styles.chatStage} aria-label="AldMind chat">
          <div className={styles.conversation}>
            <div className={styles.intro}>
              <div className={styles.eyebrow}><StatusIndicator /> PERSONAL AI PORTFOLIO <span>V.01</span></div>
              <h1>Ask about <em>me,</em><br />my work, or ideas.</h1>
              <p>I&apos;m <strong>Bren Alden</strong>, and this is AldMind, a conversational way to navigate my portfolio. Pick a direction or ask anything.</p>
            </div>
            <QuickPrompts onSelect={sendMessage} />
            <ChatMessage author="AldMind"><span className={styles.messageGreeting}>Hello. I&apos;m ready when you are.</span><br />Choose a topic above or write your own question below.</ChatMessage>
            {messages.map((message) => <ChatMessage key={message.id} author="You">{message.text}</ChatMessage>)}
          </div>
          <ChatComposer onSend={sendMessage} />
        </section>
      </main>
      <output className={`${styles.toast} ${toastMessage ? styles.toastVisible : ""}`} aria-live="polite">{toastMessage}</output>
    </div>
  );
}
