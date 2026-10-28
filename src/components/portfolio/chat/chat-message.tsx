import styles from "../portfolio.module.css";

type ChatMessageProps = { author: "AldMind" | "You"; children: React.ReactNode };

export function ChatMessage({ author, children }: ChatMessageProps) {
  const isUser = author === "You";
  return (
    <article className={`${styles.chatMessage} ${isUser ? styles.userMessage : ""}`}>
      <span className={`${styles.messageAvatar} ${isUser ? styles.userAvatar : ""}`}>{isUser ? "BA" : "A/"}</span>
      <p><strong>{author}</strong>{isUser && <br />}{children}</p>
    </article>
  );
}
