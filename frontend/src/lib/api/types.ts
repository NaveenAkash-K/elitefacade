// Auth
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Projects
export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  alt: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectPayload {
  title: string;
  category: string;
  location: string;
  alt: string;
  imageFile?: File | null;
}

// Fabrication
export interface FabricationItem {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FabricationPayload {
  title: string;
  description: string;
  imageFile?: File | null;
}

// Clients
export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientPayload {
  name: string;
  website?: string;
  logoFile?: File | null;
}

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Products
export interface Product {
    id: string;
    title: string;
    description: string;
    badge: string | null;
    category: string;
    specs: string[];
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductsResponse {
    products: Product[];
    totalPages: number;
    currentPage: number;
}

export interface ProductPayload {
    title: string;
    description: string;
    badge?: string | null;
    category: string;
    specs: string[];
    imageFile?: File | null;
}

export interface ProductFilters {
    category?: string;
    page?: number;
    limit?: number;
}
