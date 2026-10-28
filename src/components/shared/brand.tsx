import Link from "next/link";
import styles from "./styles/shell.module.css";

type BrandProps = { compact?: boolean };

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className={`${styles.brand} ${compact ? styles.compactBrand : ""}`} href="/" aria-label="AldMind home">
      <span className={styles.brandMark}><i /><b>A</b></span>
      <span className={styles.brandName}>AldMind<small>Bren Alden&apos;s Portfolio</small></span>
    </Link>
  );
}
