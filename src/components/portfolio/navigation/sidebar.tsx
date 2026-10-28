import { Brand } from "../shared/brand";
import { NavigationIcon } from "../shared/navigation-icon";
import { portfolioLinks } from "../shared/portfolio-data";
import { StatusIndicator } from "../shared/status-indicator";
import styles from "../portfolio.module.css";

type SidebarProps = { onNewConversation: () => void };

export function Sidebar({ onNewConversation }: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Portfolio navigation">
      <Brand />
      <button className={styles.newConversation} type="button" onClick={onNewConversation}>
        <span className={styles.plus}>+</span><span>New conversation</span><kbd>Ctrl K</kbd>
      </button>
      <p className={styles.navLabel}>Explore</p>
      <nav className={styles.sideNav}>
        {portfolioLinks.map((link, index) => (
          <a className={index === 0 ? styles.active : ""} href={link.href} key={link.label}>
            <NavigationIcon name={link.icon} /> {link.label}
          </a>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        <StatusIndicator label="OPEN TO OPPORTUNITIES" />
        <p>© 2026 Bren Alden<br />Built with intent.</p>
      </div>
    </aside>
  );
}
