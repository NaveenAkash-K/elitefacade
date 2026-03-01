export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Fabrication", href: "/fabrication" },
  { name: "Clients", href: "/clients" },
  { name: "FAQ", href: "/faq" },
];