// ═══════════════════════════════════════════════════════════
// ADMIN PANEL — API UTILITIES (Axios)
// ═══════════════════════════════════════════════════════════

import axiosInstance from "@/lib/api/axios";

// ─── Auth ──────────────────────────────────────────────────
export async function adminLogin(
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    return { success: true, token: data.token };
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || "Invalid credentials";
    return { success: false, error: message };
  }
}

// ─── Projects ──────────────────────────────────────────────
export async function fetchProjects() {
  try {
    const { data } = await axiosInstance.get("/projects");
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
    const jsonItems = items.map(({ imageFile, ...rest }) => rest);
    fd.append("items", JSON.stringify(jsonItems));

    items.forEach((item, i) => {
      if (item.imageFile) {
        fd.append(`image_${i}`, item.imageFile);
      }
    });

    const { data } = await axiosInstance.post("/projects", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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

    const { data } = await axiosInstance.patch(`/projects/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProject(id: string) {
  try {
    await axiosInstance.delete(`/projects/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Services ──────────────────────────────────────────────
export async function fetchServices() {
  try {
    const { data } = await axiosInstance.get("/services");
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

    const { data } = await axiosInstance.put("/services", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Fabrication ───────────────────────────────────────────
export async function fetchFabrication() {
  try {
    const { data } = await axiosInstance.get("/fabrication");
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

    const { data } = await axiosInstance.put("/fabrication", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── Clients ───────────────────────────────────────────────
export async function fetchClients() {
  try {
    const { data } = await axiosInstance.get("/clients");
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

    const { data } = await axiosInstance.post("/clients", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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

    const { data } = await axiosInstance.patch(`/clients/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteClient(id: string) {
  try {
    await axiosInstance.delete(`/clients/${id}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─── FAQ ───────────────────────────────────────────────────
export async function saveFAQ(data: any) {
  try {
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value);
      } else if (Array.isArray(value)) {
        fd.append(key, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        fd.append(key, JSON.stringify(value));
      } else {
        fd.append(key, String(value ?? ""));
      }
    });

    await axiosInstance.post("/faq", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || "Network error";
    return { success: false, error: message };
  }
}

export async function fetchFAQ() {
  try {
    const { data } = await axiosInstance.get("/faq");
    return data;
  } catch {
    return null;
  }
}

// ─── About ─────────────────────────────────────────────────
export async function saveAbout(data: any) {
  try {
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value);
      } else if (Array.isArray(value)) {
        fd.append(key, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        fd.append(key, JSON.stringify(value));
      } else {
        fd.append(key, String(value ?? ""));
      }
    });

    await axiosInstance.post("/about", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || "Network error";
    return { success: false, error: message };
  }
}

export async function fetchAbout() {
  try {
    const { data } = await axiosInstance.get("/about");
    return data;
  } catch {
    return null;
  }
}