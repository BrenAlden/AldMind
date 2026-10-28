import type { NavigationIcon as NavigationIconName } from "../data/navigation";

type NavigationIconProps = { name: NavigationIconName };

export function NavigationIcon({ name }: NavigationIconProps) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
  const icons = {
    home: <><path {...common} d="m3 11 9-8 9 8v10H3z" /><path {...common} d="M9 21v-6h6v6" /></>,
    user: <><circle {...common} cx="12" cy="8" r="3.5" /><path {...common} d="M4.8 21c.8-4 3.2-6 7.2-6s6.4 2 7.2 6" /></>,
    briefcase: <><rect {...common} x="3" y="7" width="18" height="13" rx="1" /><path {...common} d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    folder: <path {...common} d="M3 6.5h7l2 2h9v10.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    award: <><circle {...common} cx="12" cy="8" r="5" /><path {...common} d="m8.5 12-1.5 9 5-3 5 3-1.5-9" /></>,
    mail: <><rect {...common} x="3" y="5" width="18" height="14" rx="2" /><path {...common} d="m3 7 9 6 9-6" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}
