import axiosPublic from "./axiosPublic";

export interface ServiceRegion {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServicePhase {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface ServiceStep {
  id: string;
  title: string;
  description: string;
}

export interface ServiceWhyUs {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServiceData {
  regions: ServiceRegion[];
  phases: ServicePhase[];
  steps: ServiceStep[];
  whyUs: ServiceWhyUs[];
}

export const servicesApi = {
  getAll: async (): Promise<ServiceData> => {
    const { data } = await axiosPublic.get("/services");
    return mapBackendService(data);
  },
};

function mapBackendService(raw: any): ServiceData {
  return {
    regions: (raw.regions || []).map((r: any) => ({
      id: r._id || r.id,
      icon: r.icon || "",
      title: r.title || "",
      description: r.description || "",
    })),
    phases: (raw.phases || []).map((p: any) => ({
      id: p._id || p.id,
      title: p.title || "",
      description: p.description || "",
      features: Array.isArray(p.features) ? p.features : [],
      imageUrl: p.imageUrl || "",
    })),
    steps: (raw.steps || []).map((s: any) => ({
      id: s._id || s.id,
      title: s.title || "",
      description: s.description || "",
    })),
    whyUs: (raw.whyUs || []).map((w: any) => ({
      id: w._id || w.id,
      icon: w.icon || "",
      title: w.title || "",
      description: w.description || "",
    })),
  };
}