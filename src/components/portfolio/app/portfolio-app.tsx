"use client";

import { useEffect, useRef, useState } from "react";
import { ChatComposer } from "../chat/chat-composer";
import { ChatMessage } from "../chat/chat-message";
import { QuickPrompts } from "../chat/quick-prompts";
import { Sidebar } from "../navigation/sidebar";
import { StatusIndicator } from "../shared/status-indicator";
import { Topbar } from "../navigation/topbar";
import styles from "../portfolio.module.css";

type ChatEntry = {
  id: number;
  author: "AldMind" | "You";
  text: string;
  isGenerating?: boolean;
};

const demoReply = "Terima kasih untuk pertanyaannya. AldMind sedang dalam mode demo. Saat knowledge base terhubung, jawaban portfolio yang relevan akan tampil di sini.";

export function PortfolioApp() {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const conversationRef = useRef<HTMLDivElement>(null);
  const generationTimerRef = useRef<number | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2400);
  }

  function sendMessage(text: string) {
    if (isGenerating) return;

    const timestamp = Date.now();
    const replyId = timestamp + 1;
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: timestamp, author: "You", text },
      { id: replyId, author: "AldMind", text: "", isGenerating: true },
    ]);
    setIsGenerating(true);

    let characterIndex = 0;
    generationTimerRef.current = window.setInterval(() => {
      characterIndex += 1;
      const generatedText = demoReply.slice(0, characterIndex);

      setMessages((currentMessages) => currentMessages.map((message) => (
        message.id === replyId ? { ...message, text: generatedText, isGenerating: characterIndex < demoReply.length } : message
      )));

      if (characterIndex === demoReply.length && generationTimerRef.current !== null) {
        window.clearInterval(generationTimerRef.current);
        generationTimerRef.current = null;
        setIsGenerating(false);
      }
    }, 16);
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

  useEffect(() => () => {
    if (generationTimerRef.current !== null) window.clearInterval(generationTimerRef.current);
  }, []);

  const hasConversation = messages.length > 0;

  return (
    <div className={styles.appShell}>
      <Sidebar onNewConversation={() => showToast("Ready for a new conversation")} />
      <main id="home" className={styles.main}>
        <Topbar onCopyLink={copyLink} />
        <section className={styles.chatStage} aria-label="AldMind chat">
          <div ref={conversationRef} className={styles.conversation} aria-live="polite">
            {!hasConversation && (
              <div className={styles.intro}>
                <div className={styles.eyebrow}><StatusIndicator /> PERSONAL AI PORTFOLIO <span>V.01</span></div>
                <h1>Ask about <em>me,</em><br />my work, or ideas.</h1>
                <p>I&apos;m <strong>Bren Alden</strong>, and this is AldMind, a conversational way to navigate my portfolio. Pick a direction or ask anything.</p>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} author={message.author}>
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
      <output className={`${styles.toast} ${toastMessage ? styles.toastVisible : ""}`} aria-live="polite">{toastMessage}</output>
    </div>
  );
}
