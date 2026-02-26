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

  getLinkAnalytics: (linkId: string) =>
    safeRequest(apiClient.get(`/analytics/link/${linkId}`)),
  //get analytics for a specific link
  getLinkAnalyticsHourly: (linkId: string) =>
    safeRequest(apiClient.get(`/analytics/link/${linkId}/hourly`)),

  getUserAnalytics: () => safeRequest(apiClient.get("/analytics/user")), //get user specific analytics like total links, total clicks

  getLastWeekClicks: () =>
    safeRequest(apiClient.get("/analytics/last-week-clicks")), //get clicks for last 7 days for dashboard chart
  getUserLinks: () => safeRequest(apiClient.get("/links/getUserLinks")), //get all links for user for dashboard table
  getDashboardPerHourClicks: () =>
    safeRequest(apiClient.get("/analytics/hourly-clicks")), //get clicks per hour for last 24 hours for dashboard chart & also to calculate total clicks today

  getDashboardApiRequest: () =>
    safeRequest(apiClient.get("/analytics/apiUsage")),
};
