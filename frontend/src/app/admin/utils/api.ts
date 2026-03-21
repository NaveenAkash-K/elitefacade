// ═══════════════════════════════════════════════════════════
// ADMIN PANEL — API UTILITIES
// ═══════════════════════════════════════════════════════════

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ─── Generic POST with FormData ────────────────────────────
async function postFormData(
  endpoint: string,
  data: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value ?? ""));
      }
    });

    // Collect all File objects from nested arrays
    if (Array.isArray(data.items)) {
      data.items.forEach((item: any, index: number) => {
        if (item.imageFile instanceof File) {
          formData.append(`image_${index}`, item.imageFile);
        }
      });
    }

    const token = sessionStorage.getItem("admin_token");

    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { success: false, error: body.message || `Error ${res.status}` };
    }

    return { success: true };
  } catch (err: any) {
    console.error(`API POST ${endpoint} failed:`, err);
    return { success: false, error: err.message || "Network error" };
  }
}

// ─── Generic GET ───────────────────────────────────────────
async function fetchJSON(endpoint: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── Auth ──────────────────────────────────────────────────
export async function adminLogin(
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, error: body.message || "Invalid credentials" };
    }

    return { success: true, token: body.token };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

// ─── Products ──────────────────────────────────────────────
export const saveProducts = (data: any) => postFormData("/products", data);
export const fetchProducts = () => fetchJSON("/products");

// ─── Projects ──────────────────────────────────────────────
export const saveProjects = (data: any) => postFormData("/projects", data);
export const fetchProjects = () => fetchJSON("/projects");

// ─── Services ──────────────────────────────────────────────
export const saveServices = (data: any) => postFormData("/services", data);
export const fetchServices = () => fetchJSON("/services");

// ─── Fabrication ───────────────────────────────────────────
export const saveFabrication = (data: any) => postFormData("/fabrication", data);
export const fetchFabrication = () => fetchJSON("/fabrication");

// ─── Clients ───────────────────────────────────────────────
export const saveClients = (data: any) => postFormData("/clients", data);
export const fetchClients = () => fetchJSON("/clients");

// ─── FAQ ───────────────────────────────────────────────────
export const saveFAQ = (data: any) => postFormData("/faq", data);
export const fetchFAQ = () => fetchJSON("/faq");

// ─── About ─────────────────────────────────────────────────
export const saveAbout = (data: any) => postFormData("/about", data);
export const fetchAbout = () => fetchJSON("/about");