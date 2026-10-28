import { FormEvent, useState } from "react";
import styles from "../portfolio.module.css";

type ChatComposerProps = { onSend: (message: string) => void };

export function ChatComposer({ onSend }: ChatComposerProps) {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    onSend(trimmedMessage);
    setMessage("");
  }

  return (
    <div className={styles.composerWrap}>
      <form className={styles.composer} onSubmit={submit}>
        <input value={message} onChange={(event) => setMessage(event.target.value)} aria-label="Ask AldMind a question" placeholder="Message AldMind..." />
        <span className={styles.composerKey}>↵</span>
        <button className={styles.sendButton} type="submit" aria-label="Send message">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4z" /></svg>
        </button>
      </form>
      <p className={styles.composerHint}><span>●</span> Portfolio knowledge base · UI prototype</p>
    </div>
  );
}
