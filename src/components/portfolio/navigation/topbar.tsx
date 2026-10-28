import { Brand } from "../shared/brand";
import styles from "../portfolio.module.css";

type TopbarProps = { onCopyLink: () => void };

export function Topbar({ onCopyLink }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <Brand compact />
      <span className={styles.topbarNote}><span>ALDMIND</span> / PERSONAL INTERFACE</span>
      <div className={styles.topbarActions}>
        <span className={styles.topbarStatus}>AVAILABLE FOR WORK</span>
        <button className={styles.iconButton} type="button" onClick={onCopyLink} aria-label="Copy portfolio link">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1L10.9 5" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1" /></svg>
        </button>
        <span className={styles.profile}>BA</span>
      </div>
    </header>
  );
}
