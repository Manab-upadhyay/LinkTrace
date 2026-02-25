import apiClient from "./axiosClient";
async function safeRequest<T>(request: Promise<any>) {
  try {
    const response = await request;
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export const apiService = {
  login: (email: string, password: string) =>
    safeRequest(apiClient.post("/auth/login", { email, password })),

  logout: () => safeRequest(apiClient.post("/auth/logout")),

  signup: (email: string, password: string, name: string) =>
    safeRequest(apiClient.post("/auth/signup", { email, password, name })),

  getDashboardStats: () => safeRequest(apiClient.get("/dashboard/stats")),

  getDashboardClicks: () => safeRequest(apiClient.get("/dashboard/clicks")),
};
