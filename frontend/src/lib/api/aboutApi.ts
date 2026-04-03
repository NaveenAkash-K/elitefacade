import axiosPublic from "./axiosPublic";

export interface CoreValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  icon: string;
  label: string;
}

export interface AboutData {
  heroImageUrl: string;
  companyStoryImageUrl: string;
  coreValues: CoreValue[];
  certifications: Certification[];
}

export const aboutApi = {
  getAll: async (): Promise<AboutData> => {
    const { data } = await axiosPublic.get("/about");
    return mapBackendAbout(data);
  },
};

function mapBackendAbout(raw: any): AboutData {
  return {
    heroImageUrl: raw.heroImageUrl || "",
    companyStoryImageUrl: raw.companyStoryImageUrl || "",
    coreValues: (raw.coreValues || []).map((v: any) => ({
      id: v._id || v.id || "",
      icon: v.icon || "",
      title: v.title || "",
      description: v.description || "",
    })),
    certifications: (raw.certifications || []).map((c: any) => ({
      id: c._id || c.id || "",
      icon: c.icon || "",
      label: c.label || "",
    })),
  };
}