import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let subscribers: Array<(token: string | null) => void> = [];

function notifySubscribers(token: string | null) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

function clearSessionAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableConfig;
    const status = error.response?.status;
    const url: string = originalRequest?.url ?? "";

    const isAuthEndpoint =
      url.includes("/auth/login") || url.includes("/auth/refresh");

    if (status !== 401 || isAuthEndpoint || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribers.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await axios.post<{ accessToken: string }>(
        `${api.defaults.baseURL}/auth/refresh`,
        { refreshToken }
      );

      const newToken = data.accessToken;
      localStorage.setItem("accessToken", newToken);
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      notifySubscribers(newToken);
      return api(originalRequest);
    } catch {
      notifySubscribers(null);
      clearSessionAndRedirect();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);