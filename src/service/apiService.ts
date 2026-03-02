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
  getDashboard: () => safeRequest(apiClient.get("/dashboard")), //get all dashboard analytics in one call
  getDashboardPerLinkAnalytics: (linkId: string) =>
    safeRequest(apiClient.get(`/analytics/dashboard/${linkId}`)), //get all analytics for specific link in one call for per link analysis page
  getLastWeekClicks: () =>
    safeRequest(apiClient.get("/analytics/weekly-trend")), //get clicks for last 7 days for dashboard chart
  getLastWeekClicksPerLink: (linkId: string) =>
    safeRequest(apiClient.get(`/analytics/weekly-trend/${linkId}`)), //get clicks for last 7 days for specific link for per link analysis
  getUserLinks: () => safeRequest(apiClient.get("/links/getUserLinks")), //get all links for user for dashboard table
  getDashboardPerHourClicks: () =>
    safeRequest(apiClient.get("/analytics/hourly-clicks")), //get clicks per hour for last 24 hours for dashboard chart & also to calculate total clicks today

  getDashboardApiRequest: () =>
    safeRequest(apiClient.get("/analytics/apiUsage")),
  addUrl: (name: string, url: string) =>
    safeRequest(apiClient.post("/links/addLink", { name, url })),
  getUsage: () => safeRequest(apiClient.get("/usage/current")), //get api usage data for usage page
  deleteLink: (linkId: string) =>
    safeRequest(apiClient.delete(`/links/deleteLink/${linkId}`)),
  generateApiKey: (name: string) =>
    safeRequest(apiClient.post("/api-keys/dashboard/api-key", { name })),
  getApiKeys: () => safeRequest(apiClient.get("/api-keys/dashboard/api-keys")),
  deleteApiKey: (keyId: string) =>
    safeRequest(apiClient.delete(`/api-keys/dashboard/deleteApiKey/${keyId}`)),
  updateUser : (name: string,  bio: string, preferences: { email: boolean; notifications: boolean; }) =>
    safeRequest(apiClient.put("/user/updateUser", { name, bio, preferences })),
  updateUserPassword : ( newPassword: string, email: string) =>
    safeRequest(apiClient.put("/auth/updatePassword", { newPassword, email })),
  uploadUserProfileImage:(image:File)=>{
    console.log(image)
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData)
    return safeRequest(apiClient.post("/media/upload-image", formData,{
      headers: {
    "Content-Type": "multipart/form-data",
  },
    }));
  }
};
