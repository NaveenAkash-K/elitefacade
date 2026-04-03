import axiosPublic from "./axiosPublic";

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

export const projectsApi = {
  getAll: async (filters?: { page?: number; limit?: number }) => {
    const { data } = await axiosPublic.get("/projects");

    const allProjects: Project[] = (
      Array.isArray(data) ? data : data.data || []
    ).map(mapBackendProject);

    const page = filters?.page || 1;
    const limit = filters?.limit || 6;
    const total = allProjects.length;
    const start = (page - 1) * limit;
    const paginatedProjects = allProjects.slice(start, start + limit);

    return {
      projects: paginatedProjects,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    };
  },

  getById: async (id: string): Promise<Project> => {
    const { data } = await axiosPublic.get(`/projects/${id}`);
    const raw = data.data ? data.data : data;
    return mapBackendProject(raw);
  },
};

function mapBackendProject(raw: any): Project {
  return {
    id: raw._id || raw.id,
    title: raw.title || "",
    category: raw.category || "",
    location: raw.location || "",
    alt: raw.alt || "",
    image: raw.imageUrl || raw.image || "",
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}