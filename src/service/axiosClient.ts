import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
      return Promise.reject(new Error("Unauthorized. Please log in again."));
    }
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
