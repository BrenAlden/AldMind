import styles from "../styles/home.module.css";

type ChatMessageProps = {
  author: "AldMind" | "You";
  children: React.ReactNode;
  sources?: { id: string; title: string; href: string }[];
};

export function ChatMessage({ author, children, sources = [] }: ChatMessageProps) {
  const isUser = author === "You";
  return (
    <article className={`${styles.chatMessage} ${isUser ? styles.userMessage : ""}`}>
      <span className={`${styles.messageAvatar} ${isUser ? styles.userAvatar : ""}`}>{isUser ? "BA" : "A/"}</span>
      <div className={styles.messageContent}>
        <p><strong>{author}</strong>{isUser && <br />}{children}</p>
        {sources.length > 0 && (
          <div className={styles.messageSources}>
            Sumber: {sources.map((source, index) => (
              <span key={source.id}>
                {index > 0 ? ", " : ""}
                <a href={source.href}>{source.title}</a>
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
