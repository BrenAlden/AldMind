export const portfolioLinks = [
  { label: "Home", href: "#home", icon: "home" },
  { label: "About", href: "#about", icon: "user" },
  { label: "Experience", href: "#experience", icon: "briefcase" },
  { label: "Projects", href: "#projects", icon: "folder" },
  { label: "Achievement", href: "#achievement", icon: "award" },
  { label: "Contact", href: "#contact", icon: "mail" },
] as const;

export const quickPrompts = [
  { label: "About Bren Alden", message: "Tell me about Bren Alden", icon: "user" },
  { label: "Bren's experience", message: "Show me Bren Alden's experience", icon: "briefcase" },
  { label: "Bren's projects", message: "What projects has Bren Alden built?", icon: "folder" },
  { label: "Bren's achievements", message: "What are Bren Alden's achievements?", icon: "award" },
  { label: "Contact Bren", message: "How can I contact Bren Alden?", icon: "mail" },
] as const;

export type NavigationIcon = (typeof portfolioLinks)[number]["icon"];
