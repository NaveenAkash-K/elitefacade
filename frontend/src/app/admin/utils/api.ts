// ═══════════════════════════════════════════════════════════
// ADMIN PANEL — API UTILITIES
// ═══════════════════════════════════════════════════════════

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token") || "";
  return { Authorization: `Bearer ${token}` };
}

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

    const res = await fetch(`${BASE_URL}${endpoint}`, {
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
    const res = await fetch(`${BASE_URL}${endpoint}`, {
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
    const res = await fetch(`${BASE_URL}/auth/login`, {
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
export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createProducts(
  items: {
    title: string;
    description: string;
    badge: string;
    specs: string[];
    imageFile: File | null;
  }[]
) {
  try {
    const fd = new FormData();

    const jsonItems = items.map(({ imageFile, ...rest }) => rest);
    fd.append("items", JSON.stringify(jsonItems));

    items.forEach((item, i) => {
      if (item.imageFile) {
        fd.append(`image_${i}`, item.imageFile);
      }
    });

    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`POST failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateProduct(
  id: string,
  fields: {
    title: string;
    description: string;
    badge: string;
    specs: string[];
    imageFile: File | null;
  }
) {
  try {
    const fd = new FormData();
    fd.append("title", fields.title);
    fd.append("description", fields.description);
    fd.append("badge", fields.badge);
    fd.append("specs", JSON.stringify(fields.specs));

    if (fields.imageFile) {
      fd.append("image", fields.imageFile);
    }

    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`PATCH failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Projects ──────────────────────────────────────────────

export async function fetchProjects() {
  try {
    const res = await fetch(`${BASE_URL}/projects`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createProjects(
  items: {
    title: string;
    category: string;
    location: string;
    alt: string;
    imageFile: File | null;
  }[]
) {
  try {
    const fd = new FormData();

    // JSON array of metadata (without imageFile)
    const jsonItems = items.map(({ imageFile, ...rest }) => rest);
    fd.append("items", JSON.stringify(jsonItems));

    // Attach each image as image_0, image_1 …
    items.forEach((item, i) => {
      if (item.imageFile) {
        fd.append(`image_${i}`, item.imageFile);
      }
    });

    const res = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`POST failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateProject(
  id: string,
  fields: {
    title: string;
    category: string;
    location: string;
    alt: string;
    imageFile: File | null;
  }
) {
  try {
    const fd = new FormData();
    fd.append("title", fields.title);
    fd.append("category", fields.category);
    fd.append("location", fields.location);
    fd.append("alt", fields.alt);

    if (fields.imageFile) {
      fd.append("image", fields.imageFile);
    }

    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`PATCH failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Services ──────────────────────────────────────────────

export async function fetchServices() {
  try {
    const res = await fetch(`${BASE_URL}/services`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function upsertServices(payload: {
  regions: { icon: string; title: string; description: string }[];
  phases: { title: string; description: string; features: string[] }[];
  steps: { title: string; description: string }[];
  whyUs: { icon: string; title: string; description: string }[];
  phaseImages: { index: number; file: File }[];
}) {
  try {
    const fd = new FormData();
    fd.append("regions", JSON.stringify(payload.regions));
    fd.append("phases", JSON.stringify(payload.phases));
    fd.append("steps", JSON.stringify(payload.steps));
    fd.append("whyUs", JSON.stringify(payload.whyUs));

    payload.phaseImages.forEach(({ index, file }) => {
      fd.append(`image_${index}`, file);
    });

    const res = await fetch(`${BASE_URL}/services`, {
      method: "PUT",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Fabrication ───────────────────────────────────────────

export async function fetchFabrication() {
  try {
    const res = await fetch(`${BASE_URL}/fabrication`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function upsertFabrication(payload: {
  stats: { icon: string; label: string; value: string }[];
  items: { title: string; alt: string }[];
  qaFeatures: { icon: string; title: string; description: string }[];
  itemImages: { index: number; file: File }[];
}) {
  try {
    const fd = new FormData();
    fd.append("stats", JSON.stringify(payload.stats));
    fd.append("items", JSON.stringify(payload.items));
    fd.append("qaFeatures", JSON.stringify(payload.qaFeatures));

    payload.itemImages.forEach(({ index, file }) => {
      fd.append(`image_${index}`, file);
    });

    const res = await fetch(`${BASE_URL}/fabrication`, {
      method: "PUT",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Clients ───────────────────────────────────────────────

export async function fetchClients() {
  try {
    const res = await fetch(`${BASE_URL}/clients`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createClients(
  items: {
    name: string;
    alt: string;
    showInHomePage: boolean;
    imageFile: File | null;
  }[]
) {
  try {
    const fd = new FormData();

    const jsonItems = items.map(({ imageFile, ...rest }) => rest);
    fd.append("items", JSON.stringify(jsonItems));

    items.forEach((item, i) => {
      if (item.imageFile) {
        fd.append(`image_${i}`, item.imageFile);
      }
    });

    const res = await fetch(`${BASE_URL}/clients`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`POST failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateClient(
  id: string,
  fields: {
    name: string;
    alt: string;
    showInHomePage: boolean;
    imageFile: File | null;
  }
) {
  try {
    const fd = new FormData();
    fd.append("name", fields.name);
    fd.append("alt", fields.alt);
    fd.append("showInHomePage", String(fields.showInHomePage));

    if (fields.imageFile) {
      fd.append("image", fields.imageFile);
    }

    const res = await fetch(`${BASE_URL}/clients/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: fd,
    });

    if (!res.ok) throw new Error(`PATCH failed: ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteClient(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/clients/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── FAQ ───────────────────────────────────────────────────
export const saveFAQ = (data: any) => postFormData("/faq", data);
export const fetchFAQ = () => fetchJSON("/faq");

// ─── About ─────────────────────────────────────────────────
export const saveAbout = (data: any) => postFormData("/about", data);
export const fetchAbout = () => fetchJSON("/about");