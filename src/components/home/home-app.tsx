"use client";

import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/shared/navigation/sidebar";
import { Topbar } from "@/components/shared/navigation/topbar";
import { StatusIndicator } from "@/components/shared/status-indicator";
import shellStyles from "@/components/shared/styles/shell.module.css";
import { ChatComposer } from "./chat/chat-composer";
import { ChatMessage } from "./chat/chat-message";
import { QuickPrompts } from "./chat/quick-prompts";
import styles from "./styles/home.module.css";

type ChatSource = { id: string; title: string; href: string };
type ChatResponse = { answer: string; sources: ChatSource[] };

type ChatEntry = {
  id: number;
  author: "AldMind" | "You";
  text: string;
  isGenerating?: boolean;
  sources?: ChatSource[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isChatResponse(value: unknown): value is ChatResponse {
  return isRecord(value) &&
    typeof value.answer === "string" &&
    Array.isArray(value.sources) &&
    value.sources.every((source) =>
      isRecord(source) &&
      typeof source.id === "string" &&
      typeof source.title === "string" &&
      typeof source.href === "string",
    );
}

export function HomeApp() {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const conversationRef = useRef<HTMLDivElement>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2400);
  }

  async function sendMessage(text: string) {
    if (isGenerating) return;

    const timestamp = Date.now();
    const replyId = timestamp + 1;
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: timestamp, author: "You", text },
      { id: replyId, author: "AldMind", text: "", isGenerating: true },
    ]);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const result: unknown = await response.json();

      if (!response.ok) {
        const errorMessage = isRecord(result) && typeof result.error === "string"
          ? result.error
          : "Chatbot tidak dapat menjawab saat ini.";
        throw new Error(errorMessage);
      }

      if (!isChatResponse(result)) {
        throw new Error("Chatbot mengirim respons yang tidak valid. Coba lagi.");
      }

      setMessages((currentMessages) => currentMessages.map((entry) => (
        entry.id === replyId
          ? {
              ...entry,
              text: result.answer,
              sources: result.sources,
              isGenerating: false,
            }
          : entry
      )));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan. Coba lagi.";
      setMessages((currentMessages) => currentMessages.map((entry) => (
        entry.id === replyId ? { ...entry, text: message, isGenerating: false } : entry
      )));
    } finally {
      setIsGenerating(false);
    }
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

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [messages]);

  const hasConversation = messages.length > 0;

  return (
    <div className={shellStyles.appShell}>
      <Sidebar activeHref="/" />
      <main id="home" className={shellStyles.main}>
        <Topbar onCopyLink={copyLink} />
        <section className={styles.chatStage} aria-label="AldMind chat">
          <div ref={conversationRef} className={styles.conversation} aria-live="polite">
            {!hasConversation && (
              <div className={styles.intro}>
                <div className={styles.eyebrow}><StatusIndicator /> PERSONAL AI PORTFOLIO <span>V.01</span></div>
                <h1>Ask about <em>me,</em><br />my work, or ideas.</h1>
                <p>I&apos;m <strong>Bren Alden</strong>, and this is AldMind, a AI Chatbot way to navigate a creative portfolio and also my personal assistant. Pick a direction or ask anything.</p>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} author={message.author} sources={message.sources}>
                {message.isGenerating && !message.text ? <span className={styles.typingIndicator}>AldMind is typing</span> : message.text}
              </ChatMessage>
            ))}
          </div>
          <div className={styles.composerArea}>
            <QuickPrompts onSelect={sendMessage} />
            <ChatComposer onSend={sendMessage} disabled={isGenerating} />
          </div>
        </section>
      </main>
      <output className={`${shellStyles.toast} ${toastMessage ? shellStyles.toastVisible : ""}`} aria-live="polite">{toastMessage}</output>
    </div>
  );
}
