import axiosPublic from "./axiosPublic";

export interface FabricationStat {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export interface FabricationItem {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
}

export interface FabricationQaFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FabricationData {
  stats: FabricationStat[];
  items: FabricationItem[];
  qaFeatures: FabricationQaFeature[];
}

export const fabricationApi = {
  getAll: async (): Promise<FabricationData> => {
    const { data } = await axiosPublic.get("/fabrication");
    return mapBackendFabrication(data);
  },
};

function mapBackendFabrication(raw: any): FabricationData {
  return {
    stats: (raw.stats || []).map((s: any) => ({
      id: s._id || s.id,
      icon: s.icon || "",
      label: s.label || "",
      value: s.value || "",
    })),
    items: (raw.items || []).map((i: any) => ({
      id: i._id || i.id,
      title: i.title || "",
      alt: i.alt || "",
      imageUrl: i.imageUrl || "",
    })),
    qaFeatures: (raw.qaFeatures || []).map((q: any) => ({
      id: q._id || q.id,
      icon: q.icon || "",
      title: q.title || "",
      description: q.description || "",
    })),
  };
}