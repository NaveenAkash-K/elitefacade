import axiosInstance from "./axios";
import { LoginPayload, LoginResponse, ApiResponse } from "./types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      payload
    );
    return data.data;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },

  verifyToken: async (): Promise<boolean> => {
    try {
      await axiosInstance.get("/auth/verify");
      return true;
    } catch {
      return false;
    }
  },
};