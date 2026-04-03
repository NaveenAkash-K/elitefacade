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
  id: string;            // local key (crypto.randomUUID)
  serverId?: string;     // _id from backend — undefined for new items
  title: string;
  description: string;
  badge: string;
  specs: string[];
  imageFile: File | null;
  imagePreview: string;  // blob URL or server imageUrl
  imageUrl?: string;     // existing server image URL
  isDirty: boolean;      // true when user edits an existing item
}

// ─── Projects ──────────────────────────────────────────────
export interface ProjectItem {
  id: string;            // local key (crypto.randomUUID)
  serverId?: string;     // _id from backend — undefined for new items
  title: string;
  category: string;
  location: string;
  alt: string;
  imageFile: File | null;
  imagePreview: string;  // blob URL or server imageUrl
  imageUrl?: string;     // existing server image URL
  isDirty: boolean;      // true when user edits an existing item
}

// ─── Services ──────────────────────────────────────────────
export interface RegionItem {
  serverId?: string;
  icon: string;
  title: string;
  description: string;
}

export interface PhaseItem {
  id: string;            // local key
  serverId?: string;     // _id from backend
  title: string;
  description: string;
  features: string[];
  imageFile: File | null;
  imagePreview: string;  // blob URL or server imageUrl
  imageUrl?: string;     // existing server image
}

export interface StepItem {
  serverId?: string;
  title: string;
  description: string;
}

export interface WhyUsItem {
  serverId?: string;
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
  serverId?: string;
  icon: string;
  label: string;
  value: string;
}

export interface ProductionItem {
  id: string;            // local key
  serverId?: string;     // _id from backend
  title: string;
  alt: string;
  imageFile: File | null;
  imagePreview: string;  // blob URL or server imageUrl
  imageUrl?: string;     // existing server image
}

export interface QAFeatureItem {
  serverId?: string;
  icon: string;
  title: string;
  description: string;
}

// ─── Clients ───────────────────────────────────────────────
export interface ClientItem {
  id: string;              // local key (crypto.randomUUID)
  serverId?: string;       // _id from backend — undefined for new items
  name: string;            // company name
  alt: string;             // image alt text
  showInHomePage: boolean;  // display on homepage carousel
  imageFile: File | null;
  imagePreview: string;    // blob URL or server imageUrl
  imageUrl?: string;       // existing server image URL
  isDirty: boolean;        // true when user edits an existing item
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