import axiosPublic from "./axiosPublic";
import axiosInstance from "./axios";
import { Product, ProductPayload } from "./types";

export const productsApi = {
  // ─── Public endpoints (no auth) ───

  getAll: async (filters?: {
    category?: string;
    page?: number;
    limit?: number;
  }) => {
    const params: Record<string, string | number> = {};

    if (filters?.category && filters.category !== "All Systems") {
      params.category = filters.category;
    }

    const { data } = await axiosPublic.get("/products", { params });

    const allProducts: Product[] = (Array.isArray(data) ? data : data.data || []).map(
      mapBackendProduct
    );

    // Client-side pagination (backend returns filtered list)
    const page = filters?.page || 1;
    const limit = filters?.limit || 6;
    const total = allProducts.length;
    const start = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(start, start + limit);

    return {
      products: paginatedProducts,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    };
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await axiosPublic.get(`/products/${id}`);
    const raw = data.data ? data.data : data;
    return mapBackendProduct(raw);
  },

  getCategories: async (): Promise<string[]> => {
    try {
      const { data } = await axiosPublic.get("/products/categories");
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  // ─── Admin endpoints (auth required) ───

  create: async (payload: ProductPayload): Promise<Product> => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("category", payload.category);
    if (payload.badge) formData.append("badge", payload.badge);
    formData.append("specs", JSON.stringify(payload.specs));
    if (payload.imageFile) formData.append("image", payload.imageFile);

    const { data } = await axiosInstance.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const raw = data.data ? data.data : data;
    return mapBackendProduct(raw);
  },

  update: async (id: string, payload: ProductPayload): Promise<Product> => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("category", payload.category);
    if (payload.badge) formData.append("badge", payload.badge);
    formData.append("specs", JSON.stringify(payload.specs));
    if (payload.imageFile) formData.append("image", payload.imageFile);

    const { data } = await axiosInstance.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const raw = data.data ? data.data : data;
    return mapBackendProduct(raw);
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  },
};

// ─── Map backend fields to frontend Product type ───
function mapBackendProduct(raw: any): Product {
  return {
    id: raw._id || raw.id,
    title: raw.title || "",
    description: raw.description || "",
    badge: raw.badge || null,
    category: raw.category || "",
    specs: Array.isArray(raw.specs) ? raw.specs : [],
    image: raw.imageUrl || raw.image || "",
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}