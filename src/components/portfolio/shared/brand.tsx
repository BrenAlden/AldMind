import styles from "../portfolio.module.css";

type BrandProps = { compact?: boolean };

export function Brand({ compact = false }: BrandProps) {
  return (
    <a className={`${styles.brand} ${compact ? styles.compactBrand : ""}`} href="#home" aria-label="AldMind home">
      <span className={styles.brandMark}><i /><b>A</b></span>
      <span className={styles.brandName}>AldMind<small>PORTFOLIO AI</small></span>
    </a>
  );
}
