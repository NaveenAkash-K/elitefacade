import axiosPublic from "./axiosPublic";

export interface StatItem {
  id: string;
  clients: string;
  yearsOfExcellence: string;
  projectsCompleted: string;
}

export const statsApi = {
  getAll: async (): Promise<StatItem> => {
    const { data } = await axiosPublic.get("/stats");
      console.log(data);
    const raw = data;
    return {
      id: raw._id || raw.id || "",
      clients: raw.clients,
      yearsOfExcellence: raw.yearsOfExcellence,
      projectsCompleted: raw.projectsCompleted,
    };
  },
};