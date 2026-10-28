export const portfolioLinks = [
  { label: "Home", href: "#home", icon: "home" },
  { label: "About", href: "#about", icon: "user" },
  { label: "Experience", href: "#experience", icon: "briefcase" },
  { label: "Projects", href: "#projects", icon: "folder" },
  { label: "Achievement", href: "#achievement", icon: "award" },
  { label: "Contact", href: "#contact", icon: "mail" },
] as const;

export const quickPrompts = [
  { number: "01", label: "About", detail: "Who I am", message: "Tell me about yourself", icon: "user" },
  { number: "02", label: "Experience", detail: "Where I've worked", message: "Show me your experience", icon: "briefcase" },
  { number: "03", label: "Projects", detail: "Things I've built", message: "What projects have you built?", icon: "folder" },
  { number: "04", label: "Achievement", detail: "Milestones", message: "What are your achievements?", icon: "award" },
  { number: "05", label: "Contact", detail: "Let's connect", message: "How can I contact you?", icon: "mail" },
] as const;

export type NavigationIcon = (typeof portfolioLinks)[number]["icon"];
