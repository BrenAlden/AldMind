import Link from "next/link";
import { Brand } from "../brand";
import { portfolioLinks } from "../data/navigation";
import { StatusIndicator } from "../status-indicator";
import styles from "../styles/shell.module.css";
import { NavigationIcon } from "./navigation-icon";

type SidebarProps = { activeHref?: string };

export function Sidebar({ activeHref = "/" }: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Portfolio navigation">
      <Brand />
      <p className={styles.navLabel}>Explore</p>
      <nav className={styles.sideNav}>
        {portfolioLinks.map((link) => (
          <Link className={link.href === activeHref ? styles.active : ""} href={link.href} key={link.label}>
            <NavigationIcon name={link.icon} /> {link.label}
          </Link>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        <StatusIndicator label="OPEN TO OPPORTUNITIES" />
        <p>© 2026 Bren Alden<br />Built with intent.</p>
      </div>
    </aside>
  );
}
