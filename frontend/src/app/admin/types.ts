// ═══════════════════════════════════════════════════════════
// ADMIN PANEL — TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════

// ─── Tab Config ────────────────────────────────────────────
export interface AdminTab {
  id: string;
  label: string;
  icon: string;
}

export const ADMIN_TABS: AdminTab[] = [
  { id: "products", label: "Products", icon: "inventory_2" },
  { id: "projects", label: "Projects", icon: "apartment" },
  { id: "services", label: "Services", icon: "engineering" },
  { id: "fabrication", label: "Fabrication", icon: "precision_manufacturing" },
  { id: "clients", label: "Clients", icon: "handshake" },
];

// ─── Products ──────────────────────────────────────────────
export interface ProductItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  specs: string[];
  imageFile: File | null;
  imagePreview: string;
}

// ─── Projects ──────────────────────────────────────────────
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  alt: string;
  imageFile: File | null;
  imagePreview: string;
}

// ─── Services ──────────────────────────────────────────────
export interface RegionItem {
  icon: string;
  title: string;
  description: string;
}

export interface PhaseItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageFile: File | null;
  imagePreview: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}

// ─── Fabrication ───────────────────────────────────────────
export interface FabStatItem {
  icon: string;
  label: string;
  value: string;
}

export interface ProductionItem {
  id: string;
  title: string;
  alt: string;
  imageFile: File | null;
  imagePreview: string;
}

export interface QAFeatureItem {
  icon: string;
  title: string;
  description: string;
}

// ─── Clients ───────────────────────────────────────────────
export interface ClientItem {
  id: string;
  alt: string;
  imageFile: File | null;
  imagePreview: string;
}

// ─── FAQ ───────────────────────────────────────────────────
export interface FAQCategory {
  name: string;
  icon: string;
}
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ─── About ─────────────────────────────────────────────────
export interface CoreValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface CertificationItem {
  icon: string;
  label: string;
}