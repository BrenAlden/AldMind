import { NavigationIcon } from "../shared/navigation-icon";
import { quickPrompts } from "../shared/portfolio-data";
import styles from "../portfolio.module.css";

type QuickPromptsProps = { onSelect: (message: string) => void };

export function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className={styles.quickPrompts} aria-label="Portfolio shortcuts">
      {quickPrompts.map((prompt) => (
        <button key={prompt.label} type="button" onClick={() => onSelect(prompt.message)}>
          <span className={styles.promptIcon}><NavigationIcon name={prompt.icon} /></span>
          <span className={styles.promptCopy}>{prompt.label}</span>
        </button>
      ))}
    </div>
  );
}
