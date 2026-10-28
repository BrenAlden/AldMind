import styles from "../portfolio.module.css";

type StatusIndicatorProps = { label?: string };

export function StatusIndicator({ label }: StatusIndicatorProps) {
  return <span className={styles.statusWithLabel}><span className={styles.statusDot} />{label}</span>;
}
