import axiosPublic from "./axiosPublic";
import axiosInstance from "./axios";

export interface Client {
  id: string;
  name: string;
  alt: string;
  showInHomePage: boolean;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientPayload {
  name: string;
  alt: string;
  showInHomePage?: boolean;
  imageFile?: File;
}

export const clientsApi = {
  // ─── Public endpoints (no auth) ───

  getAll: async (): Promise<Client[]> => {
    const { data } = await axiosPublic.get("/clients");
    const raw = Array.isArray(data) ? data : data.data || [];
    return raw.map(mapBackendClient);
  },

  getById: async (id: string): Promise<Client> => {
    const { data } = await axiosPublic.get(`/clients/${id}`);
    const raw = data.data ? data.data : data;
    return mapBackendClient(raw);
  },

  // ─── Admin endpoints (auth required) ───

  create: async (payload: ClientPayload): Promise<Client> => {
    const formData = new FormData();
    const items = [
      {
        name: payload.name,
        alt: payload.alt,
        showInHomePage: payload.showInHomePage ?? false,
      },
    ];
    formData.append("items", JSON.stringify(items));
    if (payload.imageFile) formData.append("image_0", payload.imageFile);

    const { data } = await axiosInstance.post("/clients", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const raw = Array.isArray(data) ? data[0] : data;
    return mapBackendClient(raw);
  },

  update: async (id: string, payload: ClientPayload): Promise<Client> => {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("alt", payload.alt);
    if (payload.showInHomePage !== undefined) {
      formData.append("showInHomePage", String(payload.showInHomePage));
    }
    if (payload.imageFile) formData.append("image", payload.imageFile);

    const { data } = await axiosInstance.put(`/clients/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const raw = data.data ? data.data : data;
    return mapBackendClient(raw);
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/clients/${id}`);
  },
};

function mapBackendClient(raw: any): Client {
  return {
    id: raw._id || raw.id,
    name: raw.name || "",
    alt: raw.alt || "",
    showInHomePage: raw.showInHomePage ?? false,
    imageUrl: raw.imageUrl || "",
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}